<h1 align="center">Frontend Technical Specification</h1>

The objective of the frontend is to create a static website that serves an HTML version of my resume. The site will be deployed to cloud object storage (such as AWS S3, Azure Blob Storage, or Google Cloud Storage) and globally distributed through a CDN.

## Resume Format Considerations

I currently live in Germany, where resume expectations differ significantly from those in other countries. German CVs often omit personal details such as age or marital status, while Canadian and U.S. resumes typically exclude GPA unless it is required. Formatting conventions also vary.

To maintain consistency and ensure a clean layout, I will use the Harvard Resume Template as the basis for my HTML resume. This U.S.–style format is straightforward, professional, and easy to translate into HTML.

I'm going to use the [Harvard Resume Template format](https://careerservices.fas.harvard.edu/channels/create-a-resume-cv-or-cover-letter/#uc_resou

### Harvard Resume Format Generation

Although I am experienced with HTML, I will rely on GenAI (ChatGPT 5) to generate the initial version of the HTML and minimal CSS. This helps speed up the prototyping phase and reduces repetitive formatting work. After generating the initial structure, I will manually refine the code, improve semantics, and ensure it meets the technical standards of this project.

Prompt to ChatGPT 5:

```text
Convert this resume format into html.
Please don't use a css framework.
Please use the least amount of css tags
```


