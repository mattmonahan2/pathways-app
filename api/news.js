export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const q = req.query.q || 'business careers jobs';
  const apiKey = 'e7c75424d2644146962b02e145f34590';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
