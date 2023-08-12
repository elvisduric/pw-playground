import { expect } from "@playwright/test";
import * as CryptoJS from 'crypto-js';

class BaseMethods {
    constructor(page) {
        this.page = page;
        this.LoginPassword = `pass123@45`;
    }

    async goToURL() {
        await this.page.goto('/demo/');
    }

    async validateText(locator, expectedText) {
        await expect(locator).toHaveText(expectedText);
    }

    async validateContainsText(locator, expectedText) {
        await expect(locator).toContainText(expectedText);
    }

    async waitForElementToBeVisible(locator) {
        await this.page.waitForSelector(locator, {
            state: 'visible',
        });
    }

    async waitForLocator(locator) {
        await locator.waitFor({
            state: 'visible',
        });
    }

    async validateElementVisible(locator) {
        await expect(locator).toBeVisible();
    }

    async validateCountOfElements(locator, expectedCount) {
        await expect(locator).toHaveCount(expectedCount);
    }

    async validateCountOfElementsIsNotZero(locator) {
        const count = await locator.count();
        await expect(count).toBeGreaterThanOrEqual(1);
    }

    async validateElementNotVisible(locator) {
        await expect(locator).not.toBeVisible();
    }

    async clickOnElement(locator) {
        await locator.click();
    }

    async fillInputValue(locator, InputValue) {
        await locator.fill(InputValue);
        await this.page.waitForTimeout(500);
    }

    async hoverOnLocator(locator) {
        await locator.hover({ timeout: 5000 });
    }

    async waitForElement(timeout) {
        await this.page.waitForTimeout(timeout);
    }

    async encrypt_password() {
        const key = `SECRET`;
        console.log(`The password is ${this.LoginPassword}`);
        const cipher = CryptoJS.AES.encrypt('************', key);
        console.log(cipher.toString());
        return CryptoJS.AES.decrypt(this.LoginPassword, key).toString(CryptoJS.enc.Utf8);
    }

    async decrypt_password() {
        const key = `SECRET`;
        const cipher = CryptoJS.AES.encrypt(this.LoginPassword, key);
        console.log(cipher.toString());
        return CryptoJS.AES.decrypt(this.LoginPassword, key).toString(CryptoJS.enc.Utf8);
    }

    async returnNumberOfItems(inputText) {
        const regex = /\b(\d+)\sitem/;
        const match = inputText.match(regex);
        if (match) {
            const count = match[1];
            return `${count} items`;
        } else {
            return 'No items found';
        }
    }
}

module.exports = BaseMethods;