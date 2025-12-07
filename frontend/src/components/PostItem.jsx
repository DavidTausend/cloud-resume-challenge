import React from "react";
import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  if (!post) return null;

  return (
    <article className="post-list-item">
      <h2>
        <Link to={`/blog/${post.handle}`}>{post.name}</Link>
      </h2>
      {post.date && <p className="post-list-date">{post.date}</p>}
      {post.description && (
        <p className="post-list-description">{post.description}</p>
      )}
    </article>
  );
}