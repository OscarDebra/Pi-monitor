# Python image
FROM python:3.11-slim

WORKDIR /app

# Installs requirements into container
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy main file into container
COPY main.py .

# Command that runs when the container starts, it starts uvicorn server, tells it to run the main.py and listen on port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
