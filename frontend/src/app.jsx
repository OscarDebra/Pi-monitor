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
    <div>
      <h1>Pi Monitor</h1>
      {stats ? (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
      <CpuGauge 
        cpu_temp={stats ? stats.cpu_temp : 0}
      />
    </div>
  );
}

export default App;