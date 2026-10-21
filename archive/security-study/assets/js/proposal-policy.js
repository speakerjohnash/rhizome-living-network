/* Deterministic policy examples for the architecture review. No live data or credentials. */
(function (root, factory) {
  'use strict';
  const model = factory();
  if (typeof module === 'object' && module.exports) module.exports = model;
  if (root) root.RhizomePolicy = model;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const records = Object.freeze({
    'thought-private': Object.freeze({
      tier: 'Private', owner: 'owner', audience: ['owner'], sealed: true, node: 'node-a'
    }),
    'thought-local': Object.freeze({
      tier: 'Local', owner: 'owner', audience: ['owner', 'member-b'],
      sealed: false, node: 'node-a', directNodes: ['node-b']
    }),
    'thought-global': Object.freeze({
      tier: 'Global', owner: 'owner', audience: ['public'], sealed: false, node: 'node-a'
    })
  });

  const fixtures = Object.freeze([
    {
      id: 'owner', label: 'Owner reads a Private Thought', category: 'Personal custody',
      rule: 'AUTH-001', expected: 'ALLOW',
      request: { actor: 'owner', recipient: 'owner', action: 'read', sources: ['thought-private'],
        ownerKey: true, policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'A verified owner on an enrolled device can read their own record.'
    },
    {
      id: 'operator', label: 'Host tries to decrypt', category: 'Storage boundary',
      rule: 'KEY-001', expected: 'DENY',
      request: { actor: 'operator', recipient: 'operator', action: 'read',
        sources: ['thought-private'], policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'Administration of storage must not imply possession of an owner-held key.'
    },
    {
      id: 'backend', label: 'Backend forwards a Private Thought', category: 'Recipient boundary',
      rule: 'AUTH-001', expected: 'DENY',
      request: { actor: 'backend', recipient: 'member-b', action: 'read',
        sources: ['thought-private'], retrievalCredential: true,
        policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'A backend retrieval credential cannot substitute for recipient authorization.'
    },
    {
      id: 'iris-granted', label: 'Selected local Iris model', category: 'Bounded inference',
      rule: 'AI-001', expected: 'ALLOW',
      request: { actor: 'iris-local', recipient: 'owner', action: 'infer',
        sources: ['thought-private'], model: 'iris-local', purpose: 'reflection',
        grant: { source: 'thought-private', model: 'iris-local', recipient: 'owner',
          action: 'infer', purpose: 'reflection', epoch: 4, notAfter: '2026-10-12T19:00:00Z' },
        at: '2026-10-12T18:00:00Z', policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'Private remains Private. A single model receives only a bounded inference capability.'
    },
    {
      id: 'iris-ungranted', label: 'Unapproved AI request', category: 'Inference boundary',
      rule: 'AI-001', expected: 'DENY',
      request: { actor: 'iris-remote', recipient: 'owner', action: 'infer',
        sources: ['thought-private'], model: 'iris-remote', purpose: 'reflection',
        policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'Model location alone confers no permission. A matching owner grant is required.'
    },
    {
      id: 'local-direct', label: 'Direct member reads Local', category: 'Sharing scope',
      rule: 'FED-001', expected: 'ALLOW',
      request: { actor: 'member-b', recipient: 'member-b', action: 'read',
        sources: ['thought-local'], viaNode: 'node-b', directAgreement: true,
        policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'Local can be shared with a named, approved audience through a direct agreement.'
    },
    {
      id: 'transitive', label: 'Third node follows A–B–C', category: 'Federation boundary',
      rule: 'FED-002', expected: 'DENY',
      request: { actor: 'member-c', recipient: 'member-c', action: 'read',
        sources: ['thought-local'], viaNode: 'node-c', directAgreement: false,
        policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'A link between B and C does not expand the audience approved by A.'
    },
    {
      id: 'derived', label: 'Summary combines two tiers', category: 'Derived content',
      rule: 'AUTH-003', expected: 'DENY',
      request: { actor: 'backend', recipient: 'member-b', action: 'derive',
        sources: ['thought-local', 'thought-private'], retrievalCredential: true,
        delegatedBy: 'member-b', viaNode: 'node-b', directAgreement: true,
        policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'A derived summary inherits the intersection of its source audiences.'
    },
    {
      id: 'reference', label: 'Global link targets Private', category: 'Reference disclosure',
      rule: 'AUTH-003', expected: 'DENY',
      request: { actor: 'backend', recipient: 'member-b', action: 'dereference',
        sources: ['thought-global', 'thought-private'], retrievalCredential: true,
        delegatedBy: 'member-b', policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'A public reference cannot reveal a protected target, title or snippet.'
    },
    {
      id: 'stale', label: 'Revocation state is stale', category: 'Policy freshness',
      rule: 'RES-001', expected: 'DEFER',
      request: { actor: 'member-b', recipient: 'member-b', action: 'read',
        sources: ['thought-local'], viaNode: 'node-b', directAgreement: true,
        policyEpoch: 3, requiredEpoch: 4 },
      meaning: 'Sensitive access waits for authenticated current policy rather than guessing.'
    },
    {
      id: 'publish', label: 'Model tries to publish an answer', category: 'Output boundary',
      rule: 'AI-002', expected: 'DENY',
      request: { actor: 'iris-local', recipient: 'public', action: 'publish',
        sources: ['thought-private'], model: 'iris-local', purpose: 'reflection',
        grant: { source: 'thought-private', model: 'iris-local', recipient: 'owner',
          action: 'infer', purpose: 'reflection', epoch: 4, notAfter: '2026-10-12T19:00:00Z' },
        at: '2026-10-12T18:00:00Z', policyEpoch: 4, requiredEpoch: 4 },
      meaning: 'A permission to infer does not include permission to publish its result.'
    }
  ]);

  function evaluate(request) {
    const trace = [];
    const add = (step, result) => trace.push({ step, result });
    const stop = (decision, reason) => ({ decision, reason, trace });

    if (!request || !request.actor || !request.recipient || !request.action ||
        !Array.isArray(request.sources) || !request.sources.length ||
        request.sources.some(id => !Object.prototype.hasOwnProperty.call(records, id))) {
      add('Complete principal, recipient, action and source identifiers', 'FAIL');
      return stop('DENY', 'Incomplete or unknown request.');
    }
    add('Identified actor, recipient, action and all source records', 'PASS');

    if (!Number.isInteger(request.policyEpoch) ||
        !Number.isInteger(request.requiredEpoch) ||
        request.policyEpoch < request.requiredEpoch) {
      add('Fresh authorization state', 'WAIT');
      return stop('DEFER', 'The required policy revision is not available.');
    }
    add('Fresh authorization state', 'PASS');

    // The performing principal and the intended recipient are separate checks.
    const self = request.actor === request.recipient &&
      ['owner', 'member-b', 'member-c'].includes(request.actor);
    const service = request.actor === 'backend' && request.retrievalCredential === true &&
      request.delegatedBy === request.recipient;
    const model = ['iris-local', 'iris-remote'].includes(request.actor) &&
      request.model === request.actor;
    const actorAllowed = self || service || model;
    add('Actor identity and delegated authority', actorAllowed ? 'PASS' : 'FAIL');
    if (!actorAllowed) return stop('DENY', 'The performing principal lacks a recipient-bound authorization.');

    if (request.action === 'publish') {
      const approved = request.release && request.sources.every(id =>
        request.release.sources.includes(id) &&
        request.release.recipient === request.recipient &&
        request.release.epoch === request.requiredEpoch);
      add('Separate, source-complete publication approval', approved ? 'PASS' : 'FAIL');
      if (!approved) return stop('DENY', 'Inference and retrieval grants do not authorize publication.');
    }

    for (const id of request.sources) {
      const record = records[id];
      const publicAudience = record.audience.includes('public');
      const recipientAllowed = publicAudience || record.audience.includes(request.recipient);
      add('Source audience: ' + id, recipientAllowed ? 'PASS' : 'FAIL');
      if (!recipientAllowed) return stop('DENY', 'The final recipient is outside a source audience.');

      if (record.tier === 'Local' && request.recipient !== record.owner) {
        const direct = record.directNodes.includes(request.viaNode) && request.directAgreement === true;
        add('Direct, scoped federation agreement', direct ? 'PASS' : 'FAIL');
        if (!direct) return stop('DENY', 'Indirect connections do not inherit disclosure rights.');
      }

      if (record.sealed) {
        if (request.actor === record.owner && request.recipient === record.owner && request.ownerKey === true) {
          add('Owner key on an authorized device', 'PASS');
        } else if (request.action === 'infer' && request.actor === request.model) {
          const g = request.grant;
          const authorized = Boolean(g && g.source === id && g.model === request.model &&
            g.recipient === request.recipient && g.action === request.action &&
            g.purpose === request.purpose && g.epoch === request.requiredEpoch &&
            Number.isFinite(Date.parse(request.at)) &&
            Number.isFinite(Date.parse(g.notAfter)) &&
            Date.parse(request.at) <= Date.parse(g.notAfter));
          add('Owner-issued, exact-scope model capability', authorized ? 'PASS' : 'FAIL');
          if (!authorized) return stop('DENY', 'No valid, purpose-scoped model capability.');
        } else {
          add('Required owner key or exact-scope delegation', 'FAIL');
          return stop('DENY', 'This principal cannot open the owner-sealed record.');
        }
      }
    }

    if (request.actor === 'backend' && request.recipient === 'backend') {
      add('Backend credential distinct from recipient identity', 'FAIL');
      return stop('DENY', 'The backend does not authorize itself as a reader.');
    }
    if (request.actor === 'iris-local' || request.actor === 'iris-remote') {
      if (request.action !== 'infer' && request.action !== 'publish') {
        add('Agent restricted to its granted action', 'FAIL');
        return stop('DENY', 'The agent lacks authorization for this action.');
      }
    }
    add('Disclosure bounded to approved action and recipient', 'PASS');
    return stop('ALLOW', 'All specified policy conditions are satisfied.');
  }

  return Object.freeze({ records, fixtures, evaluate });
});
