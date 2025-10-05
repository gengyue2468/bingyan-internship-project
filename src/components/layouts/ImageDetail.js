import { useState } from "react";
import IconButton from "../ui/IconButton";
import {
  HeartIcon,
  HeartIconFilled,
  CommentIcon,
  UploadIcon,
  DotsIcon,
} from "../ui/Icons";
import Flex from "./Flex";
import ImageGallery from "../ui/ImageGallery";
import moment from "moment";
import Image from "../ui/Image";
import { useDeviceType } from "@/hooks/useDeviceType";
import DropDown from "../ui/Dropdown";
import ImageDetailOptions from "@/contents/ImageDetailOptions";
import Share from "@/contents/Share";

export default function ImageDetailDisplay({
  imgUrl,
  width,
  height,
  title,
  author,
  date,
  tags,
  rate,
}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(1144);
  const aspectRadio = width && height ? width / height : 1;
  const isMobile = useDeviceType();
  return (
    <div>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "1rem",
          background: "var(--background)",
          paddingInline: isMobile ? "0.5rem" : "1rem",
          paddingBlock: "1rem",
          width: "100%",
        }}
      >
        <Flex
          direction="row"
          gap={isMobile ? 1 : 4}
          justify="between"
          style={{ width: "100%" }}
        >
          <Flex direction="row" gap={isMobile ? 1 : 4}>
            <Flex direction="row" gap={1}>
              <IconButton
                icon={
                  like ? (
                    <HeartIconFilled style={{ color: "var(--bingo)" }} />
                  ) : (
                    <HeartIcon />
                  )
                }
                onClick={() => {
                  setLike(!like);
                  setLikeCount(like ? likeCount - 1 : likeCount + 1);
                }}
              />
              {likeCount}
            </Flex>
            <IconButton icon={<CommentIcon />} />
            <DropDown
              style={{ height: "3rem", width: "3rem" }}
              className="invertButton ghostButton normalButton"
              menu={<Share />}
              center
            >
              <UploadIcon />
            </DropDown>
            <DropDown
              style={{ height: "3rem", width: "3rem" }}
              menu={<ImageDetailOptions />}
              className="invertButton ghostButton normalButton"
              center
            >
              <DotsIcon />
            </DropDown>
          </Flex>
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
              zIndex: 9,
              color: "#fff",
              transitionProperty: "all",
              transitionDuration: "250ms",
            }}
            className="normalButton"
          >
            保存
          </button>
        </Flex>
        <Flex
          direction="column"
          disabledCenter={true}
          gap={4}
          style={{
            marginTop: "1rem",
            marginBottom: "4rem",
            paddingInline: isMobile ? "0.5rem" : "4rem",
          }}
        >
          <ImageGallery aspectRadio={aspectRadio} src={imgUrl} />
          <Flex direction="row" disabledCenter={true} justify="between">
            <div>
              <h2>{title}</h2>
              <h3 style={{ opacity: 0.75 }}>{author}</h3>
            </div>
            <p style={{ opacity: 0.75 }}>
              上传于 {moment(date).format("YYYY 年 MM 月 DD 日")}
            </p>
          </Flex>
          <p>
            {tags?.map((item, index) => (
              <span
                key={index}
                style={{
                  marginRight: "0.25rem",
                  background: "var(--accent)",
                  padding: "0.5rem",
                  marginTop: "0.25rem",
                  borderRadius: "0.5rem",
                  display: "inline-block",
                }}
              >
                {item}
              </span>
            ))}
          </p>
          
          <div style={{ marginTop: "3rem" }}>
            <h3>尚无评论</h3>
          </div>
        </Flex>
      </div>
      <div
        className="main-waterfall-container"
        style={{ marginTop: "2rem", width: "100%" }}
      >
        {Array.from({ length: 16 }).map((item, index) => (
          <Image key={index} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
