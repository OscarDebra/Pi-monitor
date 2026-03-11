import {Chart as 
    ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend
} from "chart.js";

import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CpuGauge({cpu_temp}) {
  const data = {
    datasets: [{
        data: [cpu_temp, 100 - cpu_temp],
        backgroundColor: ["#f87171", "#000000"],
        borderWidth: 0,
      },
    ],

  };

  const options = {
    responsive: true,
    circumference: 270,
    rotation: 45,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return <Doughnut 
    data={data} 
    options={options} 
  />;
}