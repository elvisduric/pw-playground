import {expect, test} from "@playwright/test";
import DataGenerator from "../../data/dataGenerator";
import ApiClient from "../../integration/apiClient";

test.describe('User service', () => {
    const dataGenerator = new DataGenerator();
    const apiClient = new ApiClient();
    const service = 'https://gorest.co.in/public';
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
        const requestBody = dataGenerator.generateDefaultUser();
        const postResponse = await apiClient.postUser(request, service + "/v1/users", headers, requestBody);
        const newUser = JSON.parse(await postResponse.text());
        const userId = newUser.data.id;

        // Fetch user details
        const getResponse = await apiClient.getUser(request, service + "/v1/users/" + userId, headers);
        expect(getResponse.status()).toBe(200);
        const fetchedUser = JSON.parse(await getResponse.text());
        expect(fetchedUser.data).toEqual(newUser.data);
    });
});