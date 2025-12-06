import json
import re
from pathlib import Path
from typing import Any, Dict, List

import markdown
import yaml

# Base directories
BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "backend" / "data"
OUTPUT_DIR = BASE_DIR / "frontend" / "src" / "data"


def _parse_markdown_file(md_file: Path) -> Dict[str, Any] | None:
    """Parse a markdown file with YAML front matter and return metadata + HTML body.

    Expected format:

        ---
        key: value
        ...
        ---
        # Markdown body here ...
    """
    content = md_file.read_text(encoding="utf-8").strip()
    if not content:
        print(f"⚠️  {md_file.name} is empty, skipping.")
        return None

    # Front matter between --- ... ---
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
    if not match:
        print(f"⚠️  No YAML front matter found in {md_file.name}, skipping.")
        return None

    front_matter, body = match.groups()

    try:
        metadata = yaml.safe_load(front_matter) or {}
    except yaml.YAMLError as exc:
        print(f"⚠️  Could not parse YAML in {md_file.name}: {exc}")
        return None

    # Ensure a handle exists; fall back to filename
    metadata.setdefault("handle", md_file.stem)

    # Render markdown body to HTML
    metadata["body_html"] = markdown.markdown(body)

    return metadata


def render_items(folder: str) -> None:
    """Render all markdown files from backend/data/<folder> into JSON for the frontend.

    Example:
        render_items("projects") -> frontend/src/data/projectsData.json
        render_items("blog")     -> frontend/src/data/blogData.json
    """
    source_dir = DATA_DIR / folder
    if not source_dir.is_dir():
        raise FileNotFoundError(f"Source directory does not exist: {source_dir}")

    md_files = sorted(source_dir.glob("*.md"))
    if not md_files:
        print(f"⚠️  No markdown files found in {source_dir}, nothing to do.")
        return

    items: List[Dict[str, Any]] = []
    for md_file in md_files:
        parsed = _parse_markdown_file(md_file)
        if parsed is not None:
            items.append(parsed)

    output_path = OUTPUT_DIR / f"{folder}Data.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

    print(f"✅ Wrote {len(items)} {folder} items to {output_path}")