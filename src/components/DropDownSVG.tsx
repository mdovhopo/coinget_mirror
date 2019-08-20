import React, {Component}                        from 'react';
import "Style/DropDownSVG";
import "Style/TryItNowSection";
import Arrow                                     from "Assets/arrow-2.png";
import moment                                    from "moment";
import DateFnsUtils                              from "@date-io/date-fns"; // choose your lib
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MuiThemeProvider}                        from '@material-ui/core/styles';
import {createMuiTheme}                          from '@material-ui/core'
import {MS_PER_MINUTE}                           from "Constants/constants";
import EventEmitter                              from "Utils/EventEmitter";

type State = {
    active: boolean,
    activeText: string,
    selectedDate: string
}
type Props = {
    datepicker?: boolean,
    zIndex: number,
    onItemClick: Function,
    loadingContent?: any,
    icon?: string,
    width: string | number,
    style: string,
    content?: Array<string>
}

const DateTimePickerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
            contrastText: "#cca210"
        }
    }
});

const getInitialState = (): State => ({
    active: false,
    activeText: "",
    selectedDate: ""
});

class DropDownSVG extends Component<Props, State> {

    state = getInitialState();

    constructor(props: Props) {
        super(props);
        EventEmitter.subscribe("closeSvgBtnDropdown",
            () => {
                if (this.state.active === true)
                    this.setState({active: false})
            }
        );
    }

    _renderDropDownItems = () => {
        if (this.props.datepicker === true) {
            return (
                <div className="date-piker-wrapper" style={{zIndex: this.props.zIndex}}>
                    <MuiThemeProvider theme={DateTimePickerTheme}>
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
                <ul className={"svg-dropdown " + active}>
                    {content.map((item: string, index: number) => (
                        <li key={index} onClick={() => this.handleSelectOption(item)}>{item}</li>
                    ))}
                </ul>
            );
        }
    };
    handleDateChange = (_date: Date) => {
        this.setState({activeText: _date.toDateString(), active: false, selectedDate: _date.toString()});
        // convert date to server time GMT+000
        let date = new Date(_date.getTime() + _date.getTimezoneOffset() * MS_PER_MINUTE);
        const custom = moment(date).format("YYYYMMDDHHmmss");
        this.props.onItemClick(custom);
    };
    handleSelectOption = (text: string) => {
        this.setState({activeText: text});
        this.props.onItemClick(text);
    };
    handleOpenDropDown = () => {
        if (this.props.datepicker) {
            if (this.state.active === false) this.setState({active: true});
        } else this.setState({active: !this.state.active});
    };

    render() {
        const height = 60;
        const {width} = this.props;
        return (
            <div className={"get-course-item"}>
                <div className={"get-course-icon-wrap"}>
                    <img src={this.props.icon} className="get-course-icon" alt={"exchange name icon"}/>
                </div>
                <div className={"svg-wrapper"} onClick={this.handleOpenDropDown}
                     style={{width: width, zIndex: this.props.zIndex}}>
                    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
                        <rect className={"shape " + this.props.style} height="60" width={this.props.width}/>
                    </svg>
                    <div className="text">
                        {this.state.activeText ? this.state.activeText : this.props.children}
                        <img className="svg-btn-arrow" src={Arrow} alt="arrow"/>
                    </div>
                    {this._renderDropDownItems()}
                </div>
            </div>
        );
    }
}

export default DropDownSVG;
