import { useEffect } from "react";

/**
 * useOutsideClick
 * Calls the handler when a click is detected outside the referenced element.
 * @param {React.RefObject} ref - ref attached to the element to watch
 * @param {Function} handler - callback to invoke on outside click
 */
const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
