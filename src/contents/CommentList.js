import Flex from "@/components/layouts/Flex";
import CommentCard from "@/components/ui/CommentCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { LoadingIcon } from "@/components/ui/Icons";

export default function CommentList({ pid, sendComment }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (pid === undefined) return;
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/comments?pid=${pid}`);

        const sortedComments = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setComments(sortedComments);
      } catch (err) {
        console.error("获取评论失败：", err);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [pid, sendComment]);

  return (
    <Flex direction="column" gap={2} style={{ marginTop: "0.5rem" }}>
      {comments.length === 0 && !isLoading && (
        <small style={{ opacity: 0.75 }}>暂无评论</small>
      )}
      {comments.length !== 0 &&
        !isLoading &&
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            avatar={comment?.author?.avatar}
            nickname={comment?.author?.nickname}
            username={comment?.author?.name}
            content={comment?.body}
            date={comment?.createdAt}
          />
        ))}
      {isLoading && (
        <Flex direction="row" justify="center" gap={2}>
          <LoadingIcon style={{ width: "1rem", height: "1rem" }} />
          <small>正在加载...</small>
        </Flex>
      )}
    </Flex>
  );
}
