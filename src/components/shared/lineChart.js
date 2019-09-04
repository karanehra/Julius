import React, { Component } from "react";
import Chart from "chart.js";

class LineChart extends Component {
  state = {};
  chartRef = React.createRef();

  componentDidMount() {
    new Chart(this.chartRef.current.getContext('2d'), {
      type: "line",
      data: {
        //Bring in data
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        //Customize chart options
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
