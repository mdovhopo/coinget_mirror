import React, {Component} from 'react';
import "Style/ParallaxItem.scss";

type Props = {
    background?: boolean
    outerClass: string
    innerClass: string
    image: string
    startOffset: number
    speed: number
}

type State = {}

class ParallaxItem extends Component<Props, State> {

    element: HTMLDivElement;
    ticking: boolean = false;

    componentDidMount() {
        this.update();
        document.addEventListener("scroll", this.requestTick);
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.requestTick);
    }

    update = () => {
        const yOff = window.scrollY;
        const {speed, startOffset} = this.props;
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
                {background
                    ? <div
                        ref={(ref) => {
                            this.element = ref
                        }}
                        className={innerClass}
                        style={{backgroundImage: `url(${image})`}}>
                    </div>
                    : <img
                        ref={(ref) => {
                            this.element = ref
                        }}
                        className={innerClass}
                        src={image}
                        alt=""/>
                }
            </div>
        );
    }
}

export default ParallaxItem;
