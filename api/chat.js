export default async function handler(req, res) {
  const chat = req.query.chat;

  if (!chat) {
    return res.status(400).json({ error: "Missing 'chat' query" });
  }

  try {
    const url = `https://bj-microsoft-search-ai.vercel.app/?chat=${encodeURIComponent(chat)}`;
    const response = await fetch(url);
    const data = await response.json();

    // Fix CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: true, detail: err.toString() });
  }
}
