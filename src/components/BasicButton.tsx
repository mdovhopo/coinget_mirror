import React, {Component} from 'react';
import "Style/BasicButton.scss";

type Props = {
  maxWidth?: number | string
  minWidth?: number | string
  className?: string
  onClick: () => void
}

class BasicButton extends Component<Props> {
  render() {
    const style = {
      maxWidth: this.props.maxWidth,
      minWidth:this.props.minWidth,
      width: "100%"
    };
    const customClass = "basic-btn " + (this.props.className ? this.props.className : "");
    return (
      <div className={customClass} onClick={this.props.onClick} style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default BasicButton;
