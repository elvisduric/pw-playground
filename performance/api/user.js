import http from 'k6/http';
import {sleep, check} from 'k6';
import {userData} from "./userData";

export const options = {
    // stages: [
    //         { target: 20, duration: '1m' },
    //         { target: 15, duration: '1m' },
    //         { target: 0, duration: '1m' },
    // ],
    "iterations": 1,
    "vus": 1,
    thresholds: {
        http_req_failed: ['rate < 0.1'], //request failure rate < 10%
    },
};

export default function () {

    const token = '8297254b06294629089d79ed100b0dd0f98f483b876c9e6b7732485a6f824448';

    const headerParams = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };

    let data = userData();

    const response = http.post("https://gorest.co.in/public/v1/users", JSON.stringify(data), headerParams);
    const jsonData = JSON.parse(response.body);
    console.log("User ID: ", jsonData.data.id);


    check(response, {
            "is status 201": (r) => r.status === 201,
            "is message ID > 0": (r) => r.json(["id"]) > 0,
            "is message correct": (r) => r.json(["name"]) === data.description
        }
    );

    sleep(1);
}
