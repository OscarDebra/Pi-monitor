from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_cpu_temp():
    try:
        with open("/sys/class/thermal/thermal_zone0/temp") as f:
            return round(int(f.read()) / 1000, 1)
    except:
        return None

@app.get("/api/stats")
def get_stats():
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage("/")
    net = psutil.net_io_counters()
    return {
        "cpu_percent": psutil.cpu_percent(interval=1),
        "cpu_temp": get_cpu_temp(),
        "ram_used": round(ram.used / 1024**2),
        "ram_total": round(ram.total / 1024**2),
        "ram_percent": ram.percent,
        "disk_used": round(disk.used / 1024**3, 1),
        "disk_total": round(disk.total / 1024**3, 1),
        "disk_percent": disk.percent,
        "net_sent": round(net.bytes_sent / 1024**2),
        "net_recv": round(net.bytes_recv / 1024**2),
    }
