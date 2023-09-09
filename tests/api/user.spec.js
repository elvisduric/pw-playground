import {expect, test} from "@playwright/test";
import DataGenerator from "../../data/dataGenerator";
import ApiClient from "../../integration/apiClient";
import defineConfig from '../../playwright.config';
const path = require("path");
const gmail = require("gmail-tester");

test.describe('User service', () => {
    const dataGenerator = new DataGenerator();
    const apiClient = new ApiClient();
    const service = defineConfig.use.apiURL;
    const token = '8297254b06294629089d79ed100b0dd0f98f483b876c9e6b7732485a6f824448';
    const headers = {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'};

    test('Create a valid user', async ({request}) => {
        const requestBody = dataGenerator.generateDefaultUser();
        // Send request
        const response = await apiClient.postUser(request, service + "/v1/users", headers, requestBody);

        // Tests
        if (response.status() !== 201) {
            console.log(await response.json());
        }
        expect(response.status()).toBe(201);
        const jsonData = JSON.parse(await response.text());
        expect(jsonData.data.status).toBe('active');
        expect(jsonData.data.id).toBeTruthy();
    });

    test('Fetch existing user details', async ({request}) => {
        //Create new user and get his ID
        const newUser = await test.step('Create new user and get his ID', async() => {
            const requestBody = dataGenerator.generateDefaultUser();
            const postResponse = await apiClient.postUser(request, service + "/v1/users", headers, requestBody);
            return JSON.parse(await postResponse.text());
        });

        await test.step('Fetch User Details with ID', async () => {
        // Fetch user details
        const getResponse = await apiClient.getUser(request, service + "/v1/users/" + newUser.data.id, headers);
        expect(getResponse.status()).toBe(200);
        const fetchedUser = JSON.parse(await getResponse.text());
        expect(fetchedUser.data).toEqual(newUser.data);
        });
    });

    test('Get Gmail and verify its content', async () => {
        const email = await test.step('Verify that Email exist', async () => {
            return gmail.check_inbox(
                path.resolve(__dirname, "../../gmail/credentials.json"),
                path.resolve(__dirname, "../../gmail/token.json"),
                {
                    subject: "6 months of German lessons for free", // What we are looking for in the subject of the message.
                    from: "what@members.babbel.com", // We are looking for a sender header
                    to: "elvis.duric.student@gmail.com", // Which inbox to poll. credentials.json should contain the credentials to it.
                    wait_time_sec: 10, // Poll interval (in seconds).
                    after: new Date(new Date().setDate(new Date().getDate() - 30)),
                    max_wait_time_sec: 30, // Maximum poll time (in seconds), after which we'll give up.
                    include_body: true
                }
            );
        });

        await test.step('Verify Email body', async () => {
            await expect(email[0].body.text).toContain("Buy today and get 6 months free when you buy a 12-month subscription!");
        });
    });
});