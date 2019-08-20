const makeSubscribeRequest = (exchangeID: string, tradeCurrency: string, id: string): string => (
    JSON.stringify({
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
    })
);

interface IWebSocketApi {
    events: { [key: string]: Function },
    tokens: { [key: string]: string }
    _ws: WebSocket | null,

    connect(WSLink: string): void,

    subscribe(exchange: string, currency: string, callback: Function): string,

    updateCallback(id: string, callback: Function): string
}

const WebSocketApi: IWebSocketApi = {
    events: {}, tokens: {}, _ws: null,

    connect: function (WSLink: string) {
        console.log("Connecting to Web Socket...", WSLink);
        if (this._ws && this._ws.readyState === WebSocket.OPEN) {
            return console.log("WebSocket already connected");
        }
        this._ws = new WebSocket(WSLink);
        this._ws.onopen = function () {
            console.log("Connected to Web Socket");
        };
        this._ws.onerror = function () {
            console.log("Couldn't connect to Web Socket")
        };
        this._ws.onmessage = (res: any) => {
            const data = JSON.parse(res.data);
            const {id, result} = data;
            if (id in this.events) {
                this.events[result] = this.events[id];
                this.tokens[id] = data.result;
                delete this.events[id];
            }
            if (data.method === "notification") {
                if (data.params.token in this.events) {
                    this.events[data.params.token](data.params.data);
                }
            }
        }
    },
    subscribe: function (exchange: string, currency: string, callback: Function): string {
        if (this._ws === null) throw "subscribe: Call WebSocketApi.connect() first";
        const id = exchange + "-" + currency;
        if (id in this.tokens) return this.updateCallback(id, callback);
        const timer_id = setInterval(() => {
            console.log("Trying to subscribe on coin", id);
            if (this._ws && this._ws.readyState === WebSocket.OPEN) {
                const req = makeSubscribeRequest(exchange, currency, id);
                this._ws.send(req);
                clearInterval(timer_id);
                this.events[id] = callback
            }
        }, 300);
        return id;
    },
    updateCallback: function (id: string, callback: Function): string {
        const token = this.tokens[id];
        if (token && token in this.events) {
            this.events[token] = callback;
        }
        return id;
    }
};

export default WebSocketApi;
