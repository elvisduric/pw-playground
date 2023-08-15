import BaseMethods from "./base.page";
import TopHeaderLocator from "../locators/topBar.locator";

class TopHeader {
    constructor(page) {
        this.page = page;
        this.validateEurCurrency = "€";
        this.validateGbpCurrency = "£";
        this.validateUsdCurrency = "$";
    }

    async validateOptionsPresent() {
        const baseMethods = new BaseMethods(this.page);
        const topHeader = new TopHeaderLocator(this.page);
        await baseMethods.validateElementVisible(topHeader.CurrencyDropDown);
        await baseMethods.validateElementVisible(topHeader.ContactNumber);
        await baseMethods.validateElementVisible(topHeader.MyAccount);
        await baseMethods.validateElementVisible(topHeader.WishList);
        await baseMethods.validateElementVisible(topHeader.ShoppingCart);
        await baseMethods.validateElementVisible(topHeader.Checkout);
    }

    async selectCurrency(currency) {
        const baseMethods = new BaseMethods(this.page);
        const topHeader = new TopHeaderLocator(this.page);
        await baseMethods.clickOnElement(topHeader.CurrencyDropDown);
        switch (currency) {
            case 'EUR':
                await baseMethods.clickOnElement(topHeader.EUROption);
                await baseMethods.validateText(topHeader.selectedCurrency, this.validateEurCurrency);
                break;
            case 'GBP':
                await baseMethods.clickOnElement(topHeader.GBPOption);
                await baseMethods.validateText(topHeader.selectedCurrency, this.validateGbpCurrency);
                break;
            case 'USD':
                await baseMethods.clickOnElement(topHeader.USDOption);
                await baseMethods.validateText(topHeader.selectedCurrency, this.validateUsdCurrency);
                break;
            default:
                throw new Error("No such currency found.");
        }
    }
}

module.exports = TopHeader;