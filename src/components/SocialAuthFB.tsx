import React, {Component} from 'react';
import "Style/SocialAuth";
import Facebook           from "Assets/facebook.png";
import {FB_API_KEY}       from "Constants/constants";
import FacebookLogin      from "react-facebook-login";

class SocialAuthFB extends Component {
    fblogin: any;

    render() {
        const componentClicked = (event: any) => {
            console.log("Click:", event);
        };

        const responseFacebook = (response: any) => {
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
