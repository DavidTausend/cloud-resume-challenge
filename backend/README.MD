## Render Project Emulate Markdown

The projects page in the frontend should be able to display rich content (headings, lists, links, etc.).  
Instead of hard-coding HTML, we write our project descriptions in Markdown and convert them to HTML on the backend.

We do this server-side because:

- client-side Markdown rendering adds extra JS and complexity,
- it can lead to inconsistent results or security issues if not handled carefully,
- pre-rendered HTML is faster and easier to cache and serve from static hosting / serverless setups.

The script `backend/task/render_project.py` reads `projects.json`, converts each project’s `body` (Markdown) to `body_html` (HTML), and writes the result to `frontend/src/data/projectsData.json`.  
Later, this logic can be moved into a serverless function (e.g., AWS Lambda, Cloud Functions) if we want dynamic content.


## Install Python Dependencies

From the project root (where backend and frontend live):

```sh
cd backend
pip install -r requirements.txt
cd ..
```
This installs:
- markdown – used to convert Markdown to HTML
- any additional dependencies listed in requirements.txt

## Run the Markdown Renderer

From the project root:

```sh
python backend/task/render_project.py
```

## Troubleshooting

- FileNotFoundError for projects.json
Make sure backend/data/projects.json exists and contains a valid JSON array.
- Invalid JSON errors
Validate your JSON (e.g. with jq, VS Code, or an online validator). Trailing commas are a common issue.
- ModuleNotFoundError: markdown

Re-run:
```sh
cd backend
pip install -r requirements.txt
cd ..
```