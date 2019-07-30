import {makeSubscribeRequest} from "Utils/basicRequests";
import {cacheCoinDataWrap} from "Redux/actions/actionWrappers";

export const connectViaWebSocket = (link) => {
  return new Promise(function (resolve, reject) {
    let server = new WebSocket(link);
    server.onopen = function () {
      resolve(server);
    };
    server.onerror = function (err) {
      reject(err);
    };
  });
};

export const subscribeOnNotification = (exchange, currency, dispatch, ws) => {
  const id = exchange + "-" + currency;
  const req = makeSubscribeRequest(exchange, currency, id);
  const coinData = {
    exchange: exchange,
    currency: currency,
    price: 0,
    prevPrice: 0
  };
  dispatch(cacheCoinDataWrap(coinData, id));
  ws.send(JSON.stringify(req));
};
