import { useState, useEffect, useCallback } from "react";

const useScreenSize = () => {
  const [screenType, setScreenType] = useState(0);

  const handleResize = useCallback(() => {
    const w = window.innerWidth;
    if (w <= 576) {
      setScreenType(1);
    } else if (w > 576 && w <= 768) {
      setScreenType(2);
    } else if (w > 768 && w <= 1024) {
      setScreenType(3);
    } else if (w > 1024 && w <= 1440) {
      setScreenType(4);
    } else if (w > 1440 && w <= 1920) {
      setScreenType(5);
    } else {
      setScreenType(6);
    }
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return screenType;
};

export { useScreenSize };
