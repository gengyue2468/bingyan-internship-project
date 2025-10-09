import Flex from "../layouts/Flex";
import DropDown from "./Dropdown";
import ImageDetailOptions from "@/contents/ImageDetailOptions";
import Share from "@/contents/Share";
import IconButton from "./IconButton";
import {
  HeartIcon,
  HeartIconFilled,
  CommentIcon,
  UploadIcon,
  DotsIcon,
} from "./Icons";
import { useEffect, useState } from "react";

export default function ImageDetailTopbar({ px, img }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const randomLikeCount = Math.floor(Math.random() * 100);
    setLikeCount(randomLikeCount);
  }, [img]);

  return (
    <Flex
      direction="row"
      gap={px !== "4rem" ? 1 : 4}
      justify="between"
      style={{ width: "100%" }}
    >
      <Flex direction="row" gap={px !== "4rem" ? 1 : 4}>
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
  );
}
