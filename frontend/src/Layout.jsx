import { useState } from 'react'
import Header from 'comps/Header'
import { Outlet } from 'react-router-dom';

export default function Layout() {
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