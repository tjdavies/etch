import { useEffect, useRef } from "react";

export function useKeyPressed(callback: (keys: any) => void) {
  const savedCallback = useRef<(keys: any) => void | null>();

  // State for keeping track of whether key is pressed
  //const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Add event listeners
  useEffect(() => {
    const downHandler = ({ key }: any) => {
      savedCallback.current && savedCallback.current(key);
    };
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return {};
}
