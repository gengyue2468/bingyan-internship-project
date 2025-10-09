import Accordion from "./Accordion";
import Flex from "../layouts/Flex";
import CommentPanel from "./CommentPanel";
import CommentList from "@/contents/CommentList";

export default function ImageDesc({
  refresh,
  pid,
  tags,
  setSendComment,
  commentsCount,
  sendComment,
}) {
  return (
    <>
      <Accordion
        title={`标签 (${tags ? tags.length : 0})`}
        content={
          <Flex direction="row">
            {tags?.map((item, index) => (
              <span
                key={index}
                style={{
                  marginRight: "0.25rem",
                  background: "var(--accent)",
                  padding: "0.5rem",
                  marginTop: "0.25rem",
                  borderRadius: "0.5rem",
                  display: "inline-block",
                }}
              >
                {item}
              </span>
            ))}
          </Flex>
        }
        height="3rem"
        style={{
          flexWrap: "nowrap",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      />

      <Accordion
        title={`评论 (${commentsCount})`}
        content={
          <CommentList pid={pid} sendComment={sendComment} refresh={refresh} />
        }
        detail={true}
        height="16rem"
      />
      <CommentPanel
        pid={pid}
        sendComment={() => setSendComment(!sendComment)}
      />
    </>
  );
}
