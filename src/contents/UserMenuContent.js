import Flex from "@/components/layouts/Flex";

function UserPanel({ name, avatar, email, type, ...props }) {
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
          <img
            src={avatar}
            style={{ height: "3rem", width: "3rem", borderRadius: "50% " }}
          />
        </div>
        <Flex
          direction="column"
          justify="start"
          disabledCenter={true}
          gap={1}
          style={{ textAlign: "left" }}
        >
          <h3>{name}</h3>
          <p style={{ opacity: 0.8 }}>{type}</p>
          <p style={{ opacity: 1 }}>{email}</p>
        </Flex>
      </Flex>
    </button>
  );
}

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
      </Flex>
    </button>
  );
}

export default function UserMenuContent() {
  return (
    <>
      <small style={{ marginTop: "1.25rem", textAlign: "left", opacity: 0.5 }}>
        目前登录账户
      </small>

      <UserPanel
        avatar="/static/logo.webp"
        name="Brian Griffin"
        type="个人"
        email="gengyue2468@outlook.com"
      />

      <PanelButton title="转换为企业账户" />

      <small style={{ marginBlock: "0.5rem", textAlign: "left", opacity: 0.5 }}>
        你的账户
      </small>

      <PanelButton title="添加 Pinterest 账户" />
      <PanelButton title="退出登录" />
    </>
  );
}
