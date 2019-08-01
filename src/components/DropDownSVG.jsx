import React, {Component, useState} from 'react';
import "Style/DropDownSVG";
import "Style/TryItNowSection";
import Arrow from "Assets/arrow-2.png";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {MuiThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core'
import {MS_PER_MINUTE} from "Constants/index";


const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
      color: "#cca210",
      contrastText: "#cca210"
    }
  },
  secondary: {
    contrastText: '#800080',
  }
});

class DropDownSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activeText: "",
      selectedDate: ""
    };
  }

  _renderDropDownItems = () => {
    if (this.props.datepicker === true) {
      return (
        <div className="date-piker-wrapper" style={{zIndex: this.props.zIndex}}>
          <MuiThemeProvider theme={customTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                open={this.state.active}
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                maxDate={new Date()}
                maxDateMessage={"I wanna see the future too, but c'mon man"}
                onClose={() => this.setState({active: false})}
              />
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </div>
      );
    } else {
      const active = this.state.active ? "svg-dropdown-active" : "";
      const {content, loadingContent} = this.props;
      if (content === undefined || content.length === 0) {
        return (
        <ul className={"svg-dropdown " + active}>
          <li>{loadingContent}</li>
        </ul>
        );
      }
      return (
      <ul className={"svg-dropdown " + active} >
        {content.map((item, index) => (
          <li key={index} onClick={() => this.handleSelectOption(item)}>{item}</li>
        ))}
      </ul>
      );
    }
  };
  handleDateChange = (_date) => {
    this.setState({activeText: _date.toDateString(), active: false, selectedDate: _date.toString()});
    // convert date to server time GMT+000
    let date = new Date(_date.getTime() + _date.getTimezoneOffset() * MS_PER_MINUTE);
    const custom = moment(date).format("YYYYMMDDHHmmss");
    this.props.onItemClick(custom);
  };
  handleSelectOption = (text) => {
    this.setState({activeText: text});
    this.props.onItemClick(text);
  };
  handleOpenDropDown = () => {
    if (this.props.datepicker) {
      if (this.state.active === false) this.setState({active: true});
    }
    else this.setState({active: !this.state.active});
  };
  render() {
    const height = 60;
    const width = this.props.width;
    const onClick = this.props.datepicker ? this.handleOpenDropDown : undefined;
    const onHover = this.props.datepicker ? undefined : this.handleOpenDropDown;
    return (
      <div className="get-course-item">
        <div className="get-course-icon-wrap">
          <img src={this.props.icon} className="get-course-icon" alt={"exchange name icon"}/>
        </div>
        <div className="svg-wrapper" onMouseEnter={onHover} onMouseLeave={onHover} onClick={onClick} style={{width: width, zIndex: this.props.zIndex}}>
          <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
            <rect className={"shape " + this.props.style} height="60" width={this.props.width}/>
          </svg>
          <div className="text">
            {this.state.activeText ? this.state.activeText :  this.props.children}
            <img className="svg-btn-arrow" src={Arrow} alt="arrow"/>
          </div>
          {/*{this.props.content.length === 0 ? this._renderLoadingContent() : this._renderDropDownItems()}*/}
          {this._renderDropDownItems()}
        </div>
      </div>
    );
  }
}

export default DropDownSVG;