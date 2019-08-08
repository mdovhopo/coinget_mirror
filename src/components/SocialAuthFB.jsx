import React, {Component} from 'react';
import "Style/SocialAuth";
import Facebook from "Assets/facebook.png";
import {FB_API_KEY} from "Constants/index";
import FacebookLogin from "react-facebook-login";

class SocialAuthFB extends Component {
  render() {
    const componentClicked = (event) => {
      console.log("Click:", event);
    };

    const responseFacebook = (response) => {
      if (response.error !== undefined) {
        console.log("Error", response);
        return;
      }
      console.log("FB:", response);
    };
    return (
      <>
      <FacebookLogin
        ref={(el) => this.fblogin = el}
        appId={FB_API_KEY}
        icon={<img src={Facebook} className={"logo"} alt="facebook logo"/>}
        fields="name,email,picture"
        cssClass="auth"
        textButton="Sign in with Faceboook"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </>
    );
  }
}

export default SocialAuthFB;
