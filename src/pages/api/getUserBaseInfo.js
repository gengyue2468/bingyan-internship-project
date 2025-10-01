import axios from "axios";

export default async function handler(req, res) {
  try {
    const result = await axios.get("https://api.github.com/users/gengyue2468", {
      timeout: 10000,
    });
    res.status(200).json(result.data);
  } catch (err) {
    console.error("Failed to Fetch Data Via GitHub API");
  }
}
