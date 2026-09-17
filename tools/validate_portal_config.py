#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

path = Path(sys.argv[1] if len(sys.argv) > 1 else "public-site/assets/config/portal.json")
errors = []

try:
    data = json.loads(path.read_text(encoding="utf-8"))
except Exception as exc:
    raise SystemExit(f"ERROR: Cannot parse {path}: {exc}")

required_business = [
    "name", "logo", "domain", "phoneDisplay", "phoneHref", "email",
    "addressLines", "mapsUrl", "booksyUrl", "booksyBusinessId", "timezone"
]
for key in required_business:
    if not data.get("business", {}).get(key):
        errors.append(f"business.{key} is required")

slugs = set()
variants = set()
for index, service in enumerate(data.get("services", []), 1):
    prefix = f"services[{index}]"
    for key in ("slug", "name", "durationMinutes", "price", "serviceId", "variantId", "availabilityPath"):
        if service.get(key) in (None, ""):
            errors.append(f"{prefix}.{key} is required")
    slug = service.get("slug", "")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        errors.append(f"{prefix}.slug is invalid: {slug}")
    if slug in slugs:
        errors.append(f"Duplicate service slug: {slug}")
    slugs.add(slug)
    variant = service.get("variantId")
    if variant in variants:
        errors.append(f"Duplicate variantId: {variant}")
    variants.add(variant)

for index, review in enumerate(data.get("reviews", []), 1):
    if not review.get("author") or not review.get("text"):
        errors.append(f"reviews[{index}] requires author and text")
    if not 1 <= int(review.get("rating", 0)) <= 5:
        errors.append(f"reviews[{index}].rating must be 1 through 5")

for index, staff in enumerate(data.get("staff", []), 1):
    for key in ("id", "name", "photo", "bio", "booksyStafferId"):
        if staff.get(key) in (None, ""):
            errors.append(f"staff[{index}].{key} is required")

if errors:
    print("Portal configuration validation failed:")
    for error in errors:
        print(" -", error)
    raise SystemExit(1)

print(f"PASS: {path}")
print(f"Business: {data['business']['name']}")
print(f"Services: {len(data.get('services', []))}")
print(f"Staff: {len(data.get('staff', []))}")
print(f"Reviews: {len(data.get('reviews', []))}")
print(f"Gallery images: {data.get('gallery', {}).get('count', 0)}")
