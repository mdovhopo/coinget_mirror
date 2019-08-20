import React, {Component}               from 'react';
import Modal                            from "react-bootstrap/Modal";
import BasicButton                      from "Components/BasicButton";
import "Style/LoginFormPopUp";
import Restore                          from "Assets/symbol-restore.png";
import validateInput                    from "Utils/InputValidate";
import {authRequest, dashboardRedirect} from "Utils/ApiMap";
import FacebookLogin                    from 'react-facebook-login';
import SocialAuthGoogle                 from "Components/SocialAuthGoogle";
import SocialAuthFB                     from "Components/SocialAuthFB";
import {AxiosResponse}                  from "axios";
import GetCoursePopUp                   from "Components/GetCoursePopUp";

type InputValueState = {
    value: string,
    valid: boolean
}

interface IActionsContent {
    [key: string]: {
        headerName: string,
        footerContent: any,
        submitBtnName: string,
        api: string
    }
}

type State = {
    formMode: string,
    name: InputValueState,
    email: InputValueState,
    password: InputValueState,
    checkbox: boolean,
    errorMsg: string,
    successMsg: string
}

type Props = {
    show: boolean,
    onHide: () => void
}

const getInitialState = (): State => ({
    formMode: "sign in",
    name: {value: "", valid: true},
    email: {value: "", valid: true},
    password: {value: "", valid: true},
    checkbox: true,
    errorMsg: "",
    successMsg: ""
});

class LoginFormPopUp extends Component<Props, State> {
    state = getInitialState();

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

    actionsContent: IActionsContent = {
        "sign in": {
            headerName: "Login",
            footerContent: this._renderSignInFooter(),
            submitBtnName: "Sign in",
            api: "/login"
        },
        "register": {
            headerName: "Create an Account",
            footerContent: this._renderRegisterFooter(),
            submitBtnName: "Register",
            api: "/register"
        },
        "restore": {
            headerName: "Restore password",
            footerContent: this._renderRestoreFooter(),
            submitBtnName: "Restore",
            api: "/password/email"
        }
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
            data.append('locale', navigator.language);
        }
        authRequest(data, path)
            .then((res: AxiosResponse<any>) => {
                    console.log("Auth response", res);
                    if (res.data.result) {
                        formMode === "restore"
                            ? this.onSuccessfulRestore(res)
                            : dashboardRedirect(res.data.token.access_token);
                    } else {
                        console.log("ERROR", res.data.error);
                        let err = "Unknown Error";
                        if (typeof res.data.error === "object") {
                            err = res.data.error.email.join(' ');
                        } else if (typeof res.data.error === "string") {
                            err = res.data.error;
                        }
                        this.setState({errorMsg: err});
                    }
                }
            )
            .catch(error => {
                const err = error.toString();
                if (err.indexOf("401") > -1) this.setState({errorMsg: "Wrong password or e-mail"});
                else if (err.indexOf("422") > -1) this.setState({errorMsg: "User exists"});
                else if (err.indexOf("400") > -1) this.setState({errorMsg: "No such user"});
                else this.setState({errorMsg: error.toString()})
            });
    };

    onSuccessfulRestore = (res: AxiosResponse<any>) => {
        const {status, data} = res;
        if (status === 200) {
            this.setState({formMode: "sign in", successMsg: data.message});
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

    onInputChange = (e: any) => {
        const {name, value} = e.target;
        const isValid = validateInput(value, name);
        e.target.classList = [isValid === true ? "good-input" : "wrong-input"];
        // @ts-ignore
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
                        <div onClick={this.props.onHide} className="close-cross right">
                            {/*<img src={Cross} alt="close" width={30} height={30}/>*/}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="login-body">
                    <div className="login-social-auth">
                        <SocialAuthGoogle/>
                        <SocialAuthFB/>
                    </div>
                    <div className="or-line">
                        <span>or</span>
                    </div>
                    <form className="login-form">
                        {mode === "sign in" || mode === "restore" ? undefined :
                            <input name="name" onChange={this.onInputChange} type="text" placeholder="Name"/>}
                        <input name="email" onChange={this.onInputChange} type="email" placeholder="Email"/>
                        {mode === "restore" ? undefined :
                            <input name="password" onChange={this.onInputChange} type="password"
                                   placeholder="Password"/>}
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
