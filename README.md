<h1 align="center">cloud-resume-challenge</h1>

img src="assets/readme/crc.webp" alt="A decorative picture featuring Cloud Resume Challenge">

# Projects
- [Frontend](./frontend/README.md)

## Introduction

## Table of Contents

[Generate TOC](https://ecotrust-canada.github.io/markdown-toc/)

<br>

### Programming Languages

- [Html](https://de.wikipedia.org/wiki/Hypertext_Markup_Language)
- [CSS](https://de.wikipedia.org/wiki/Cascading_Style_Sheets)
- []()


### AWS Frontend diagram



### Applications, Plugins & Tools Used

- [GitHub](https://github.com/): Essential for repository hosting, enabling code sharing, and project management.
- [TinyPNG](https://tinypng.com/): Used for compressing images and reducing file sizes without substantial quality loss.
- [ChatGPT](https://chat.openai.com/): Assisted in generating language learning exercises, evaluating sentence structures, and providing real-time grammar feedback for learners.

## Problems

## Acknowledgments

flowchart LR
  %% GLOBAL
  classDef highlight fill:#fff6b3,stroke:#c9ae00,stroke-width:1px;
  classDef group fill:#f9f9f9,stroke:#cccccc,stroke-width:1px;

  %% TOP
  env[".env.{scope}"]
  main["main.jsx"]
  layout["Layout"]

  env --> layout
  main --> layout

  %% DATA
  subgraph dataGroup["Data"]
    class dataGroup group;
    links["linksData.json"]
    blog["blogData.json"]
    projects["projectsData.json"]
    resumeData["resumeData.js"]
  end

  yaml["JSON compiled from backend YAML files."]
  yaml --> links
  yaml --> blog
  yaml --> projects
  yaml --> resumeData

  %% PAGES
  subgraph pagesGroup["Pages"]
    class pagesGroup group;
    home["HomePage"]
    postPage["PostPage"]
    projectPage["ProjectPage"]
    projectsPage["ProjectsPage"]
    resumePage["ResumePage"]
  end

  %% COMPONENTS
  subgraph componentsGroup["Components"]
    class componentsGroup group;

    header["Header"]

    subgraph resumeGroup["Resume"]
      resumeHeader["ResumeHeader"]
      resumeSection["ResumeSection"]
      resumeSectionItem["ResumeSectionItem"]
    end

    postItem["PostItem"]
    projectItem["ProjectItem"]

    vc["ViewCounter"]
    vcBtn["button"]
    vcCounter["counter"]
  end

  %% CLOUD FUNCTION / ENDPOINTS
  mock["Mock Endpoints"]
  cloud["Cloud Function"]

  layout --> pagesGroup
  layout --> componentsGroup

  %% DATA FLOW INTO PAGES
  links --> home
  blog --> postPage
  projects --> projectPage
  projects --> projectsPage
  resumeData --> resumePage

  %% PAGES USING COMPONENTS
  home --> header
  postPage --> postItem
  postPage --> vc
  projectPage --> projectItem
  projectsPage --> projectItem
  resumePage --> resumeGroup

  %% VIEW COUNTER ENDPOINTS
  vc --> vcBtn
  vc --> vcCounter
  vcBtn -->|GET /counter| mock
  vcCounter -->|POST /counter| mock
  mock --> cloud

  %% HIGHLIGHTED NODES
  class blog,projects,vc highlight;