import React, {Component} from 'react';
import {createChart} from 'lightweight-charts';
import {connect} from "react-redux";
import WebSocketApi from "Utils/webSocketApi";

const chartOptions = {
  layout: {
    textColor: '#d1d4dc',
    backgroundColor: '#000000',
    chartColor: '#f00'
  },
  priceScale: {
    scaleMargins: {
      top: 0.3,
      bottom: 0.25,
    },
  },
  crosshair: {
    vertLine: {
      visible: true
    },
    horzLine: {
      visible: true,
      labelVisible: false,
    },

  },
  timeScale: {
    timeVisible: true,
    secondsVisible: true,
  },
  grid: {
    vertLines: {
      color: 'rgba(42, 46, 57, 0.5)',
    },
    horzLines: {
      color: 'rgba(42, 46, 57, 0.5)',
    },
  }
};

class Chart extends Component {
  state = {
    points: []
  };

  updatePoints = ({date, price}) => {
    let points = this.state.points;
    let time = new Date(date).getTime() / 1000 - new Date().getTimezoneOffset() * 60;
    points.push({time: time, value: price});
    this.setState({points: points});
  };

  componentDidMount() {
    const {width, height} = this.props;
    const chart = createChart(this.chartRoot, {
      ...chartOptions,
      width: this.chartRoot.getBoundingClientRect().width,
      height: height
    });
    this.areaSeries = chart.addAreaSeries({
      topColor: 'rgba(204, 162, 16, 0.56)',
      bottomColor: 'rgba(204, 162, 16, 0.04)',
      lineColor: 'rgba(204, 162, 16, 1)',
      lineWidth: 2,
      crossHairMarkerVisible: false,
    });
    this.areaSeries.applyOptions({
      lineColor: '#cca210',
      lineWidth: 1,
    });
    const {exchange, currency} = this.props;
    if (!exchange || !currency) return;
    WebSocketApi.subscribe(exchange, currency,
      this.updatePoints
    );
  }

  componentWillUpdate() {
    this.areaSeries.setData(this.state.points);
  }

  render() {
    return (
      <div
        style={{display: "flex", justifyContent: "center", background: "white"}}
        ref={(el) => this.chartRoot = el}>
        {/*<div style={labelStyle}>*/}
        {/*  Label*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default Chart;
