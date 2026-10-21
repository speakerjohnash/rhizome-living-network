/* Chapter contracts and worked authorization cases for the Rhizome architecture proposal. */
(() => {
  'use strict';

  const contracts = {
    opening: {
      id: 'SCOPE-001', status: 'Proposed specification', title: 'One vision, three evidence levels',
      rule: 'A feature claim MUST distinguish an existing verified capability, a browser simulation, and a proposed or experimental control.',
      enforcement: 'Maintain a versioned feature ledger. Attach implementation evidence before changing any claim to verified.',
      failure: 'An unverified feature remains explicitly proposed. It is not used as a security dependency.',
      test: 'Compare every published security claim with a tagged release and reproducible evidence.',
      chapter: '00'
    },
    principles: {
      id: 'ID-001', status: 'Proposed specification', title: 'Separate principals and powers',
      rule: 'An operator, member, application, device and agent MUST NOT inherit one another\'s content-disclosure authority.',
      enforcement: 'Use independent principals, scoped credentials and checks against the final intended recipient.',
      failure: 'A valid infrastructure credential without a matching content grant is refused.',
      test: 'Try to read an owner-sealed record using operator and application-only credentials.',
      chapter: '01'
    },
    federation: {
      id: 'FED-002', status: 'Proposed specification', title: 'Connection is not inheritance',
      rule: 'A bilateral A–B federation agreement MUST NOT grant node C rights to records owned by A.',
      enforcement: 'Check both peer identities, resource scope, audience and current authorization epoch at every transfer.',
      failure: 'Third-hop retrieval, references and cached derivatives remain unavailable without their own grant.',
      test: 'Connect A–B and B–C. Attempt to retrieve A\'s Local record as a recipient on C.',
      chapter: '02'
    },
    transport: {
      id: 'NET-001', status: 'Proposed specification', title: 'A protected path cannot silently downgrade',
      rule: 'A protected-route request MUST NOT silently fall back to direct delivery after a required relay fails.',
      enforcement: 'Authenticate endpoints independently of transport; restrict egress to permitted relay paths.',
      failure: 'Pause or reject the transfer. State clearly that the privacy route is unavailable.',
      test: 'Disable a required relay and verify that no direct endpoint connection is attempted.',
      chapter: '03'
    },
    sovereignty: {
      id: 'KEY-001', status: 'Proposed specification', title: 'Owner-sealed records must remain recoverable by design',
      rule: 'An owner-sealed Private Thought MUST require owner-controlled decryption material. Recovery and authorized model use MUST be designed before migration.',
      enforcement: 'Generate keys on trusted clients; enroll devices and recovery material; grant selected local models temporary, source-specific inference access.',
      failure: 'A lost device does not silently trigger operator decryption. Without recovery material, loss remains possible.',
      test: 'Restore an encrypted test history after simulated device loss; confirm that the host and unapproved models cannot decrypt it.',
      chapter: '04'
    },
    computation: {
      id: 'CMP-001', status: 'Research candidate', title: 'Measure disclosure, not just output',
      rule: 'Each private-computation technique MUST declare its participants, threat model, leakage and resource demands before adoption.',
      enforcement: 'Treat PSI, MPC, differential privacy and encrypted inference as separate opt-in pilots with defined inputs and outputs.',
      failure: 'Unsupported techniques are not offered as production privacy guarantees.',
      test: 'Benchmark individual pilots and attempt reconstruction from repeated permitted queries.',
      chapter: '05'
    },
    perspective: {
      id: 'HIS-001', status: 'Proposed specification', title: 'A later interpretation is a new record',
      rule: 'An assessment MUST retain subject time, assessment time, evidence cutoff, author and taxonomy revision.',
      enforcement: 'Store original observations and subsequent signed assessments as separately attributable events.',
      failure: 'Views with inadequate provenance are labeled incomplete rather than rewritten as historical fact.',
      test: 'Replay a 2015 assessment without allowing evidence first available in 2026.',
      chapter: '06'
    },
    classification: {
      id: 'CLS-001', status: 'Proposed specification', title: 'Revision without historical erasure',
      rule: 'Reclassification MUST NOT overwrite the ballot, eligibility or category definitions used for an earlier decision.',
      enforcement: 'Version taxonomies and store signed vote events, abstentions, disputes and correction links.',
      failure: 'Conflicting or insufficient ballots remain visible as disagreement or an unresolved result.',
      test: 'Recalculate an old ballot under its original taxonomy after later definitions change.',
      chapter: '07'
    },
    relationships: {
      id: 'CON-001', status: 'Proposed specification', title: 'Mutual, specific permission',
      rule: 'An introduction MUST NOT reveal identity, sensitive interests or inferred traits without the relevant participants\' permission.',
      enforcement: 'Separate search eligibility from the exact fields each person elects to disclose and track expiry.',
      failure: 'No eligible introduction is shown until both required approvals are present.',
      test: 'Withdraw one participant\'s consent and verify that future introductions reveal no protected fields.',
      chapter: '08'
    },
    resilience: {
      id: 'RES-001', status: 'Proposed specification', title: 'Freshness gates consequential operations',
      rule: 'When revocation or policy state is stale, privileged sharing MUST be denied or deferred rather than approved by assumption.',
      enforcement: 'Track signed authorization epochs and classify offline-safe actions independently of new disclosures.',
      failure: 'Local drafts remain possible; sensitive transfers wait until fresh authorization is available.',
      test: 'Partition a node before revocation and attempt a new sharing grant using old credentials.',
      chapter: '09'
    },
    diagnostics: {
      id: 'AUD-001', status: 'Proposed specification', title: 'Evidence without private-content logging',
      rule: 'Audit trails MUST identify policy decisions and relevant versions without routinely disclosing Thought text or model context.',
      enforcement: 'Record redacted event types, actor IDs, decision codes, epochs and content-independent evidence hashes.',
      failure: 'Sensitive payloads are withheld from ordinary support, telemetry and incident views.',
      test: 'Induce denied access and inspect logs, traces and exception reports for leaked private content.',
      chapter: '10'
    },
    implementation: {
      id: 'OPS-001', status: 'Proposed specification', title: 'Security must survive upgrades and device loss',
      rule: 'A node update MUST validate release authenticity and MUST NOT weaken authorization on rollback or restart.',
      enforcement: 'Pin reviewed versions, verify signed artifacts, preserve recovery checkpoints and rerun negative fixtures.',
      failure: 'Reject unauthorized releases; retain a known-good state after interrupted installation.',
      test: 'Inject an unsigned update and interrupt a version migration; verify recovery and permission invariants.',
      chapter: '11'
    },
    outro: {
      id: 'REVIEW-001', status: 'Open design review', title: 'Agreement precedes a security claim',
      rule: 'An architectural promise becomes an implementation claim only after its owner, enforcement mechanism and acceptance evidence are established.',
      enforcement: 'Review tier semantics, ownership, recovery, local Iris grants and federation scopes with maintainers.',
      failure: 'Open decisions remain visible; theoretical mechanisms are never presented as deployed protection.',
      test: 'Review a traceable requirements ledger against independent node behavior and adversarial fixtures.',
      chapter: '12'
    }
  };

  const byId = id => document.getElementById(id);
  const set = (id, value) => { const element = byId(id); if (element) element.textContent = value; };

  function renderContract(id) {
    const contract = contracts[id] || contracts.opening;
    set('contractChapter', 'CHAPTER ' + contract.chapter + ' / ' + contract.id);
    set('contractStatus', contract.status);
    set('contractTitle', contract.title);
    set('contractRule', contract.rule);
    set('contractEnforcement', contract.enforcement);
    set('contractFailure', contract.failure);
    set('contractTest', contract.test);
    const research = contract.status === 'Research candidate';
    byId('contractStatus').classList.toggle('research', research);
    const link = byId('contractReadMore');
    link.setAttribute('href', 'docs/SECURITY_PROPOSAL.md#' + contract.id.toLowerCase());
  }

  window.addEventListener('rhizome:chapter', event => renderContract(event.detail.id));
  renderContract('opening');

  const open = byId('openProposal');
  if (open) open.addEventListener('click', () => {
    if (byId('lensButton').getAttribute('aria-pressed') !== 'true') byId('lensButton').click();
    byId('lensPanel').focus({ preventScroll: true });
  });

  const policy = window.RhizomePolicy;
  if (!policy) return;
  const menu = byId('policyCases');
  const trace = byId('policyTrace');
  const policyIndex = byId('policyIndex');
  if (!menu || !trace || !policyIndex) return;

  const buttons = new Map();
  policy.fixtures.forEach((fixture, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'policy-case';
    button.setAttribute('aria-pressed', String(index === 0));
    button.dataset.caseId = fixture.id;
    const number = document.createElement('span');
    number.className = 'policy-case-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const content = document.createElement('span');
    const category = document.createElement('small');
    category.textContent = fixture.category;
    const title = document.createElement('strong');
    title.textContent = fixture.label;
    content.append(category, title);
    button.append(number, content);
    button.addEventListener('click', () => renderCase(fixture.id));
    menu.append(button);
    buttons.set(fixture.id, button);
  });

  function renderCase(id) {
    const fixture = policy.fixtures.find(item => item.id === id);
    if (!fixture) return;
    const result = policy.evaluate(fixture.request);
    buttons.forEach((button, key) => button.setAttribute('aria-pressed', String(key === id)));
    set('policyCaseTitle', fixture.label);
    set('policyCategory', fixture.category + ' / ' + fixture.rule);
    set('policyDecision', result.decision);
    set('policyReason', result.reason);
    set('policyMeaning', fixture.meaning);
    set('policyScope', fixture.request.sources.join('  +  '));
    set('policyActor', fixture.request.actor);
    set('policyRecipient', fixture.request.recipient);
    set('policyAction', fixture.request.action);
    set('policyIndex', String(policy.fixtures.indexOf(fixture) + 1).padStart(2, '0') + ' / ' + String(policy.fixtures.length).padStart(2, '0'));
    byId('policyDecision').dataset.decision = result.decision;
    trace.replaceChildren();
    result.trace.forEach((item, index) => {
      const row = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = String(index + 1).padStart(2, '0') + '  ' + item.step;
      const state = document.createElement('b');
      state.textContent = item.result;
      state.dataset.result = item.result;
      row.append(label, state);
      trace.append(row);
    });
  }

  renderCase('owner');

  const recoveryModes = {
    device: {
      state: 'RECOVERY PATH AVAILABLE', outcome: 'possible',
      title: 'Restore through an enrolled device',
      description: 'A separately enrolled, accessible device may authorize a replacement device to recover the protected history under an approved enrollment procedure.'
    },
    kit: {
      state: 'RECOVERY PATH AVAILABLE', outcome: 'possible',
      title: 'Restore with owner-held recovery material',
      description: 'An independently stored, owner-controlled recovery secret may re-establish access. The recovery process must be verified before any production migration.'
    },
    none: {
      state: 'RECOVERY NOT POSSIBLE', outcome: 'unavailable',
      title: 'No key, no legitimate reset',
      description: 'If every enrolled device and all recovery material are lost, properly owner-sealed plaintext may be permanently unrecoverable. The host must not silently bypass the boundary.'
    }
  };
  const recoveryButtons = document.querySelectorAll('[data-recovery]');
  function renderRecovery(mode) {
    const choice = recoveryModes[mode];
    if (!choice) return;
    recoveryButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.recovery === mode)));
    set('recoveryIndicator', choice.state);
    byId('recoveryIndicator').dataset.outcome = choice.outcome;
    set('recoveryTitle', choice.title);
    set('recoveryDescription', choice.description);
  }
  recoveryButtons.forEach(button => button.addEventListener('click', () => renderRecovery(button.dataset.recovery)));
  renderRecovery('device');
})();
