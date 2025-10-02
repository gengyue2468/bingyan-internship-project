import axios from "axios";

export default async function handler(req, res) {
  try {
    const result = await axios.get(
      "https://api.lolicon.app/setu/v2",
      {
        timeout: 10000,
      }
    );
    res.status(200).json(result.data);
  } catch (err) {
    console.error("Failed to Fetch Data");
  }
}
