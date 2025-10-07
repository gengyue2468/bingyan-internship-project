import Layout from "@/components/layouts/Layout";
import FunTextEffect from "@/components/ui/FunTextEffect";
import Flex from "@/components/layouts/Flex";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function Error() {
  const isMobile = useDeviceType();
  return (
    <Layout title="404 Not Found">
      <Flex direction="column" style={{ paddingInline: "0.5rem" }}>
        <FunTextEffect
          text="404"
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
          页面不存在
        </p>

        <small
          style={{
            textAlign: "center",
            marginTop: "4rem",
            opacity: 0.5,
            display: "block",
          }}
        >
          如果联系技术人员，请向它们提供错误代码ERROR_404_NOT_FOUND
        </small>
      </Flex>
    </Layout>
  );
}
