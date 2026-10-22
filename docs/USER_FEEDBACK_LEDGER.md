# Rhizome presentation: user feedback and work ledger

Updated 2026-10-21. Branch: `presentation/community-memory`. This file records
user direction, current implementation, and remaining work. It is not a new
specification for Rhizome, Iris, Ŧrust, or FLC.

## Scope locks

- Keep all work on the branch; do not change main or publish.
- Preserve the approved opening, early principle cards, visual language, and
  ordering. Do not redesign the beginning or add long prefatory explanations.
- Preserve the two adjacent FourThought cards: “A thought, with someone behind
  it” and “Our minds change. The conversation continues.” The user found these
  particularly good. Do not move, separate, or rewrite them incidentally.
- Changes to a requested visualization do not authorize rewriting its neighbors.
- Keep removed cards in code for potential reuse. Never link to them from the page.
- Header must be opaque. The prior glass-layer fix did not satisfy the user.
- Read substantive literature, not just one or two papers. Distinguish documented
  intentions, actual local functionality, and the larger vision.
- Do not frame the local tool as a completed global FLC or a new cryptographic
  security specification. Avoid invented fail-closed slogans and diagnostic cards.
- Latest explicit action requests resume the named tasks after the user's pause;
  they do not reopen unrelated approved sections.

## Central purpose, in the user's terms

Rhizome bootstraps belief staking in community. It offers a means to simulate
and practice these processes through a collaborative learning dialectic and a
peer-to-peer underground knowledge commons. People put what matters to them on
record and co-learn toward shared goals, including building the larger vision.
It is designed to plug into future systems such as FLC, Iris, and Ŧrust.
Rhizome is a tool to build that vision, not a claim that it is complete.

## Requested narrative

| ID | Direction | Status / remaining work |
| --- | --- | --- |
| N1 | Introduce Iris as a mediator: reflect perspectives, surface disagreement, help people make sense together. | Corrected: the long purpose/mediation blocks are now in the learning section. A short definition beside the exchange introduces Iris before the unchanged FourThought pair. |
| N2 | Explain local and API models as proto-Irises. | Present. Keep distinction from future community-trained models. |
| N3 | Link Purple Pill Manifesto for Irises/confluence. | Present. |
| N4 | Communal OODA loop: observe, orient, decide, act, reflect on consequences; orient toward truth and goodness together. | Present in learning section. Explain how records connect expectations, action, outcomes, and competing causal explanations. |
| N5 | Ŧrust deserves its own card and technical explanation. | Dedicated card added. Refine using the full live Trust Demystified article. Contextual attention over sources, conditioned on output; not a single permanent reputation score. |
| N6 | Enable alternative scoring/learning functions over stakes. | Present. Keep room for different community objectives and visions of Ŧrust. |
| N7 | FLC deserves its own card. Global coordination of many Irises and visions of Ŧrust. | Dedicated card added; tensor/provenance clarification being applied. |
| N8 | No global authority or oracle. Irises are basins of attraction around which humans willingly collaborate toward shared goals. | Present in FLC card. Preserve autonomy and pluralism. |
| N9 | FLC stores compressed knowledge in tensor form. Irises stake as representatives of a larger community; provenance traces each staked thought back to community members. | Latest clarification. This must lead the FLC explanation, not appear as incidental model-file storage. Do not invent an aggregation or attribution algorithm. |
| N10 | Privacy through local computing; distinguish private, local, global. | Present. Do not replace this with speculative crypto. Do not import an older blanket “no Iris ever reads private” claim over authorized local computing. |

## Visualization revisions explicitly requested

### V1 — “Everyone can build / Connections are earned”

User says the orbiting people/memory/Iris dots add little value. Give the
visualization a meaningful purpose: show what communities can learn from one
another, chosen sharing, retained provenance, and independent local histories.
The replacement must communicate a concrete exchange, not decorate four circles.
Status: implemented as a concrete tool-library exchange with chosen access, source attribution, and pause semantics. Keep changes inside this
card. Preserve current/old renderer in code before replacing it.

### V2 — “The past doesn't move / Our view of it does”

First issue: clutter and overlapping labels. Numbered points fixed overlap, but
user says the chart still does not land conceptually. The idea to preserve is a
frame of perception on a timeline: before, during, after. Show an actual event,
what could be known at each moment, and how a later frame changes interpretation
without rewriting the earlier record. Merely cleaning a two-axis chart is not
completion. Status: implemented as a before/during/after trial, with the original prediction fixed while evidence and interpretation change.

### V3 — “Consensus can change / The record stays honest”

The arbitrary stacked percentages still fail to communicate the idea. Show
actual different perspectives and their revisions, how an Iris reflects these
back, and how disagreement remains visible. Do not invent a voting system or
suggest the largest share proves truth. Status: implemented as three named perspectives with retained earlier contributions and a revisable Iris synthesis.

### V4 — “See the strengths between us”

User specifically redirected this toward the supplied source-embeddings image:
clustered worldviews can help suggest meaningful relationships and mutual-aid
connections. Explain what closeness represents and why a connection is useful.
Connect similarity of perspective with complementary contributions; do not
present anonymous random dots or a universal ranking of people. Label illustrative
geometry as such rather than claiming a trained projection. Status: implemented as named source clusters, offers/needs, and shared inquiry or mutual-aid connections.

## Reference images supplied by user

- FourThought Time Compass: separate verity and valence; temporal dialectic;
  orient attention toward truth and goodness.
- Beyond Next-Token Prediction: language as discourse across sources and time.
- Three scales / privacy: private, community, global; deliberate sharing and
  learning loop.
- Source embeddings: meaning versus source perspective; meaningful clustering.
- Sourdough FLC: shared knowledge/parameters, representative Iris contributions,
  and provenance back to humans.
- Social Proof of Impact: history informs attention toward demonstrated help;
  distinct from merely forecasting an outcome.
- Time compass quadrants: desired/true directions, false hope, unwanted realities.
- Timestamps: calendar time distinct from sequence position.

Images are conceptual references, not instructions to reproduce every claim or
layout literally. Preserve local schema semantics; do not silently change scales.

## Reading log: Trust Demystified

Requested URL: https://speakerjohnash.substack.com/trust-demystified
Retrieved full live article (HTTP 200) from:
https://speakerjohnash.substack.com/p/trust-demystified

The web reader failed on both URLs; direct public HTML retrieval succeeded.
Read the complete article body, not just an excerpt, including all case studies,
five explanatory levels, and conclusion. Also read all 302 lines of local
`iris/byjohnash/cognicist-literature/trust_demystified.txt`. Live version contains
additional civic/political discussion and wording differences; do not assume
local export is identical. Temporary full live extract: `/tmp/trust-demystified-live.txt`.

Relevant points:

- Iris mediates belief with source and temporal context.
- Ŧrust is an output-conditioned attention distribution over sources.
- Historical usefulness and coherence can matter before majority acceptance.
- Lineage should make influence inspectable and contestable.
- Communities can fork their Irises and tune Ŧrust locally while interoperating.
- Mutual aid examples relate an intervention, its timing, expectation, and later
  outcome. Use concrete relational examples rather than abstract dot proximity.
- These examples explain the intended vision; they are not measured deployments
  or causal proof of the pictured mechanisms.

## Verification and handoff criteria

- Compare opening, principles, and both FourThought sections against the snapshot
  taken before these latest visualization changes. No incidental edits.
- Exercise all revised controls at desktop and mobile widths; check keyboard
  behavior, readable labels, no browser errors, and no horizontal page overflow.
- Inspect screenshots; passing interaction tests alone is not visual validation.
- Confirm no active archive links and no invented requests/model training.
- Keep source notes, this ledger, and checksum manifest current.
- Mark statuses honestly. Earlier browser checks do not validate later edits.
- Work remains local and unmerged. Do not claim user acceptance of new cards.

## Latest clarification and recovered image

The FLC compresses knowledge deemed useful across peoples; local Irises encode
local knowledge. This is now explicit in the FLC card. The shared store should
not be described as a dump of all local history or as just a model-file registry.

Found and visually read both copies of the wisdom-tensor slide:
- `/Users/msevrens/Desktop/Cognicist Propaganda/slide.png`
- `/Users/msevrens/Github/iris/byjohnash/cognicist-literature/wisdom-tensors.png`

Title: Comparing Dollars & Regenerative Wisdom Tensors. Its relevant themes are
a record of perception, contextual attention, community impact, non-coercive
coordination and mutual aid, and knowledge that remains useful after use. Do not
import unrelated financial/legal assertions from the historical slide as facts.
The sourdough-starter image was also visually read: representative local Irises,
a shared starter, and human provenance are central to the FLC explanation.

## Current verification

Desktop 1440x1000 and mobile 390x844: exchange states, all temporal frames,
all community-history cutoffs, source-cluster modes, mutual consent, and keyboard
activation passed. No page errors, broken internal links, archive links or page
overflow. Screenshots inspected. Opening, principles, staking and memory sections
match the pre-revision snapshot exactly. These results do not constitute user
acceptance. Prior removed visualizations are saved in
`archive/visualizations-before-narrative/` and are not linked from the page.

## Orchard continuity and FourThought correction

User rejected the Riverside/tool-library scenario and the bundled example
“More people came in the evening. Volunteer cover mattered too.” Keep the clear
orchard example across the presentation. This explicitly authorizes correcting
malformed examples and scale errors in the otherwise protected FourThought pair;
it does not authorize redesigning or moving those cards.

Reread the entire `fourthought-dialectic/SKILL.md`, the local ledger field table,
and the actual `fourthought_write` tool schema in `rhizome/shared_tools.py`.
Each thought is one independently evaluable, self-contained claim or inquiry,
normally one sentence. A causal relationship can be one thought, but independent
observations and explanations must be separate stakes. Type follows the temporal
object. Verity is 0..1, uncertain around 0.5; valence is -1..1. Questions carry
uncertain verity and express the value of inquiry through valence.

Implemented: replaced the Riverside example throughout the active page with the
orchard; split out outcome observations from causal questions; gave the evolving
perspectives separate types, IDs, dates, verity, valence, local scope, and reply
relationships. Explanatory Iris summaries are labeled as summaries. Corrected the
verity slider range and interpretation, and the bundled orchard reflection.
No real ledger stakes were created or edited.

## Removed obsolete callout

At the user’s explicit request, removed only the “The constraint changes the
product / SECURITY GATE 00” migration callout beneath the principles. Surrounding
cards remain unchanged. The original callout remains in the code archive.

## Matched exchange-card display

Both orchard cards now put the thought in the heading, followed by the same
metadata structure and a bottom-aligned privacy/sharing note. Removed the
reflection’s inconsistent placement as small text inside the metadata panel.

## Direct explanatory voice and coherence review

This page participates in the literature: explain the concepts directly rather
than repeatedly saying “the literature describes.” Keep citations as support.
Changed the learning introduction to “An Iris learns through the relationships
between sources, thoughts, values, and outcomes.” No other page copy changed
in this review.

Review recommendations, not yet implemented:
- Introduce Rhizome’s bootstrapping purpose and Iris’s mediator role before the
  first orchard exchange; preserve the approved opening and FourThought pair.
- Briefly explain Local, verity, and valence where the first example uses them.
- Remove repeated Iris/confluence/proto-Iris definitions in the later community
  chapter; trim the learning section’s technical bridge now covered by the
  dedicated Ŧrust card, and the repeated FLC preview immediately before its card.
- Remove stale numbered-record instructions, the C/D community remnants, and
  security-protocol details in the engineering lens that outlived their cards.
- Reconsider “Consensus can change”: the example demonstrates developing
  understanding and continuing disagreement, not a resolved consensus.
- Consolidate repeated implementation disclaimers into scope notes while keeping
  fictional examples and future architecture clearly identified.

## Meaningful attraction around Irises

Replaced the three identical FLC orbit symbols with three concrete contribution
maps. Each shared purpose gathers different experience, perspectives, and skills;
Iris mediates a named question, and the diagram shows what those contributions
make possible together. Examples stay within the orchard scenario. People can
participate in more than one Iris; these are illustrative voluntary groupings,
not measured personality categories. Former orbit markup preserved in
`archive/visualizations-before-narrative/iris-orbits.html`, without a public link.

## Synthesis across Irises, not contribution text blocks

User rejected the contribution blocks as not a visualization and clarified that
it must show a synthesis of perspectives enabling a greater vision no Iris can
see alone. Replaced them with an SVG network: nine contributors, three distinct
community Irises, exchange paths, and an emergent shared vision between them.
Three selectable stages reveal perspectives, exchange, and synthesis. The shared
vision remains revisable rather than becoming a global oracle. Archived rejected
blocks in code only. Browser checks passed at 1440, 900, and 390 pixels for all
three stages and page overflow; the diagram scrolls horizontally on narrow screens.

## Distinct organizations in an underground knowledge commons

User clarified that Irises need not share a communal or alternative-culture
identity. Each can represent a conventional organization, scientific group, or
other community with its own specialty. Revised only this visualization to use a
commercial orchard, engineering firm, and university lab. Chosen observations,
designs, and findings exchange through Rhizome’s underground knowledge commons.
Their synthesis branches into new shared possibilities, without collapsing the
organizations into one community or a single oracle. Preserved the previous
orchard diagram in the code archive. Separated contributor labels and reserved
space for the commons and resulting connections. Checked all three stages at
1440, 900, and 390 pixels; no page overflow or browser errors. Narrow screens
scroll the diagram horizontally.

## Connected example and source links

User rejected the tangled commons paths and disconnected specialties. Replaced
the diagram with three uncrossed knowledge streams: orchard growing experience,
food retailer buying patterns, and crop-science research. They inform a proposed
trial of fruit people want to buy with lower pesticide use; harvest, sales, and
ecological observations return to each community. This is a shared hypothesis
and inquiry, not an asserted win for everyone. Preserved the previous diagram
in code. Checked all three states at desktop/tablet/mobile widths and visually
inspected the shared-possibility stage.

User directed us to the local literature index instead of web searching. Used
`iris/byjohnash/cognicist-literature/literature_index.json`: its explicit Medium
source URLs for the manifesto, belief staking, and Time Compass; site article
links for the other titles. All ten source-card headings now link to articles,
and the two companion papers in the Trust card are linked. Browser assertions
confirmed all ten headings are linked and no JavaScript errors or page overflow.

## Name the shared trial directly

User found the abstract three-dot symbol uncommunicative. Replaced only that
inner symbol with the two-line label FIELD TRIAL; retained its incoming knowledge
streams, circle, and surrounding explanation.

## Symbol for synthesis of perspectives

User clarified that a symbol is welcome if it represents synthesis. Replaced the
FIELD TRIAL label with three overlapping circles in the orchard, retailer, and
lab colors. Their shared intersection is highlighted; the surrounding diagram
still explains the shared trial. No other page content changed.
