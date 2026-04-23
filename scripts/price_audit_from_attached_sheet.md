# Price Audit Against Attached Spreadsheet

- Spreadsheet treated as source of truth: `c:\Users\Administrator\Downloads\Website stock Gleamcare_cleaned (1).xlsx`
- Website catalog checked: `content/products/*.mdx`
- Scope of this file: products already on the website that appear to have the wrong price, plus cases where the spreadsheet clearly includes an `ml` size that the website does not show.
- Matching note: I used product title, brand, and close-name matching. Where the spreadsheet wording was too ambiguous, I left the item in the manual review section instead of treating it as a confirmed pricing error.

## Confirmed Price Mismatches

- `content/products/anua-heartleaf-pore-control-cleansing-oil.mdx`
  Website: `KSh 2,500`
  Spreadsheet: `KSh 2,800`
  Spreadsheet row: `ANUA-004 - Heartleaf Pore Control Cleansing Oil`

- `content/products/anua-heartleaf-quercetinol-pore-deep-cleansing-foam.mdx`
  Website: `KSh 2,050`
  Spreadsheet: `KSh 2,100`
  Spreadsheet row: `ANUA-003 - Hearleaf Quercetinol Pore Deep Cleansing Foam`

- `content/products/anua-heartleaf-silky-moisture-sun-cream.mdx`
  Website: `KSh 2,500`
  Spreadsheet: `KSh 2,400`
  Spreadsheet row: `ANUA-002 - Hearleaf Silky Moisture Sun Cream-Sunscreen`

- `content/products/anua-rice-70-glow-milky-toner.mdx`
  Website: `KSh 2,800`
  Spreadsheet: `KSh 2,700`
  Spreadsheet row: `ANUA-001 - Rice 70 Glow Milky Toner-Milk Toner`

- `content/products/beauty-of-joseon-dynasty-cream.mdx`
  Website: `KSh 3,200`
  Spreadsheet: `KSh 2,400`
  Spreadsheet row: `BOJ-007 - Beauty of Joseon Dynasty Cream`

- `content/products/beauty-of-joseon-relief-sun-rice-probiotics-spf50.mdx`
  Website: `KSh 2,500`
  Spreadsheet: `KSh 2,200`
  Spreadsheet row: `BOJ-002 - Relief Sun Rice+Probiotics- Suncream Rice`

- `content/products/bioderma-pigmentbio-sensitive-areas.mdx`
  Website: `KSh 3,100`
  Spreadsheet: `KSh 3,000`
  Spreadsheet row: `BIODERMA-004 - Pigmentbio Senstive Areas`

- `content/products/cosrx-the-retinol-0-1-cream.mdx`
  Website: `KSh 2,900`
  Spreadsheet: `KSh 2,600`
  Spreadsheet row: `C0SRX-006 - The Retinol 0.1`

- `content/products/cosrx-the-vitamin-c-23-serum.mdx`
  Website: `KSh 3,000`
  Spreadsheet: `KSh 2,600`
  Spreadsheet row: `C0SRX-007 - The Vitamin C 23`

- `content/products/dr-teal-s-shea-sugar-scrub.mdx`
  Website: `KSh 2,600`
  Spreadsheet: `KSh 2,300`
  Spreadsheet row: `Dr. Teals-003 - Dr. Teals Sugar Scrub`

- `content/products/medicube-deep-vita-c-pad.mdx`
  Website: `KSh 3,000`
  Spreadsheet: `KSh 2,800`
  Spreadsheet row: `Medicube-010 - Deep Vita C Pad`

- `content/products/medicube-txa-niacinamide-capsule-cream.mdx`
  Website: `KSh 3,000`
  Spreadsheet: `KSh 3,100`
  Spreadsheet row: `Medicube-016 - Medicube TXA Niacinamide Capsule Cream`

- `content/products/medicube-zero-pore-pad.mdx`
  Website: `KSh 2,800`
  Spreadsheet: `KSh 2,600`
  Spreadsheet row: `Medicube-009 - Zero Pore PAD`

- `content/products/skin1004-hyalu-cica-water-fit-sun-serum-spf50.mdx`
  Website: `KSh 2,500`
  Spreadsheet: `KSh 2,350`
  Spreadsheet row: `CENTELLA-04 - Hyalucica Water Fit Sun Serum-SPF`

- `content/products/skin1004-madagascar-centella-light-cleansing-oil.mdx`
  Website: `KSh 2,900`
  Spreadsheet: `KSh 2,500`
  Spreadsheet row: `CENTELLA-02 - Light Cleansing Oil`

- `content/products/skin1004-madagascar-centella-probio-cica-intensive-ampoule.mdx`
  Website: `KSh 3,000`
  Spreadsheet: `KSh 2,800`
  Spreadsheet row: `CENTELLA-011 - Madagascar Probio Cica Intense Ampule`

- `content/products/skin1004-madagascar-centella-soothing-cream.mdx`
  Website: `KSh 3,200`
  Spreadsheet: `KSh 2,700`
  Spreadsheet row: `CENTELLA-08 - Madagascar Centella Soothing Cream`

- `content/products/skinoren-cream-azelaic-acid-20.mdx`
  Website: `KSh 2,800`
  Spreadsheet: `KSh 3,000`
  Spreadsheet row: `Skinoren-001 - Skinoren Cream Azelaic Acid 20%`

- `content/products/vaseline-aloe-soothe-body-lotion.mdx`
  Website: `KSh 650`
  Spreadsheet: `KSh 2,200`
  Spreadsheet row: `Vaseline-002 - Aloe Soothe Body Lotion`

- `content/products/vt-cosmetics-reedle-shot-100.mdx`
  Website: `KSh 3,100`
  Spreadsheet: `KSh 3,400`
  Spreadsheet row: `VT-001 - Reedle Shot 100`

## Same Price, But Website Should Show ML

- `content/products/beauty-of-joseon-revive-eye-serum-ginseng-retinal.mdx`
  Price matches at `KSh 2,300`
  Spreadsheet row says: `BOJ-006 - BOJ Eyecream Revive Eye Serum Ginseng+Retinal 30ml`
  Action later: add `30ml` to the website so the listed price is tied to the exact size.

- `content/products/medicube-collagen-jelly-cream.mdx`
  Current website price matches the spreadsheet only for the `50ml` row at `KSh 2,400`
  Spreadsheet rows:
  `Medicube-004 - Collagen Jelly Cream 50ml - KSh 2,400`
  `Medicube-04 - Collagen Jelly Cream 110ml - KSh 3,000`
  Action later: add `50ml` to the website so the current price is clearly tied to that size.

## Manual Review Before Any Price Change

- `content/products/anua-heartleaf-77-soothing-toner.mdx`
  Likely spreadsheet match: `ANUA-009 - Anua Soothing Toner - KSh 2,900`
  Website is `KSh 2,800`
  I did not mark it confirmed because the spreadsheet name is shortened and does not explicitly say `77%`.

- `content/products/skin1004-centella-tone-brightening-ampoule.mdx`
  Likely spreadsheet match: `CENTELLA-03 - Tone Brightening Toner Capsule Ampoule - KSh 3,000`
  Website is `KSh 2,300`
  I left this out of the confirmed section because the spreadsheet wording is noticeably different.

- `content/products/skin1004-madagascar-centella-ampoule.mdx`
  Website currently shows one unlabeled item at `KSh 2,700`
  Spreadsheet has two size-specific rows:
  `CENTELLA-07 - Centella Ampoule 55ml - KSh 2,800`
  `CENTELLA-007 - Centella Ampoule 100ml - KSh 3,200`
  This likely needs both price confirmation and size labeling before editing the website.

- `content/products/some-by-mi-aha-bha-pha-30-days-miracle-cream.mdx`
  Spreadsheet only clearly lists the serum version:
  `SOMEBYMI-006 - SOMEBYMI AHA,BHA,PHA 30 Days Miracle Serum - KSh 2,800`
  I did not treat the cream price as confirmed from this sheet.

- `content/products/some-by-mi-retinol-intense-reactivating-serum.mdx`
  The closest spreadsheet row is `SOMEBYMI-001 - Retinol Intense Eye Cream - KSh 2,600`
  That is too different to treat as a safe match.

- `content/products/some-by-mi-retinol-intense-trial-kit.mdx`
  The spreadsheet has `SOMEBYMI-002 - Retinal Intense Trail Kit - KSh 2,000`
  This looks like it might be the same product with a typo in the sheet name, but the website already shows `KSh 2,000`, so there is no urgent change needed anyway.
