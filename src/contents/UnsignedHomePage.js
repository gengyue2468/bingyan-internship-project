import Flex from "@/components/layouts/Flex";
import FunTextEffect from "@/components/ui/FunTextEffect";
import Dialog from "@/components/ui/Dialog";
import { useState } from "react";
import { useDeviceType } from "@/hooks/useDeviceType";
import Login from "./Login";

export default function UnsignedHomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const isMobile = useDeviceType();
  return (
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
  );
}
