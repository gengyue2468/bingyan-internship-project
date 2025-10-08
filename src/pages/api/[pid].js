import axios from "axios";

export default async function handler(req, res) {
  try {
    const { pid } = req.query; 

    if (!pid) {
      return res.status(400).json({ error: "缺少图片ID" });
    }

    const result = await axios.get(
      `https://api.nekosapi.com/v4/images/${pid}`,
      {
        timeout: 10000,
      }
    );

    res.status(200).json(result.data);
  } catch (err) {
    console.error("无法获取数据:", err.message);
    res.status(500).json({ error: "无法获取数据", details: err.message }); 
  }
}
    
