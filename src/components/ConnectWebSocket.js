import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectViaWebSocket} from "Utils/WebSocketConnect";
import {addTokenToWatchWrap, saveWebSocketWrap, updateTokenDataWrap} from "Redux/actions/actionWrappers";

const WSLink = 'wss://backend-land.coinget.io/v3/public/ws';

class ConnectWebSocket extends Component {
  constructor(props) {
    super(props);
    connectViaWebSocket(WSLink)
      .then(ws => {
        console.log("WS Connected");
        ws.onmessage = (response) => {
          const receivedData = JSON.parse(response.data);
          // console.log(receivedData);
          if (receivedData.hasOwnProperty("result")) {
            this.props.dispatch(addTokenToWatchWrap(receivedData.result, receivedData.id));
          } else if (receivedData.hasOwnProperty("method") && receivedData.method === "notification") {
            // console.log(receivedData.params);
            this.props.dispatch(updateTokenDataWrap(receivedData.params.token, receivedData.params.data));
          }
        };
        this.props.dispatch(saveWebSocketWrap(ws));
      })
      .catch(err => console.log(err));
  }
  render() {
    // console.log("ConnectWebSocket", this);
    return null;
  }
}

export default connect()(ConnectWebSocket);