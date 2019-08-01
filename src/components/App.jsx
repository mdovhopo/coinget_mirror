import React, {Component} from 'react';
import NavBar from "Components/NavBar";
import TryItNowSection from "Components/TryItNowSection";
import CourseSection from "Components/CourseSection";
import Header from "Components/Header";
import AboutSection from "Components/AboutSection";
// import Slider from "Components/Slider";
import Pricing from "Components/Pricing";
import SupportedExchanges from "Components/SupportedExchanges";
import Footer from "Components/Footer";
import SubscribeForm from "Components/SubscribeForm";
import {connect} from "react-redux";
import ConnectWebSocket from "Components/ConnectWebSocket";
import SubscribeOnCoins from "Components/SubscribeOnCoins";
import Slider from "Components/Slider";


// TODO google fb login
// reference: https://medium.com/@rocksinghajay/login-with-facebook-and-google-in-reactjs-990d818d5dab

// import FacebookLogin from 'react-facebook-login';
//
// import GoogleLogin from 'react-google-login';
//
// class App extends Component {
//
//   render() {
//
//     const responseFacebook = (response) => {
//       console.log(response);
//     };
//
//     const responseGoogle = (response) => {
//       console.log(response);
//     };
//
//     return (
//       <div className="App">
//         <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
//
//         <FacebookLogin
//           appId="" //APP ID NOT CREATED YET
//           fields="name,email,picture"
//           callback={responseFacebook}
//         />
//         <br />
//         <br />
//
//
//         <GoogleLogin
//           clientId="" //CLIENTID NOT CREATED YET
//           buttonText="LOGIN WITH GOOGLE"
//           onSuccess={responseGoogle}
//           onFailure={responseGoogle}
//         />
//
//       </div>
//     );
//   }
// }

// export default App;

class App extends Component {
  componentDidMount() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
  render() {
    // console.log("App", this.props);
    return (
      <>
        <ConnectWebSocket />
        <SubscribeOnCoins />
        <NavBar/>
        {/*<ParallaxProvider>*/}
          <TryItNowSection/>
        {/*</ParallaxProvider>*/}
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

const mapStateToProps = (state) => ({
  exchanges: state.rootReducer.exchanges,
  ws: state.rootReducer.webSocket
});

export default connect(mapStateToProps)(App);
