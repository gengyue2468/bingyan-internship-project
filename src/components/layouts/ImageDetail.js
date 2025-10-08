import { useEffect, useState } from "react";
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
import Image from "../ui/Image";
import { useDeviceType } from "@/hooks/useDeviceType";
import DropDown from "../ui/Dropdown";
import ImageDetailOptions from "@/contents/ImageDetailOptions";
import Share from "@/contents/Share";
import { InView } from "react-intersection-observer";
import { useScreenSize } from "@/hooks/useScreenSize";
import CommentPanel from "../ui/CommentPanel";
import Accordion from "../ui/Accordion";
import CommentList from "@/contents/CommentList";
import axios from "axios";
import { LoadingIcon } from "../ui/Icons";

export default function ImageDetailDisplay({
  imgUrl,
  width,
  height,
  title,
  color,
  date,
  tags,
  isLoaded,
  column,
  pid,
}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [counter, setCounter] = useState(0);
  const [sendComment, setSendComment] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [px, setPx] = useState("0.5rem");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayData, setDisplayData] = useState({});

  async function addData(waterfallContainer) {
    const { data } = await axios.get("/api/getImage", {
      params: { limit: 6 },
    });

    if (!data || !waterfallContainer) {
      console.error("获取图片为空或容器未初始化!");
      setIsError(true);
      return;
    }

    data.forEach((item, index) => {
      const colIndex = (index % column) + 1;

      if (!waterfallContainer[colIndex]) {
        waterfallContainer[colIndex] = [];
      }

      waterfallContainer[colIndex].push(item);
    });

    setDisplayData(waterfallContainer);
  }

  useEffect(() => {
    if (isLoading || !column || column <= 0) return;

    async function getImage() {
      setIsLoading(true);
      try {
        const waterfallContainer = {};

        for (let i = 0; i < column; i++) {
          waterfallContainer[i + 1] = [];
        }
        if (counter == 0) {
          await addData(waterfallContainer);
        } else {
          await addData(displayData);
        }
      } catch (err) {
        console.error("获取图片失败:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImage();
  }, [column, counter]);

  const isMobile = useDeviceType();

  useEffect(() => {
    setLikeCount(Math.floor(Math.random() * 100));
    setRefresh(!refresh);
  }, [imgUrl]);

  const deviceType = useScreenSize();
  useEffect(() => {
    switch (deviceType) {
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
  }, [deviceType]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!pid) return;
      try {
        const res = await axios.get(`/api/comments?pid=${pid}`);

        setCommentsCount(res.data.length);
      } catch (err) {
        console.error("获取评论失败：", err);
        setCommentsCount(0);
      }
    };
    fetchComments();
  }, [pid, sendComment]);
  return (
    <div>
      <div
        style={{
          border: isMobile ? 0 : "1px solid var(--border)",
          borderRadius: "1rem",
          background: "var(--background)",
          paddingInline: isMobile ? "0rem" : "1rem",
          paddingBlock: "1rem",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
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
        <Flex
          direction="column"
          disabledCenter={true}
          gap={4}
          style={{
            marginTop: "1rem",
            marginBottom: "4rem",
            paddingInline: px,
          }}
        >
          <ImageGallery
            src={imgUrl}
            isLoaded={isLoaded}
            title={title}
            color={color}
            key={imgUrl}
          />

          <Accordion
            title={`标签 (${tags ? tags.length : 0})`}
            content={
              <Flex direction="row">
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
              </Flex>
            }
            height="3rem"
            style={{
              flexWrap: "nowrap",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          />

          <Accordion
            title={`评论 (${commentsCount})`}
            content={
              <CommentList
                pid={pid}
                sendComment={sendComment}
                refresh={refresh}
              />
            }
            detail={true}
            height="16rem"
          />
          <CommentPanel
            pid={pid}
            sendComment={() => setSendComment(!sendComment)}
          />
        </Flex>
      </div>
      <Flex direction="column" gap={2}>
        <Flex direction="row" gap={4} disabledCenter>
          {Array.from({ length: column }).map((item, index) => (
            <Flex
              direction="column"
              gap={4}
              key={index}
              style={{ width: `calc(100% / ${column}) ` }}
            >
              {displayData[index + 1]?.map((item, index) => (
                <Image
                  index={index}
                  key={item?.id}
                  src={item?.url}
                  alt={item?.title}
                  color_dominant={item?.color_dominant}
                  pid={item?.id}
                />
              ))}

              <InView
                onChange={(inView) => {
                  if (inView && !isLoading) {
                    setCounter((prev) => prev + 1);
                  }
                }}
              >
                {({ ref }) => <div ref={ref} />}
              </InView>
            </Flex>
          ))}
        </Flex>
        {isLoading && (
          <Flex
            justify="center"
            style={{ marginTop: "1rem", textAlign: "center", width: "100%" }}
            gap={2}
          >
            <LoadingIcon style={{ width: "1rem", height: "1rem" }} />
            <p>请稍候...</p>
          </Flex>
        )}
      </Flex>
    </div>
  );
}
