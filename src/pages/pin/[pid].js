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
import { useScreenSize } from "@/hooks/useScreenSize";
import axios from "axios";

export default function ImageDetail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [mainContainerCount, setMainContainerCount] = useState(1);
  const [subContainerCount, setSubContainerCount] = useState(1);
  const [counter, setCounter] = useState(0);
  const [px, setPx] = useState("0.5rem");
  const screenType = useScreenSize();

  useEffect(() => {
    switch (screenType) {
      case 1:
        setMainContainerCount(1);
        setSubContainerCount(0);
        break;
      case 2:
        setMainContainerCount(1);
        setSubContainerCount(0);
        break;
      case 3:
        setMainContainerCount(1);
        setSubContainerCount(1);
        break;
      case 4:
        setMainContainerCount(2);
        setSubContainerCount(1);
        break;
      case 5:
        setMainContainerCount(3);
        setSubContainerCount(2);
        break;
      case 6:
        setMainContainerCount(3);
        setSubContainerCount(3);
        break;
    }
    switch (screenType) {
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
  }, [screenType]);

  const totalColumn = mainContainerCount + subContainerCount;
  const { pid } = router.query;

  useEffect(() => {
    if (!pid) return;
    try {
      const getImageById = async (pid) => {
        setIsLoading(true);
        const res = await axios.get(`/api/${pid}`);
        if (res) {
          const imageData = res.data;
          setImageData(imageData);
        }
      };
      getImageById(pid);
    } catch (err) {
      console.error("页面加载失败：", err);
    } finally {
      setIsLoading(false);
    }
  }, [pid]);

  const isMobile = useDeviceType();
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
                imgUrl={!isLoading && imageData?.url}
                title={imageData?.title}
                author={imageData?.author}
                tags={imageData?.tags}
                date={imageData?.date}
                isLoaded={!isLoading}
                column={mainContainerCount}
                color={imageData?.color_dominant}
                pid={imageData?.id}
              />
            </div>
            <Flex
              direction="row"
              gap={4}
              disabledCenter
              style={{
                width: `calc((100% / ${totalColumn}) * ${subContainerCount})`,
              }}
            >
              {Array.from({ length: subContainerCount }).map((item, index) => {
                return (
                  <Flex
                    direction="column"
                    gap={4}
                    key={index}
                    style={{ width: `calc(100% / ${subContainerCount})` }}
                  >
                    {Array.from({ length: 9 + 4 * counter }).map(
                      (item, index) => (
                        <Image key={index} index={index + 1} />
                      )
                    )}
                    <InView
                      onChange={() => {
                        setCounter((prev) => prev + 1);
                      }}
                    >
                      {({ ref }) => <div ref={ref} />}
                    </InView>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
}
