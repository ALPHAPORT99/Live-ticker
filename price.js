const API_KEY = '5HU8JZCTUM6EW7IQ';
const tickerEl = document.getElementById('ticker');
const tickers = [
  { name: "S&P 500 (SPY)", symbol: "SPY" },
  { name: "NASDAQ 100 (QQQ)", symbol: "QQQ" },
  { name: "Dow Jones (DIA)", symbol: "DIA" },
  { name: "Russell 2000 (IWM)", symbol: "IWM" },
  { name: "VIX (VXX)", symbol: "VXX" },
  { name: "Total US Market (VTI)", symbol: "VTI" },
  { name: "China (FXI)", symbol: "FXI" },
  { name: "India (INDA)", symbol: "INDA" },
  { name: "Europe (VGK)", symbol: "VGK" },
  { name: "Global (VT)", symbol: "VT" }
];
let currentBatch = 0;
const batchSize = 5;

async function fetchStock(symbol) {
  try {
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await res.json();
    const quote = data["Global Quote"];
    return {
      price: parseFloat(quote["05. price"]).toFixed(2),
      changePercent: quote["10. change percent"] || '0%',
      isNegative: quote["10. change percent"]?.includes('-') || false
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}`, error);
    return {
      price: "N/A",
      changePercent: "N/A",
      isNegative: false
    };
  }
}

async function updateTicker() {
  tickerEl.innerHTML = '';
  const start = currentBatch * batchSize;
  const batch = tickers.slice(start, start + batchSize);

  for (const stock of batch) {
    const data = await fetchStock(stock.symbol);
    const item = document.createElement('div');
    item.className = 'ticker-item';
    item.innerHTML = `
      <span class="index-name">${stock.name}:</span>
      <span class="cmp">${data.price}</span>
      <span class="change ${data.isNegative ? 'negative' : ''}">${data.isNegative ? '' : '+'}${data.changePercent}</span>
    `;
    tickerEl.appendChild(item);
  }

  currentBatch = (currentBatch + 1) % Math.ceil(tickers.length / batchSize);
}

updateTicker();
setInterval(updateTicker, 60000);
