import axios from "axios";

export default async function handler(req, res) {
  const { limit } = req.query;
  try {
    const result = await axios.get(
      `https://api.nekosapi.com/v4/images/random?limit=${limit}&rating=safe`,
      {
        timeout: 10000,
      }
    );
    res.status(200).json(result.data);
  } catch (err) {
    console.error("无法获取数据");
  }
}
