# React Bits adapters

These five components came from the owner's pasted React Bits sources. They retain the supplied JavaScript + CSS implementations, with TypeScript declarations for the portfolio's callers.

| Component | Placement | Portfolio adaptations |
| --- | --- | --- |
| GradientASCII | Hero background | Earth-tone theme palettes, DPR 1.25 at the call site, 30 fps cap, visibility/reduced-motion handling, CSS fallback if WebGL2 fails |
| TiltedCard | Real profile photo | Floating, glare, layered name plate; gyroscope and flip disabled; visibility cleanup |
| CardNav | Header | Next Link, existing Lucide icons, language/theme action slot, ID/EN labels, Escape/outside click/Tab handling |
| RefineFrame | Project screenshots | Actual image load/error states, retry, descriptive image label, stable canvas dimensions during tilt, visibility cleanup |
| BranchedMenu | Technology selector | Existing Lucide elements, three real technology groups, animated branches, keyboard-operable buttons |

The final two pasted files were titled `undefined`; their implementation names are RefineFrame and BranchedMenu. No new icon package is needed. Portfolio-specific colors and responsive rules live in `src/app/react-bits-integration.css`.

RefineFrame labels describe loading an existing screenshot. They do not claim that AI is generating the media. The removed ASCII lab stays removed.
