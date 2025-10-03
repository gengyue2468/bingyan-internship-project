import { useState } from "react";
import Flex from "../layouts/Flex";
import { FullscreenIcon, MagicSearchIcon, LinkIcon } from "./Icons";

function Button({ text, icon, width, ...props }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      type="button"
      className="normalButton"
      style={{
        borderRadius: "0.75rem",
        paddingInline: "0.75rem",
        paddingBlock: "0.75rem",
        overflow: "hidden",
        background: "var(--background)",
        opacity: 0.9,
        fontWeight: 500,
      }}
    >
      <Flex direction="row" gap={isHover ? 2 : 0}>
        <div
          style={{
            width: isHover ? width : 0,
            opacity: isHover ? 1 : 0,
            transitionProperty: "all",
            transitionDuration: "500ms",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
        <div>{icon}</div>
      </Flex>
    </button>
  );
}

export default function ImageGallery({ src, aspectRatio }) {
  const [isHover, setIsHover] = useState(false);
  const iconStyle = { height: "1.5rem", width: "1.5rem" };
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={src} style={{ borderRadius: "1rem", width: "100%",aspectRatio: aspectRatio }} />
      <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
        <Flex
          direction="column"
          disabledCenter={true}
          gap={2}
          style={{ alignItems: "end" }}
        >
          <Button
            text="放大查看"
            width="4rem"
            icon={<FullscreenIcon style={iconStyle} />}
          />
          <Button
            text="探索"
            width="2rem"
            icon={<MagicSearchIcon style={iconStyle} />}
          />
        </Flex>
      </div>

      {isHover && (
        <button
          type="button"
          className="normalButton"
          style={{
            position: "absolute",
            left: "1rem",
            bottom: "1rem",
            fontWeight: 500,
            background: "var(--background)",
            paddingInline: "1rem",
            paddingBlock: "0.75rem",
            borderRadius: "1rem",
            display: "flex",
            alignContent: "center",
            gap: "0.25rem",
          }}
        >
          <span>访问网站</span>
          <span>
            <LinkIcon style={{ width: "1rem", height: "1rem" }} />
          </span>
        </button>
      )}
    </div>
  );
}
