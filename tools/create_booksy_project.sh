#!/usr/bin/env bash
set -euo pipefail

usage(){
  cat <<'EOF'
Usage:
  tools/create_booksy_project.sh CONFIG_JSON OUTPUT_DIRECTORY [ASSET_DIRECTORY]

Optional ASSET_DIRECTORY layout:
  logo             exact source file for brand.logo
  hero             exact source file for brand.heroImage
  favicon          exact source file for brand.favicon
  gallery/         gallery image files referenced by portal.json
EOF
}

[ "$#" -ge 2 ] && [ "$#" -le 3 ] || { usage; exit 1; }
CONFIG_SOURCE="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUTPUT="$2"
ASSETS="${3:-}"
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

[ -f "$CONFIG_SOURCE" ] || { echo "ERROR: Missing config: $CONFIG_SOURCE" >&2; exit 1; }
[ ! -e "$OUTPUT" ] || { echo "ERROR: Output exists: $OUTPUT" >&2; exit 1; }

python3 "$ROOT/tools/validate_portal_config.py" "$CONFIG_SOURCE"
mkdir -p "$OUTPUT"
(
  cd "$ROOT"
  tar --exclude='.git' --exclude='.DS_Store' --exclude='node_modules' --exclude='public-site/assets/config/portal.json' -cf - .
) | (cd "$OUTPUT" && tar -xf -)

mkdir -p "$OUTPUT/public-site/assets/config"
cp "$CONFIG_SOURCE" "$OUTPUT/public-site/assets/config/portal.json"

FINALIZE_ARGS=(--root "$OUTPUT" --config public-site/assets/config/portal.json)
[ -z "$ASSETS" ] || FINALIZE_ARGS+=(--assets "$ASSETS")
python3 "$OUTPUT/tools/finalize_booksy_project.py" "${FINALIZE_ARGS[@]}"

(
  cd "$OUTPUT"
  python3 tools/validate_portal_config.py public-site/assets/config/portal.json
  python3 tools/generate_portal_config.py public-site/assets/config/portal.json
  node --check public-site/assets/js/config/generated-portal.js
  node --check public-site/assets/js/config/configurable-business-v2.js
  git init
  git branch -M develop
  git add -A
  git diff --cached --check
  git commit -m "Initialize configurable Booksy portal"
)

echo "SUCCESS: Created configurable Booksy portal at $OUTPUT"
