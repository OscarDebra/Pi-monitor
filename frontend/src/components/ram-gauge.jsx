import { useRef, useState, useEffect } from "react";

export default function RamGauge({ ram_total, ram_percent }) {
    const cardRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(0);

    useEffect(() => {
        if (!cardRef.current) return;
        const observer = new ResizeObserver(entries => {
            setCardHeight(entries[0].contentRect.height);
        });
        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={cardRef} style={{
            width: "100%",
            border: "3px solid #474747",
            backgroundColor: "#171717",
            padding: "10px",
            boxSizing: "border-box",
            display: "flex",
            flex: 2,
            maxWidth: "400px",
            minHeight: "200px",
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
            height: cardHeight * 0.15,
            backgroundColor: "#000000",
            border: "2px solid #474747",
            overflow: "hidden",
        }}>
            <div style={{
            width: `${ram_percent}%`,
            height: "100%",
            backgroundColor: "	#199aad",
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