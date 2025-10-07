import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getOrCreateIssue, getComments, addComment } from "@/lib/github";

export default async function handler(req, res) {
  try {
    const pid = req.method === "GET" ? req.query.pid : req.body.pid;
    if (!pid) {
      return res.status(400).json({ error: "缺少 pid 参数" });
    }

    const github_access_token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    const issueNumber = await getOrCreateIssue(pid);

    if (req.method === "GET") {
      const comments = await getComments(issueNumber);
      res.status(200).json(comments);
    } else if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: "Unauthorized" });

      const { comment } = req.body;
      if (!comment) {
        return res.status(400).json({ error: "评论内容不能为空" });
      }

      const newComment = await addComment(
        issueNumber,
        comment,
        github_access_token
      );

      res.status(201).json(newComment);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
