---
name: Products price rendering
description: Products.tsx was updated to render GBP currency instead of hardcoded $
type: project
---

`src/components/sections/Products.tsx` originally rendered product price as `$ {product.price} {product.currency}`. During the Into the Curlz rewrite this was changed to `£{product.price}` to match the UK client.

**Why:** Products JSON now uses `currency: "GBP"`. Rendering `$ 22.00 GBP` would have been visibly wrong for a UK salon. The `currency` field is kept in the data in case a future iteration re-introduces dynamic multi-currency rendering.

**How to apply:** If the client ever expands to multi-currency, restore a currency-symbol lookup (GBP→£, USD→$, EUR→€) rather than reverting to the hardcoded `$`. Do not silently change the price format back to dollars.
