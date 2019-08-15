import React, {Component} from 'react';
import {createChart} from 'lightweight-charts';
import WebSocketApi from "Utils/webSocketApi";
import "Style/Chart";

// props:
// height - Number
// exchange - String
// currency - String

class Chart extends Component {
  static MAX_POINTS = 1000;
  state = {
    points: []
  };

  updatePoints = ({date, price}) => {
    let points = this.state.points;
    let time = new Date(date).getTime() / 1000 - new Date().getTimezoneOffset() * 60;
    if (points.length === Chart.MAX_POINTS) {
      points.shift();
    }
    points.push({time: time, value: price});
    this.setState({points: points});
  };

  componentDidMount() {
    const {height} = this.props;
    this.chart = createChart(this.chartRoot, {
      ...chartOptions,
      width: this.chartRoot.getBoundingClientRect().width,
      height: height
    });
    this.areaSeries = this.chart.addAreaSeries({
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
    window.addEventListener("resize", () => {
      this.chart.resize(height, this.chartRoot.getBoundingClientRect().width);
    });
    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    const toolTip = document.createElement('div');
    toolTip.className = "floating-tooltip";
    this.chartRoot.appendChild(toolTip);
    this.chart.subscribeCrosshairMove((param) => {
      const {clientWidth, clientHeight} = this.chartRoot;
      if (param.point === undefined || !param.time || param.point.x < 0 ||
        param.point.x > clientWidth || param.point.y < 0 ||
        param.point.y > clientHeight) {
        toolTip.style.display = 'none';
      } else {
        const dateStr = param.time;
        toolTip.style.display = 'block';
        const price = param.seriesPrices.get(this.areaSeries);
        toolTip.innerHTML = `<div style="color: #CCA210">${this.props.exchange} ${this.props.currency}</div>
           <div style="font-size: 24px; margin: 4px 0; color: #CCA210">
          ${Math.round(100 * price) / 100}</div>`;
        const coordinate = this.areaSeries.priceToCoordinate(price);
        let shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(0, Math.min(clientWidth - toolTipWidth, shiftedCoordinate));
        const coordinateY = coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(0, Math.min(clientHeight - toolTipHeight - toolTipMargin, coordinate + toolTipMargin));
        toolTip.style.left = shiftedCoordinate + 'px';
        toolTip.style.top = coordinateY + 'px';
      }
    });
  }

  componentWillUpdate() {
    this.areaSeries.setData(this.state.points);
  }

  render() {
    return (
      <div
        ref={(el) => this.chartRoot = el}>
      </div>
    );
  }
}

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

export default Chart;
