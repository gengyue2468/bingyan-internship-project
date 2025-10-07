import { useState } from "react";
import Flex from "../layouts/Flex";
import {
  FullscreenIcon,
  MagicSearchIcon,
  LinkIcon,
  Link2Icon,
  XIcon,
  PlusIcon,
  MinusIcon,
} from "./Icons";
import IconButton from "./IconButton";
import { useDeviceType } from "@/hooks/useDeviceType";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      {...props}
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

export default function ImageGallery({ src, color, title }) {
  const [isHover, setIsHover] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const iconStyle = { height: "1.5rem", width: "1.5rem" };
  const imgStyle = {
    borderRadius: "1rem",
    width: "100%",
  };
  const absoluteImgStyle = {
    borderRadius: "1rem",
    width: "100%",
    position: isFullscreen ? "fixed" : "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    grayscale: 0,
    zIndex: isFullscreen ? 9999 : 1,
    display: "flex",
    justifyContent: "center",
    transitionDuration: "500ms",
    transitionProperty: "all",
    scale: isFullscreen ? 1.01 : 1,
  };
  const isMobile = useDeviceType();
  const aspectRatio = isLoaded ? "auto" : Math.random() * 0.45 + 0.75;
  const dominatColor = color && `rgb(${color[0]},${color[1]},${color[2]})`;
  return (
    <div
      style={{
        position: !isFullscreen && "relative",
        background: dominatColor ? dominatColor : "var(--accent)",
        borderRadius: "1rem",
        width: isLoaded ? "fit-content" : "100%",
        display: "flex",
        justifyContent: "center",
        aspectRatio: aspectRatio,
        transitionProperty: "all",
        transitionDuration: "500ms",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={!isLoaded && "skeleton"}
    >
      <LazyLoadImage
        effect="blur"
        alt={title}
        src={src}
        style={imgStyle}
        onLoad={() => setIsLoaded(true)}
      />
      <div style={absoluteImgStyle}>
        <div
          style={{
            position: "relative",
            transitionProperty: "all",
            transitionDuration: "500ms",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LazyLoadImage
            alt={title}
            src={src}
            style={{
              borderRadius: isMobile && isFullscreen ? 0 : "1rem",
              scale: 1 * scale,
              width: isMobile ? "100%" : "auto",
              height: isMobile ? "auto" : "100%",
              transitionProperty: "all",
              transitionDuration: "500ms",
              opacity: isFullscreen ? 1 : 0,
            }}
          />
          {isFullscreen && (
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: isMobile ? "1rem" : "auto",
                right: isMobile ? "auto" : "1rem",
                zIndex: 2,
              }}
            >
              <Flex
                direction="column"
                disabledCenter={true}
                gap={2}
                style={{ alignItems: "end" }}
              >
                <Button
                  text="访问网站"
                  width="4rem"
                  icon={<Link2Icon style={iconStyle} />}
                />
                <Button
                  text={"探索"}
                  width="2rem"
                  icon={<MagicSearchIcon style={iconStyle} />}
                />
              </Flex>
            </div>
          )}
        </div>
      </div>

      {isFullscreen && (
        <div
          style={{
            zIndex: 999,
            background: "#000000",
            opacity: isMobile ? 1 : 0.8,
            backdropFilter: "blur(15px)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100%",
          }}
        />
      )}

      {isFullscreen && (
        <Flex
          direction="row"
          justify="between"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            right: "1rem",
            zIndex: 9999,
          }}
        >
          <IconButton
            icon={<XIcon />}
            onClick={() => {
              setScale(1);
              setIsFullscreen(false);
            }}
            style={{ opacity: 0.8 }}
          />
          <button
            type="button"
            style={{
              fontWeight: 500,
              background: "var(--bingo)",
              paddingInline: "1rem",
              paddingBlock: "0.75rem",
              borderRadius: "1rem",
              whiteSpace: "nowrap",
              textAlign: "center",
              color: "#fff",
              transitionProperty: "all",
              transitionDuration: "250ms",
            }}
            className="normalButton"
          >
            保存
          </button>
        </Flex>
      )}

      {isFullscreen && (
        <Flex
          direction="column"
          gap={2}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 9999,
          }}
        >
          <IconButton
            icon={<PlusIcon />}
            onClick={() => setScale(scale + 0.5)}
            disabled={scale >= 2}
            style={{ opacity: 0.8 }}
          />
          <IconButton
            icon={<MinusIcon />}
            onClick={() => setScale(scale - 0.5)}
            disabled={scale <= 1}
            style={{ opacity: 0.8 }}
          />
        </Flex>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 2,
        }}
      >
        <Flex
          direction="column"
          disabledCenter={true}
          gap={2}
          style={{ alignItems: "end" }}
        >
          <Button
            onClick={() => setIsFullscreen(!isFullscreen)}
            text="放大查看"
            width="4rem"
            icon={<FullscreenIcon style={iconStyle} />}
          />
          <Button
            text={"探索"}
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
