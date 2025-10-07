import { useSession } from "next-auth/react";
import Flex from "../layouts/Flex";
import Avatar from "./Avatar";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useState } from "react";
import axios from "axios";

export default function CommentPanel({ pid }) {
  const { data: session } = useSession();
  const isMobile = useDeviceType();
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (pid, comment) => {
    try {
      setIsSending(true);
      await axios.post(`/api/comments`, { pid, comment });
    } catch (err) {
      console.error(err);
    } finally {
      setComment("");
      setIsSending(false);
    }
  };
  return (
    <Flex
      direction="row"
      style={{
        padding: "0.5rem",
        border: "1px solid var(--border)",
        borderRadius: "4rem",
        flexWrap: "nowrap",
        width: "100%",
      }}
      gap={2}
    >
      {!session && (
        <small style={{ paddingInline: "1.2rem", paddingBlock: "0.8rem" }}>
          需要登录才能发表评论
        </small>
      )}
      {session && (
        <Flex
          direction="row"
          justify="between"
          gap={2}
          style={{ width: "100%" }}
        >
          {!isMobile && <Avatar src={session.user.image} size={2.5} />}
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="input"
            style={{ borderRadius: "4rem", width: "100%" }}
            placeholder="添加评论"
          />
          <button
            type="button"
            className="normalButton"
            disabled={comment == ""}
            onClick={() => handleSubmit(pid, comment)}
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
            {isSending ? "发送中..." : "发送"}
          </button>
        </Flex>
      )}
    </Flex>
  );
}
