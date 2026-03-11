import {Chart as 
    ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend
} from "chart.js";

import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CpuGauge() {
  const data = {
    labels: ["Used", "Free"],
    datasets: [{
        data: [65, 35],
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