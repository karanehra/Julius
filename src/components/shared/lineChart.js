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
      type: "line",
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            label: "Sales",
            data: datavals
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
