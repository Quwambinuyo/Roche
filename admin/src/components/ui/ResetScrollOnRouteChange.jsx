import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetScrollOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const scrollContainer = document.getElementById("main-scroll");

      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
};

export default ResetScrollOnRouteChange;
