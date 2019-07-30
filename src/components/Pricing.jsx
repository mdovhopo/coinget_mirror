import React, {Component} from 'react';
import "Style/Pricing";
import BasicButton from "Components/BasicButton";
import HoneyComb10 from "Assets/honeycomb-10.png"
import HoneyComb99 from "Assets/honeycomb-99.png"
import HoneyCombFree from "Assets/honeycomb-free.png";
import {connect} from "react-redux";
import {switchLoginFormWrap} from "Redux/actions/actionWrappers";
import EventEmitter from "Utils/EventEmitter";

class Pricing extends Component {
  render() {
    return (
      <div name="price" id="price" className="pricing-container">
        <div className="prising-wrap">
          <div className="price-item little-item">
            <div className="name">
              Month
            </div>
            <div className="price">
              10$ - 2 clients
            </div>
            <div className="content">
              <div className="honeycomb">
                <div className="honeycomb-item">
                  <img src={HoneyComb10} alt="10$"/>
                </div>
              </div>
              <div className="footer ">
              <BasicButton
                onClick={() => EventEmitter.dispatch("openLoginForm", null)}
              >
                Sign Up
              </BasicButton>
                </div>
            </div>
          </div>
          <div className="price-item big-item">
            <div className="sale">
              <div className="honeycomb">
                <div className="honeycomb-item">
                  <img src={HoneyCombFree} alt="free"/>
                </div>
              </div>
            </div>
            <div className="name">
              Trial Period
            </div>
            <div className="price"></div>
            <div className="content">
              <div className="honeycomb">
                <div>
                  <div className="center-x" style={{color: "white", fontSize: "79.5px", letterSpacing: "0.8px", fontWeight: "bold"}}>
                    30
                  </div>
                  <div className="center-x" style={{fontSize: "48.5px", fontWeight: "bold", letterSpacing: "0.5px"}}>
                    DAYS FREE
                  </div>
                </div>
              </div>
              <div className="footer ">
                <BasicButton
                  onClick={() => EventEmitter.dispatch("openLoginForm", null)}
                >
                  Sign Up
                </BasicButton>
              </div>
            </div>
          </div>
          <div className="price-item little-item">
            <div className="name">
              Year
            </div>
            <div className="price">
              BEST OFFER
            </div>
            <div className="content">
              <div className="honeycomb">
                <div className="honeycomb-item">
                  <img src={HoneyComb99} alt="99$"/>
                </div>
              </div>
              <div className="footer ">
                <BasicButton
                  onClick={() => EventEmitter.dispatch("openLoginForm", null)}
                >
                  Sign Up
                </BasicButton>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default connect()(Pricing);