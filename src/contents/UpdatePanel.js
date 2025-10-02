import Flex from "@/components/layouts/Flex";

export default function UpdatePanel() {
  return (
    <div style={{ height: "80vh" }}>
      <h2>更新</h2>
      <Flex direction="column" gap={4}>
        <img src="/static/ill_sunglasses_spot_light-42e9d57e.svg" />
        <h3>更新即将到来</h3>
        <p
          style={{
            width: "24rem",
            whiteSpace: "wrap",
            textAlign: "center",
            opacity: 0.75,
          }}
        >
          使用更新来查看 Pin
          图和图板中的动态，并获取关于值得探索的主题的提示。更新很快就会发布。
        </p>
      </Flex>
    </div>
  );
}
