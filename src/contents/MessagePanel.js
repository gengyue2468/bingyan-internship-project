import {
  ComposeIcon,
  DotsIcon,
  UserPlusIcon,
  XIcon,
} from "@/components/ui/Icons";
import Flex from "@/components/layouts/Flex";
import DropDown from "@/components/ui/Dropdown";

function PanelButton({ icon, title, desc, highlight, ...props }) {
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
            background: highlight ? "var(--bingo)" : "var(--border)",
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: highlight ? "#fff" : "var(--foreground)",
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

export default function MessagePanel({ reset }) {
  const iconStyle = { width: "2rem", height: "2rem" };
  return (
    <div>
      <Flex direction="row" justify="between" gap={12}>
        <Flex direction="row" gap={4}>
          <button
            type="button"
            onClick={() => reset()}
            className="accentButton"
          >
            <XIcon style={iconStyle} />
          </button>
          <h2>消息</h2>
        </Flex>
        <DropDown
          type="button"
          className="accentButton"
          menu={
            <button
              type="button"
              className="normalButton ghostButton"
              style={{
                paddingInline: "0.75rem",
                paddingBlock: "0.5rem",
                borderRadius: "0.5rem",
              }}
            >
              全部标记为已读
            </button>
          }
        >
          <DotsIcon style={iconStyle} />
        </DropDown>
      </Flex>

      <Flex direction="column" gap={4} style={{ marginTop: "1rem" }}>
        <PanelButton
          title="新消息"
          highlight={true}
          icon={<ComposeIcon style={iconStyle} />}
        />
        <PanelButton
          title="邀请你的朋友"
          desc="联系以开始聊天"
          icon={<UserPlusIcon style={iconStyle} />}
        />
        <img src="/static/ill_messagebottle_spot_light-6d12e6a6.svg" />
        <p
          style={{
            width: "24rem",
            whiteSpace: "wrap",
            textAlign: "center",
            opacity: 0.75,
          }}
        >
          更新会显示你的 Pin
          图和图板中的动态，并为你提供关于值得探索的主题的提示。更新很快就会发布。
        </p>
      </Flex>
    </div>
  );
}
