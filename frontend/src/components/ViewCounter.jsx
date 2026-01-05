import React, { useEffect, useRef, useState } from "react";

const API_URL =
  import.meta.env.VITE_COUNTER_ENDPOINT;

export default function ViewCounter({ increment = false }) {
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
  }, [increment]);

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