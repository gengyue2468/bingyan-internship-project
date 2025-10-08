import Flex from "@/components/layouts/Flex";
import Dialog from "@/components/ui/Dialog";
import { GitHubIcon, OfflineIcon } from "@/components/ui/Icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

function UserPanel({ name, avatar, email, type, ...props }) {
  return (
    <button
      type="button"
      {...props}
      style={{ width: "fit-content", whiteSpace: "nowrap" }}
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
  const { data: session, status } = useSession();
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <>
      {session && (
        <small
          style={{ marginTop: "1.25rem", textAlign: "left", opacity: 0.5 }}
        >
          目前登录账户
        </small>
      )}

      {session ? (
        <UserPanel
          avatar={session.user.image}
          name={session.user.name}
          type="个人"
          email={session.user.email}
        />
      ) : (
        <Flex direction="column" gap={4} style={{ width: "16rem" }}>
          <OfflineIcon
            style={{
              width: "6rem",
              height: "6rem",
              color: "var(--bingo)",
              marginBlock: "2rem",
            }}
          />
          <small style={{ textAlign: "center", opacity: 0.8 }}>
            与 Pinterest 在线服务的连接已经断开。为了让您马上看到数以亿万计的
            Pin 图。现在开始，可能只需要一次登录
          </small>
        </Flex>
      )}
      {session && <PanelButton title="转换为企业账户" />}
      {session && (
        <>
          <small
            style={{ marginBlock: "0.5rem", textAlign: "left", opacity: 0.5 }}
          >
            你的账户
          </small>
          <PanelButton title="添加 Pinterest 账户" />{" "}
          <PanelButton title="退出登录" onClick={() => signOut()} />
        </>
      )}
      {!session && (
        <button
          onClick={() => signIn("github")}
          type="button"
          style={{
            background: "var(--bingo)",
            paddingInline: "0.75rem",
            paddingBlock: "0.5rem",
            borderRadius: "1rem",
            color: "#ffffff",
            width: "100%",
            marginBlock: "1rem",
          }}
        >
          <Flex direction="row" gap={2} justify="center">
            <GitHubIcon style={{ width: "1.5rem" }} />
            <span>现在登录</span>
          </Flex>
        </button>
      )}
    </>
  );
}
