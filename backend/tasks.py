from invoke import task
from lib.render_items import render_items

@task
def render_projects(c):
    """Render markdown projects into frontend/src/data/projectsData.json."""
    render_items("projects")

@task
def render_blog(c):
    """Render markdown blog posts into frontend/src/data/blogData.json."""
    render_items("blog")

@task
def render_all(c):
    """Render both projects and blog data."""
    render_projects(c)
    render_blog(c)