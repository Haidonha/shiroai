export default async function handler(req, res) {
  // Lấy nội dung chat từ query ?msg=
  const msg = req.query.msg || "";

  if (!msg) {
    return res.status(400).json({
      ok: false,
      error: "Missing ?msg= parameter"
    });
  }

  try {
    // Gọi API ChatAI gốc
    const apiURL = `https://bj-microsoft-search-ai.vercel.app/?chat=${encodeURIComponent(msg)}`;
    const response = await fetch(apiURL);
    const data = await response.json();

    // Cho phép CORS để dùng trên web tĩnh
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: "Proxy error",
      details: e.toString()
    });
  }
}
