import { useState } from "react";
import Tooltip from "./Tooltip";
import Panel from "./Panel";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function NavButton({
  linearIcon,
  filledIcon,
  title,
  isPressed,
  pannelContent,
  translatePercent,
  disabledPanel,
  ...props
}) {
  const [isHover, setIsHover] = useState(false);
  const isMobile = useDeviceType();
  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label={title}
        className="navButton"
        {...props}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchCancel={() => setIsHover(false)}
      >
        {isPressed ? filledIcon : linearIcon}
      </button>
      <Tooltip
        display={isHover}
        information={title}
        direction={isMobile ? "up" : "right"}
      />
      {!disabledPanel && (
        <Panel
          display={isPressed}
          translatePercent={translatePercent}
          direction={isMobile ? "up" : "right"}
        >
          {pannelContent && pannelContent}
        </Panel>
      )}
    </div>
  );
}
