# Security boundaries and claims

## What this presentation executes

The file is a browser-based, local design exploration. It runs graphics, animations, and simulated policy interactions. The vault demonstration uses browser Web Crypto for AES-256-GCM encryption and decryption with a temporary key when the API is available.

The presentation does not create user accounts, issue real credentials, connect communities, run private set intersection, or deploy a relay network. It does not perform general encrypted AI inference.

## What is simulated

- Federation proposals, signed authorization, revocation, and compromised peers.
- Multi-hop and delayed-mix packet routing, network failure, and fail-closed paths.
- Private matching, zero-knowledge proofs, multiparty computation, and differential privacy.
- Synthetic member locations, skill relationships, consent, and graph disclosure.
- Changing community ballots, confidence, and historical assessments.
- Distributed event histories, replication conflicts, and failure attribution.
- Qualitative hardware and technology maturity positions.

## Sensitive information

The HTML is designed with no remote analytics, third-party fonts, or external scripts. The sample record exists in the browser page, and encryption keys are temporary memory objects. This design does not protect inputs from a compromised browser, operating system, malicious extension, screen recording, or someone with access to the running device.

Do not enter actual secrets into demonstrations. The visualization should not be used as a secure document vault.

## Limits that remain true in production

1. **Authorized recipients:** a person who receives plaintext can copy, photograph, record, or remember it. Avoid granting raw plaintext when a narrowly bounded output is sufficient.
2. **Routing:** independently operated relays reduce some metadata exposure. Low-latency networks cannot guarantee anonymity against end-to-end traffic correlation.
3. **Revocation:** revoking a credential or rotating keys protects future accesses under the new state, but does not erase copies of previously obtained plaintext.
4. **Endpoints:** client-side encryption cannot protect plaintext from malware or a compromised browser after decryption.
5. **Inference outputs:** an authorized result can leak private facts. Repeated probing can accumulate additional information. Query policy and, where applicable, differential privacy budgets matter.
6. **Historical leaks:** encrypting migrated records cannot undo access to older plaintext already held by an operator.
7. **Availability:** encryption protects content confidentiality, not guaranteed service availability. A malicious host can still delete, withhold, or refuse service.
8. **Cryptographic correctness:** protocols require independent implementation audits, security testing, and documented key recovery before real deployment.

## What to validate before building

Specify adversaries, privacy goals, data classifications, key holders, trust domains, compromise recovery rules, revocation freshness, governance quorums, and retention semantics. Then write negative conformance tests against actual independent node implementations. A visual demonstration is a design aid, not a substitute for cryptographic enforcement.

## Contract review additions

The engineering lens now displays a proposed rule, enforcement path, failure behavior and acceptance check for each of thirteen chapters. Chapter 04 also runs an illustrative JavaScript policy evaluator against eleven synthetic examples. Neither component executes production node authorization, validates real identity credentials, provides durable keys, proves safe federation or verifies recovery.

The repository has not independently established the deployed behavior of Private, Local or Global records. The stronger owner-sealed model and selected local Iris permissions are design objectives that require acceptance tests against an actual implementation before any migration.
