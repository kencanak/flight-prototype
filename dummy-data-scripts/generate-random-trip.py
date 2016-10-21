import json
import os
import datetime
from datetime import timedelta, date
import random
import time

def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)

def main():
    trips = []
    with open('../client/assets/dummy-data/airports.json') as data_file:
        data = json.load(data_file)
        start_date = date(2016, 10, 21)
        end_date = date(2016, 10, 28)
        i = 1

        timings = [
            {
                "depart": "10:00 AM",
                "return": "12:00 PM"
            },
            {
                "depart": "12:00 PM",
                "return": "02:00 PM"
            },
            {
                "depart": "02:00 PM",
                "return": "04:00 PM"
            }
        ]


        for origin in data['data']:
            for destination in data['data']:
                if origin['code'] != destination['code']:
                    for single_date in daterange(start_date, end_date):
                        code = random.randrange(1, 1000, 10)
                        price = random.randrange(0, 60, 10)

                        for timing in timings:
                            tmp = {
                                "trip_id": "trip_" + str(i),
                                "flight_details": {
                                    "image": "/assets/images/yeoman.png",
                                    "code": "RF-" + str(code)
                                },
                                "airport_details": {
                                    "from": origin["code"],
                                    "to": destination["code"]
                                },
                                "timings": {
                                    "day": single_date.isoformat(),
                                    "depart_time": timing["depart"],
                                    "arrive_time": timing["return"]
                                },
                                "price": str(price)
                            }
                            trips.append(tmp)

                            i = i + 1

    with open('../client/assets/dummy-data/trips.json', 'w') as outfile:
        outfile.write(json.dumps({"data":trips},ensure_ascii = False, sort_keys=True,indent=4, separators=(',', ': ')))



if __name__ == "__main__":
    main()
