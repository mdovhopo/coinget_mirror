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
  state = {
    formMode: "sign in",
    name: {value: "", valid: true},
    email: {value: "", valid: true},
    password: {value: "", valid: true},
    checkbox: true,
    errorMsg: "",
    successMsg: ""
  };

  _renderSignInFooter = () => (
    <div className="restore-password">
      <div className="restore-password-img">
        <img src={Restore} alt=""/>
      </div>
      <span><a href="#" onClick={() => {
        this.setState({formMode: "restore", errorMsg: ""});
      }}>Restore my password</a></span>
    </div>
  );

  _renderRegisterFooter = () => (
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
  );

  _renderRestoreFooter = () => (
    <div className="restore-password">
      <div className="restore-password-img">
      </div>
    </div>
  );

  actionsContent = {
    "sign in": {headerName :"Login", footerContent: this._renderSignInFooter(), submitBtnName: "Sign in", api: "/auth/login"},
    "register": {headerName: "Create an Account", footerContent: this._renderRegisterFooter(), submitBtnName: "Register", api: "/register"},
    "restore": {headerName: "Restore password", footerContent: this._renderRestoreFooter(), submitBtnName: "Restore" , api: "/password/email"}
  };

  _sendAuthRequest = () => {
    const {name, email, password, formMode} = this.state;
    let data = new FormData();

    const path = this.actionsContent[formMode].api;

    data.append('email', email.value);
    if (formMode === "sign in" || formMode === "register") {
      data.append('password', password.value);
    }
    if (formMode === "register") {
      data.append('name', name.value);
      data.append('password_confirmation', password.value);
      data.append('locale', navigator.language);
    }
    authRequest(data, path)
      .then((res) => (
        formMode === "restore" ? this.onSuccessfulRestore(res) : profileRedirect(res.data.access_token))
      )
      .catch(error => {
        const err = error.toString();
        if (err.indexOf("401") > -1) this.setState({errorMsg: "Wrong password or e-mail"});
        else if (err.indexOf("422") > -1) this.setState({errorMsg: "User exists"});
        else if (err.indexOf("400") > -1) this.setState({errorMsg: "No such user"});
        else this.setState({errorMsg: "Unknown Error"})
      });
  };

  onSuccessfulRestore = (res) => {
    if (res.status === 200) {
      this.setState({formMode: "sign in", successMsg: res.data.message});
      setTimeout(() => {
        this.setState({successMsg: ""})
      }, 4000);
    }
  };

  submitForm = () => {
    const {name, email, password, checkbox} = this.state;
    if (!name.valid || !email.valid || !password.valid || !checkbox) {
      return this.setState({errorMsg: "Not valid data"});
    }
    this._sendAuthRequest();
  };

  switchLoginFormMode = () => {
    const newMode = this.state.formMode === "sign in" ? "register" : "sign in";
    this.setState({formMode: newMode, errorMsg: ""});
  };

  onInputChange = (e) => {
    const {name, value} = e.target;
    const isValid = validateInput(value, name);
    e.target.classList = [isValid === true ? "good-input" : "wrong-input"];
    this.setState({[name]: {value: value, valid: isValid}, errorMsg: ""});
  };

  handleCheckbox = () => {
    this.setState({checkbox: !this.state.checkbox, errorMsg: ""});
  };

  render() {
    const mode = this.state.formMode;
    const actionContent = this.actionsContent[mode];
    return (
      <Modal dialogClassName="login-wrapper" show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header className="login-header">
          <Modal.Title bsPrefix="login-header-content">
            <div>{actionContent.headerName}</div>
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
            {mode === "sign in" || mode === "restore" ? undefined :
              <input name="name" onChange={this.onInputChange} type="text" placeholder="Name"/>}
                <input name="email" onChange={this.onInputChange} type="email" placeholder="Email"/>
            {mode === "restore" ? undefined :
            <input name="password" onChange={this.onInputChange} type="password" placeholder="Password"/>}
          </form>
          <div className="error-msg">
            {this.state.errorMsg}
          </div>
          <div className="success-msg">
            {this.state.successMsg}
          </div>
          <div className="sign-in">
            {actionContent.footerContent}
            <BasicButton className="btn-black" maxWidth={250} onClick={this.submitForm}>
              {actionContent.submitBtnName}
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