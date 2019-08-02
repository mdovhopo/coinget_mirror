import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {subscribeOnNotification} from "Utils/WebSocketConnect";
import {addExchangeWrap} from "Redux/actions/actionWrappers";

class SubscribeOnCoins extends Component {

  api = "https://backend-land.coinget.io:20443/v3/public/api/info";
  proxy ="https://cors-anywhere.herokuapp.com/";
  // TODO do something with this access through proxy
  componentDidMount() {
    axios.get(this.api + "/exchanges", {
      headers: {
        "Access-Control-Allow-Origin": "backend-land.coinget.io"
      }
      // proxy: {
      //   host: 'backend-land.coinget.io',
      //   port: 20443
      // }
    })
      .then(response => {
        if (response.status === 200) {
          console.log("Exchanges:", response.data);
          // TODO make one more request for markets via this API link
          // https://backend.coinget.io/v3/public/api/info/markets?exchangeId=<Exchange>
          const exchanges = response.data;
          for (const exchange in  exchanges) {
            if (exchanges.hasOwnProperty(exchange)) {
              // axios.get(api + "/markets", {
              //   params: {
              //     exchangeId: exchange
              //   }
              // })
              //   .then(res => console.log(exchange + ": ", res.data))
              //   .catch(err => console.log(err));
              // currency request emulation, TODO: change setTimeout to API request when backend will be ready
              setTimeout(() => {
                const currencies = ["ETH", "BTC"];
                const id = setInterval(() => {
                  if (this.props.ws && this.props.ws.readyState === WebSocket.OPEN) {
                    for (let i = 0; i < currencies.length; i++) {
                      subscribeOnNotification(exchange, currencies[i], this.props.dispatch, this.props.ws);
                    }
                    clearInterval(id);
                  }
                }, 300);
                this.props.dispatch(addExchangeWrap({[exchange]: currencies}));
              }, Math.random() * 500);
            }
          }
        }


      })
      .catch(err => console.log("ERROR", err))
  }

  render() {
    return null;
  }
}

export default connect(state => ({
  ws: state.rootReducer.webSocket
}))(SubscribeOnCoins);