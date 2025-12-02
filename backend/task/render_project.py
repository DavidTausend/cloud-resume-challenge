import json
from pathlib import Path

import markdown

base = Path(__file__).resolve().parent.parent.parent
data_path = base / "backend" / "data" / "projects.json"
output_path = base / "frontend" / "src" / "data" / "projectsData.json"

def main() -> None:
    with open(data_path, "r", encoding="utf-8") as f:
        json_str = f.read().strip()

    if not json_str:
        raise ValueError(f"{data_path} is empty – please add at least one project.")

    projects = json.loads(json_str)

    for project in projects:
        body = project.pop("body", "")
        project["body_html"] = markdown.markdown(body)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(projects, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()