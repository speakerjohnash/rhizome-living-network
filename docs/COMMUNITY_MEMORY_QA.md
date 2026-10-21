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
- No page link references the preserved archive; only the active script loads.
- No horizontal page overflow at either viewport. Narrow navigation can scroll
  within its own row.
- Header stays at viewport top, with computed opaque `rgb(9, 12, 25)` background,
  no backdrop filter, and no translucent pseudo-layer throughout scroll samples.
- Desktop and mobile screenshots inspected for layout and legibility.

The whole-header flash reported by the user was not reproduced in the baseline
headless run. The new opaque header removes the translucent backdrop rendering
rather than claiming that the earlier glass-layer mitigation worked. Manual
confirmation in the user's browser remains the check for that intermittent
symptom. The previous active-section algorithm was also replaced with selection
from all chapter positions, avoiding reliance on observer change batches.

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
