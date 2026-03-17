export default function DiskUsage({ disk_used, disk_total }) {
  const disk_free = (disk_total - disk_used).toFixed(1);
  const disk_percent = Math.round((disk_used / disk_total) * 100);

  return (
    <div style={{
      border: "3px solid #474747",
      backgroundColor: "#171717",
      padding: "10px",
      aspectRatio: "1",
      boxSizing: "border-box",
      display: "flex",
      maxWidth: "400px",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    }}>

      {/* Top row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <p style={{ margin: 0, fontSize: "24px", color: "#ffffff", flexShrink: 0 }}>Disk</p>
      </div>

      {/* Middle section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "16px",
        flex: 1,
        minHeight: 0,
        padding: "8px 0",
      }}>

        {/* Left text - total */}
        <p style={{ margin: 0, fontSize: "12px", color: "#ffffff", textAlign: "center" }}>
          Total<br />{disk_total} GB
        </p>

        {/* Vertical progress bar */}
        <div style={{
          width: "15%",
          height: "100%",
          backgroundColor: "#000000",
          border: "2px solid #474747",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}>
          <div style={{
            width: "100%",
            height: `${disk_percent}%`,
            backgroundColor: "#189611",
            transition: "height 0.5s ease",
          }} />
        </div>

        {/* Right text - used and free */}
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#ffffff" }}>
            Used<br />{disk_used} GB
          </p>
          <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#ffffff" }}>
            Free<br />{disk_free} GB
          </p>
        </div>

      </div>

      {/* Bottom */}
      <p style={{
        margin: 0,
        textAlign: "center",
        fontSize: "12px",
        color: "#ffffff",
        flexShrink: 0,
      }}>{disk_percent}% utilized</p>

    </div>
  );
}