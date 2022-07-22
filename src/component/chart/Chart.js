import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);


const Chart = ({ score, worngScore }) => {
  const data = () => {
    return {
      labels: ['January'],
      datasets: [
        {
          label: 'Correct Answer',
          data: [ score ],
          fill: "start",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "rgba(217, 70, 239, 0.63)");
            gradient.addColorStop(0.5, "rgba(109, 40, 217, 0.74)");
            gradient.addColorStop(1, "rgba(67, 56, 202, 0.74)");
            return gradient;
          },
        },
        {
          label: 'Wrong Answer',
          data: [ worngScore ],
          backgroundColor: '#F5F3FF',
        },
      ],
    }
  }

  const options = {
    indexAxis: 'y',
    plugins: {
      title: { display: false },
      tooltip: { enabled: false },
      hover: { mode: null },
    },
    responsive: false,
    scales: {
      x: { stacked: true, display: false },
      y: { stacked: true, display: false },
    },
  }

  return (
    <div className='flex justify-center'>
      <Bar data={data()} options={options} style={{ position: "relative", height: "40px", width: "480px" }}/>
    </div>
  )
}
export default Chart

