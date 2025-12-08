## Render Project Emulate Markdown

The projects page in the frontend should be able to display rich content (headings, lists, links, etc.).  
Instead of hard-coding HTML, we write our project descriptions in Markdown and convert them to HTML on the backend.

We do this server-side because:

- client-side Markdown rendering adds extra JS and complexity,
- it can lead to inconsistent results or security issues if not handled carefully,
- pre-rendered HTML is faster and easier to cache and serve from static hosting / serverless setups.

The script `backend/lib/render_items.py` reads `projects.json`, converts each project’s `body` (Markdown) to `body_html` (HTML), and writes the result to `frontend/src/data/projectsData.json`.  
Later, this logic can be moved into a serverless function (e.g., AWS Lambda, Cloud Functions) if we want dynamic content.

## Content Source Format (Markdown + Front Matter)

Both projects and blog posts are stored as Markdown files with YAML front matter.

- Projects directory: `backend/data/projects/`
- Blog directory: `backend/data/blog/`

Example project file: `backend/data/projects/cruddur.md`

## Cruddur Microblogging App

Cruddur is a microblogging application built as part of the ExamPro bootcamp.

- Implements a REST API with FastAPI  
- Uses PostgreSQL as a backing data store  
- Deployed on AWS with CI/CD  

## Python Environment & Dependencies

Because macOS + Homebrew Python is “externally managed” (PEP 668), all Python
dependencies are installed into a local virtual environment.

From the project root (cloud-resume-challenge):

### Create a virtual env
```sh
python3 -m venv .venv
```

### Activate or reactivate the virtual en
```sh
source .venv/bin/activate
```

### Install backend dependencies
```sh
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt
```
## Run the Markdown Renderer

From the project root:

```sh
python backend/task/render_items.py
```
Depending on how render_items.py is configured, this will render one or more
folders (e.g. projects, blog) into JSON under frontend/src/data/.

## Tasks runner with invoke

I am using the task runner invoke and refactor the render_projects into render_items
so it can render the projects and tbe blog.

```sh
invoke --list
invoke render-blog
invoke render-projects
```

## Pygments

For syntax highlighting in our rendered Markdown, we need to generate a CSS file.

```bash
pip install Pygments
pygmentize -S monokai -f html -a .codehilite > pygments.css
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