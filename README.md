## Simple Test Framework with Playwright
This is a simple sample test framework using Page Object Model in Playwright. Tests are written in `.js`, and run only on Chrome, but in parallel.


## Setup
Since this is based on Playwright with JS, so the pre-requisite is that you should have NodeJS installed on your system.
Once NodeJS is installed.

- Clone the repo : `gh repo clone elvisduric/pw-playground` (or using `git clone elvisduric/pw-playground`)
- Install the `npm` dependencies using `npm i` or `npm install`
- See the `Running tests` section on how to run the tests


## Structure
The primary directories are as follows
- .github : Contains the `.yaml` files for Github Actions CI.
- data : Contains data generator by faker.js library.
- locators : Contains locator classes. All classes inside this folder has locators.
- pages : Page class contains the methods/assertions per page.
- tests : Contain the tests for the web pages


## Systems Under Test
- The system for UI tests is : https://tutorialsninja.com/demo/
- The system for API tests is : https://gorest.co.in/public/


## Libraries Used
- Playwright : For driving the UI tests
- faker : For creating fake data
- cryptoJS : For encrypting passwords ( not done yet)
- excelJS : For handling excel data in JS ( not done yet)
- yaml : For handling yaml data in JS ( not done yet)


## Config
- playwright.config.js

## Running tests
To run all tests on local run
```npx playwright test```


To run all tests in CI - mode (headless)
```npm run test:all ```

To run API tests in CI - mode (headless)
```npm run test:api ```

To run UI tests in CI - mode (headless)
```npm run test:ui ```

To run playwright report
```npx playwright show-report```


## Docker
The test suite contains a docker file that enables you to run the commands in Docker in local/ci systems
- Build the docker file : `docker build -t pw .`

here you can replace `pw` with whatever tag name you want to give - it could be `docker build -t testing .`

- Once the Dockerfile is built, then run that using `docker run -it pw:latest npm run test-ci` - replace the tag name (`pw`) with whatever tag name you've given
