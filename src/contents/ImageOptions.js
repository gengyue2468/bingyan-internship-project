import Flex from "@/components/layouts/Flex";
import {
  HeartIcon,
  BanIcon,
  DownloadIcon,
  EyeOffIcon,
} from "@/components/ui/Icons";

function PanelButton({ icon, title, ...props }) {
  return (
    <button
      type="button"
      {...props}
      style={{
        width: "calc(100%+1rem)",
        transform: "translateX(-0.5rem)",
        borderRadius: "0.5rem",
      }}
      className="ghostButton normalButton"
    >
      <Flex direction="row" gap={4}>
        {icon}
        <h4 style={{ fontWeight: 500 }}>{title}</h4>
      </Flex>
    </button>
  );
}

export default function ImageOptions() {
  const iconStyle = { height: "1.5rem", width: "1.5rem" };
  return (
    <div
      style={{
        width: "14rem",
        paddingInline: "0.4rem",
        paddingBlock: "0.6rem",
      }}
    >
      <small style={{ marginTop: "4rem", textAlign: "left", opacity: 0.5 }}>
        此 Pin 图的灵感来源于你的近期动态
      </small>

      <Flex
        direction="column"
        gap={1}
        style={{ width: "100%", textAlign: "left", marginTop: "0.5rem" }}
        disabledCenter={true}
      >
        <PanelButton
          icon={<HeartIcon style={iconStyle} />}
          title="查看更多此类 Pin 图"
        />
        <PanelButton
          icon={<EyeOffIcon style={iconStyle} />}
          title="减少看到此类 Pin 图"
        />
        <PanelButton
          icon={<DownloadIcon style={iconStyle} />}
          title="下载图片"
        />
        <PanelButton icon={<BanIcon style={iconStyle} />} title="举报 Pin 图" />
      </Flex>
    </div>
  );
}
