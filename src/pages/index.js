import Flex from "@/components/layouts/Flex";
import Layout from "@/components/layouts/Layout";
import Image from "@/components/ui/Image";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { trackWindowScroll } from "react-lazy-load-image-component";
import Dialog from "@/components/ui/Dialog";
import Login from "@/contents/Login";
import FunTextEffect from "@/components/ui/FunTextEffect";
import axios from "axios";
import { LoadingIcon } from "@/components/ui/Icons";

const Home = () => {
  const screenType = useScreenSize();
  const isMobile = useDeviceType();
  const column = screenType;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayData, setDisplayData] = useState({});
  const [counter, setCounter] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const { data: session } = useSession();

  async function addData(waterfallContainer) {
    const { data } = await axios.get("/api/getImage", {
      params: { limit: 25 },
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

  return (
    <Layout title="Pinterest | Bingyan Studio Internship Project">
      {session && (
        <>
          <Flex direction="row" gap={4} disabledCenter>
            {Array.from({ length: column }).map((_, index) => (
              <Flex
                direction="column"
                gap={4}
                key={index}
                style={{ width: `calc(100% / ${column})` }}
              >
                {displayData[index + 1]?.map((item, idx) => (
                  <Image
                    index={idx}
                    key={item?.id}
                    src={item?.url}
                    alt={item?.title}
                    color_dominant={item?.color_dominant}
                    pid={item?.id}
                  />
                ))}

                {index === column - 1 && (
                  <InView
                    onChange={(inView) => {
                      if (inView && !isLoading) {
                        setCounter((prev) => prev + 1);
                      }
                    }}
                  >
                    {({ ref }) => <div ref={ref} style={{ height: "30px" }} />}
                  </InView>
                )}
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
        </>
      )}

      {!session && (
        <Flex direction="column" style={{ paddingInline: "0.5rem" }}>
          <FunTextEffect
            text="Pinterest"
            style={{
              textAlign: "center",
              fontSize: isMobile ? "4rem" : "9rem",
              color: "var(--bingo)",
            }}
          />

          <p
            style={{
              textAlign: "center",
              fontSize: isMobile ? "1rem" : "2rem",
              marginTop: "0rem",
              opacity: 0.75,
            }}
          >
            请先登录以浏览 Fake Pinterest.
          </p>

          <Dialog
            style={{ position: "relative" }}
            onClick={() => setOpenLogin(true)}
            open={openLogin}
            content={<Login />}
            close={() => setOpenLogin(false)}
          >
            {!session && (
              <button
                type="button"
                style={{
                  background: "var(--bingo)",
                  paddingInline: "1rem",
                  paddingBlock: "0.75rem",
                  borderRadius: "1rem",
                  color: "#ffffff",
                  marginTop: isMobile ? "2rem" : "8rem",
                  width: "10rem",
                  fontSize: isMobile ? "1rem" : "1.25rem",
                }}
                className="normalButton"
              >
                马上登录
              </button>
            )}
          </Dialog>

          <small
            style={{
              textAlign: "center",
              marginTop: "1rem",
              opacity: 0.5,
              display: "block",
            }}
          >
            继续即表示你同意 Pinterest
            的服务条款并且确认已阅读我们的隐私政策。收藏合辑中的通知。
          </small>
        </Flex>
      )}
    </Layout>
  );
};

export default trackWindowScroll(Home);
