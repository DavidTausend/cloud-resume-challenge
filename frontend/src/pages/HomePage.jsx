import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "css/pages/home.css";
import rawBlogData from "data/blogData.json";
import david_tausend from "../assets/images/david-tausend.webp";
import linkData from "data/linkData.json";
import ViewCounter from "comps/ViewCounter";

const posts = Array.isArray(rawBlogData)
  ? rawBlogData
  : rawBlogData.posts || [];

export default function HomePage() {
  useEffect(() => {
    document.title = "Blog – David Tausend";
  }, []);

  return (
    <div className="home-wrapper">
      <div className="profile-wrapper">
        <img
          className="profile-photo"
          src={david_tausend}
          alt="David Tausend"
        />

        <div className="social-links">
          {linkData.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              dangerouslySetInnerHTML={{ __html: link.icon }}
            />
          ))}
        </div>
      </div>

      {/* Blog content */}
      <div className="home-page">
        <header className="home-header">
          <h1>Blog</h1>
          <p>Notizen zu Cloud, DevOps und Lernen mit GenAI.</p>
        </header>

        {posts.length === 0 ? (
          <p>Noch keine Blogposts veröffentlicht.</p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <article key={post.handle} className="post-list-item">
                <h2 className="post-list-title">
                  <Link to={`/blog/${post.handle}`}>{post.name}</Link>
                </h2>

                {post.description && (
                  <p className="post-list-description">
                    {post.description}
                  </p>
                )}

                {post.date && (
                  <p className="post-list-date">{post.date}</p>
                )}
                
                <ViewCounter slug={post.handle} />
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}