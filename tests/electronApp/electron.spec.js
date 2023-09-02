const {_electron: electron, test} = require('@playwright/test');
const LoginPage = require("../../pages/login.page");

let electronApp;
let window;
test.describe('Electron App', () => {

    test.beforeEach(async () => {
            // Launch Electron app from the executable path
            const electronApp = await electron.launch({
                executablePath: '/Applications/Nobel Fire (UAT).app/Contents/MacOS/Nobel Fire (UAT)'
            });
            // Get the first window
            window = await electronApp.firstWindow();
        }
    );


    test.skip('Verify App Login Form', async () => {
        const login = new LoginPage();
        // Perform actions on the Electron app window
        await window.title();
        await login.populateLoginForm(window);
        await login.navigateToReportsPage(window);
    });

    test.skip('Verify Evernote App Login', async () => {
        // Perform actions on the Electron app window
        await window.title();
        await window.isVisible('#qa-CLIENT_LOGIN', {});
        await window.fill('#qa-CLIENT_LOGIN_USERNAME', 'example@mail.com');
        await window.click('#qa-CLIENT_LOGIN_USERNAME');
    });

    test.afterEach(async () => {
        // Close the Electron app
        if (electronApp) {
            await electronApp.close();
        }
    });
});
