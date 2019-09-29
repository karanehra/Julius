import React, { Component } from "react";
import Chart from "chart.js";

class CustomChart extends Component {
  state = {};
  chartRef = React.createRef();

  componentDidMount() {
    let datavals = [];
    let labels = [];
    if (this.props.data) {
      Object.keys(this.props.data).forEach(key => {
        datavals.push(this.props.data[key]);
        let d = new Date(parseInt(key));
        labels.push(d.getDate() + "/" + d.getMonth());
      });
    }
    new Chart(this.chartRef.current.getContext("2d"), {
      type: this.props.type,
      data: {
        labels: this.props.splice ? labels.splice(-this.props.splice) : labels,
        datasets: [
          {
            label: this.props.label,
            data: this.props.splice
              ? datavals.splice(-this.props.splice)
              : datavals,
            borderColor: this.props.type === "line" ? "#ef5350" : "#ef5350",
            backgroundColor:
              this.props.type === "line" ? "rgba(0,0,0,0)" : "#ef5350",
            pointRadius: 4
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 150
              }
            }
          ]
        },
        legend: {
          onClick: e => e.stopPropagation()
        }
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <canvas ref={this.chartRef}></canvas>
      </React.Fragment>
    );
  }
}

export default CustomChart;
