import React, {Component} from 'react';
import NavBar             from "Components/NavBar";
import TryItNowSection    from "Components/TryItNowSection";
import CourseSection      from "Components/CourseSection";
import Header             from "Components/Header";
import AboutSection       from "Components/AboutSection";
import Pricing            from "Components/Pricing";
import SupportedExchanges from "Components/SupportedExchanges";
import Footer             from "Components/Footer";
import SubscribeForm      from "Components/SubscribeForm";
import {connect}          from "react-redux";
import Slider             from "Components/Slider";
import {getExchanges}     from "Utils/ApiMap";

// TODO google fb login
// reference: https://medium.com/@rocksinghajay/login-with-facebook-and-google-in-reactjs-990d818d5dab

type Props = {
    dispatch: Function
}

class App extends Component<Props> {
    componentDidMount() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        getExchanges(this.props.dispatch);
    }

    render() {
        return (
            <>
                <NavBar/>
                <TryItNowSection/>
                <CourseSection/>
                <Header>About Coinget</Header>
                <AboutSection/>
                <Header>Gallery</Header>
                <Slider/>
                <Header>Pricing</Header>
                <Pricing/>
                <Header>Subscribe Form</Header>
                <SubscribeForm/>
                <Header>Supported exchanges</Header>
                <SupportedExchanges/>
                <Footer/>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    exchanges: state.rootReducer.exchanges
});

export default connect(mapStateToProps)(App);
