import { useEffect, useRef } from "react";

export function useKeysDown(callback: (keys: any) => void) {
  const savedCallback = useRef<(keys: any) => void | null>();
  const keys = useRef<string[]>([]);
  // State for keeping track of whether key is pressed
  //const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  const downHandler = ({ key }: any) => {
    keys.current = keys.current.filter((k: string) => k !== key);
    keys.current.push(key);
    sendUpdate();
  };

  // If released key is our target key then set to false
  const upHandler = ({ key }: any) => {
    const remove = keys.current.filter((k: string) => k !== key);
    keys.current = remove;
    sendUpdate();
  };

  const sendUpdate = () => {
    if (typeof savedCallback?.current !== "undefined") {
      savedCallback?.current([...keys.current]);
    }
  };

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [upHandler, downHandler]); // Empty array ensures that effect is only run on mount and unmount

  return {};
}
