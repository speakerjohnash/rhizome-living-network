#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const model = require(path.join(__dirname, '..', 'assets', 'js', 'proposal-policy.js'));

let passed = 0;
for (const fixture of model.fixtures) {
  const result = model.evaluate(fixture.request);
  assert.equal(result.decision, fixture.expected, fixture.id);
  assert.ok(result.trace.length >= 2, fixture.id + ': expected a decision trace');
  passed += 1;
}

const baseline = model.fixtures.find(item => item.id === 'owner').request;
const evaluate = changes => model.evaluate({ ...baseline, ...changes }).decision;
const rejected = [
  [{ recipient: 'member-b' }, 'different final recipient'],
  [{ ownerKey: false }, 'missing owner key'],
  [{ actor: 'operator' }, 'operator cannot borrow owner key'],
  [{ sources: ['thought-private', 'thought-local'], recipient: 'member-b' }, 'multiple sources restrict output'],
  [{ sources: ['not-a-thought'] }, 'unknown source'],
  [{ action: 'publish' }, 'publish needs separate authorization']
];
for (const [changes, reason] of rejected) {
  assert.equal(evaluate(changes), 'DENY', reason);
  passed += 1;
}
assert.equal(evaluate({ policyEpoch: 0 }), 'DEFER', 'stale authorization state');
passed += 1;
for (const [changes, expected, label] of [
  [{ actor: 'member-c', recipient: 'member-b', sources: ['thought-local'], viaNode: 'node-b', directAgreement: true }, 'DENY', 'spoofed member'],
  [{ actor: 'backend', recipient: 'member-b', sources: ['thought-local'], viaNode: 'node-b', directAgreement: true, retrievalCredential: true }, 'DENY', 'service without recipient delegation'],
  [{ actor: 'backend', recipient: 'member-b', sources: ['thought-local'], viaNode: 'node-b', directAgreement: true, retrievalCredential: true, delegatedBy: 'member-b' }, 'ALLOW', 'service with explicit recipient delegation'],
  [{ actor: 'unrecognized', recipient: 'owner' }, 'DENY', 'unknown actor']
]) {
  assert.equal(evaluate(changes), expected, label);
  passed += 1;
}

const allowedModel = model.fixtures.find(item => item.id === 'iris-granted').request;
for (const [changes, reason] of [
  [{ purpose: 'publication' }, 'changed purpose'],
  [{ model: 'iris-remote', actor: 'iris-remote' }, 'changed model identity'],
  [{ grant: undefined }, 'missing grant'],
  [{ grant: { ...allowedModel.grant, epoch: 3 } }, 'old grant epoch'],
  [{ grant: { ...allowedModel.grant, notAfter: '2026-10-12T17:00:00Z' } }, 'expired grant']
]) {
  assert.equal(model.evaluate({ ...allowedModel, ...changes }).decision, 'DENY', reason);
  passed += 1;
}

const expectedModes = new Set(['ALLOW', 'DENY', 'DEFER']);
assert.ok(model.fixtures.every(f => expectedModes.has(f.expected)));
assert.equal(new Set(model.fixtures.map(f => f.id)).size, model.fixtures.length);
passed += 2;

console.log('PASS: ' + passed + ' policy assertions, including ' + model.fixtures.length + ' worked cases.');
console.log('Scope: synthetic client-side policy behavior only; no node security claim.');
