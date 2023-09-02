class LoginLocator {
    constructor(window) {
        this.window = window;
        this.Email = '#email';
        this.Password = 'input[name="password"]';
        this.LoginBtn = 'button[id="submit-button"]';
        this.Dashboard = '#dashboard-main-container';
        this.Reports = 'a[id="/shot-reports"]';
    }
}

module.exports = LoginLocator;