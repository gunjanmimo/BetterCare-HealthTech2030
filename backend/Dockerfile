from python:3.8-slim-bullseye

WORKDIR /app

# set env variables
ENV PYTHONUNBUFFERED 1

COPY . .
RUN apt update && apt install libpq-dev gcc -y
RUN pip install -r requirements.txt
EXPOSE 8080

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
