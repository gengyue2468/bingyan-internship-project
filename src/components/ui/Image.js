import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../layouts/Flex";
import { DotsIcon, LinkIcon, UploadIcon } from "./Icons";
import { useRouter } from "next/router";
import Link from "next/link";
import DropDown from "./Dropdown";
import ImageOptions from "@/contents/ImageOptions";
import Share from "@/contents/Share";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useInView } from "react-intersection-observer";

export default function Image({ index, ...props }) {
  const [imageData, setImageData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0.25,
  });

  useEffect(() => {
    async function getImage() {
      const { data } = await axios.get("/api/getImage");

      if (data) {
        setImageData(data[0]);
      } else {
        console.error("获取图片失败!");
        setIsError(true);
      }
    }
    if (inView && !hasFetched) {
      try {
        getImage();
      } catch (err) {
        console.error(err);
      } finally {
        setHasFetched(true);
      }
    } else {
      return;
    }
  }, [inView]);

  const aspectRatio = isLoaded ? "auto" : Math.random() * 0.45 + 0.75;
  const display = isHover && isLoaded && !isError;
  const dominatColor = `rgb(${imageData?.color_dominant[0]},${imageData?.color_dominant[1]},${imageData?.color_dominant[2]})`;
  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        position: "relative",
        marginBottom: "1rem",
        zIndex: 0,
        breakInside: "avoid",
        width: "100%",
        aspectRatio: aspectRatio,
        borderRadius: "1rem",
        transitionProperty: "all",
        transitionDuration: "500ms",
        display: "block",
      }}
      {...props}
    >
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            backgroundColor: imageData?.color_dominant
              ? dominatColor
              : "var(--accent)",
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
          }}
        />
      )}

      <Link
        href={{
          pathname: `/pin/${imageData?.id}`,
          query: { imageData: JSON.stringify(imageData) },
        }}
        style={{
          position: "relative",
          zIndex: imageData ? 7 : -1,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <LazyLoadImage
          effect="blur"
          src={imageData?.url}
          alt={imageData?.title}
          style={{
            borderRadius: "1rem",
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
          onLoad={() => setIsLoaded(true)}
        />
      </Link>

      <div
        style={{
          position: "absolute",
          background: "#000000",
          opacity: 0.2,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: display ? "100%" : 0,
          height: display ? "100%" : 0,
          zIndex: 8,
          transitionProperty: "all",
          transitionDuration: "0ms",
          pointerEvents: "none",
        }}
      />

      <button
        type="button"
        style={{
          position: "absolute",
          opacity: display ? 1 : 0,
          top: display ? "16px" : 0,
          right: "16px",
          fontWeight: 500,
          background: "var(--bingo)",
          paddingInline: "1rem",
          paddingBlock: "0.75rem",
          borderRadius: "1rem",
          whiteSpace: "nowrap",
          textAlign: "center",
          zIndex: 9,
          color: "#fff",
          transitionProperty: "all",
          transitionDuration: "250ms",
        }}
        className="normalButton"
      >
        保存
      </button>

      <Flex
        direction="between"
        justify="between"
        style={{
          position: "absolute",
          opacity: display ? 1 : 0,
          bottom: display ? "16px" : 0,
          left: "16px",
          right: "16px",
          zIndex: 10,
          transitionProperty: "all",
          transitionDuration: "250ms",
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
          <DropDown
            style={{ zIndex: 25 }}
            menu={<Share />}
            direction="up"
            className="iconButton normalButton"
            center={true}
            centerPrecent="30%"
          >
            <UploadIcon style={{ width: "1.75rem", height: "1.75rem" }} />
          </DropDown>
          <div style={{ position: "relative" }}>
            <DropDown
              menu={<ImageOptions />}
              direction="up"
              className="iconButton normalButton"
              style={{ zIndex: 25 }}
            >
              <DotsIcon style={{ width: "1.75rem", height: "1.75rem" }} />
            </DropDown>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
