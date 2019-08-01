import React, {Component} from 'react';
import "Style/ParallaxItem.scss";

const props = {
  image: undefined,
  speed: undefined,
  startOffset: undefined,
  endOffset: undefined,
};

class ParallaxItem extends Component {
  static id = 0;
  constructor(props) {
    super(props);
    ParallaxItem.id++;
  }
  componentDidMount() {
    // this.element = document.getElementById("parallax-item--" + ParallaxItem.id);
    this.element.style.transform = `translate3d(0, -${this.props.startOffset}px, 0)`;
    this.ticking = false;
    window.addEventListener("scroll", this.requestTick);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.requestTick);
  }
  update = () => {
    const yOff = window.scrollY;
    const {speed, startOffset} = this.props;
    // console.log(this.element.style.transform);
    this.element.style.transform = `translate3d(0, ${yOff * speed - startOffset}px, 0)`;
    this.ticking = false;
  };
  requestTick = () => {
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update);
    }
  };
  render() {
    const {image} = this.props;
    return (
      <div className="parallax-wrap">
        <img
          ref={(ref) => {this.element = ref}}
          id={"parallax-item--" + ParallaxItem.id}
          className="parallax-item"
          src={image}
          alt="parallax item"/>
      </div>
    );
  }
}

export default ParallaxItem;