from celery import Celery

# Define the Celery application and configure it with a Redis broker
app = Celery(
    "icu_simulation",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
)

# Optional: You can add Celery configuration here
app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)
