import React, {Component} from 'react';
import "Style/ParallaxItem.scss";

class ParallaxItem extends Component {
  componentDidMount() {
    // this.relativePos = this.props.startOffset;
    // this.lastYoff = window.scrollY;
    this.update();
    document.addEventListener("scroll", this.requestTick);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.requestTick);
  }

  update = () => {
    const yOff = window.scrollY;
    const {speed, startOffset} = this.props;
    // this.relativePos += this.lastYoff > yOff ? -1 : 1;
    // this.lastYoff = yOff;
    this.element.style.transform = `translate3d(0, ${yOff * speed + startOffset}px, 0)`;
    this.ticking = false;
  };
  requestTick = () => {
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update);
    }
  };

  render() {
    const {image, outerClass, innerClass, background} = this.props;
    return (
      <div className={outerClass}>
        { background
          ? <div
          ref={(ref) => {this.element = ref}}
          className={innerClass}
          style={{backgroundImage: `url(${image})`}}>
          </div>
          : <img
            ref={(ref) => {this.element = ref}}
            className={innerClass}
            src={image}
            alt=""/>
        }

      </div>
    );
  }
}

export default ParallaxItem;