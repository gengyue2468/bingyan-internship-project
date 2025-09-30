import axios from 'axios'

export default async function handler(req, res) {
  const res = await axios.get("https://api.github.com/users/gengyue2468");
}
