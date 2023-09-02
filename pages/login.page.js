import LoginLocator from "../locators/login.locator";

const loginLocator = new LoginLocator();

class LoginPage {
    constructor(page, window) {
        this.page = page;
        this.window = window;
        this.password = 'T3stU53r123!';
        this.email = 'test.user04@nobellabs.com';
    }

    async populateLoginForm(window) {
        await window.fill(loginLocator.Email, this.email);
        await window.fill(loginLocator.Password, this.password);
        await window.click(loginLocator.LoginBtn);
        await window.isVisible(loginLocator.Dashboard);
    }

    async navigateToReportsPage(window) {
        await window.click(loginLocator.Reports);
        await window.isVisible('a[current="/shot-reports"]');
    }
}

module.exports = LoginPage;