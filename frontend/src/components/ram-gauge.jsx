export default function RamGauge({ ram_total, ram_percent }) {
  return (
    <div style={{
      border: "3px solid #474747",
      backgroundColor: "#171717",
      padding: "10px",
      width: "100%",
      aspectRatio: "2 / 1",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>

      {/* Top row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <p style={{ margin: 0, fontSize: "24px", color: "#ffffff" }}>RAM</p>
        <p style={{ margin: 0, fontSize: "14px", color: "#ffffff" }}>Total: {ram_total} MB</p>
      </div>


      {/* Progress bar */}
      <div style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#000000",
        border: "2px solid #474747",
        overflow: "hidden",
      }}>
        <div style={{
          width: `${ram_percent}%`,
          height: "100%",
          backgroundColor: "#fc6400",
          transition: "width 0.5s ease",
        }} />
      </div>


      {/* Utilization text */}
      <p style={{ 
        margin: 0, 
        textAlign: "center", 
        fontSize: "12px", 
        color: "#ffffff" 
      }}>{ram_percent}% utilization</p>

    </div>
  );
}