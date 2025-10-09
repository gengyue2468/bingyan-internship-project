import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import Flex from "@/components/layouts/Flex";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import IconButton from "@/components/ui/IconButton";
import ImageDetailDisplay from "@/components/layouts/ImageDetail";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useImageData } from "@/hooks/useImageData";
import { useImageById } from "@/hooks/useImageById";
import WaterfallContainer from "@/components/layouts/WaterfallContainer";
import { useWaterfallContainerStyle } from "@/hooks/useWaterfallContainerStyle";

export default function ImageDetail() {
  const router = useRouter();
  const screenType = useScreenSize();
  const isMobile = useDeviceType();
  const { pid } = router.query;

  const { imageIsLoading, imageData } = useImageById(pid);
  const { mainContainerCount, subContainerCount, px } =
    useWaterfallContainerStyle(screenType);
  const {
    data: displayData,
    isLoading,
    isError,
    fetchMore,
  } = useImageData(subContainerCount);
  const totalColumn = mainContainerCount + subContainerCount;
  return (
    <Layout
      title={`Pinterest 上的 ${imageData?.tags?.map((item) => item)} 图片`}
    >
      <div style={{ paddingInline: px }}>
        <Flex
          direction={px !== "4rem" ? "column" : "row"}
          gap={4}
          disabledCenter={true}
        >
          <div style={{ marginTop: isMobile ? 0 : "1rem", position: "sticky" }}>
            <IconButton
              icon={<ArrowLeftIcon onClick={() => router.push("/")} />}
            />
          </div>
          <Flex style={{ width: "100%" }} gap={4} disabledCenter={true}>
            <div
              style={{
                width: `calc((100% / ${totalColumn}) * ${mainContainerCount})`,
              }}
            >
              <ImageDetailDisplay
                imgUrl={!imageIsLoading && imageData?.url}
                title={imageData?.title}
                tags={imageData?.tags}
                isLoaded={!imageIsLoading}
                column={mainContainerCount}
                color={imageData?.color_dominant}
                pid={imageData?.id}
              />
            </div>
            <Flex
              direction="column"
              gap={2}
              style={{
                width: `calc((100% / ${totalColumn}) * ${subContainerCount})`,
              }}
            >
              <WaterfallContainer
                displayData={displayData}
                isLoading={isLoading}
                isError={isError}
                fetchMore={fetchMore}
                column={subContainerCount}
              />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
}
