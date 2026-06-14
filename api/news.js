const NEWSAPI_KEY = 'e7c75424d2644146962b02e145f34590';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://usepathways.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: 'Missing q parameter' });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWSAPI_KEY}`;
    const upstream = await fetch(url);
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream fetch failed', detail: err.message });
  }
}
