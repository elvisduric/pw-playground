class RegisterLocator {
    constructor(page) {
        this.page = page;
        this.FirstNameLocator = page.locator(`#input-firstname`);
        this.SecondNameLocator = page.locator(`#input-lastname`);
        this.EmailLocator = page.locator(`#input-email`);
        this.ContactNumber = page.locator(`#input-telephone`);
        this.Password = page.locator(`#input-password`);
        this.ConfirmPassword = page.locator(`#input-confirm`);
        this.CreateAccountButton = page.locator(`input[value='Continue']`);
        this.PrivacyPolicy = page.locator(`input[value='1'][name='agree']`);
        this.errorAlert = page.locator(`div.alert.alert-danger.alert-dismissible`);
        this.errorAlertNew = `div.alert.alert-danger.alert-dismissible`;
    }
}

module.exports = RegisterLocator;