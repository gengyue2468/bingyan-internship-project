import Layout from "@/components/layouts/Layout";
import FunTextEffect from "@/components/ui/FunTextEffect";
import Flex from "@/components/layouts/Flex";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function Error() {
  const isMobile = useDeviceType();
  return (
    <Layout title="500 Internal Server Error">
      <Flex direction="column" style={{ paddingInline: "0.5rem" }}>
        <FunTextEffect
          text="500"
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
          内部服务器错误
        </p>

        <small
          style={{
            textAlign: "center",
            marginTop: "4rem",
            opacity: 0.5,
            display: "block",
          }}
        >
          如果联系技术人员，请向它们提供错误代码ERROR_500_INTERNAL_SERVER_ERROR
        </small>
      </Flex>
    </Layout>
  );
}
