import BaseMethods from "./base.page";
import TopHeaderLocator from "../locators/topBar.locator";

class TopHeader {
    constructor(page) {
        this.page = page;
        this.validateEuroCurrency = "€";
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

    async selectEURCurrency() {
        const baseMethods = new BaseMethods(this.page);
        const topHeader = new TopHeaderLocator(this.page);
        await baseMethods.clickOnElement(topHeader.CurrencyDropDown);
        await baseMethods.clickOnElement(topHeader.EUROption);
        await baseMethods.validateText(topHeader.selectedCurrency, this.validateEuroCurrency);
    }
}

module.exports = TopHeader;