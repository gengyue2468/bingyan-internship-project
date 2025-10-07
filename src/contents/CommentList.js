import Flex from "@/components/layouts/Flex";
import CommentCard from "@/components/ui/CommentCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CommentList({ pid }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/api/comments?pid=${pid}`);
      setComments(res.data);
      console.log(res.data);
    };
    fetchComments();
  }, [pid]);

  return (
    <Flex direction="column" gap={2}>
      {comments?.map((comment, index) => (
        <CommentCard key={index} username="Elon Musk" content="Great Job!" />
      ))}
    </Flex>
  );
}
