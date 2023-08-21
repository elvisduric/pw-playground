const {_electron: electron, test} = require('@playwright/test');
const ElectronLoginLocator = require("../../locators/electronLogin.locator");

let electronApp;
let window;

test.beforeEach(async () => {
        // Launch Electron app from the executable path
        const electronApp = await electron.launch({
            executablePath: '/Applications/Nobel Fire (UAT).app/Contents/MacOS/Nobel Fire (UAT)'
        });
        // Get the first window
        window = await electronApp.firstWindow();
    }
);

test('Verify App Login Form', async () => {
    const electronLoginLocator = new ElectronLoginLocator(window);
    // Perform actions on the Electron app window
    await window.title();
    await window.fill('#email', 'test@mail.com');
    await window.fill(electronLoginLocator.ElectronPswd, 'Sarajevo1!');
});

test.afterEach(async () => {
    // Close the Electron app
    if (electronApp) {
        await electronApp.close();
    }
});