import { useState, useEffect } from "react";

import CpuGauge from './components/cpu-gauge';

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/stats")
        .then(res => res.json())
        .then(data => setStats(data));
    };
    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      padding: "16px",
      maxWidth: "300px",
      margin: "0 auto",
    }}>
      <CpuGauge 
        cpu_temp={stats ? stats.cpu_temp : 0}
        cpu_percent={stats ? stats.cpu_percent : 0}
      />
    </div>
  );
}

export default App;