//radar chart for genres and categories
import { React, useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import './RadarChart.css';
ChartJS.register(...registerables);
ChartJS.defaults.color = 'white';

const RadarChart = (props) => {
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
      
      borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    onResize: null,
    resizeDelay: 1,
    plugins: {  
      datalabels: {
        color: 'rgba(0, 0, 0, 0.0)',
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 20
          }
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: 'gray'
        },
        angleLines: {
          color: 'gray'
        },
        ticks: {
          color: 'white',
          showLabelBackdrop: false,
          font: {
            size: 15
          }
        }
      }
    }
  }


  return (
    <div className="chart-box container-fluid justify-content-center align-items-center">
      <Radar data={chartData} options={chartOptions}/>
    </div>
  );

}
export default RadarChart;
