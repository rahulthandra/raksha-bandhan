# The Thread That Grew — Raksha Bandhan Experience

## Original Problem Statement
A single-page, scroll-driven emotional web experience for Raksha Bandhan. A single gold/red silk thread runs through the page as its spine — thin at the top, winding into a full rakhi by the end. As the user scrolls, flowers bloom out of the thread, each tied to one real memory. At the end the user "ties the last knot" to reveal a personal closing message. Traditional Indian, intimate, candlelit aesthetic — interactive digital art, not a generic card. Reusable via a personalization form that produces a shareable link. Credit "made by ultrahul" linking https://www.instagram.com/ultrahulbuilds/.

## User Choices
- Sharing: personalization **encoded in the URL** (no backend/database).
- Sound: **none** (purely visual).
- Customization: **all options** — flower (marigold/mogra/lotus) + thread colour (gold/red/maroon), nearby/far toggle.
- Personalization: **guided multi-step form**.
- Default demo content: sister **Rithi**, sender **Rahul**, lotus flower, gold thread, nearby.

## Architecture
- **Frontend-only** React app (CRA + craco), Tailwind, Framer Motion, lucide-react. No backend used.
- Routes: `/` = the Experience (reads `?g=` URL param, falls back to defaults); `/create` = multi-step personalization form.
- Config encode/decode: base64(encodeURIComponent(JSON)) in `src/lib/config.js`.

## Key Files
- `src/pages/Experience.jsx` — opening, blooming sequence, mandala accents, orchestration.
- `src/pages/Create.jsx` — 5-step form (Names → Bond → Memories → Closing → Link) + copy/preview.
- `src/components/ThreadSpine.jsx` — scroll-driven SVG thread that draws down the page (useScroll → strokeDashoffset), gold/red/maroon gradient.
- `src/components/MemoryNode.jsx` — per-memory bloom, active-in-view scaling, receding trail, alternating sides.
- `src/components/RakhiClimax.jsx` — weaving text, interactive "tie the last knot", candlelight glow, flower ring, closing message, Instagram credit.
- `src/components/Flowers.jsx` — inline animated SVGs (marigold, lotus, mogra).
- `src/lib/config.js` — defaults + URL encode/decode.

## Implemented (2026-06-16)
- Opening screen with shimmering thread, fading text, pulsing diya "scroll to begin".
- Blooming sequence: flowers bloom from the thread, one in focus, trail recedes; paired memory lines.
- Optional distance line when "far away" is selected.
- Weaving transition → interactive tie-the-knot climax with glow + flower ring.
- Closing personal message, handwritten signature, year, "made by ultrahul" Instagram link.
- Multi-step personalization form generating a shareable URL (verified decode renders custom names, colour, distance line).
- Responsive layout (vertical stacking on mobile), dark textured aesthetic, custom fonts (Eczar/Rozha One/Mukta/Caveat).

## Verified
- Opening, blooming, weaving, tie-knot climax, closing message (screenshot).
- Create form full flow → share URL generated and copyable (automation).
- Shared `?g=` link decodes custom content: names, red thread, far-away line (screenshot).
- Mobile viewport renders.

## Backlog / Possible Next
- P2: "send one back" reply CTA on closing screen.
- P2: optional ambient sound with mute toggle (user opted out for now).
- P2: richer weaving animation morphing the vertical thread directly into the rakhi shape.
