import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
    // stages: [
    //         { target: 20, duration: '1m' },
    //         { target: 15, duration: '1m' },
    //         { target: 0, duration: '1m' },
    // ],
    "iterations": 10,
    "vus": 2,
    thresholds: {
        http_req_failed: ['rate < 0.1'], //request failure rate < 10%
    },
};

export default function () {

    const baseUrl = 'https://gorest.co.in/public/v1/users/';
    const token = '8297254b06294629089d79ed100b0dd0f98f483b876c9e6b7732485a6f824448';
    const timestamp = (new Date()).getTime();

    const headerParams = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };

    let data = {
        name: "Updated Name",
        gender: "male",
        email: "elvis" + timestamp + "@mail.com",
        status: "active"
    }

    const response = http.post(baseUrl, JSON.stringify(data), headerParams);
    console.log('User ID: ' + JSON.parse(response.body).data.id);
    console.log('Status Code:' + response.status);


    check(response, {
            "is status 201": (r) => r.status === 201,
            "422 Unprocessable Entity": (r) => r.status === 422,
            "is message ID > 0": (r) => JSON.parse(r.body).data.id > 0,
            "is message correct": (r) => JSON.parse(r.body).data.name === data.name
        }
    );

    sleep(1);
}
