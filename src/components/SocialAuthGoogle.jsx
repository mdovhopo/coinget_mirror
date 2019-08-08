import React, {Component} from 'react';
import Google from "Assets/logo-google.png";
import "Style/SocialAuth";
import GoogleLogin from 'react-google-login';

class SocialAuthGoogle extends Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response);
    };
      // {/*<GoogleLogin*/}
      // {/*  clientId="<API_KEY>"*/}
      // {/*  className="auth"*/}
      // {/*  style={{width: "100%"}}*/}
      // {/*  buttonText="Sign in with Google"*/}
      // {/*  onSuccess={responseGoogle}*/}
      // {/*  onFailure={responseGoogle}*/}
      // {/*  cookiePolicy={'single_host_origin'}*/}
      // {/*/>*/}
    return (
      <div className="auth" onClick={() => console.log("Google login")}>
        <div className="logo">
          <img src={Google} alt="google logo"/>
        </div>
        Sign in with Google
      </div>
    );
  }
}

export default SocialAuthGoogle;
