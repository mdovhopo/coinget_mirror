import React, {Component} from 'react';
import "Style/Footer";
import LocationSign from "Assets/location-sign.png";
import HandsetSign from "Assets/handset-sign.png";
import Envelop from "Assets/envelope-sign-1.png";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer footer-first">
          <div className="wrap">
            <div className="item">
              <div className="footer--grey__image">
                <img src={LocationSign} alt="location sign"/>
              </div>
              <span>43006 Osgood road, Fremont, CA 94539</span>
            </div>
            <div className="item">
              <div className="footer--grey__image">
                <img src={HandsetSign} alt="handset sign"/>
              </div>
              <span>(408)293-3560</span>
            </div>
            <div className="item">
              <div className="footer--grey__image">
                <img src={Envelop} alt="envelop sign"/>
              </div>
              <span>support@abcassembly.com</span>
            </div>
          </div>
        </div>
        <div
          className="footer footer-second">
          <div
            className="wrap">
            <a
              href="#"
              className="link">
                <span> Terms and Conditions</span>
            </a>
            <a href="#" className="link">
              <span>Privacy Policy</span>
            </a>
            <a href="#" className="link">
            <span>Cookie policy</span>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;