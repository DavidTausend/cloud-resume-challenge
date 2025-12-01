import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "comps/Header";
import "css/default.css";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageName = "page";

    if (path === "/") pageName = "home";
    else if (path === "/resume") pageName = "resume";
    else if (path.startsWith("/projects")) pageName = "projects";

    document.body.dataset.page = pageName;
  }, [location]);

  return (
    <>
      <Header />
      <div className="content_wrap">
        <div className="content">
          <article>
            <Outlet />
          </article>
        </div>
      </div>
    </>
  );
}