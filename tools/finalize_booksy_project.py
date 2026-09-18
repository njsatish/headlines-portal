#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path

ACTIVE_PAGES=("index.html","services.html","book.html","about.html","gallery.html","contact.html")
REMOVE_PATHS=("concept-classic.html","concept-modern.html","concept-brass.html","multipage-index.html","admin")


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def inject_once(text: str, marker: str, tag: str, closing: str) -> str:
    text=re.sub(rf"\s*<{marker}[^>]*data-installer-v2[^>]*>.*?</{marker}>","",text,flags=re.I|re.S)
    return text.replace(closing,f"  {tag}\n{closing}",1)


def main() -> int:
    parser=argparse.ArgumentParser(description="Finalize a config-driven Booksy portal project.")
    parser.add_argument("--root",default=".")
    parser.add_argument("--config",default="public-site/assets/config/portal.json")
    parser.add_argument("--assets",default="",help="Optional directory containing logo, hero and gallery assets")
    args=parser.parse_args()

    root=Path(args.root).resolve()
    site=root/"public-site"
    config_path=root/args.config
    config=load(config_path)
    business=config["business"]
    provider=config["bookingProvider"]
    brand=config["brand"]

    for item in REMOVE_PATHS:
        target=site/item
        if target.is_dir(): shutil.rmtree(target)
        elif target.exists(): target.unlink()

    if args.assets:
        source=Path(args.assets).expanduser().resolve()
        image_root=site/"assets/images"
        image_root.mkdir(parents=True,exist_ok=True)
        mappings={
            "logo": brand.get("logo"),
            "hero": brand.get("heroImage"),
            "favicon": brand.get("favicon"),
        }
        for source_name,destination in mappings.items():
            if not destination: continue
            candidate=source/source_name
            if candidate.is_file():
                out=site/destination.lstrip("/")
                out.parent.mkdir(parents=True,exist_ok=True)
                shutil.copy2(candidate,out)
        gallery_source=source/"gallery"
        if gallery_source.is_dir():
            for file in gallery_source.iterdir():
                if file.is_file():
                    out=image_root/"gallery"/file.name
                    out.parent.mkdir(parents=True,exist_ok=True)
                    shutil.copy2(file,out)

    # Business-neutral runtime modules are loaded after existing template logic.
    css_tag='<link data-installer-v2 rel="stylesheet" href="/assets/css/configurable-business-v2.css?v=2">'
    js_tag='<script data-installer-v2 src="/assets/js/config/configurable-business-v2.js?v=2"></script>'
    for name in ACTIVE_PAGES:
        path=site/name
        if not path.exists(): continue
        text=path.read_text(encoding="utf-8")
        text=text.replace("Headlines",business["name"]).replace("HEADLINES",business["name"].upper())
        text=re.sub(r"/assets/images/headlines-logo[^\"']*",brand["logo"],text,flags=re.I)
        text=re.sub(r"/assets/images/headlines-hero-ai\.jpg(?:\?[^\"']*)?",brand["heroImage"],text,flags=re.I)
        text=inject_once(text,"link",css_tag,"</head>")
        text=inject_once(text,"script",js_tag,"</body>")
        path.write_text(text,encoding="utf-8")

    # Install the exact proven Booksy popup pattern on the homepage.
    index=site/"index.html"
    if index.exists():
        text=index.read_text(encoding="utf-8")
        text=re.sub(r"\s*<script[^>]+booksy\.com/widget/code\.js[^>]*>\s*</script>","",text,flags=re.I)
        text=re.sub(r"\s*<script[^>]+id=[\"'][^\"']*booksy-widget-v1[\"'][^>]*>.*?</script>","",text,flags=re.I|re.S)
        loader=f'<script data-installer-v2 src="https://booksy.com/widget/code.js?id={provider["widgetId"]}&amp;country={provider.get("country","us")}&amp;lang={provider.get("language","en")}"></script>'
        launcher=f'''<script data-installer-v2 id="configurable-booksy-widget-v1">
(() => {{
  const fallback={json.dumps(provider["profileUrl"])};
  const triggers=[...document.querySelectorAll("[data-booksy-widget-launch]")];
  triggers.forEach(trigger => {{
    trigger.href=fallback;
    trigger.target="_blank";
    trigger.rel="noopener noreferrer";
  }});
}})();
</script>'''
        generated=re.search(r'<script[^>]+generated-portal\.js[^>]*>\s*</script>',text,re.I)
        pair="\n"+loader+"\n"+launcher+"\n"
        if generated: text=text[:generated.start()]+pair+text[generated.start():]
        else: text=text.replace("</body>",pair+"</body>",1)
        index.write_text(text,encoding="utf-8")

    print(f"PASS: Finalized {business['name']} with widget {provider['widgetId']} and {len(config.get('services',[]))} services.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
