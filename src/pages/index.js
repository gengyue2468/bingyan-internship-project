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

const Home = () => {
  const screenType = useScreenSize();
  const isMobile = useDeviceType();
  const column = screenType;
  const [counter, setCounter] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const { data: session } = useSession();
  return (
    <Layout title="Pinterest | Bingyan Studio Internship Project">
      {session && (
        <Flex direction="row" gap={4} disabledCenter>
          {Array.from({ length: column }).map((item, index) => {
            return (
              <Flex
                direction="column"
                gap={4}
                key={index}
                style={{ width: `calc(100% / ${column})` }}
              >
                {Array.from({ length: 8 + 4 * counter }).map((item, index) => (
                  <Image key={index} index={index + 1} />
                ))}

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
