import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_VIEW_COUNTER_URL; // adjust name if needed

export default function ViewCounter({ slug = "home" }) {
  const [count, setCount] = useState(null);
  const [incremented, setIncremented] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_URL) {
      console.warn("ViewCounter: VITE_VIEW_COUNTER_URL is not set");
      return;
    }

    async function fetchViews() {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        // Adjust these according to your API response
        const views = data.views ?? data.count ?? data.total ?? null;
        setCount(views);
        setIncremented(true);
      } catch (err) {
        console.error("ViewCounter error:", err);
        setError("–");
      }
    }

    fetchViews();
  }, [slug]);

  if (!API_URL) return null;
  if (error) {
    return (
      <div className="view-counter">
        <span>{error}</span>
        <span className="view-counter-label">Views</span>
      </div>
    );
  }

  return (
    <div className="view-counter">
      <span className="view-counter-count">
        {count === null ? "…" : count}
      </span>
      <span className="view-counter-label">Views</span>
      {incremented && <span className="view-counter-plus">+1</span>}
    </div>
  );
}