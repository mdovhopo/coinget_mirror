import React, {Component} from 'react';
import "Style/Header";

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-wrapper">
          <p className="header-text">{this.props.children}</p>
        </div>
      </div>
    );
  }
}

export default Header;