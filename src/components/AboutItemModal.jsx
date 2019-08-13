import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import "Style/AboutSection";

//  just stub, replace with actual text
const n = 1000;
const aboutItemsDescription = {
  left_1: "lorem ispum ".repeat(n),
  left_2: "lorem ispum ".repeat(n),
  left_3: "lorem ispum ".repeat(n),
  right_1: "lorem ispum ".repeat(n),
  right_2: "lorem ispum ".repeat(n),
  right_3: "lorem ispum ".repeat(n)
};

class AboutItemModal extends Component {
  render() {
    const {show, onClose, name} = this.props;
    const info = aboutItemsDescription[name];
    return (
      <Modal
        dialogClassName="popup--about-item-body"
        show={show}
        onHide={onClose}
        centered>
        <Modal.Header as={"h4"} className="popup--about-item-title">
          {name}
          <div onClick={onClose} className="close-cross right">
          </div>
        </Modal.Header>
        <Modal.Body className="popup--about-item-desc">
          {info}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AboutItemModal;
