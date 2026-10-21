# Security acceptance plan

**Status:** Candidate tests for implementation teams. No production node or independent interoperability test is included in this repository.

The client-side decision laboratory provides eleven repeatable authorization cases using synthetic objects and the policy in `assets/js/proposal-policy.js`. Run them with:

```sh
node tools/test_proposal.js
```

That command tests policy logic and fixture expectations only. It does not connect to a Rhizome node, inspect real storage, encrypt a durable history, or demonstrate cryptographic enforcement.

## Proposed independent-node tests

| Case | Expected outcome | Evidence required |
| --- | --- | --- |
| SEC-01 | Operator cannot decrypt owner-sealed Private plaintext | Source bytes, operator credential, no usable plaintext, checked key custody |
| SEC-02 | Backend fetch credential does not authorize recipient disclosure | Allowed internal fetch, rejected final output, policy decision |
| SEC-03 | A–B and B–C do not grant C A's Local Thought | Three nodes, direct grant records, denied C access and snippets |
| SEC-04 | Application login cannot borrow node private-read rights | Separate app and node credentials, denied read |
| SEC-05 | Retrieved prompt injection cannot expand agent or network scope | Fixed tool permissions, malicious source text, denied out-of-scope call |
| SEC-06 | Derived summary preserves intersection of source audiences | Two restricted sources, output lineage, rejected out-of-scope recipient |
| SEC-07 | References, exports, subscriptions and embeddings do not widen scope | Attempts across each egress path, denied access and metadata leaks |
| SEC-08 | Revoked/expired federation privileges fail under a freshness policy | Signed epochs, expiry, interrupted network and denied transfer |
| SEC-09 | Protected-route failure never causes silent direct fallback | Recorded traffic trace with no direct network connection |
| SEC-10 | Recovery behavior follows the owner's selected key policy | Device-loss simulation and explicit irrecoverability condition |
| SEC-10A | Owner can recover cloned encrypted history with recovery material | Restored contents and original signed record integrity |
| SEC-10B | Selected local Iris reads only explicitly granted Private inputs | Isolated model identity, bounded retrieval and recipient/output checks |
| SEC-10C | Failed migration preserves original encrypted and plaintext history | Reversible rehearsal, integrity hashes, no new operator exposure |
| SEC-11 | Logs and exception reports do not reveal protected content | Redacted traces, search for seeded secrets and tokens |
| SEC-12 | Unauthorized updates and downgrades cannot install | Rejected signatures, provenance check and post-update fixtures |
| SEC-13 | Node incident is reconstructable without unrelated plaintext | Evidence timeline, bounded access, redacted incident account |
| SEC-14 | Later assessments cannot impersonate earlier historical knowledge | Multiple timestamps, provenance, taxonomy revisions and replay |

## Test evidence conventions

Store fixture records under isolated test principals, never production member accounts. Capture the exact software revision, policy revision, epoch, test-seed identifier, expected and actual decision, and a safe evidence digest. Treat reproducible observed failure separately from a claimed root cause. Never commit live keys, logs containing private text, personal histories or private conversation transcripts to this repository.

A feature reaches **verified in a particular implementation** only when the implementation version and executed evidence are identified. Passing this presentation's simulations cannot change the status of any deployed node.
