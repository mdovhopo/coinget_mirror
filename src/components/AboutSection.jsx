import React, {Component} from 'react';
import "Style/AboutSection";
import Sign from "Assets/sign.png";
import SignAnalytics from "Assets/sign-analytics.png";
import SignExch from "Assets/sign-exch.png";
import HoneyComb from "Assets/honeycomb-centre.png";
import SignApp from "Assets/sign-app.png";
import SignApp2 from "Assets/sign-app-2.png";
import OneSec from "Assets/1-sec.png";
import {isElementVisible} from "Utils/utils";

class AboutSection extends Component {
  state = {
    leftSectionAnimateClass: "invisible",
    rightSectionAnimateClass: "invisible",
  };

  componentDidMount() {
    for (let event of ["scroll", "resize"]) {
      document.addEventListener(event, () => {
        this.animateSideElements();
      });
    }
  }

  componentWillUnmount() {
    for (let event of ["scroll", "resize"]) {
      document.addEventListener(event, () => {
        this.animateSideElements();
      });
    }
  }

  animateSideElements = () => {
    if (isElementVisible(this.leftSection)) {
      if (this.state.leftSectionAnimateClass === "invisible")
        this.setState({leftSectionAnimateClass: "animation-fade-left"});
    } else {
      if (this.state.leftSectionAnimateClass === "animation-fade-left")
        this.setState({leftSectionAnimateClass: "invisible"});
    }
    if (isElementVisible(this.rightSection)) {
      if (this.state.rightSectionAnimateClass === "invisible")
        this.setState({rightSectionAnimateClass: "animation-fade-right"});
    } else {
      if (this.state.rightSectionAnimateClass === "animation-fade-right")
        this.setState({rightSectionAnimateClass: "invisible"});
    }
  };

  render() {
    const {leftSectionAnimateClass, rightSectionAnimateClass} = this.state;
    return (
      <div id="about" className="about-container">
        <div className="about-wrapper">
          <div className="align-center">
            <div className="description">
              <span className="bold">COINGET</span> - is the first desktop (window & Mac Os) application which allows
              you to analyze the trade income taking into account the value of the currency at the time of the
              transaction.
            </div>
          </div>
          <div className="honeycombs">
            <div className={"left-section " + leftSectionAnimateClass} ref={(el) => {
              this.leftSection = el
            }}>
              <div className="about-item item-left">
                <div className="item-text">
                  <p>
                            <span>
                                All data stores local on you Pc or Mac
                            </span>
                  </p>
                </div>
                <div className="item-image">
                  <img src={Sign} alt=""/>
                </div>
              </div>
              <div className="about-item item-left">
                <div className="item-text">
                  <p>
                            <span>
                                Exclusive analytics of personal income
                            </span>
                  </p>
                </div>
                <div className="item-image">
                  <img src={SignAnalytics} alt=""/>
                </div>
              </div>
              <div className="about-item item-left">
                <div className="item-text">
                  <p>
                            <span>
                                10 exchanges history support
                            </span>
                  </p>

                </div>
                <div className="item-image">
                  <img src={SignExch} alt=""/>
                </div>
              </div>
            </div>
            <div className="center-section">
              <div className="center-honeycomb">
                <img src={HoneyComb} alt=""/>
                <div className="honeycomb-content">
                  Why<br/>
                  Coinget?
                </div>
              </div>
            </div>
            <div className={"right-section " + rightSectionAnimateClass} ref={(el) => {
              this.rightSection = el}
            }>
              <div className="about-item item-right">
                <div className="item-image">
                  <img src={SignApp} alt=""/>
                </div>
                <div className="item-text ">
                  <p>
                            <span>
                                One App for manager portfolio and trading
                            </span>
                  </p>
                </div>
              </div>
              <div className="about-item item-right">
                {/**/}
                <div className="item-image">
                  <img src={SignApp2} alt=""/>
                </div>
                <div className="item-text ">
                  <p>
                            <span>
                                One App for manager portfolio and trading
                              {/**/}
                            </span>
                  </p>
                </div>
              </div>
              <div className="about-item item-right">
                {/**/}
                <div className="item-image">
                  <img src={OneSec} alt=""/>
                </div>
                <div className="item-text ">
                  <p>
                            <span>
                                1 sec sync time. Over 100 gb of data
                            </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutSection;

