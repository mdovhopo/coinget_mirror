import React, {Component}                                                                  from 'react';
import BasicButton
                                                                                           from "Components/BasicButton";
import FacebookIcon
                                                                                           from "Assets/social-network-f.png";
import TwitterIcon
                                                                                           from "Assets/social-network-1-tw.png";
import InstIcon
                                                                                           from "Assets/social-network-in.png";
import "Style/TryItNowSection";
import DropDownSVG
                                                                                           from "Components/DropDownSVG";
import Icon1                                                                               from "Assets/icon.png";
import Icon2                                                                               from "Assets/icon-2.png";
import Icon3                                                                               from "Assets/icon-3.png";
import SmallCube                                                                           from "Assets/cube-1.png";
import LargeCube                                                                           from "Assets/cube-2.png";
import Sphere1                                                                             from "Assets/sphere-2.png";
import Sphere2                                                                             from "Assets/sphere-3.png";
import Sphere3                                                                             from "Assets/sphere-1.png";
import Background                                                                          from "Assets/background.png";
import {connect}                                                                           from "react-redux";
import GetCoursePopUp
                                                                                           from "Components/GetCoursePopUp";
import {getCourse}                                                                         from "Utils/ApiMap";
import EventEmitter                                                                        from "Utils/EventEmitter";
import ParallaxItem
                                                                                           from "Components/ParallaxItem";
import {MoonLoader}                                                                        from "react-spinners";
import {css}                                                                               from "@emotion/core";
import {CONTENT_LOADING_ERROR, CONTENT_LOADING_IN_PROGRESS, CONTENT_SETTINGS_NOT_COMPLETE} from "Constants/constants";


type State = {
    showGetCourse: boolean,
    currentExchange: string,
    currentCurrency: string,
    currentDate: Date | number,
    currentCourse: string
};
type Props = {
    exchanges: ReduxExchanges
};

const parallaxShapesParams = [
    {className: "parallax-shape-left sphere-1", startOffset: 250, speed: 0.6, src: Sphere1},
    {className: "parallax-shape-left sphere-2", startOffset: 300, speed: 0.4, src: Sphere2},
    {className: "parallax-shape-left sphere-3", startOffset: 350, speed: 0.5, src: Sphere3},
    {className: "parallax-shape-right cube-1", startOffset: 300, speed: 0.45, src: SmallCube},
    {className: "parallax-shape-right cube-2", startOffset: 350, speed: 0.35, src: LargeCube}
];

const override = css`
    display: flex;
    margin: 0 auto;
    border-color: red;
    flex-direction: column;
    justify-content: center;
`;

const getInitialState = (): State => ({
    showGetCourse: false,
    currentExchange: "",
    currentCurrency: "",
    currentDate: 0,
    currentCourse: CONTENT_SETTINGS_NOT_COMPLETE
});

class TryItNowSection extends Component<Props, State> {
    state = getInitialState();

    setCurrentDate = (date: Date | number) => {
        this.setState({currentDate: date});
    };

    setCurrentExchange = (exchange: string) => {
        this.setState({currentExchange: exchange});
    };

    setCurrentCurrency = (currency: string) => {
        this.setState({currentCurrency: currency});
    };

    openGetCourse = () => {
        const {currentExchange, currentCurrency, currentDate} = this.state;
        if (currentExchange === "" || currentCurrency === "" || currentDate === 0)
            return this.setState({showGetCourse: true});
        this.setState({showGetCourse: true, currentCourse: CONTENT_LOADING_IN_PROGRESS});
        getCourse(currentExchange, currentCurrency, currentDate)
            .then(res => this.setState({currentCourse: res.data}))
            .catch(() => this.setState({showGetCourse: true, currentCourse: CONTENT_LOADING_ERROR}));
    };

    closeGetCourse = () => {
        this.setState({showGetCourse: false});
        setTimeout(
            () => this.setState({currentCourse: CONTENT_SETTINGS_NOT_COMPLETE}),
            300);
    };


    render() {
        console.log(this.props.exchanges[this.state.currentExchange]);
        return (
            <div className="try-it-now-section align-center">
                <ParallaxItem
                    background
                    outerClass="parallax-background-wrap"
                    innerClass="parallax-item"
                    image={Background}
                    startOffset={-80}
                    speed={0.3}
                />
                {parallaxShapesParams.map(
                    (shape, index) => {
                        return (
                            <ParallaxItem
                                key={index}
                                outerClass={shape.className}
                                innerClass=""
                                image={shape.src}
                                startOffset={shape.startOffset}
                                speed={shape.speed}
                            />
                        );
                    }
                )}
                <div className="try-it-now-inner-section"
                     onClick={(e: any) => {
                         if (e._dispatchInstances.length === undefined)
                             EventEmitter.dispatch("closeSvgBtnDropdown")
                     }}
                >
                    <div className="heading">
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
                                loadingContent={<MoonLoader size={35} css={override} color={'#cca210'} loading={true}/>
                                }
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
                                    <BasicButton className="rounded-btn" maxWidth={170} minWidth={170}
                                                 onClick={this.openGetCourse}>
                                        Get Course
                                    </BasicButton>
                                    <GetCoursePopUp
                                        show={this.state.showGetCourse}
                                        onClose={this.closeGetCourse}
                                        onErrorText="Error."
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

const mapStateToProps = (state: ReduxState) => ({
    exchanges: state.rootReducer.exchanges
});

export default connect(mapStateToProps)(TryItNowSection);
