import axios from "axios";

export async function getOrCreateIssue(pid) {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

  try {
    const searchRes = await axios.get(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+title:${pid}+is:issue`,
      { headers: { Authorization: `token ${token}` } }
    );

    if (searchRes.data.items.length > 0) {
      return searchRes.data.items[0].number;
    }

    const createRes = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title: pid, body: `为 ${pid} 标号的页面创建的评论` },
      { headers: { Authorization: `token ${token}` } }
    );

    return createRes.data.number;
  } catch (error) {
    console.error("GitHub API 错误:", error);
    throw new Error("无法创建新 issue");
  }
}

export async function getComments(issueNumber) {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`
  );

  return res.data.map((comment) => ({
    id: comment.id,
    body: comment.body,
    author: {
      name: comment.user.login,
      avatar: comment.user.avatar_url,
    },
    createdAt: comment.created_at,
  }));
}

export async function addComment(issueNumber, body, token) {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;

  const res = await axios.post(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
    { body },
    { headers: { Authorization: `token ${token}` } }
  );

  return res.data;
}
