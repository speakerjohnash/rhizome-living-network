# Architecture review status

This is a proposal for collaboration, not an announcement of an adopted protocol.

| Topic | Verified within this repository | Awaiting implementation evidence |
| --- | --- | --- |
| Original network and federation visualizations | Retained without changing their rendering algorithms | Production federation authorization |
| Chapter-by-chapter rule companions | Thirteen navigable, proposed contract summaries | Maintainer review and accepted normative language |
| Browser-based policy examples | Deterministic cases with Node assertions | Independent enforcement at APIs, internal helpers and retrieval paths |
| Local encryption example | Browser Web Crypto demo with a temporary key | Durable key custody, recovery and interoperable envelopes |
| Local Iris reading Private | Scoped policy illustration | Actual isolated local inference and output controls |
| Derived content restrictions | Synthetic audience intersection case | Enforcement across vector stores, caches, agents and exports |
| Key recovery and migration | Written candidate procedures and failure criteria | Implemented recovery drills on copied user data |
| Signed federation and revocation | Illustrative states and contracts | Two-node handshake, revocation, compromise and failure tests |
| Private computation | Qualitative research illustrations | Technique-specific security and performance evaluation |
| Maintenance and audit | Proposal text and negative acceptance criteria | Release signing, privacy-safe telemetry and incident runbooks |

## Review priorities

**First:** Confirm the current meanings and technical behavior of Private, Local and Global. Record whether any existing operators or application roles can retrieve stored Private plaintext, including through indirect tools.

**Second:** Agree on the authorization boundary: final recipient, source lineage, per-object grants, internal service credentials, model access and output release. Reproduce the most consequential failures with isolated test objects.

**Third:** Choose a reversible owner-sealed migration model only after demonstrating recovery, additional-device enrollment, and authorized local Iris access. Then formalize federation and operational requirements.

## Publication boundary

This branch contains presentation code, proposed technical contracts, repeatable local tests and synthetic demonstration data. It does not require any external account or live member records.
