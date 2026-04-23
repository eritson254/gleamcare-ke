import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const productsDir = path.join(repoRoot, "content", "products");
const xlsxPath = String.raw`c:\Users\Administrator\Downloads\Website stock Gleamcare_cleaned (1).xlsx`;

const BRAND_ALIASES = new Map([
  ["anua", "anua"],
  ["boj", "beauty of joseon"],
  ["beauty of joseon", "beauty of joseon"],
  ["cosrx", "cosrx"],
  ["c0srx", "cosrx"],
  ["skin1004", "skin1004"],
  ["centella", "skin1004"],
  ["dr althea", "dr althea"],
  ["dr. althea", "dr althea"],
  ["dr teals", "dr teal's"],
  ["dr. teals", "dr teal's"],
  ["dr teal's", "dr teal's"],
  ["eqqualberry", "eqqualberry"],
  ["celimax", "celimax"],
  ["medicube", "medicube"],
  ["madame j", "madame j"],
  ["numbuzin", "numbuzin"],
  ["k-secret", "k-secret"],
  ["k secret", "k-secret"],
  ["some by mi", "some by mi"],
  ["somebymi", "some by mi"],
  ["axis y", "axis-y"],
  ["axis-y", "axis-y"],
  ["i'm from", "i'm from"],
  ["im from", "i'm from"],
  ["vt", "vt cosmetics"],
  ["vt cosmetics", "vt cosmetics"],
  ["vaseline", "vaseline"],
  ["watsons", "naturals by watsons"],
  ["naturals by watsons", "naturals by watsons"],
  ["panoxyl", "panoxyl"],
  ["jumiso", "jumiso"],
  ["bioderma", "bioderma"],
  ["the ordinary", "the ordinary"],
  ["laneige", "laneige"],
  ["round lab", "round lab"],
  ["torriden", "torriden"],
  ["innisfree", "innisfree"],
  ["purito", "purito"],
  ["purito seoul", "purito"],
  ["sol de janeiro", "sol de janeiro"],
  ["bum bum summer", "sol de janeiro"],
]);

const GENERIC_TOKENS = new Set([
  "and",
  "the",
  "a",
  "an",
  "for",
  "with",
  "plus",
  "pa",
  "spf",
  "skincare",
  "body",
  "care",
  "set",
  "kit",
  "cream",
  "serum",
  "toner",
  "cleanser",
  "lotion",
  "sunscreen",
  "essence",
  "ampoule",
  "mask",
  "moisture",
  "moisturizer",
  "treatment",
  "pad",
  "pads",
  "oil",
  "foam",
  "wash",
]);

function normalizeBrand(value) {
  const key = basicNormalize(value);
  return BRAND_ALIASES.get(key) ?? key;
}

function basicNormalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[%]/g, " percent ")
    .replace(/['’]/g, "'")
    .replace(/hearleaf/g, "heartleaf")
    .replace(/sulpric/g, "sulfuric")
    .replace(/[^a-z0-9']+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value, brand = "") {
  const brandTokens = new Set(basicNormalize(brand).split(" ").filter(Boolean));
  return basicNormalize(value)
    .split(" ")
    .filter(Boolean)
    .filter((token) => !GENERIC_TOKENS.has(token))
    .filter((token) => !brandTokens.has(token));
}

function extractMl(value) {
  const match = String(value ?? "").match(/(\d+(?:\.\d+)?)\s*ml\b/i);
  return match ? Number(match[1]) : null;
}

function parseKes(value) {
  const digits = String(value ?? "").replace(/[^0-9.]/g, "");
  if (!digits) return null;
  const num = Number(digits);
  return Number.isFinite(num) ? Math.round(num) : null;
}

function tokenScore(aTokens, bTokens) {
  const a = new Set(aTokens);
  const b = new Set(bTokens);
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size || 1;
  return intersection / union;
}

function sizeScore(siteMl, sheetMl) {
  if (siteMl == null || sheetMl == null) return 0;
  return siteMl === sheetMl ? 0.2 : -0.15;
}

function pickSiteMl(product) {
  const titleMl = extractMl(product.title);
  if (titleMl != null) return titleMl;
  if (Array.isArray(product.sizeOptions) && product.sizeOptions.length === 1) {
    const only = product.sizeOptions[0];
    if (typeof only.ml === "number") return only.ml;
    return extractMl(only.label);
  }
  return null;
}

function getSheetRows() {
  const psScript = `
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$path='${xlsxPath.replace(/'/g, "''")}'
$zip=[System.IO.Compression.ZipFile]::OpenRead($path)
function Get-EntryText([string]$name) {
  $entry=$zip.GetEntry($name)
  if(-not $entry) { throw "Missing $name" }
  $sr=New-Object System.IO.StreamReader($entry.Open())
  try { return $sr.ReadToEnd() } finally { $sr.Close() }
}
$sharedXml=[xml](Get-EntryText 'xl/sharedStrings.xml')
$sheetXml=[xml](Get-EntryText 'xl/worksheets/sheet1.xml')
$shared=@()
foreach($si in $sharedXml.sst.si) { $shared += $si.InnerText }
function Col([string]$r) { return ($r -replace '\\d','') }
$rows=@()
foreach($row in $sheetXml.worksheet.sheetData.row) {
  $obj=[ordered]@{}
  foreach($c in $row.c) {
    $col=Col $c.r
    $val=''
    if($c.t -eq 's') {
      $idx=[int]$c.v
      $val=$shared[$idx]
    } elseif($c.t -eq 'inlineStr') {
      $val=$c.is.InnerText
    } else {
      $val=[string]$c.v
    }
    $obj[$col]=$val
  }
  $rows += [pscustomobject]$obj
}
$zip.Dispose()
$rows | ConvertTo-Json -Depth 4 -Compress
`.trim();

  const raw = execFileSync("powershell", ["-NoProfile", "-Command", psScript], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  const rows = JSON.parse(raw);
  return rows
    .map((row) => ({
      code: row.A?.trim() ?? "",
      name: row.B?.trim() ?? "",
      priceKes: parseKes(row.C),
      qtyOwned: row.D ? Number(row.D) : null,
      brand: row.E?.trim() ?? "",
    }))
    .filter((row) => row.code && row.name && row.priceKes != null)
    .filter((row) => row.code !== "Item code");
}

function getSiteProducts() {
  return fs
    .readdirSync(productsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(productsDir, file);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return {
        file,
        path: fullPath,
        slug: file.replace(/\.mdx$/i, ""),
        title: data.title,
        brand: data.brand ?? "",
        priceKes: data.priceKes,
        sizeOptions: Array.isArray(data.sizeOptions) ? data.sizeOptions : [],
      };
    })
    .filter((product) => typeof product.title === "string" && Number.isFinite(product.priceKes));
}

function matchProduct(siteProduct, sheetRows) {
  const siteBrand = normalizeBrand(siteProduct.brand);
  const siteTokens = tokenize(siteProduct.title, siteProduct.brand);
  const siteMl = pickSiteMl(siteProduct);

  const candidates = sheetRows
    .filter((sheet) => {
      const sheetBrand = normalizeBrand(sheet.brand);
      return !siteBrand || !sheetBrand || siteBrand === sheetBrand;
    })
    .map((sheet) => {
      const sheetTokens = tokenize(sheet.name, sheet.brand);
      let score = tokenScore(siteTokens, sheetTokens);

      const siteName = basicNormalize(siteProduct.title);
      const sheetName = basicNormalize(sheet.name);
      if (sheetName.includes(siteName) || siteName.includes(sheetName)) {
        score += 0.18;
      }
      if (sheetTokens.some((token) => siteTokens.includes(token) && token.length >= 5)) {
        score += 0.08;
      }
      score += sizeScore(siteMl, extractMl(sheet.name));

      return {
        ...sheet,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  const best = candidates[0];
  const next = candidates[1];
  const confident =
    best &&
    best.score >= 0.45 &&
    (!next || best.score - next.score >= 0.08 || best.score >= 0.72);

  return {
    best: confident ? best : null,
    candidates: candidates.slice(0, 3),
  };
}

function hasMlOnSite(product, ml) {
  if (ml == null) return true;
  if (extractMl(product.title) === ml) return true;
  return product.sizeOptions.some((option) => Number(option.ml) === ml || extractMl(option.label) === ml);
}

function formatKes(value) {
  return `KSh ${Number(value).toLocaleString("en-KE")}`;
}

const sheetRows = getSheetRows();
const siteProducts = getSiteProducts();

const mismatches = [];
const ambiguous = [];
const matched = [];

for (const product of siteProducts) {
  const result = matchProduct(product, sheetRows);
  if (!result.best) {
    ambiguous.push({
      product,
      candidates: result.candidates,
    });
    continue;
  }

  const sheet = result.best;
  matched.push({ product, sheet });

  const siteMl = pickSiteMl(product);
  const sheetMl = extractMl(sheet.name);
  const needsMlLabel = sheetMl != null && !hasMlOnSite(product, sheetMl);

  if (product.priceKes !== sheet.priceKes || needsMlLabel) {
    mismatches.push({
      product,
      sheet,
      siteMl,
      sheetMl,
      needsMlLabel,
    });
  }
}

mismatches.sort((a, b) => {
  const brandCompare = String(a.product.brand).localeCompare(String(b.product.brand));
  if (brandCompare !== 0) return brandCompare;
  return a.product.title.localeCompare(b.product.title);
});

const lines = [];
lines.push("# Price Audit Against Attached Spreadsheet");
lines.push("");
lines.push(`- Spreadsheet source: \`${xlsxPath}\``);
lines.push(`- Website products scanned: ${siteProducts.length}`);
lines.push(`- Spreadsheet rows with prices: ${sheetRows.length}`);
lines.push(`- Confident product matches: ${matched.length}`);
lines.push(`- Products needing review/update: ${mismatches.length}`);
lines.push(`- Ambiguous website products not auto-matched: ${ambiguous.length}`);
lines.push("");
lines.push("## Products With Wrong Price Or Missing ML Label");
lines.push("");

if (mismatches.length === 0) {
  lines.push("No confident mismatches were found.");
  lines.push("");
}

for (const item of mismatches) {
  const { product, sheet, needsMlLabel, sheetMl } = item;
  const notes = [];
  if (product.priceKes !== sheet.priceKes) {
    notes.push(`price on website is ${formatKes(product.priceKes)}, but spreadsheet says ${formatKes(sheet.priceKes)}`);
  }
  if (needsMlLabel) {
    notes.push(`spreadsheet specifies ${sheetMl}ml and the website does not show that size clearly`);
  }

  lines.push(`- ${product.title} (${product.brand || "No brand"})`);
  lines.push(`  Website file: \`content/products/${product.file}\``);
  lines.push(`  Spreadsheet match: \`${sheet.name}\` [${sheet.code}]`);
  lines.push(`  Reason: ${notes.join("; ")}`);
  lines.push("");
}

lines.push("## Ambiguous Matches To Double-Check Manually");
lines.push("");

for (const item of ambiguous.slice(0, 25)) {
  lines.push(`- ${item.product.title} (${item.product.brand || "No brand"})`);
  if (item.candidates.length === 0) {
    lines.push("  No likely spreadsheet candidate found.");
  } else {
    const summary = item.candidates
      .map((candidate) => `${candidate.name} [${candidate.code}] score=${candidate.score.toFixed(2)} price=${formatKes(candidate.priceKes)}`)
      .join(" | ");
    lines.push(`  Candidates: ${summary}`);
  }
  lines.push("");
}

const outputPath = path.join(repoRoot, "scripts", "price_audit_from_attached_sheet.md");
fs.writeFileSync(outputPath, `${lines.join("\n").trim()}\n`);

const summary = {
  outputPath,
  websiteProducts: siteProducts.length,
  spreadsheetRows: sheetRows.length,
  matched: matched.length,
  mismatches: mismatches.length,
  ambiguous: ambiguous.length,
  mismatchTitles: mismatches.map((item) => ({
    title: item.product.title,
    brand: item.product.brand,
    sitePrice: item.product.priceKes,
    sheetPrice: item.sheet.priceKes,
    sheetName: item.sheet.name,
    file: item.product.file,
    needsMlLabel: item.needsMlLabel,
    sheetMl: item.sheetMl,
  })),
};

console.log(JSON.stringify(summary, null, 2));
