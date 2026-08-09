import React, { useEffect, useRef, useState } from "react";

const RevealImage = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="w-full h-full"
        style={{
          clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: `clip-path 900ms cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
          style={{
            transform: visible ? "scale(1)" : "scale(1.15)",
            transition: `transform 1100ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

export default RevealImage;
