import {
  ComposeIcon,
  DotsIcon,
  LinkIcon,
  UserPlusIcon,
  XIcon,
} from "@/components/ui/Icons";
import Flex from "@/components/layouts/Flex";

function PanelButton({ link, title, ...props }) {
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
      <Flex direction="row" gap={4} justify="between">
        <h4 style={{ fontWeight: 500 }}>{title}</h4>
        {link && <LinkIcon style={{ width: "1rem", height: "1rem" }} />}
      </Flex>
    </button>
  );
}

export default function SettingsPanel({ reset }) {
  const iconStyle = { width: "1.25rem", height: "1.25rem" };
  return (
    <div style={{ width: "20rem" }}>
      <Flex direction="row" justify="between" gap={12}>
        <Flex direction="row" gap={4}>
          <button
            type="button"
            onClick={()=>reset()}
            className="accentButton"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <XIcon style={iconStyle} />
          </button>
          <h3>设置与支持</h3>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        gap={1}
        style={{ marginTop: "1rem" }}
        disabledCenter={true}
      >
        <PanelButton title="设置" />
        <PanelButton title="主页调整功能" />
        <PanelButton title="已声明所有权的外部账户" />
        <PanelButton title="违规内容举报中心" />
        <PanelButton title="安装 Windows 应用程序" />
        <PanelButton title="成为 Beta 版测试者" link />

        <small style={{ marginBlock: "1rem", textAlign: "left", opacity: 0.5 }}>
          支持
        </small>

        <PanelButton title="帮助中心" link />
        <PanelButton title="创建部件" link />
        <PanelButton title="已移除的项目" link />
        <PanelButton title="个性化广告" />
        <PanelButton title="你的隐私权" />
        <PanelButton title="隐私政策" link />
        <PanelButton title="服务条款" link />

        <small style={{ marginBlock: "1rem", textAlign: "left", opacity: 0.5 }}>
          资源
        </small>
        <p style={{ color: "var(--success)", fontSize: "14px" }}>
          <a>关于</a> <a>博客</a> <a>业务</a> <a>招贤纳士</a> <a>开发人员</a>
        </p>
      </Flex>
    </div>
  );
}
