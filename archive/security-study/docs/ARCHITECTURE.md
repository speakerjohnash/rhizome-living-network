# Proposed architecture

## Purpose and status

Rhizome is presented here as a secure knowledge commons made of independently controlled people, communities, services, and infrastructure. The diagrams illustrate a direction for protocol development. They are not evidence that any corresponding protections are already deployed.

## Independence of authority

A secure network should distinguish the following authorities:

| Authority | Controls | Must not automatically control |
| --- | --- | --- |
| Person | Personal keys, private records, disclosure choices | Community-wide governance |
| Device | Cryptographic operations on behalf of a person | Every device or identity belonging to that person |
| Hosting operator | Availability, storage infrastructure, local service deployment | Owner-sealed record plaintext |
| Community | Membership and its own protected shared resources | Personal vaults or another community's decisions |
| Federation relationship | Named services and resource scopes between two communities | Third-party access, universal graph browsing, private inference |
| Inference agent | Explicitly authorized data and tools for a specific task | Authority to expand its permissions |

No ordinary operator should hold a master key to every participant's records. There must not be a single mandatory global community authority.

## Proposed trust boundaries

1. **Personal client:** generates and protects owner keys, encrypts sensitive content before upload, and makes deliberate sharing decisions.
2. **Record envelope:** carries authenticated encrypted payloads, provenance, version identifiers, and minimal disclosure metadata.
3. **Storage adapter:** persists records in an interchangeable backend without acquiring rights to decrypt private owner-held content.
4. **Community authority:** issues signed, time-bounded membership credentials with scoped roles.
5. **Federation authority:** jointly signs explicit agreements. Trust does not propagate from A through B to C.
6. **Transport:** authenticates destinations, encrypts application content, and can select stronger privacy routing without silent direct fallback.
7. **Inference broker:** enforces capabilities before retrieval, model execution, tool calls, or disclosure. The model itself does not authorize access.

## Security protocol candidates

The design can build upon established primitives and implementations rather than creating proprietary cryptography:

- **AEAD encryption:** authenticated encryption for record content, with independent key management and recipient-scoped access.
- **Authenticated transport:** TLS 1.3 and carefully selected end-to-end application protocols.
- **Group key management:** Messaging Layer Security for suitable group communication workflows.
- **Private credentials:** selectively disclosed claims and verifiable signatures for membership and bounded access.
- **Private computation:** private set intersection, secure multiparty computation, and differential privacy for narrowly defined tasks.
- **Historical provenance:** signed commitments, independent timestamp evidence when needed, and versioned events.
- **Supply-chain protection:** signed artifacts, release authorization thresholds, and anti-rollback controls.

Not every candidate belongs in the initial implementation. Concrete choices require threat models, interoperability tests, and review of mature libraries.

## Historical perspective and collective knowledge

An interpretation should specify at least:

- The subject being assessed.
- The subject's event time.
- The assessment time and attributed author.
- The evidence available at the time of assessment.
- The taxonomy definition under which the classification was made.
- The claimed uncertainty and the references supporting the interpretation.

The original event and later reinterpretations remain separate. An assessment produced today about an event in 2015 must not be presented as an actual 2015 statement.

Community classification should preserve distributions, disagreement, abstentions, reviewer eligibility, and the definitions attached to each historical ballot. A proposed taxonomy revision needs an editorial review procedure distinct from a vote applying an existing category.

## Distributed failures and authorization freshness

A participant can continue private drafts while offline. New high-impact sharing grants, membership changes, and federation privileges may need fresh authenticated state from their relevant authorities. A stale but correctly signed credential is not sufficient if it was subsequently revoked.

Conflicting signed histories require an explicit reconciliation process. A node must not silently overwrite one branch and claim the disagreement never occurred.

## Hardware path

The initial security foundation is feasible on consumer devices: small nodes, laptops, and desktop computers. Encrypted storage, signed records, permission checks, network transport, and limited private computation are CPU-accessible tasks. Local AI demand depends on model size, RAM, and available accelerators. General-purpose language-model inference over fully encrypted inputs remains a research challenge.

## Non-negotiable conformance cases

- A hosting administrator cannot decrypt an appropriately owner-sealed test record.
- A community grant does not confer universal record access.
- A federation link does not transitively authorize a third community.
- A protected route outage does not fall back to an unapproved direct path.
- A revoked membership credential cannot authorize new sensitive operations after the required authority state is updated.
- A historic record remains attributable and interpretable under its original classification version.
- An agent cannot retrieve or transmit resources outside a signed, bounded task capability.
- Failed cross-implementation cases yield privacy-minimized evidence for reproduction and diagnosis.

These are **proposed acceptance tests**. Passing animated presentation controls is not evidence that the protocol tests have been implemented.
