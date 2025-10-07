import { useSession } from "next-auth/react";
import Flex from "../layouts/Flex";
import Avatar from "./Avatar";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useState } from "react";

export default function CommentPanel() {
  const { data: session } = useSession();
  const isMobile = useDeviceType();
  const [comment, setComment] = useState("");
  return (
    <Flex
      direction="row"
      style={{
        marginTop: "4rem",
        padding: "0.5rem",
        border: "1px solid var(--border)",
        borderRadius: "4rem",
        flexWrap: "nowrap",
      }}
      gap={2}
    >
      {!session && (
        <small style={{ paddingInline: "1.2rem", paddingBlock: "0.8rem" }}>
          需要登录才能发表评论
        </small>
      )}
      {session && (
        <>
          {!isMobile && <Avatar src={session.user.image} size={2.5} />}
          <input
            value={comment}
            onChange={(e) => setComment(e.value)}
            type="text"
            className="input"
            style={{ borderRadius: "4rem", flex: 1 }}
            placeholder="添加评论以展开对话讨论"
          />
          <button
            type="button"
            className="normalButton"
            disabled={comment == ""}
            style={{
              borderRadius: "4rem",
              paddingInline: "1.2rem",
              paddingBlock: "0.8rem",
              background: "var(--success)",
              color: "#fff",
              whiteSpace: "nowrap",
              opacity: comment === "" ? 0.2 : 1,
            }}
          >
            发送
          </button>
        </>
      )}
    </Flex>
  );
}
