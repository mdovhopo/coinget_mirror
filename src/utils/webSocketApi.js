const makeSubscribeRequest = (exchangeID, tradeCurrency, id) => (
  {
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
);


const WebSocketApi = {
  events: {},
  connect: function (WSLink) {
    console.log("Connecting to Web Socket...");
    this._ws = new WebSocket(WSLink);
    this._ws.onopen = function () {
      console.log("Connected to Web Socket");
    };
    this._ws.onerror = function (err) {
      console.log("Couldn't connect to Web Socket")
    };
    this._ws.onmessage = (res) => {
      const data = JSON.parse(res.data);
      if (data.id in this.events) {
        this.events[data.result] = this.events[data.id];
        delete this.events[data.id];
      }
      if (data.method === "notification") {
        this.events[data.params.token](data.params.data);
      }
    }
  },
  subscribe: function(exchange, currency, callback) {
    if (this._ws === undefined) throw "Call WebSocketApi.connect() first";
    const timer_id = setInterval(() => {
      console.log("Trying to subscribe on coin");
      if (this._ws && this._ws.readyState === WebSocket.OPEN) {
        // subscribeOnNotification(exchange, currencies[i], this.props.dispatch, this.props.ws);
        const id = exchange + "-" + currency;
        const req = makeSubscribeRequest(exchange, currency, id);
        this._ws.send(JSON.stringify(req));
        clearInterval(timer_id);
        this.events[id] = callback
      }
    }, 300);
  }
};

export default WebSocketApi;
