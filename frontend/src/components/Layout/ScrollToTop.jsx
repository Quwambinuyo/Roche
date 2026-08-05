import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = ({ threshold = 400, scrollContainerRef = null }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = scrollContainerRef?.current || window;

    const getScrollY = () =>
      scrollContainerRef?.current
        ? scrollContainerRef.current.scrollTop
        : window.scrollY;

    const handleScroll = () => {
      setVisible(getScrollY() > threshold);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => target.removeEventListener("scroll", handleScroll);
  }, [threshold, scrollContainerRef]);

  const handleClick = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-secondary text-primary shadow-lg transition-all duration-300 hover:bg-tertiary-900 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
