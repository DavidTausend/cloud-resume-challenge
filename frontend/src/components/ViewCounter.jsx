import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Accept either:
 *  - VITE_VIEW_COUNTER_URL=https://api-counter.example.com/counter
 *  - VITE_COUNTER_ENDPOINT=https://api-counter.example.com
 */
const RAW =
  import.meta.env.VITE_VIEW_COUNTER_URL ||
  import.meta.env.VITE_COUNTER_ENDPOINT;

function normalize(url) {
  if (!url) return null;
  const clean = url.replace(/\/$/, "");
  return clean.endsWith("/counter") ? clean : `${clean}/counter`;
}

export default function ViewCounter({ increment = false }) {
  const API_URL = useMemo(() => normalize(RAW), []);
  const [count, setCount] = useState(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!API_URL) return;

    const method = increment && !hasIncremented.current ? "POST" : "GET";

    (async () => {
      try {
        const res = await fetch(API_URL, {
          method,
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setCount(Number(data.count ?? 0));

        if (method === "POST") {
          hasIncremented.current = true;
        }
      } catch (err) {
        console.error("ViewCounter error:", err);
        setCount(null);
      }
    })();
  }, [API_URL, increment]);

  if (!API_URL) return null;

  return (
    <div className="view-counter">
      <span className="view-counter-count">
        {count === null ? "–" : count}
      </span>
      <span className="view-counter-label">Views</span>
    </div>
  );
}