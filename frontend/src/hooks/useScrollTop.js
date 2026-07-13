import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useScrollTop
 * Scrolls the window to the top whenever the route pathname changes.
 * Use as a drop-in hook inside any router-aware component.
 */
const useScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
};

export default useScrollTop;
