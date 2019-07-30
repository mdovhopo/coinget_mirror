export const makeSubscribeRequest = (exchangeID, tradeCurrency, id) => {
  return {
    "jsonrpc": "2.0",
    "id": id,
    "method": "price.subscribe",
    "params": {
      "topic": "rate", "threshold": 1000,
      "opts": {
        exchangeId: exchangeID,
        marketCurrency: "USD",
        tradeCurrency: tradeCurrency
      }
    }
  }
};
