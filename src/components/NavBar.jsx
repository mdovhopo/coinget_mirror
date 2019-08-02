import React, {Component} from 'react';
import LogoCopyDesktop from "../assets/logo-copy.png";
import LogoCopyMobile from "../assets/logo.png";
import {Button }from "react-bootstrap";
import BasicButton from "Components/BasicButton";
import "Style/NavBar";
import LoginFormPopUp from "Components/LoginFormPopUp";
import {getProfile} from "Utils/api";
import EventEmitter from "Utils/EventEmitter";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMobileMenu: false,
      openLoginMenu: false,
      authorized: false,
      locationURL: ""
    };
    EventEmitter.subscribe("openLoginForm", this.handleLoginForm);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    getProfile(token)
      .then(res => {
          if (res.status === 200) {
          // console.log(res);
          // TODO if token valid use it for login.
            localStorage.removeItem("token");
            console.log("Auth token valid! Set login button to profile");
          this.setState({authorized: true, locationURL: res.config.url});
        }
      })
      .catch((err) => {
        // console.log(err);
        console.log("Auth token is not valid! removing...");
        localStorage.removeItem("token")
      });
  }

  handleLoginForm = () => {
    this.setState({openLoginMenu: !this.state.openLoginMenu});
  };

  _renderLogo = (logo) => (
    <div>
      <a className="navbar-brand m-0 p-0">
        <div className="terms-check-container">
          <img className="nav-logo" src={logo} alt="logo"/>
        </div>
      </a>
    </div>
  );

  handleRedirect = () => {
    window.location = this.state.locationURL;
  };

  _renderLoginButton = () => (
    <li className="menu-item p-2">
      <a className="menu-link">
        <BasicButton onClick={this.state.authorized ?
          this.handleRedirect :
          this.handleLoginForm
        }>
          {this.state.authorized ? "Profile" : "Login"}
        </BasicButton>
      </a>
    </li>
  );

  _renderMenuItems = (size) => (
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
        {size === "desktop" ? this._renderLoginButton() : undefined }
      </ul>
  );

  render() {
    const { openMobileMenu } = this.state;
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
          onClick={() => this.setState({ openMobileMenu: !openMobileMenu })}
          aria-controls="example-collapse-text"
          aria-expanded={openMobileMenu}
        >
            <span className="navbar-toggler-icon">
            </span>
        </Button>
        </div>
        </div>
        <div className={"hide-desktop " + (openMobileMenu === true ? "open-menu" : "close-menu")} >
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
