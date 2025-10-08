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
import { LoadingIcon } from "@/components/ui/Icons";

export default function ImageDetail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [mainContainerCount, setMainContainerCount] = useState(1);
  const [subContainerCount, setSubContainerCount] = useState(1);
  const [counter, setCounter] = useState(0);
  const [px, setPx] = useState("0.5rem");
  const screenType = useScreenSize();
  const [isError, setIsError] = useState(false);
  const [displayData, setDisplayData] = useState({});

  async function addData(waterfallContainer) {
    const { data } = await axios.get("/api/getImage", {
      params: { limit: 8 },
    });

    if (!data || !waterfallContainer) {
      console.error("获取图片为空或容器未初始化!");
      setIsError(true);
      return;
    }

    data.forEach((item, index) => {
      const colIndex = (index % subContainerCount) + 1;

      if (!waterfallContainer[colIndex]) {
        waterfallContainer[colIndex] = [];
      }

      waterfallContainer[colIndex].push(item);
    });

    setDisplayData(waterfallContainer);
  }

  useEffect(() => {
    if (isLoading || !subContainerCount || subContainerCount <= 0) return;

    async function getImage() {
      setIsLoading(true);
      try {
        const waterfallContainer = {};

        for (let i = 0; i < subContainerCount; i++) {
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
  }, [subContainerCount, counter]);

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
                tags={imageData?.tags}
                isLoaded={!isLoading}
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
              <Flex direction="row" gap={4} disabledCenter>
                {Array.from({ length: subContainerCount }).map((_, index) => (
                  <Flex
                    direction="column"
                    gap={4}
                    key={index}
                    style={{ width: `calc(100% / ${subContainerCount}) ` }}
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
                    {index === subContainerCount - 1 && (
                      <InView
                        onChange={(inView) => {
                          if (inView && !isLoading) {
                            setCounter((prev) => prev + 1);
                          }
                        }}
                      >
                        {({ ref }) => <div ref={ref} />}
                      </InView>
                    )}
                  </Flex>
                ))}
              </Flex>
              {isLoading && (
                <Flex
                  justify="center"
                  style={{
                    marginTop: "1rem",
                    textAlign: "center",
                    width: "100%",
                  }}
                  gap={2}
                >
                  <LoadingIcon style={{ width: "1rem", height: "1rem" }} />
                  <p>请稍候...</p>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
}
