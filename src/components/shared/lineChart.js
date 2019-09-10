import React, { Component } from "react";
import Chart from "chart.js";

class LineChart extends Component {
  state = {};
  chartRef = React.createRef();

  componentDidMount() {
    let datavals = [];
    let labels = [];
    Object.keys(this.props.data).forEach(key => {
      datavals.push(this.props.data[key]);
      let d = new Date(parseInt(key));
      labels.push(d.getDate() + "/" + d.getMonth());
    });
    new Chart(this.chartRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: labels.splice(-7),
        datasets: [
          {
            label: this.props.label,
            data: datavals.splice(-7),
            borderColor:"#ef5350",
            backgroundColor:"#ef5350",
            pointRadius:4
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
        legend:{
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

export default LineChart;
