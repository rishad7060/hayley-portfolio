---
name: Data and types coupling
description: How placeholder.json, types.ts, and section components are wired together
type: project
---

Homepage content lives in `src/data/placeholder.json`; each section in `src/components/sections/*.tsx` is a client component that receives its slice via a `data` prop from `src/app/page.tsx`. FAQ.tsx is the exception — it imports `placeholderData` directly.

Section components redeclare their own inline prop interfaces rather than importing from `src/data/types.ts`. `types.ts` was previously out of sync with the actual JSON shape (it described an older menu/reservation/contact schema). As of the Into the Curlz rewrite, `types.ts` is now aligned with the real JSON shape and exposes `ServicesPageConfig`, `ServiceDetailSection` (discriminated union), and `AboutPageConfig`.

**Why:** Without a discriminated union on section.type, TS narrows `sections` to a loose superset where optional fields are `possibly undefined`. The services page imports `ServiceDetailSection` and casts `service.sections as readonly ServiceDetailSection[]` at the boundary to get proper narrowing.

**How to apply:** When adding a new key to placeholder.json, also add the matching interface to `types.ts` AND update the inline interface in the consuming section component. For anything with a `type` discriminator, define it as a union in types.ts and cast the JSON at the consumer boundary.
