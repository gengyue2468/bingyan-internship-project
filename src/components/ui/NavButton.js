import { useState } from "react";
import Tooltip from "./Tooltip";
import Panel from "./Panel";

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
  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label={title}
        className="navButton"
        {...props}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isPressed ? filledIcon : linearIcon}
      </button>
      <Tooltip display={isHover} information={title} />
      {!disabledPanel && (
        <Panel display={isPressed} translatePercent={translatePercent}>
          {pannelContent && pannelContent}
        </Panel>
      )}
    </div>
  );
}
