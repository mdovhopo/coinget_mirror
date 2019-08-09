import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import BasicButton from "Components/BasicButton";
import "Style/GetCoursePopUp";
import {CONTENT_LOADING_ERROR, CONTENT_LOADING_IN_PROGRESS, CONTENT_SETTINGS_NOT_COMPLETE} from "Constants/index";
import {PropagateLoader} from "react-spinners";

class GetCoursePopUp extends Component {


  _getCourseContent() {
    if (this.props.course === CONTENT_LOADING_ERROR || this.props.course === null)
      return <p>Loading Error</p>;
    if (this.props.course === CONTENT_SETTINGS_NOT_COMPLETE)
      return <p>Exchange, coin or date is not selected</p>;
    if (this.props.course === CONTENT_LOADING_IN_PROGRESS)
      return (
        <div style={{height: 20, marginTop: 10, marginBottom: 10}}>
          <PropagateLoader loading={true} color={'#cca210'}/>
        </div>
      );
    return (
      <>
        <div className="popup-section">
          <p className="popup-text">{this.props.course}</p>
        </div>
        <div className="popup-section">
          <BasicButton
            className={"black-btn"}
            onClick={this.props.onClose}>
            Close
          </BasicButton>
        </div>
      </>
    )
  }

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
            {this._getCourseContent()}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default GetCoursePopUp;
