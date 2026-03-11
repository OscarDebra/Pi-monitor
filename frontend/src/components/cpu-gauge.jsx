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
        backgroundColor: ["#f87171", "#4ade80"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return <Doughnut 
    data={data} 
    options={options} 
  />;
}