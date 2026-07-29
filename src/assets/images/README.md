# Habitat photography

Drop real photos here, then import and wire them into the matching
component below. Files here go through Astro's build-time image pipeline
(automatic resize, modern format output, CLS-safe dimensions) — that's the
main reason to prefer this folder over `public/`.

## Where each photo is used

| Suggested filename | Component | Notes |
| --- | --- | --- |
| `hero.jpg` | `src/components/sections/Hero.astro` | Full-bleed, 560px (mobile) / 680px (desktop) tall. Decorative — alt stays `""`. |
| `wwd-saving-nature.jpg` | `src/components/sections/WhatWeDo.astro` | Coastal sage scrub |
| `wwd-strategic-planning.jpg` | `src/components/sections/WhatWeDo.astro` | Grasslands / valley |
| `wwd-collaboration.jpg` | `src/components/sections/WhatWeDo.astro` | Coastal watershed |
| `wwd-land-trust.jpg` | `src/components/sections/WhatWeDo.astro` | Oak woodland |
| `field-story.jpg` | `src/components/sections/FromTheField.astro` | Stewardship or wildlife photo, needs a real caption too |
| `proj-coastal-sage-scrub.jpg` | `src/components/sections/Projects.astro` | San Diego County |
| `proj-chaparral-foothills.jpg` | `src/components/sections/Projects.astro` | Riverside · San Bernardino |
| `proj-oak-woodland.jpg` | `src/components/sections/Projects.astro` | Inland valleys |

## How to wire one in

1. Drop the file here, e.g. `src/assets/images/hero.jpg`.
2. In the component, import it and pass it to `<DuotoneImage>`:

```astro
---
import heroImg from "../../assets/images/hero.jpg";
---

<DuotoneImage
  src={heroImg}
  alt=""
  placeholderLabel="Drop hero photo — coastal sage scrub at dusk"
  ...
/>
```

`DuotoneImage` accepts either an imported asset (this pipeline) or a plain
string path/URL (served as-is, e.g. something already sitting in
`public/`) — pass whichever you have. Once `src` is set, the placeholder
box disappears automatically; no other prop changes needed.

Give every photo a real, meaningful `alt` describing the habitat/scene —
except the hero, which is decorative (its meaning is carried by the
overlaid headline text, not the image) and should keep `alt=""`.
