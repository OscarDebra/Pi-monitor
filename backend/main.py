from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import sqlite3
from datetime import datetime, timezone

app = FastAPI()



# Tells FastAPI to allow requests from anywhere (* means anywhere)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



# Get the CPU temp from a file inside of the Pi OS, it returns the data in millidegrees so we divide by 1000.
def get_cpu_temp():
    try:
        with open("/sys/class/thermal/thermal_zone0/temp") as f:
            return round(int(f.read()) / 1000, 0)
    except:
        return None



def init_db():
    conn = sqlite3.connect("stats.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            cpu_percent REAL,
            cpu_temp REAL,
            ram_total REAL,
            ram_percent REAL,
            disk_used REAl,
            disk_total REAL
        )
    """)

    conn.commit()
    conn.close()



def save_stats(stats):
    conn = sqlite3.connect("stats.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO stats (
            timestamp,
            cpu_percent,
            cpu_temp,
            ram_total,
            ram_percent,
            disk_used,
            disk_total
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        datetime.now(timezone.utc).isoformat(),
        stats["cpu_percent"],
        stats["cpu_temp"],
        stats["ram_total"],
        stats["ram_percent"],
        stats["disk_used"],
        stats["disk_total"],
    ))

    conn.commit()
    conn.close()



@app.get("/api/stats") # When someone visits api/stats, run following function.
def get_stats():
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    stats = {
        "cpu_percent": round(psutil.cpu_percent(interval=1), 0),
        "cpu_temp": get_cpu_temp(),
        "ram_total": round(ram.total / 1024**2),
        "ram_percent": round((ram.percent)),
        "disk_used": round(disk.used / 1024**3, 1),
        "disk_total": round(disk.total / 1024**3, 1),
    }

    save_stats(stats)

    return stats



@app.get("/api/history")
def get_history(limit: int = 10):
    conn = sqlite3.connect("stats.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM stats
        ORDER BY id DESC
        LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]



init_db()