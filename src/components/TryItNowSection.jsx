import React, {Component} from 'react';
import BasicButton from "Components/BasicButton";
import FacebookIcon from "Assets/social-network-f.png";
import TwitterIcon from "Assets/social-network-1-tw.png";
import InstIcon from "Assets/social-network-in.png";
import "Style/TryItNowSection";
import DropDownSVG from "Components/DropDownSVG";
import Icon1 from "Assets/icon.png";
import Icon2 from "Assets/icon-2.png";
import Icon3 from "Assets/icon-3.png";
import SmallCube from "Assets/cube-1.png";
import LargeCube from "Assets/cube-2.png";
import Sphere1 from "Assets/sphere-2.png";
import Sphere2 from "Assets/sphere-3.png";
import Sphere3 from "Assets/sphere-1.png";
import Background from "Assets/background.png";
import {connect} from "react-redux";
import GetCoursePopUp from "Components/GetCoursePopUp";
import {Parallax} from "react-scroll-parallax";
import {getCourse} from "Utils/api";
import EventEmitter from "Utils/EventEmitter";
import ParallaxItem from "Components/ParallaxItem";

const parallaxShapesParams = [
  {className: "parallax-shape-left sphere-1", y:[-1000, 1000], src: Sphere1},
  {className: "parallax-shape-left sphere-2", y:[0, 600], src: Sphere2},
  {className: "parallax-shape-left sphere-3", y:[-200, 1100], src: Sphere3},
  {className: "parallax-shape-right cube-1", y:[-650, 750], src: SmallCube},
  {className: "parallax-shape-right cube-2", y:[-200, 500], src: LargeCube}
];

const ParallaxOverlay = () => (
  <div className="parallax-overlay">
    {parallaxShapesParams.map((shape, index) => (
        <Parallax key={index} className={shape.className} disabled={false} y={shape.y} tagInner="div" tagOuter="div">
          <img src={shape.src} alt="sphere"/>
        </Parallax>
    ))}
  </div>
);

class TryItNowSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showGetCourse: false,
      currentExchange: "",
      currentCurrency: "",
      currentDate: 0,
      currentCourse: -1,
      width: 0,
      height: 0
    }
  }

  setCurrentDate = (date) => {
    this.setState({currentDate: date});
  };

  setCurrentExchange = (exchange) => {
    this.setState({currentExchange: exchange});
  };

  setCurrentCurrency = (currency) => {
    this.setState({currentCurrency: currency});
  };

  openGetCourse = () => {
    const {currentExchange, currentCurrency, currentDate} = this.state;
    if (currentExchange === "" || currentCurrency === "" || currentDate === 0)
      return this.setState({showGetCourse: true});
    getCourse(currentExchange, currentCurrency, currentDate)
      .then(res => this.setState({currentCourse: res.data, showGetCourse: true}))
      .catch(() => this.setState({showGetCourse: true}));
  };

  closeGetCourse = (e) => {
    this.setState({showGetCourse: false, currentCourse: -1});
  };

  updateDimensions = () => {
    this.setState({width: innerWidth, height: innerHeight});
  };

  componentWillMount() {
    this.updateDimensions();
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  };

  _getParallaxXOffset = () => {
    if (this.state.width < 2000) return "-275px";
    if (this.state.width < 2500) return "-280px";
    else if (this.state.width < 3000) return "-330px";
    return "-360px";
  };

  render() {
    const parallaxXOff = this._getParallaxXOffset();
    return (
      <div className="try-it-now-section align-center">
        {/*<div className="try-it-now-background-wrap">*/}
        {/*  /!*<Parallax disabled={false} y={[parallaxXOff, "200px"]} tagInner="div" tagOuter="div">*!/*/}
        {/*  <img className="try-it-now-background" src={Background} alt=""/>*/}
        {/*  /!*</Parallax>*!/*/}
        {/*</div>*/}
        <ParallaxItem
          image={Background}
          startOffset={80}
          speed={0.5}
        />
        <div className="try-it-now-inner-section">
          <div className="heading">
            {/*<ParallaxOverlay />*/}
            <p>CRYPTO TRADING ANALYTIC TOOL</p>
            <div className="px-1">
              <span>Desktop app for true profit and loss calculations across multiple exchanges</span>
            </div>
            <div className="social-media-links">
              <a href="/"><img className="social-media-link" src={FacebookIcon} alt="facebook-link"/></a>
              <a href="/"><img className="social-media-link" src={TwitterIcon} alt="twitter-link"/></a>
              <a href="/"><img className="social-media-link" src={InstIcon} alt="instagram-link"/></a>
            </div>
            <div className="try-it-now-btn-container align-center">
              <BasicButton
                onClick={() => EventEmitter.dispatch("openLoginForm", null)}
                className="try-it-now-btn gold-btn" maxWidth="340px">
                TRY IT NOW
              </BasicButton>
            </div>
          </div>
          <div className="get-course-container">
            <div className="get-course-line">
              <DropDownSVG
                zIndex={100}
                onItemClick={this.setCurrentExchange}
                content={Object.keys(this.props.exchanges)}
                loadingContent={"Loading..."}
                icon={Icon1} width="220" style="exchange-btn">
                Exchange name
              </DropDownSVG>
              <DropDownSVG
                zIndex={99}
                onItemClick={this.setCurrentCurrency}
                content={this.props.exchanges[this.state.currentExchange]}
                loadingContent={"Select Exchange"}
                icon={Icon3} width="170" style="coin-name-btn">
                Coin name
              </DropDownSVG>
            </div>
            <div className="get-course-line">
              <DropDownSVG
                zIndex={98}
                datepicker={true}
                onItemClick={this.setCurrentDate}
                icon={Icon2} width="220" style="exchange-btn">
                Select date
              </DropDownSVG>
              <div className="get-course-item">
                <div className="get-coin-btn-container">
                  <BasicButton className="rounded-btn z-on-top" maxWidth={170} minWidth={170} onClick={this.openGetCourse}>
                    Get Course
                  </BasicButton>
                  <GetCoursePopUp
                    show={this.state.showGetCourse}
                    onClose={this.closeGetCourse}
                    onErrorText="Select exchange, coin and date first"
                    course={this.state.currentCourse}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exchanges: state.rootReducer.exchanges
});

export default connect(mapStateToProps)(TryItNowSection);