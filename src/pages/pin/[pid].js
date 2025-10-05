import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import Flex from "@/components/layouts/Flex";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import IconButton from "@/components/ui/IconButton";
import ImageDetailDisplay from "@/components/layouts/ImageDetail";
import Image from "@/components/ui/Image";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useEffect, useState } from "react";

export default function ImageDetail() {
  const router = useRouter();
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    try {
      const { imageData: imagesStr } = router.query;
      const imageData = imagesStr ? JSON.parse(imagesStr) : [];
      setImageData(imageData);
    } catch (err) {
      console.error("页面加载失败!!!");
    }
  }, [router.query]);

  const isMobile = useDeviceType();
  return (
    <Layout title={imageData?.title}>
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
                imgUrl={imageData?.urls?.original}
                title={imageData?.title}
                ss
                author={imageData?.author}
                tags={imageData?.tags}
                date={imageData?.uploadDate}
                rate={imageData?.r18}
              />
            </div>

            <div className="sub-waterfall-container" style={{ width: "50%" }}>
              {Array.from({ length: 24 }).map((item, index) => (
                <Image key={index} index={index + 1} />
              ))}
            </div>
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
}
