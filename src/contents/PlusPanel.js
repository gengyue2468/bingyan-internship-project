import Flex from "@/components/layouts/Flex";
import { CutIcon, PanelIcon, PinIcon } from "@/components/ui/Icons";

function PlusButton({ icon, title, desc, ...props }) {
  return (
    <button
      type="button"
      {...props}
      style={{ width: "100%" }}
      className="ghostButton"
    >
      <Flex direction="row" gap={4}>
        <div
          style={{
            background: "var(--border)",
            width: "4rem",
            height: "4rem",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <Flex
          direction="column"
          justify="start"
          disabledCenter={true}
          gap={1}
          style={{ textAlign: "left" }}
        >
          <h3>{title}</h3>
          <p style={{ opacity: 0.8 }}>{desc}</p>
        </Flex>
      </Flex>
    </button>
  );
}

export default function PlusPanel() {
  const iconStyle = { width: "2rem", height: "2rem" };
  const PlusItems = [
    {
      title: "Pin 图",
      desc: "发布你的照片或视频，并添加链接、便签、效果等",
      icon: <PinIcon style={iconStyle} />,
    },
    {
      title: "图板",
      desc: "创建图版，整理你最爱 Pin 图的收藏合辑",
      icon: <PanelIcon style={iconStyle} />,
    },
    {
      title: "拼贴",
      desc: "融合搭配各种点子，构建你的愿景，创造新事物",
      icon: <CutIcon style={iconStyle} />,
    },
  ];
  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>创建</h2>
      <Flex direction="column" gap={4}>
        {PlusItems.map((item, index) => (
          <PlusButton
            key={index}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
          />
        ))}
      </Flex>
    </div>
  );
}
