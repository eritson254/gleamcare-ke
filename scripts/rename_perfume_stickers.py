import re
import sys
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter
import pytesseract


STICKER_DIR = Path(
    r"C:\Eritson\Projects\gleamcare-ke\public\images\products\gleamcare fragrances stickers"
)
PRODUCTS_DIR = Path(r"C:\Eritson\Projects\gleamcare-ke\content\products")
TESSERACT_CMD = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
STOP_WORDS = {
    "gleamcare",
    "store",
    "beauty",
    "shop",
    "storage",
    "keep",
    "cool",
    "dry",
    "place",
    "fragrance",
    "every",
    "spark",
    "you",
    "for",
    "of",
    "a",
}
TOKEN_EQUIVALENTS = {
    "armani": {"armani", "giorgio"},
    "giorgio": {"giorgio", "armani"},
    "paco": {"paco", "rabanne"},
    "rabanne": {"rabanne", "paco"},
    "vs": {"vs", "victoria", "secret"},
    "victoria": {"victoria", "vs"},
    "secret": {"secret", "vs"},
    "bbw": {"bbw", "bath", "body", "works"},
    "chanel": {"chanel", "coco"},
    "coco": {"coco", "chanel"},
    "dolche": {"dolche", "dolce"},
    "dolce": {"dolce", "dolche"},
    "vuiton": {"vuiton", "vuitton"},
    "vuitton": {"vuitton", "vuiton"},
    "gaultier": {"gaultier", "jean", "paul"},
    "jeal": {"jeal", "jean"},
    "jean": {"jean", "jeal"},
}


def configure_tesseract() -> None:
    if TESSERACT_CMD:
        pytesseract.pytesseract.tesseract_cmd = TESSERACT_CMD


def slugify(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_text = ascii_text.lower()
    ascii_text = re.sub(r"[^a-z0-9]+", "-", ascii_text)
    ascii_text = re.sub(r"-{2,}", "-", ascii_text).strip("-")
    return ascii_text


def normalize_for_match(text: str) -> str:
    return slugify(text).replace("-", " ")


def normalize_tokens(text: str) -> list[str]:
    return [token for token in normalize_for_match(text).split() if token and token not in STOP_WORDS]


def expand_tokens(tokens: set[str]) -> set[str]:
    expanded = set(tokens)
    for token in list(tokens):
        expanded.update(TOKEN_EQUIVALENTS.get(token, {token}))
    return expanded


def extract_valid_image_slugs(products_dir: Path) -> dict[str, dict[str, str]]:
    fragrances: dict[str, dict[str, str]] = {}

    for mdx_file in products_dir.glob("*.mdx"):
        content = mdx_file.read_text(encoding="utf-8")

        if 'category: "Fragrance"' not in content and "category: Fragrance" not in content:
            continue

        image_match = re.search(r'^image:\s*"[^"]*/([^"/]+)\.[^"]+"', content, re.MULTILINE)
        title_match = re.search(r'^title:\s*"([^"]+)"', content, re.MULTILINE)
        brand_match = re.search(r'^brand:\s*"([^"]+)"', content, re.MULTILINE)

        if image_match:
            slug = image_match.group(1)
            title = title_match.group(1) if title_match else slug.replace("-", " ")
            brand = brand_match.group(1) if brand_match else ""
            aliases = {
                title,
                slug.replace("-", " "),
            }

            if brand:
                aliases.add(brand)
                title_tokens = normalize_tokens(title)
                brand_tokens = set(normalize_tokens(brand))
                title_without_brand = " ".join(
                    token for token in title_tokens if token not in brand_tokens
                ).strip()
                if title_without_brand:
                    aliases.add(title_without_brand)

            if slug.startswith("paco-rabanne-"):
                aliases.add(slug.replace("paco-rabanne-", "rabanne ").replace("-", " "))

            fragrances[slug] = {
                "slug": slug,
                "title": title,
                "brand": brand,
                "title_normalized": normalize_for_match(title),
                "slug_normalized": slug.replace("-", " "),
                "aliases": [normalize_for_match(alias) for alias in aliases if alias.strip()],
                "tokens": expand_tokens(set(normalize_tokens(title)) | set(normalize_tokens(slug))),
            }

    return fragrances


def prepare_image(image: Image.Image) -> Image.Image:
    image = image.convert("L")
    width, height = image.size
    enlarged = image.resize((width * 2, height * 2))
    sharpened = enlarged.filter(ImageFilter.SHARPEN)
    contrasted = ImageEnhance.Contrast(sharpened).enhance(2.5)
    thresholded = contrasted.point(lambda px: 255 if px > 160 else 0)
    return thresholded


def get_candidate_crops(image: Image.Image) -> list[Image.Image]:
    width, height = image.size
    crop_boxes = [
        (0.25, 0.24, 0.75, 0.58),
        (0.22, 0.20, 0.78, 0.62),
        (0.28, 0.18, 0.72, 0.52),
        (0.20, 0.16, 0.80, 0.56),
    ]
    crops: list[Image.Image] = []

    for left, top, right, bottom in crop_boxes:
        box = (
            int(width * left),
            int(height * top),
            int(width * right),
            int(height * bottom),
        )
        crops.append(image.crop(box))

    return crops


def extract_candidate_texts(image_path: Path) -> list[str]:
    source_image = Image.open(image_path)
    candidates: list[str] = []
    seen: set[str] = set()

    for crop in get_candidate_crops(source_image):
        processed = prepare_image(crop)

        for psm in ("6", "7", "11"):
            raw_text = pytesseract.image_to_string(processed, config=f"--psm {psm}")
            line_tokens = normalize_tokens(raw_text)
            if line_tokens:
                candidate = " ".join(line_tokens)
                if candidate not in seen:
                    seen.add(candidate)
                    candidates.append(candidate)

        data = pytesseract.image_to_data(
            processed,
            config="--psm 6",
            output_type=pytesseract.Output.DICT,
        )

        words: list[tuple[float, str]] = []
        for i, raw_text in enumerate(data["text"]):
            text = raw_text.strip()
            if not text:
                continue

            normalized_word = slugify(text)
            if not normalized_word or normalized_word in STOP_WORDS:
                continue

            try:
                confidence = float(data["conf"][i])
            except ValueError:
                continue

            if confidence < 10:
                continue

            width = int(data["width"][i])
            height = int(data["height"][i])
            area_score = width * height
            score = area_score * max(confidence, 1)
            words.append((score, normalized_word))

        words.sort(reverse=True)
        top_words: list[str] = []
        for _, word in words:
            if word not in top_words:
                top_words.append(word)
            if len(top_words) == 6:
                break

        if top_words:
            candidate = " ".join(top_words).replace("-", " ")
            if candidate not in seen:
                seen.add(candidate)
                candidates.append(candidate)

    return candidates


def choose_best_slug(candidate_texts: list[str], fragrances: dict[str, dict[str, str]]) -> tuple[str, float]:
    best_slug = ""
    best_score = 0.0

    for candidate in candidate_texts:
        normalized_candidate = normalize_for_match(candidate)
        candidate_tokens = expand_tokens(set(normalize_tokens(candidate)))

        for slug, fragrance in fragrances.items():
            alias_score = max(
                SequenceMatcher(None, normalized_candidate, alias).ratio()
                for alias in fragrance["aliases"]
            )
            overlap = len(candidate_tokens & fragrance["tokens"])
            coverage = overlap / max(1, len(fragrance["tokens"]))
            precision = overlap / max(1, len(candidate_tokens))
            score = alias_score + (coverage * 0.8) + (precision * 0.8)

            if normalized_candidate and any(
                alias in normalized_candidate or normalized_candidate in alias
                for alias in fragrance["aliases"]
            ):
                score += 0.35

            if overlap >= 2:
                score += 0.2

            if score > best_score:
                best_score = score
                best_slug = slug

    return best_slug, best_score


def rename_stickers(sticker_dir: Path, fragrances: dict[str, dict[str, str]]) -> int:
    if not sticker_dir.exists():
        print(f"Sticker folder not found: {sticker_dir}")
        return 1

    jpg_files = sorted(
        [
            path
            for path in sticker_dir.iterdir()
            if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg"}
        ]
    )

    if not jpg_files:
        print(f"No JPG images found in: {sticker_dir}")
        return 0

    for image_path in jpg_files:
        existing_slug = image_path.stem.lower()
        if existing_slug in fragrances:
            print(f"KEEP {image_path.name} -> {image_path.name}")
            continue

        candidate_texts = extract_candidate_texts(image_path)
        if not candidate_texts:
            print(f"SKIP {image_path.name} -> no text detected")
            continue

        cleaned_name, confidence_score = choose_best_slug(candidate_texts, fragrances)
        if not cleaned_name or confidence_score < 1.05:
            preview = ", ".join(candidate_texts[:3]) if candidate_texts else "no candidates"
            print(f"SKIP {image_path.name} -> OCR uncertain ({preview})")
            continue

        new_path = image_path.with_name(f"{cleaned_name}{image_path.suffix.lower()}")
        if new_path == image_path:
            print(f"KEEP {image_path.name} -> {new_path.name}")
            continue

        if new_path.exists():
            print(f"SKIP {image_path.name} -> {new_path.name} already exists")
            continue

        image_path.rename(new_path)
        print(f"{image_path.name} -> {new_path.name}")

    return 0


def main() -> int:
    configure_tesseract()
    fragrances = extract_valid_image_slugs(PRODUCTS_DIR)
    return rename_stickers(STICKER_DIR, fragrances)


if __name__ == "__main__":
    sys.exit(main())
