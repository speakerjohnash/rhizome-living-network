## Latest orchard/schema check

Desktop 1440 and mobile 390: all four thought forms, verity 0.1/0.5/0.9
interpretation, all temporal/community history states, individual stake metadata,
and sharing controls passed without browser errors or horizontal overflow.
The active page contains no Riverside, Hilltop, or evening-opening example.
The protected layout/order is unchanged; malformed stakes and the wrong verity
range were corrected under the user's explicit instruction.

# Current verification

See `USER_FEEDBACK_LEDGER.md` for current scope and status.

The latest visual revision passes desktop (1440x1000) and mobile (390x844)
Chromium checks for the four exchange states, before/during/after perception,
retained attributed contributions, source-cluster selection, mutual consent,
keyboard activation, internal links, and page overflow. No JavaScript errors.
The opening, principles and two adjacent FourThought sections match the snapshot
from before this revision exactly. Screenshots were inspected.

Earlier coordinate-chart/percentage-chart checks below are historical and do
not describe the current visualizations. Final checksum verification is run
after all edits.

---

# Community memory edition — checks

2026-10-21, branch `presentation/community-memory`.

## Browser verification

Chromium / Playwright, local file entry point, desktop 1440 × 1000 and mobile
390 × 844. These checks exercise the presentation, not a running Rhizome node.

- All four thought forms select and render their corresponding explanation.
- Question mode distinguishes inquiry from a truth-valued claim.
- Verity and valence change independently; keyboard arrow interaction works.
- History cutoffs show the appropriate number of contributions. Moving backward
  and forward preserves the original question text.
- All four learning-signal controls change their descriptions.
- No JavaScript errors or external network requests during local interactions.
- No page link references the preserved archive. Five local scripts load: D3,
  its compatibility layer, retained chart renderers, mobile support and the new
  community-memory interactions.
- No horizontal page overflow at either viewport. Narrow navigation can scroll
  within its own row.
- Header stays at viewport top, with computed opaque `rgb(9, 12, 25)` background,
  no backdrop filter, and no translucent pseudo-layer throughout scroll samples.
- Desktop and mobile screenshots inspected for layout and legibility.

The whole-header flash reported by the user was not reproduced in the baseline
headless run. The new opaque header removes the translucent backdrop rendering
rather than claiming that the earlier glass-layer mitigation worked. Manual
confirmation in the user's browser remains the check for that intermittent
symptom. The original chapter observer is retained; the fix here is the
requested opaque background, not a claim about a reproduced compositor bug.

The Purple Pill Manifesto URL was obtained from the canonical link in the local
published HTML. The web fetch tool could not load it; that is not evidence the
link is broken. No external link availability claim is made here.

## Source preservation and package checks

The original starting edition is copied byte-for-byte to
`archive/security-study/`, including the pre-existing header/checksum changes.
No old-card link was added to the page. Existing root proposal assets remain
unloaded. The active page's source notes distinguish documented concepts,
fictional examples, current local interfaces and the broader learning vision.

JavaScript syntax, `git diff --check`, archive comparison against the starting
snapshot, and the regenerated package checksum check were completed at handoff.

## Restoration verification

All seven retained sections match the starting HTML exactly after normalizing
chapter numbers: opening, principles, federation, perspective, classification,
relationships and outro. The opening matches byte-for-byte. Original hero CSS
is no longer overridden by the additive stylesheet.

Desktop and mobile runs rendered all four retained SVG charts, exercised every
federation and relationship mode, opened and closed the chapter lens, and
passed the staking/history/learning interactions above. The header remained
opaque and fixed over 59 desktop and 76 mobile scroll samples, with no browser
errors, external requests or page overflow.
