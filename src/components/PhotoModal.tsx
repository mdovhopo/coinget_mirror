import React, {Component} from 'react';
import {Modal}            from "react-bootstrap";
import "Style/PhotoModal";

type Props = {
    photo: string,
    onClose: () => void,
    show: boolean
}

class PhotoModal extends Component<Props> {
    render() {
        const {photo, onClose, show} = this.props;
        return (
            <Modal
                dialogClassName={"popup-content"}
                className={"popup"}
                show={show}
                onHide={onClose}
                centered>
                <Modal.Body className="photo-container">
                    <img src={photo} alt="fullscreen photo"/>
                    <div onClick={onClose} className="close-cross right-up-corner">
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PhotoModal;
