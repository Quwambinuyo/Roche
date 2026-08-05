import React, { useEffect, useState } from "react";

const SplitText = ({ text, className = "", delayStart = 0, stagger = 80 }) => {
  const words = text.split(" ");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-3 last:mr-0 align-top"
        >
          <span
            className="inline-block"
            style={{
              transform: mounted ? "translateY(0%)" : "translateY(110%)",
              transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${
                delayStart + i * stagger
              }ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

export default SplitText;
