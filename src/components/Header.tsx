import React, {Component, ReactNode} from 'react';
import "Style/Header";

type Props = {
    children: ReactNode
}

class Header extends Component<Props> {
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
