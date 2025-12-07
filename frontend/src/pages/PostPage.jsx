import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import rawBlogData from "data/blogData.json";
import "css/pages/post.css";
import "css/markdown.css";
import "css/pygments.css";

const posts = Array.isArray(rawBlogData)
  ? rawBlogData
  : rawBlogData.posts || [];

export default function PostPage() {
  const { handle } = useParams();
  const post = posts.find((p) => p.handle === handle);

  useEffect(() => {
    if (post?.name) {
      document.title = `${post.name} – Blog – David Tausend`;
    } else {
      document.title = "Beitrag nicht gefunden – Blog – David Tausend";
    }
  }, [post]);

  if (!post) {
    return (
      <div className="post-page">
        <header className="post-page__header">
          <h1>Beitrag nicht gefunden</h1>
          <p>
            Für den Handle <code>{handle}</code> wurde kein Blogpost gefunden.
          </p>
        </header>
        <p className="post-page__back">
          <Link to="/">← Zurück zum Blog</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="post-page">
      <header className="post-page__header">
        <h1>{post.name}</h1>
        {post.date && <p className="post-page__meta">{post.date}</p>}
      </header>

      <section
        className="post-body markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />

      <p className="post-page__back">
        <Link to="/">← Zurück zum Blog</Link>
      </p>
    </div>
  );
}