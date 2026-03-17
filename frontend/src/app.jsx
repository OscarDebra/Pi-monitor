import { useState, useEffect } from "react";

import CpuGauge from './components/cpu-gauge';
import RamGauge from './components/ram-gauge';
import DiskUsage from './components/disk-usage';


function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

function App() {
  const width = useWindowWidth();
  const isMobile = width < 900;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/stats")
        .then(res => res.json())
        .then(data => setStats(data));
    };
    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "16px",
      padding: "16px",
      justifyContent: "center",
      alignItems: "stretch",
    }}>
      <CpuGauge 
        cpu_temp={stats ? stats.cpu_temp : 0}
        cpu_percent={stats ? stats.cpu_percent : 0}
      />
      <RamGauge 
          ram_total={stats ? stats.ram_total : 0} 
          ram_percent={stats ? stats.ram_percent : 0} 
      />
      <DiskUsage
          disk_used={stats ? stats.disk_used : 0}
          disk_total={stats ? stats.disk_total : 0}
      />
    </div>
  );
}

export default App;