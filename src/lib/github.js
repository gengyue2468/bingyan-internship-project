import axios from "axios";

export async function getOrCreateIssue(pid) {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

  const encodedPid = encodeURIComponent(pid);
  const searchQuery = `repo:${owner}/${repo}+label:"${encodedPid}"+state:open`;

  try {
    const searchRes = await axios.get(
      `https://api.github.com/search/issues?q=${searchQuery}`,
      {
        headers: { Authorization: `token ${token}` },
        "X-GitHub-Api-Version": "2022-11-28",
      }
    );

    if (searchRes.data.total_count > 0) {
      return searchRes.data.items[0].number;
    }

    const createRes = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title: "评论", labels: [pid], body: `为 ${pid} 标号的页面创建的评论` },
      {
        headers: {
          Authorization: `token ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return createRes.data.number;
  } catch (error) {
    console.error("[getOrCreateIssue] 错误详情：", {
      searchUrl: `https://api.github.com/search/issues?q=${searchQuery}`,
      errorMessage: error.message,
      githubResponse: error.response?.data,
    });
    throw new Error("无法获取/创建 Issue（详见控制台日志）");
  }
}

export async function getComments(issueNumber) {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

  const commentsRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
    {
      headers: {
        Authorization: `token ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const rawComments = commentsRes.data;

  const uniqueLogins = [
    ...new Set(rawComments.map((comment) => comment.user.login)),
  ];
  const userPromises = uniqueLogins.map(async (login) => {
    try {
      const userRes = await axios.get(`https://api.github.com/users/${login}`, {
        headers: { Authorization: `token ${token}` },
      });
      return {
        login,
        nickname: userRes.data.name || login,
      };
    } catch (error) {
      console.error(`获取用户 ${login} 信息失败：`, error.message);
      return { login, nickname: login };
    }
  });
  const userMap = Object.fromEntries(
    (await Promise.all(userPromises)).map((user) => [user.login, user.nickname])
  );

  return rawComments.map((comment) => ({
    id: comment.id,
    body: comment.body,
    author: {
      name: comment.user.login,
      nickname: userMap[comment.user.login],
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
    {
      headers: {
        Authorization: `token ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return res.data;
}
