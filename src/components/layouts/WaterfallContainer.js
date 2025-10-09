import Flex from "./Flex";
import Image from "../ui/Image";
import { InView } from "react-intersection-observer";
import { BanIcon, LoadingIcon } from "@/components/ui/Icons";

export default function WaterfallContainer({
  column,
  displayData,
  fetchMore,
  isLoading,
  isError,
}) {
  return (
    <div style={{ width: "100%" }}>
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
                    fetchMore();
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

      {isError && (
        <Flex
          justify="center"
          style={{
            marginTop: "1rem",
            textAlign: "center",
            width: "100%",
            color: "var(--bingo)",
          }}
          gap={2}
        >
          <BanIcon style={{ width: "1rem", height: "1rem" }} />
          <p>发生未知错误</p>
        </Flex>
      )}
    </div>
  );
}
