# Quality assurance report

## Scope

These checks cover the interactive presentation, its visualizations, and the browser-local encryption example.

## Tested environment

- Date: October 10, 2026
- Browser engine: headless Chromium
- Evaluation method: inline HTML loaded into a browser document for UI tests
- Browser limitation: local-file and localhost navigation were unavailable during automated tests. The encryption control was not tested in a browser secure context.
- Independent cryptographic test: vault functions exercised with Node.js Web Crypto

## UI verification

| Test group | Result |
| --- | --- |
| All 13 presentation chapters exist | Pass |
| Hero principles, legend, and scroll cue | Pass |
| Nine SVG graph views initialize with nonempty content | Pass |
| Engineering lens content toggle | Pass |
| Federation approval and compromised-peer states | Pass |
| Protected-route failure blocks unsafe fallback in simulation | Pass |
| All six private-computation explanations and diagrams | Pass |
| Historical perspective selection and evidence cutoff | Pass |
| Collective classification change and playback | Pass |
| Consent preview, first approval, second approval, withdrawal | Pass |
| Consent changes the highlighted relationship graph | Pass |
| Partition scenario blocks sensitive grants | Pass |
| Incident diagnostic switching | Pass |
| Consumer hardware view switching | Pass |
| Global document horizontal overflow at tested widths | None detected |
| Unhandled JavaScript errors during UI checks | None detected |
| Remote network requests during UI checks | None observed |

Browser viewport widths evaluated: **1440, 1280, 850, 390, and 320 pixels**.

The expanded relationship stage measured approximately **730 pixels** in height at the 1440-pixel desktop width. It retains the visualized relationship field and both approval buttons within one panel. Actual fit depends on the viewer's screen height, browser chrome, and zoom level.

## Cryptography verification

The vault encryption code was extracted unchanged from `index.html` and exercised with the standard Web Crypto API provided by Node.js. The following passed:

- Generate a temporary AES-256-GCM key and encrypt a sample thought.
- Confirm that the displayed ciphertext does not include the original plaintext.
- Decrypt the ciphertext and verify the original text is restored.
- Modify the ciphertext and verify that authenticated decryption rejects it.

This confirms functional behavior of that sample code in the tested Web Crypto implementation. It is **not a browser compatibility guarantee or a security audit**.

## Explicit limits

- No real peer-to-peer or federated service was exercised.
- No production membership credentials or recipient key lifecycle exists in this HTML.
- The private-computation and route simulations are not live implementations.
- The diagrams use illustrative synthetic data, not performance measurements.
- Cryptographic or protocol deployment would require independent security review.

## Integrity

`SHA256SUMS.txt` records hashes for tracked project files except itself. Run `python3 tools/verify_package.py` to check file integrity.
