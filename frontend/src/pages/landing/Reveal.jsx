import React from "react";
import useReveal from "../../hooks/useReveal";

const Reveal = ({ as: Tag = "div", className = "", delay = 0, children }) => {
  const [ref, inView] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
