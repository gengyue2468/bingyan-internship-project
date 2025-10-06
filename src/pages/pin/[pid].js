import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import Flex from "@/components/layouts/Flex";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import IconButton from "@/components/ui/IconButton";
import ImageDetailDisplay from "@/components/layouts/ImageDetail";
import Image from "@/components/ui/Image";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";

export default function ImageDetail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    try {
      setIsLoading(true);
      const { imageData: imagesStr } = router.query;
      const imageData = imagesStr ? JSON.parse(imagesStr) : [];
      setImageData(imageData);
    } catch (err) {
      console.error("页面加载失败：", err);
    } finally {
      setIsLoading(false);
    }
  }, [router.query]);

  const isMobile = useDeviceType();
  return (
    <Layout
      title={`Pinterest 上的 ${imageData?.tags?.map((item) => item)} 图片`}
    >
      <div style={{ paddingInline: isMobile ? "0rem" : "4rem" }}>
        <Flex
          direction={isMobile ? "column" : "row"}
          gap={4}
          disabledCenter={true}
        >
          <div style={{ marginTop: isMobile ? 0 : "1rem", position: "sticky" }}>
            <IconButton
              icon={<ArrowLeftIcon onClick={() => router.push("/")} />}
            />
          </div>
          <Flex style={{ width: "100%" }} gap={4} disabledCenter={true}>
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <ImageDetailDisplay
                imgUrl={!isLoading && imageData?.url}
                title={imageData?.title}
                author={imageData?.author}
                tags={imageData?.tags}
                date={imageData?.uploadDate}
                rate={imageData?.r18}
                width={imageData?.width}
                height={imageData?.height}
                isLoaded={!isLoading}
              />
            </div>

            <div className="sub-waterfall-container" style={{ width: "50%" }}>
              {Array.from({ length: 18 + 9 * counter }).map((item, index) => (
                <Image key={index} index={index + 1} />
              ))}
              <InView
                onChange={() => {
                  setCounter((prev) => prev + 1);
                }}
              >
                {({ ref }) => <div ref={ref} />}
              </InView>
            </div>
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
}
