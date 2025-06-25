export default async function handler(req, res) {
  const { symbol = "SPY" } = req.query;
  const apiKey = "5HU8JZCTUM6EW7IQ";
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}