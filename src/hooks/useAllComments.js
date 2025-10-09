import { useEffect, useState } from "react";
import axios from "axios";

export const useAllComments = (pid) => {
  const [sendComment, setSendComment] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      if (!pid) return;
      try {
        const res = await axios.get(`/api/comments?pid=${pid}`);

        setCommentsCount(res.data.length);
      } catch (err) {
        console.error("获取评论失败：", err);
        setCommentsCount(0);
      }
    };
    fetchComments();
  }, [pid, sendComment]);

  return {
    sendComment,
    setSendComment,
    commentsCount,
  };
};
