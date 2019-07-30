import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import BasicButton from "Components/BasicButton";
import "Style/LoginFormPopUp";
import Google from "Assets/logo-google.png";
import Facebook from "Assets/facebook.png";
import Restore from "Assets/symbol-restore.png";
import Cross from "Assets/icons8-delete-40.png";
import validateInput from "Utils/inputValidate";
import {authRequest, profileRedirect} from "Utils/api";

class LoginFormPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMode: "sign in",
      name: {value: "Max", valid: true},
      email: {value: "dovgopolyy0000@gmail.com", valid: true},
      password: {value: "olegloh14", valid: true},
      checkbox: true,
      errorMsg: ""
    };
  }

  componentDidMount() {

  }

  _sendAuthRequest = () => {
    const {name, email, password, formMode} = this.state;
    let data = new FormData();

    const path = formMode === "sign in" ? "/auth/login" : "/register";

    data.append('email', email.value);
    data.append('password', password.value);
    if (formMode === "register") {
      data.append('name', name.value);
      data.append('password_confirmation', password.value);
      data.append('locale', navigator.language);
    }
    authRequest(data, path)
      .then((res) => profileRedirect(res.data.access_token))
      .catch(error => {
        const err = error.toString();
        if (err.indexOf("401") > -1) this.setState({errorMsg: "Authentication failed"});
        else if (err.indexOf("422") > -1) this.setState({errorMsg: "User exists"});
        else this.setState({errorMsg:  "Unknown Error"})
      });
  };

  submitForm = () => {
    const {name, email, password, checkbox} = this.state;
    console.log("Submit form", name.valid, email.valid, password.valid, checkbox);
    if (!name.valid || !email.valid || !password.valid || !checkbox) {
      return this.setState({errorMsg: "Not valid data"});
    }
    switch (this.state.formMode) {
      case "register":
        console.log("register",);
        this._sendAuthRequest();
        break;
      case "sign in":
        this._sendAuthRequest();
        console.log("sign in");
        break;
      default:
        console.log("Unknown action");
    }
  };

  switchLoginFormMode = () => {
    const newMode = this.state.formMode === "sign in" ? "register" : "sign in";
    this.setState({formMode: newMode});
  };

  onInputChange = (e) => {
    const {name, value} = e.target;
    const isValid = validateInput(value, name);
    e.target.classList = [isValid === true ? "good-input" : "wrong-input"];
    this.setState({[name]: {value: value, valid: isValid}, errorMsg: ""});
  };

  handleCheckbox = (e) => {
    console.log("Checkbox:", !this.state.checkbox);
    this.setState({checkbox: !this.state.checkbox, errorMsg: ""});
  };

  render() {
    const mode = this.state.formMode;
    return (
      <Modal dialogClassName="login-wrapper" show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header className="login-header">
          <Modal.Title bsPrefix="login-header-content">
            <div>{mode === "sign in" ? "Login" : "Create an Account"}</div>
            <div onClick={this.props.onHide}><img src={Cross} alt="close" width={30} height={30}/></div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="login-body">
          <div className="login-social-auth">
            <div className="auth" onClick={() => console.log("Google login")}>
              <div className="logo">
                <img src={Google} alt="google logo"/>
              </div>
              Sign in with Google
            </div>
            <div className="auth" onClick={() => console.log("FB login")}>
              <div className="logo">
                <img src={Facebook} alt="facebook logo"/>
              </div>
              Sign in with Facebook
            </div>
          </div>
          <div className="or-line">
            <span>or</span>
          </div>
          <form className="login-form">
            {mode === "sign in" ? undefined :
              <input defaultValue="Max" name="name" onChange={this.onInputChange} type="text" placeholder="Name"/>}
            <input defaultValue="dovgopolyy0000@gmail.com" name="email" onChange={this.onInputChange} type="email" placeholder="Email"/>
            <input defaultValue="olegloh14" name="password" onChange={this.onInputChange} type="password" placeholder="Password"/>
          </form>
          <div className="error-msg">
            {this.state.errorMsg}
          </div>
          <div className="sign-in">
            {this.state.formMode === "sign in" ?
              <div className="restore-password">
                <div className="restore-password-img">
                  <img src={Restore} alt=""/>
                </div>
                <span><a href="/">Restore my password</a></span>
              </div> :
              <div className="checkbox-container">
                <div>
                  <input type="checkbox" className="checkbox"/>
                </div>
                <span>
                      <input type="checkbox" className="checkbox"/>
                      <label className={this.state.checkbox ? "checked" : "not-checked"} onClick={this.handleCheckbox}>
                        I read and accept terms and conditions
                      </label>
                    </span>
              </div>
            }
            <BasicButton className="btn-black" maxWidth={250} onClick={this.submitForm}>
              {mode === "sign in" ? "Sign in" : "Register"}
            </BasicButton>
          </div>
        </Modal.Body>
        <Modal.Footer className="login-footer">
          <div>
              <span>
              {mode === "sign in" ? "Are you haven't account?" : "Allready a member? "}
              </span>
          </div>
          <BasicButton maxWidth={250} onClick={this.switchLoginFormMode}>
            {mode === "sign in" ? "Register" : "Sign in"}
          </BasicButton>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LoginFormPopUp;