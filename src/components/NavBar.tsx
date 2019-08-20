import React, {Component} from 'react';
import LogoCopyDesktop    from "Assets/logo-copy.png";
import LogoCopyMobile     from "Assets/logo.png";
import {Button}           from "react-bootstrap";
import BasicButton        from "Components/BasicButton";
import "Style/NavBar";
import LoginFormPopUp     from "Components/LoginFormPopUp";
import {getMyUser}        from "Utils/ApiMap";
import EventEmitter       from "Utils/EventEmitter";
import {
    CONTENT_LOADED,
    CONTENT_LOADING_ERROR,
    CONTENT_LOADING_IN_PROGRESS,
    DASHBOARD_URL
}                         from "Constants/constants";
import {URLRedirect}      from "Utils/Utils";
import {ClipLoader}       from "react-spinners";

type Props = {}
type State = {
    openMobileMenu: boolean,
    openLoginMenu: boolean,
    authorized: string,
    locationURL: string
}

const getInitialState = (): State => ({
    openMobileMenu: false,
    openLoginMenu: false,
    authorized: CONTENT_LOADING_IN_PROGRESS,
    locationURL: ""
});

class NavBar extends Component<Props, State> {
    state = getInitialState();

    componentDidMount() {
        EventEmitter.subscribe("openLoginForm", this.handleLoginForm);
        const token = localStorage.getItem("access_token");
        if (!token) return this.setState({authorized: CONTENT_LOADING_ERROR});
        getMyUser(token)
            .then(() => {
                this.setState({authorized: CONTENT_LOADED, locationURL: DASHBOARD_URL});
            })
            .catch(() => {
                this.setState({authorized: CONTENT_LOADING_ERROR})
            });
    }

    handleLoginForm = () => {
        this.setState({openLoginMenu: !this.state.openLoginMenu});
    };

    _renderLogo = (logo: string) => (
        <div>
            <a className="navbar-brand m-0 p-0">
                <div className="terms-check-container">
                    <img className="nav-logo" src={logo} alt="logo"/>
                </div>
            </a>
        </div>
    );

    _renderLoginButton = () => {
        const {authorized} = this.state;
        let buttonCallback = () => {
        };
        let buttonName: any = <ClipLoader size={15} loading={true} color={'#cca210'}/>;
        if (authorized === CONTENT_LOADED) {
            buttonName = "Profile";
            buttonCallback = () => URLRedirect(DASHBOARD_URL);
        } else if (authorized === CONTENT_LOADING_ERROR) {
            buttonName = "Login";
            buttonCallback = this.handleLoginForm;
        }
        return (<li className="menu-item p-2">
            <a className="menu-link">
                <BasicButton minWidth={100} onClick={buttonCallback}>
                    {buttonName}
                </BasicButton>
            </a>
        </li>);
    };

    _renderMenuItems = (size: string) => (
        <ul className={"navbar-nav menu"} id="example-collapse-text">
            <p className="hide-desktop gold-text">Menu</p>
            {size === "mobile" ? this._renderLoginButton() : undefined}
            <li className="menu-item p-2">
                <a className="menu-link" href='#about'>
                    About Coinget
                </a>
            </li>
            <li className="menu-item p-2">
                <a className="menu-link" href='#price'>
                    Pricing
                </a>
            </li>
            <li className="menu-item p-2">
                <a className="menu-link" href='#subscribe'>
                    Subscribe
                </a>
            </li>
            <li className="menu-item p-2">
                <a className="menu-link" href='#contact'>
                    Contact Us
                </a>
            </li>
            {size === "desktop" ? this._renderLoginButton() : undefined}
        </ul>
    );

    render() {
        const {openMobileMenu} = this.state;
        return (
            <div className="navbar-dark black-bg align-center">
                <div className="menu-container navbar justify-content-between m-0 p-0">
                    <div className="hide-mobile hide-tablet">
                        {this._renderLogo(LogoCopyDesktop)}
                    </div>
                    <div className="hide-mobile hide-tablet">
                        {this._renderMenuItems("desktop")}
                    </div>
                    <div className="hide-desktop">
                        {this._renderLogo(LogoCopyMobile)}
                    </div>
                    <div className="hide-desktop">
                        <Button
                            className="navbar-toggler"
                            onClick={() => this.setState({openMobileMenu: !openMobileMenu})}
                            aria-controls="example-collapse-text"
                            aria-expanded={openMobileMenu}
                        >
            <span className="navbar-toggler-icon">
            </span>
                        </Button>
                    </div>
                </div>
                <div className={"hide-desktop " + (openMobileMenu === true ? "open-menu" : "close-menu")}>
                    {this._renderMenuItems("mobile")}
                </div>
                <LoginFormPopUp
                    show={this.state.openLoginMenu}
                    onHide={this.handleLoginForm}
                />
            </div>
        );
    }
}

export default NavBar;
