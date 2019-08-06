import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import BasicButton from "Components/BasicButton";
import "Style/GetCoursePopUp";

class GetCoursePopUp extends Component {
  render() {
    return (
      <Modal
        dialogClassName={"popup-content"}
        className={"popup"}
        show={this.props.show}
        onHide={this.props.onClose}
        centered>
        <Modal.Header className={"popup-header"}>
          <Modal.Title>Get Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-body">
            {this.props.course === -1 || this.props.course === null? this.props.onErrorText :
              <>
              <div className="popup-section"><p className="popup-text">{this.props.course}$</p></div>
              <div className="popup-section"><BasicButton className={"black-btn"} onClick={this.props.onClose}>Close</BasicButton></div>
              </>}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default GetCoursePopUp;
