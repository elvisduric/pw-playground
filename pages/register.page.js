import {expect} from "@playwright/test";
import {faker} from '@faker-js/faker';
import BaseMethods from "./base.page";
import TopHeaderLocator from "../locators/topBar.locator";
import RegisterLocator from "../locators/register.locator";

class RegisterUser {
    constructor(page) {
        this.page = page;
        this.pageurl = 'https://tutorialsninja.com/demo/index.php?route=account/register';
        this.createdaccounturl = 'https://tutorialsninja.com/demo/index.php?route=account/success';
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email({ provider: 'gmail.com' });
        this.password = 'pass12@345';
        this.telephone = faker.phone.number();
        this.successMessage = "div[id='content'] h1";
    }

    async goToRegisterPage() {
        const baseMethods = new BaseMethods(this.page);
        const topHeader = new TopHeaderLocator(this.page);
        await baseMethods.goToURL();
        await baseMethods.clickOnElement(topHeader.MyAccount);
        await baseMethods.clickOnElement(topHeader.Register);
        await this.page.waitForTimeout(3000);
        await this.validateRegisterPage();
    }

    async validateRegisterPage() {
        await expect(this.page).toHaveURL(this.pageurl);
    }

    async fillDetailsForErrorRegistration() {
        const baseMethods = new BaseMethods(this.page);
        const registerLocator = new RegisterLocator(this.page);
        await baseMethods.fillInputValue(registerLocator.FirstNameLocator, this.firstName);
        await baseMethods.fillInputValue(registerLocator.SecondNameLocator, this.lastName);
        await baseMethods.fillInputValue(registerLocator.EmailLocator, this.email);
        await baseMethods.fillInputValue(registerLocator.ContactNumber, this.telephone);
        await baseMethods.fillInputValue(registerLocator.Password, this.password);
        await baseMethods.fillInputValue(registerLocator.ConfirmPassword, this.password);
        await baseMethods.clickOnElement(registerLocator.CreateAccountButton);
        await baseMethods.waitForElementToBeVisible(registerLocator.errorAlertNew);
    }

    async fillDetailsForSuccessfulRegistration() {
        const baseMethods = new BaseMethods(this.page);
        const registerLocator = new RegisterLocator(this.page);
        await baseMethods.fillInputValue(registerLocator.FirstNameLocator, this.firstName);
        await baseMethods.fillInputValue(registerLocator.SecondNameLocator, this.lastName);
        await baseMethods.fillInputValue(registerLocator.EmailLocator, this.email);
        await baseMethods.fillInputValue(registerLocator.ContactNumber, this.telephone);
        await baseMethods.fillInputValue(registerLocator.Password, this.password);
        await baseMethods.fillInputValue(registerLocator.ConfirmPassword, this.password);
        await baseMethods.clickOnElement(registerLocator.PrivacyPolicy);
        await baseMethods.clickOnElement(registerLocator.CreateAccountButton);
        await baseMethods.waitForElementToBeVisible(this.successMessage);
    }

    async validateUserRegistrationSuccessful() {
        await expect(this.page).toHaveURL(this.createdaccounturl);
    }
}

module.exports = RegisterUser;