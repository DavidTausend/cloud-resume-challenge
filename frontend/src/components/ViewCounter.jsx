import React, { useEffect, useMemo, useRef, useState } from "react";

const RAW =
  import.meta.env.VITE_COUNTER_ENDPOINT ||
  import.meta.env.VITE_VIEW_COUNTER_URL;

function normalize(url) {
  if (!url) return null;
  const clean = url.replace(/\/$/, "");

  if (clean.endsWith("/counter")) return clean;

  if (clean.endsWith("/api")) return `${clean}/counter`;

  return `${clean}/api/counter`;
}

export default function ViewCounter({ increment = false }) {
  const API_URL = useMemo(() => normalize(RAW), []);
  const [count, setCount] = useState(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!API_URL) return;

    const shouldPost = increment && !hasIncremented.current;
    const method = shouldPost ? "POST" : "GET";

    (async () => {
      try {
        const res = await fetch(API_URL, {
          method,
          mode: "cors",
          ...(shouldPost ? { headers: { "Content-Type": "application/json" } } : {}),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setCount(Number(data?.count ?? 0));

        if (shouldPost) hasIncremented.current = true;
      } catch (err) {
        console.error("ViewCounter error:", err);
        setCount(null);
      }
    })();
  }, [API_URL, increment]);

  if (!API_URL) return null;

  return (
    <div className="view-counter">
      <span className="view-counter-count">{count === null ? "–" : count}</span>
      <span className="view-counter-label">Views</span>
    </div>
  );
}