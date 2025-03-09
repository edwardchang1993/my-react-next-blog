import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    windowWidth: number | undefined;
    windowHeight: number | undefined;
  }>({
    windowWidth: undefined,
    windowHeight: undefined,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    function handleResize() {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
