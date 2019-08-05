import React, {Component} from 'react';
import "Style/Pricing";
import BasicButton from "Components/BasicButton";
import HoneyComb10 from "Assets/honeycomb-10.png"
import HoneyComb99 from "Assets/honeycomb-99.png"
import HoneyCombFree from "Assets/honeycomb-free.png";
import {connect} from "react-redux";
import EventEmitter from "Utils/EventEmitter";
import Arrow from "Assets/arrow-2.png";


class Pricing extends Component {
  collapsed = true;
  collapseElements = [];

  collapseSection = (element) => {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
  };

  expandSection = (element) => {
    const sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';
    const transitionCallback = e =>  {
      element.removeEventListener('transitionend', transitionCallback);
      element.style.height = null;
    };
    element.addEventListener('transitionend', transitionCallback);
  };

  toggleCollapse = () => {
    for(const element of this.collapseElements) {
      if(this.collapsed === true) {
        this.expandSection(element);
      } else {
        this.collapseSection(element);
      }
    }
    this.collapsed = !this.collapsed;
  };

  render() {
    return (
      <div name="price" id="price" className="pricing-container">
        <div className="prising-wrap">
          <div className="price-item little-item" style={{height: 0}} ref={(el) => this.collapseElements.push(el)}>
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
          <div className="price-item little-item" style={{height: 0}} ref={(el) => this.collapseElements.push(el)}>
            {/*<div className="price-item little-item">*/}

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
        <div className="prising-more-btn">
          <div onClick={this.toggleCollapse}>
            More
            <img src={Arrow} alt="arrow"/>
          </div>
        </div>
      </div>

    );
  }
}

export default connect()(Pricing);
