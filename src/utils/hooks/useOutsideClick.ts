import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void) {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !(ref.current as any).contains(event.target as any)) {
        event.stopPropagation();
        handler();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler]);
  return ref;
}
