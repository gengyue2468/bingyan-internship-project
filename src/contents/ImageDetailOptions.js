import Flex from "@/components/layouts/Flex";

function PanelButton({ title, ...props }) {
  return (
    <button
      type="button"
      {...props}
      style={{
        width: "calc(100%+1rem)",
        transform: "translateX(-0.5rem)",
        borderRadius: "0.5rem",
        textAlign: "left",
      }}
      className="ghostButton normalButton"
    >
      <h4 style={{ fontWeight: 500 }}>{title}</h4>
    </button>
  );
}

export default function ImageDetailOptions() {
  const iconStyle = { height: "1.5rem", width: "1.5rem" };
  return (
    <div
      style={{
        width: "14rem",
        paddingInline: "0.4rem",
        paddingBlock: "0.6rem",
      }}
    >
      <Flex
        direction="column"
        gap={1}
        style={{ width: "100%", textAlign: "left", marginTop: "0.5rem" }}
        disabledCenter={true}
      >
        <PanelButton title="下载图片" />
        <PanelButton title="查看更多此类 Pin 图" />
        <PanelButton title="减少看到此类 Pin 图" />
        <PanelButton title="举报 Pin 图" />
        <PanelButton title="获取 Pin 图嵌入代码" />
      </Flex>
    </div>
  );
}
