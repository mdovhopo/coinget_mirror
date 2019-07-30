import React, {Component} from 'react';
import "Style/SupportedExchanges";
import Coinbase from "Assets/log-coinbase.png";
import Bittrex from "Assets/logo-bittrex.png"
import Poloniex from "Assets/log-poloniex.png";
import Binance from "Assets/logo-binance.png";
import Bitfinex from "Assets/logo-bitfinex.png";
import Kraken from "Assets/logo-kraken.png";
import Arrow from "Assets/arrow-1.png";

class SupportedExchanges extends Component {
  render() {
    return (
      <div name="contact" id="contact" className="exchanges-container exported-exchanges">
        <div className="exchanges-wrap">
          <div className="lines">
            <div className="line">
              <div className="item">
                <div>
                  <img src={Coinbase} alt="coinbase" />

                </div>
              </div>

              <div className="item">
                <div>
                  <img src={Bittrex} alt="bittrex" />

                </div>
              </div>
              <div className="item">

                <div>
                  <img src={Poloniex} alt="poloniex" />

                </div>
              </div>
            </div>

            <div className="line">
              <div className="item">
                <div>
                  <img src={Binance} alt="binance" />
                </div>
              </div>

              <div className="item">
                <div>
                  <img src={Bitfinex} alt="bitfinex" />
                </div>
              </div>

              <div className="item">
                <div>
                  <img src={Kraken} alt="kraken" />
                </div>
              </div>
            </div>
          </div>
          <div className="more">
            <a href="/">
                    <span>
                        More
                    </span>
              <img src={Arrow} alt="arrow" />
            </a>
          </div>
        </div>

      </div>
    );
  }
}

export default SupportedExchanges;