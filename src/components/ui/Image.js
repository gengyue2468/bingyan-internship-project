import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Flex from "../layouts/Flex";
import { DotsIcon, LinkIcon, UploadIcon } from "./Icons";

export default function Image({ ...props }) {
  const [imageData, setImageData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    async function getImage() {
      const { data } = await axios.get("/api/getImage");

      if (data) {
        setImageData(data.data[0]);
      } else {
        console.error("获取图片失败!");
      }
    }
    getImage();
  }, []);

  const aspectRatio = imageData
    ? (imageData.height / imageData.width) * 100
    : 0;
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ position: "relative", marginBlock: "0.5rem", zIndex: 0 }}
      {...props}
    >
      {!isLoaded && imageData && (
        <div
          style={{
            width: "100%",
            paddingTop: `${aspectRatio}%`,
            backgroundColor: "var(--accent)",
            borderRadius: "1rem",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}
      <LazyLoadImage
        effect="blur"
        src={imageData?.urls.original}
        style={{
          borderRadius: "1rem",
          width: "100%",
          height: "100%",
        }}
        onLoad={() => setIsLoaded(true)}
      />

      <div
        style={{
          position: "absolute",
          background: "#000000",
          opacity: 0.2,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: isHover ? "100%" : 0,
          height: isHover ? "100%" : 0,
          zIndex: 10,
          transitionProperty: "all",
          transitionDuration: "100ms",
        }}
      />

      {isHover && (
        <button
          type="button"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontWeight: 500,
            background: "var(--bingo)",
            paddingInline: "1rem",
            paddingBlock: "0.75rem",
            borderRadius: "1rem",
            whiteSpace: "nowrap",
            textAlign: "center",
            zIndex: 15,
            color: "#fff",
          }}
          className="normalButton"
        >
          保存
        </button>
      )}

      {isHover && (
        <Flex
          direction="between"
          justify="between"
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
            zIndex: 15,
          }}
        >
          <button
            type="button"
            className="normalButton"
            style={{
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

          <Flex direction="row" gap={1}>
            <button className="iconButton normalButton">
              <UploadIcon style={{ width: "1.75rem", height: "1.75rem" }} />
            </button>
            <button className="iconButton normalButton">
              <DotsIcon style={{ width: "1.75rem", height: "1.75rem" }} />
            </button>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
