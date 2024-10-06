import random
import time
from celery import shared_task

# Example of ICU thresholds (use the full JSON structure in your code)
ICU_THRESHOLDS = {
    "Blood_Pressure": {
        "Systolic": {
            "Normal": (90, 120),
            "Critical": (180, float("inf")),
            "Severe": (float("-inf"), 90),
        },
        "Diastolic": {
            "Normal": (60, 80),
            "Critical": (110, float("inf")),
            "Severe": (float("-inf"), 60),
        },
    },
    "Heart_Rate": {
        "Normal": (60, 100),
        "Critical": (150, float("inf")),
        "Severe": (float("-inf"), 40),
    },
    "Blood_Oxygen_Level": {"Normal": (95, 100), "Critical": (70, float("-inf"))},
}


# Helper function to generate random values based on a range
def generate_random_value(range_tuple):
    return random.uniform(range_tuple[0], range_tuple[1])


# Helper function to evaluate condition (Normal, Critical, Severe)
def evaluate_condition(value, thresholds):
    if thresholds["Critical"][0] <= value <= thresholds["Critical"][1]:
        return "Critical"
    elif thresholds["Severe"][0] <= value <= thresholds["Severe"][1]:
        return "Severe"
    elif thresholds["Normal"][0] <= value <= thresholds["Normal"][1]:
        return "Normal"
    return "Unknown"


# Function to generate time-series data for each parameter
def generate_time_series_data():
    time_series_data = {}

    for parameter, thresholds in ICU_THRESHOLDS.items():
        if isinstance(
            thresholds, dict
        ):  # Handle sub-parameters like Systolic/Diastolic
            time_series_data[parameter] = {}
            for sub_param, sub_thresholds in thresholds.items():
                value = generate_random_value(sub_thresholds["Normal"])
                time_series_data[parameter][sub_param] = value
        else:
            value = generate_random_value(thresholds["Normal"])
            time_series_data[parameter] = value

    return time_series_data


# Function to check patient condition based on the current time window
def check_time_window_condition(time_series_data):
    current_status = {}

    for parameter, thresholds in ICU_THRESHOLDS.items():
        if isinstance(
            thresholds, dict
        ):  # Handle sub-parameters like Systolic/Diastolic
            current_status[parameter] = {}
            for sub_param, sub_thresholds in thresholds.items():
                value = time_series_data[parameter][sub_param]
                condition = evaluate_condition(value, sub_thresholds)
                current_status[parameter][sub_param] = {
                    "Value": value,
                    "Condition": condition,
                }
        else:
            value = time_series_data[parameter]
            condition = evaluate_condition(value, thresholds)
            current_status[parameter] = {
                "Value": value,
                "Condition": condition,
            }

    return current_status


# Celery task to simulate ICU patient condition
@shared_task
def simulate_patient_condition(patient_id):
    time_series_history = []

    while True:
        # Step 1: Generate new time-series data for the current moment
        new_data = generate_time_series_data()
        time_series_history.append(new_data)
        # save the time_series_history to a log file with timestamp
        with open("time_series_history.log", "a") as f:
            f.write(f"{time.time()}: {new_data}\n")

        # Step 2: For a 1-minute window (50% overlap), consider the latest N entries for analysis
        # Let's say each entry is generated every 30 seconds -> we need the last 2 entries (60 seconds)
        if len(time_series_history) > 2:
            time_window_data = time_series_history[
                -2:
            ]  # 50% overlap means we keep overlapping 1 previous entry

            # Step 3: Check the patient's condition using the latest time window
            current_status = check_time_window_condition(
                time_window_data[-1]
            )  # Use the latest data point
            print(f"Patient {patient_id} Condition in Time Window: {current_status}")

            # Send or log the current status (e.g., to a database or monitoring system)

        # Wait for the next 30-second interval (50% overlap in a 1-minute window)
        time.sleep(30)
