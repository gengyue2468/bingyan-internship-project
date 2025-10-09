import { useEffect, useState } from "react";

export const useWaterfallContainerStyle = (screenType) => {
  const [mainContainerCount, setMainContainerCount] = useState(1);
  const [subContainerCount, setSubContainerCount] = useState(1);
  const [px, setPx] = useState("0.5rem");

  useEffect(() => {
    switch (screenType) {
      case 1:
        setMainContainerCount(1);
        setSubContainerCount(0);
        break;
      case 2:
        setMainContainerCount(2);
        setSubContainerCount(0);
        break;
      case 3:
        setMainContainerCount(2);
        setSubContainerCount(1);
        break;
      case 4:
        setMainContainerCount(2);
        setSubContainerCount(1);
        break;
      case 5:
        setMainContainerCount(3);
        setSubContainerCount(2);
        break;
      case 6:
        setMainContainerCount(3);
        setSubContainerCount(3);
        break;
    }
    switch (screenType) {
      case 1 || 2:
        setPx("0.5rem");
        break;
      case 3 || 4:
        setPx("1rem");
        break;
      case 5 || 6:
        setPx("4rem");
        break;
    }
  }, [screenType]);

  return {
    mainContainerCount,
    subContainerCount,
    px,
  };
};
