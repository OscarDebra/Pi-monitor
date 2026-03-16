import {Chart as 
    ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend
} from "chart.js";

import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CpuGauge({cpu_temp, cpu_percent}) {
  const data = {
    datasets: [{
        data: [cpu_temp, 100 - cpu_temp],
        backgroundColor: ["#fc6400", "#000000"],
        borderWidth: 4,
        borderColor: "#474747",
      },
    ],

  };

  const options = {
    responsive: true,
    circumference: 270,
    rotation: 225,
    cutout: "70%",
    events: [],
    hover: { mode: null },
    plugins: {
      legend: { position: "bottom" },
    },
    tooltip: { enabled: false },
  };

  return (
    <div style={{
        border: "3px solid #474747",
        backgroundColor: "#171717",
        width: "100%",
        aspectRatio: "1",
    }}> 
    
        {/*Title text */}
        <p style={{
            margin: "0",
            fontSize: "24px", 
            color: "#ffffff",
        }}> CPU </p>

        {/* donut and temp text div */}
        <div style={{
            position: "relative",
            margin: "0 auto",
            width: "80%",
        }}> 

            {/* Horseshoe thermostat thing */}
            <Doughnut 
                data={data} 
                options={options} 
            />

            {/* temperature text */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                textAlign: "center",
                color: "#ffffff",
            }}>
                <p style={{ 
                    margin: 0, 
                    fontSize: "20px", 
                    fontWeight: "bold" 
                }}> {cpu_temp}°C </p>
            </div>
        </div>

        {/* Utilization text */}
        <p style={{ margin: 0, 
            textAlign: "center", 
            fontSize: "12px", 
            color: "#ffffff" 
        }}> {cpu_percent}% utilization </p>
    </div>
  );
}