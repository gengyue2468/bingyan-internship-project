import { useEffect, useState } from "react";
import Flex from "./Flex";
import ImageGallery from "../ui/ImageGallery";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useWaterfallContainerStyle } from "@/hooks/useWaterfallContainerStyle";
import { useImageData } from "@/hooks/useImageData";
import WaterfallContainer from "./WaterfallContainer";
import ImageDetailTopbar from "../ui/ImageDetailTopbar";
import { useAllComments } from "@/hooks/useAllComments";
import ImageDesc from "../ui/ImageDesc";

export default function ImageDetailDisplay({
  imgUrl,
  title,
  color,
  tags,
  isLoaded,
  column,
  pid,
}) {
  const [refresh, setRefresh] = useState(false);
  const isMobile = useDeviceType();

  useEffect(() => {
    setRefresh(!refresh);
  }, [imgUrl]);

  const deviceType = useScreenSize();
  const { px } = useWaterfallContainerStyle(deviceType);

  const {
    data: displayData,
    isLoading,
    isError,
    fetchMore,
  } = useImageData(column);
  const { setSendComment, commentsCount, sendComment } = useAllComments(pid);

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
        <ImageDetailTopbar px={px} />
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
          <ImageDesc
            pid={pid}
            refresh={refresh}
            tags={tags}
            commentsCount={commentsCount}
            sendComment={sendComment}
            setSendComment={setSendComment}
          />
        </Flex>
      </div>
      <Flex direction="column" gap={2}>
        <WaterfallContainer
          displayData={displayData}
          isLoading={isLoading}
          isError={isError}
          fetchMore={fetchMore}
          column={column}
        />
      </Flex>
    </div>
  );
}
