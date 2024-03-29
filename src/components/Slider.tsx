import React, {Component} from 'react';
import "Style/Slider";
import LeftArrow          from "Assets/arow-g-left.png";
import RightArrow         from "Assets/arow-g-rigth.png";
import Layer409           from "Assets/layer-409.png";
import Layer410           from "Assets/layer-410.png";
import Layer407           from "Assets/layer-410.png";
import PhotoModal         from "Components/PhotoModal";

type Props = {}
type State = {
    photos: Array<string>,
    minIndex: number,
    width: number,
    photoModalOpen: boolean,
    clickedPhoto: string
}

const getInitialState = (): State => ({
    photos: [Layer407, Layer409, Layer410],
    minIndex: 0,
    width: 0,
    photoModalOpen: false,
    clickedPhoto: ""
});

class Slider extends Component<Props, State> {
    state = getInitialState();

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth});
    };

    _renderSliderArrow = (img: string, callback: any) => (
        <div className="slider-arrow">
            <img onClick={callback} src={img} alt=""/>
        </div>
    );

    _getImagesAmountBySize = () => {
        const {width} = this.state;
        switch (true) {
            case width > 1550:
                return 3;
            case width > 1150:
                return 2;
            default:
                return 1;
        }
    };

    _getImages = () => {
        const amount = this._getImagesAmountBySize();
        const {photos} = this.state;
        const minIndex = Math.abs(this.state.minIndex);
        let images = [];
        for (let i = 0; i < amount; i++) {
            if ((i + minIndex) < photos.length) {
                images.push(photos[i + minIndex]);
            } else {
                images.push(photos[i + minIndex - photos.length]);
            }
        }
        return images;
    };

    _renderGallery = () => {
        const visiblePhotos = this._getImages();
        return visiblePhotos.map((photo, i) => (
            <img
                key={i}
                onClick={() => {
                    this.openPhotoModal(photo)
                }}
                className="gallery-photo"
                src={photo} alt="image"/>
        ));
    };

    _moveSlider = (dir: number) => {
        const {minIndex, photos} = this.state;
        if (dir > 0) {
            if (minIndex === photos.length - 1) {
                this.setState({minIndex: 0});
            } else {
                this.setState({minIndex: minIndex + 1});
            }
        } else {
            if (minIndex === 0) {
                this.setState({minIndex: photos.length - 1})
            } else {
                this.setState({minIndex: minIndex - 1});
            }
        }
    };

    _renderSliderNav = () => {
        const {minIndex} = this.state;
        return this.state.photos.map((photo, i) => {
            const style = "slider-point " + (i === minIndex ? "selected" : "");
            return (
                <div onClick={() => this.setState({minIndex: i})} key={i} className={style}>
                </div>
            )
        });
    };

    openPhotoModal = (photo: string) => {
        this.setState({photoModalOpen: true, clickedPhoto: photo});
    };

    closePhotoModal = () => {
        this.setState({photoModalOpen: false});
    };

    render() {
        return (
            <div className="slider-container">
                <div className="slider">
                    {this._renderSliderArrow(LeftArrow, () => this._moveSlider(-1))}
                    {this._renderGallery()}
                    {this._renderSliderArrow(RightArrow, () => this._moveSlider(1))}
                </div>
                <div className="slider-nav">
                    {this._renderSliderNav()}
                </div>
                <PhotoModal
                    show={this.state.photoModalOpen}
                    photo={this.state.clickedPhoto}
                    onClose={this.closePhotoModal}
                />
            </div>
        );
    }
}

export default Slider;
