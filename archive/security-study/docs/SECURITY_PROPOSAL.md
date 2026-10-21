# Rhizome security protocol proposal

**Status:** Working specification for discussion. Not an accepted protocol, deployed implementation, or security audit.
**Revision:** 0.1, October 2026
**Companion:** The existing 13-chapter presentation and its interactive engineering lens.

This document separates architectural goals from enforceable behavior. Requirement keywords such as **MUST** are proposed obligations for a future implementation. They are not assertions about current FourThought or Iris code.

## Scope and vocabulary

**Thought:** A record with an origin, source identity, author, source version and access classification. Editing a source or issuing a correction must not silently invalidate earlier evidence.

**Private, Local, Global:** Existing user-facing content tiers. Their exact deployed enforcement needs confirmation before they become normative protocol definitions.

- **Private:** Intended for an explicitly restricted audience. An owner-selected local Iris task may be permitted without relabeling a Private source as Local. Private alone does not prove that a current hosting operator lacks access to its plaintext.
- **Local:** Intended for a bounded, approved audience within a node and/or its directly authorized connections. Local does not mean unencrypted or globally discoverable. A Thought may further narrow that audience.
- **Global:** Intended for broad publication. A Global Thought does not make its links, quoted sources or derived restricted material public by association.

**Owner:** The principal with defined authority to authorize source disclosure and decryption. Ownership, authorship and operator control can differ.

**Operator:** A principal with authority over deployment, uptime and infrastructure. Administrative access is not a content disclosure grant.

**Application account:** A principal permitted to use an application. That credential is not equivalent to community membership, ownership or access to every item reachable by the backend.

**Recipient:** The final human, group, service or deliberately scoped audience to which readable information or a derivation is disclosed. A backend service fetching data is not automatically the recipient.

**Agent:** A process that can retrieve data or call tools within a bounded task. Retrieved text and generated output cannot create new authority.

**Capability:** A time-limited, authenticated grant identifying the actor, recipient, action, purpose, source scope and policy revision. Whether it is a signed token, reference, or authenticated server record is an implementation decision.

**Derived content:** Summaries, embeddings, references, search snippets, inferences, exports, notifications and other content linked to source records. Its allowed audience cannot be wider than source authorization without an explicit release decision.

## Current versus proposed

| Area | Present in this repository | Proposed implementation | Verification needed |
| --- | --- | --- | --- |
| Interactive federation, resilience, history and relationship graphs | Synthetic browser simulations | Enforced peer identity and object-scoped decisions | Two independent test nodes |
| Browser-local sample encryption | AES-GCM demonstration with a temporary key | Owner-sealed record format, durable key lifecycle and recovery | Key loss, migration and compromise drills |
| Per-case authorization decisions | Deterministic local policy examples on this branch | Server and internal-service enforcement points | SQL, vector, RPC, agent and export negative tests |
| Local Iris access to Private | Worked policy example | Explicit temporary source and model capability | End-to-end local inference in an isolated fixture |
| Federated revocation | Graph and policy examples | Signed bilateral agreement and freshness policy | Multi-node interruption and stale-grant tests |
| Private computation | Illustrated techniques | Individually benchmarked optional pilots | Threat model and resource evidence for each pilot |

No claim in the proposed column should be treated as a deployed security guarantee. The status of corresponding code in independently maintained FourThought nodes has not been established by this presentation.

## Authorization contracts

### SCOPE-001

Every feature claim **MUST** distinguish a verified deployed capability, a browser simulation, a proposed contract and a research candidate. Promotion to verified status **MUST** link to a specific version and repeatable test evidence. Failure to provide that evidence leaves the status unchanged.

### ID-001

Operator, member, application account, device and agent identities **MUST** have distinct scopes. A valid maintenance or database credential **MUST NOT** be accepted as a general-purpose read or disclosure grant.

### AUTH-001

Retrieval Authority **MUST NOT** be treated as permission to disclose a Thought to its final Recipient. Authorization **MUST** consider both the performing principal and the intended recipient at each egress boundary.

### AUTH-002

The same decision procedure **MUST** be applied before content, existence indicators or restricted metadata leave any accessible path, including APIs, internal helper calls, SQL gateways, vector retrieval, model tools, search results, subscriptions and exports. A new service path **MUST NOT** bypass the recipient check.

### AUTH-003

A link to a restricted record **MUST NOT** permit unauthorized dereferencing, search previews or existence disclosure. By default, a derivative of multiple protected sources **MUST** be restricted to recipients authorized for *every* source. A release to a larger audience requires a separately authorized release decision with source lineage retained.

### AI-001

A model **MUST NOT** access a Private source without an owner-authorized task specifying model identity, allowed source identifiers, purpose, operation, recipient, expiration and revocation state. Local execution is not, by itself, authorization. Untrusted retrieved instructions **MUST NOT** expand tool or retrieval scope.

### AI-002

A grant to infer or summarize **MUST NOT** imply permission to export, publish or send model outputs to an additional recipient. A new disclosure **MUST** pass the recipient and source-lineage checks independently of model output.

## Record lifecycle

### KEY-001

A proposed owner-sealed Private record uses authenticated encryption with keys under the owner's chosen custody and recovery policy. The host can store ciphertext and operate infrastructure without possessing general owner decryption capability. Selection of a precise, reviewed key-wrapping and authenticated metadata format remains open.

**Creation:** The client establishes record encryption material and authenticated provenance before protected data is uploaded. Exposed metadata must be documented. Device, owner and signing keys are not interchangeable.

**Local use:** A chosen Iris instance receives only source-specific, time-bounded authority and a constrained access path. The host, other models and other recipients do not acquire equivalent access merely because a task is running.

**Second device and collaboration:** Enrollment or sharing uses a verified, authenticated recipient-key procedure. Changes to the recipient set require defined rotation, epoch and cache handling.

**Recovery:** The owner chooses a recovery arrangement before migration. Possibilities include an enrolled second device and owner-held offline recovery material. A universal operator recovery key is inconsistent with owner-only confidentiality. Total loss of devices *and* recovery material can make data unrecoverable.

**Non-destructive migration:** Create a testable encrypted copy, validate decryption and signed provenance, simulate password/device loss and interrupted upgrades, and verify model access. Preserve the previous source and backups until restoration drills pass and the owner approves migration. Re-encryption cannot retract historical plaintext an operator may already have seen.

### FED-001

Each federation edge **MUST** be directly approved by both participating node authorities for a bounded recipient set, resource scope, purpose, start time, expiry and authorization revision. Suggested review states are unconnected, proposed, approved by each side, active, suspended, revoked and expired. Signing quorum, serialization, and policy-revision verification require agreement before production.

### FED-002

A direct A–B federation grant **MUST NOT** confer any right from A on a node C connected to B. Revocation **MUST** stop new privileged disclosure according to an agreed freshness model. Previously disclosed plaintext cannot be cryptographically removed from a recipient's existing copies; retention and redistribution restrictions require separately enforceable or auditable obligations.

### NET-001

Protected routing **MUST** authenticate destination identities and reject silent fallback to a forbidden direct connection. Transport confidentiality and application-layer content encryption are separate controls. Relays reduce some observer information but do not guarantee anonymity against all correlation attacks.

### CMP-001

Each optional privacy technique **MUST** define its leakage model, threat actors, failure thresholds, output class, resource cost and inference risks. Private set intersection, secure multiparty computation, differential privacy and encrypted model inference must be evaluated separately. Repeated permitted queries can still disclose sensitive facts.

## Provenance, consent and operations

### HIS-001

Historical assessments **MUST** retain subject time, assessment time, evidence cutoff, asserted author, source references and taxonomy revision. Retrospective views are new attributed events, not modifications to earlier observers' beliefs.

### CLS-001

Signed classifications, taxonomy definitions, reviewer eligibility, dissent, abstentions and correction events **MUST** be versioned. Changing a category definition **MUST NOT** rewrite the meaning or tally of an earlier ballot.

### CON-001

Introductions **MUST** require applicable participant approval for each disclosed field. A reputation score, inferred relationship or group membership **MUST NOT** substitute for that consent. Expiration and revocation must apply to future disclosures; they cannot erase already saved plaintext.

### RES-001

A request requiring fresh membership, revocation or policy state **MUST** be denied or deferred when authenticated current state is unavailable. Locally stored private drafts can remain possible under an offline policy. Forked signed histories **MUST** remain independently inspectable until reconciled.

### AUD-001

Ordinary node logs **MUST NOT** contain raw Private Thoughts, decrypted context or reusable credentials by default. Minimal evidence should identify event type, principal identifiers, resource handle where permitted, decision, authorization epoch and tamper-evident event commitment. For incident response, distinguish reported allegation, observed event, confirmed effect and unresolved scope.

### OPS-001

Node releases **MUST** be checked for authenticity and authorization before deployment. An interrupted or malicious update **MUST NOT** bypass permission checks or silently install an older vulnerable policy. Migration and rollback must preserve verifiable record integrity. A release signature alone is not proof of comprehensive software security.

### REVIEW-001

The working group should resolve the actual deployed behavior of Private, Local and Global; operator and embedded-application authority; direct-recipient scoping; owner recovery options; local Iris permission boundaries; peer copy rights; and governance evidence standards before describing these contracts as an accepted protocol.

## Unresolved engineering decisions

A security review should establish: which node/version is authoritative, who signs federation grants, where final-recipient authorization is enforced, which protected metadata a storage host observes, how compromised enrolled devices are revoked, how an owner recovers a migrated history, what a disconnected peer may retain, and which evidence can be collected without exposing members' protected material.

The proposal intentionally defines neither a homegrown cryptographic algorithm nor a new universal trust score. Production implementation requires reviewed protocol choices, independent conformance fixtures and a migration plan that does not destroy existing history.
