//radar chart for genres and categories
import { React, useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';
ChartJS.register(...registerables);
ChartJS.defaults.color = 'white';

const backgroundColors = [
  "rgb(42, 8, 0)",
  "rgb(36, 112, 163)",
];

const borderColors = [
  "rgb(42, 8, 0)",
  "rgb(36, 112, 163)",
];


const PieChart = (props) => {
  const { groupName } = props.data;
  const { list } = props.data;
  console.log(list);
  const chartLabels = list.map((tag) => tag.name.split(' '));
  const chartDataPoints = list.map((tag) => tag.count);
  const chartData = {
    labels: chartLabels,
    datasets: [{
      label: groupName,
      data: chartDataPoints,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    onResize: null,
    resizeDelay: 1,
    dataset:{

    },
    plugins: {  
      datalabels: {
        color: 'rgba(0, 0, 0, 0.0)'
      },
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 20
          }
        },
      },
    },
    scales: {
      
    }
  }


  return (
    <div className="pie-chart-box container-fluid justify-content-center align-items-center mt-2">
      <Pie data={chartData} options={chartOptions}/>
    </div>
  );

}
export default PieChart;
