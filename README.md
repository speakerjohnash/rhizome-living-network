# Rhizome: Learning Together

A local-first presentation of community memory and belief staking, grounded in
existing Cognicist literature. This edition lives on
`presentation/community-memory`; it does not change the main branch.

Open `index.html` directly, or serve this directory:

```sh
python3 -m http.server 8000
```

## Explore

- Original opening, four principle cards, federation, historical perspective,
  classification, relationship exploration, and closing retained.
- FourThought: four forms and independent verity/valence controls.
- Community memory: follow a fictional orchard inquiry through prediction,
  disagreement and later reflection, without replacing earlier contributions.
- Teaching Iris: foresight, impact, fruitful questions and reflective learning.
- Private / Local / Global: the established sharing distinctions.
- Many Irises: the connection to a larger vision of community worldviews and
  shared model weights, without specifying a cryptographic FLC.

The examples run entirely in browser memory. They neither save real stakes nor
train models. There are no external scripts, analytics, fonts or model calls.

## Development

Active files: `index.html`, `assets/css/rhizome.css`,
`assets/css/community-memory.css`, `assets/js/literature-presentation.js`,
`assets/js/community-memory.js`, plus the existing mobile and D3 assets.

The header is opaque with no backdrop filter, as requested. The original opening styles and animated canvas are restored.

- `docs/USER_FEEDBACK_LEDGER.md`: current user requests, protected sections,
  reading log, implementation status, and placement correction.
- `docs/COMMUNITY_MEMORY_PLAN.md`: original scope and restoration instructions.
- `docs/COMMUNITY_MEMORY_SOURCES.md`: literature mapping and evidence boundaries.
- `docs/COMMUNITY_MEMORY_QA.md`: browser and integrity checks for this edition.

## Preserved original cards

`archive/security-study/` contains the complete starting edition, including its
HTML, scripts, styles, documents and assets. Existing uncommitted header CSS and
checksum changes were preserved there too. It is not linked or loaded by the
new page. Individual sections can be restored with their associated renderers
and styles; see the plan for the procedure.

The original full renderer and proposal documentation also remain in the repository.
The active renderer retains the original hero and the revised community visualizations;
the retired transport, encryption, private-computation, resilience, diagnostics,
and hardware sections remain available in the code archive. Their historical assertions do not
verify the current learning examples.

## Verification

```sh
node --check assets/js/community-memory.js
python3 tools/verify_package.py
```

The checksum manifest includes the active edition and the archived edition.
The embedded D3 license and original attribution are preserved. No new
project-wide reuse license is implied.
