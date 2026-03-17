from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil

app = FastAPI()


# Tells FastAPI to allow requests from anywhere tells FastAPI to allow requests from anywhere (* means anywhere)
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



@app.get("/api/stats") # When someone visits api/stats, run following function.
def get_stats():
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage("/")
    net = psutil.net_io_counters()
    return {
        "cpu_percent": round(psutil.cpu_percent(interval=1), 0),
        "cpu_temp": get_cpu_temp(),
        "ram_total": round(ram.total / 1024**2),
        "ram_percent": int(round(ram.percent)),
        "disk_used": round(disk.used / 1024**3, 1),
        "disk_total": round(disk.total / 1024**3, 1),
    }
