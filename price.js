async function fetchStock(symbol) {
  try {
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await res.json();
    const quote = data["Global Quote"];

    if (!quote || !quote["05. price"]) {
      throw new Error("No valid data");
    }

    return {
      price: parseFloat(quote["05. price"]).toFixed(2),
      changePercent: quote["10. change percent"] || '0%',
      isNegative: quote["10. change percent"]?.includes('-') || false
    };
  } catch (error) {
    console.warn(`API error for ${symbol}:`, error.message);
    return {
      price: "N/A",
      changePercent: "N/A",
      isNegative: false
    };
  }
}
