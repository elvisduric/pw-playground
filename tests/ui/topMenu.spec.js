import {test} from "@playwright/test";
import BaseMethods from "../../pages/base.page";
import MenuLocator from "../../locators/menuBar.locator";
import TopHeader from "../../pages/topHeader.page";


test.describe('Load the URL and validate the top header', () => {

    test.beforeEach(async ({page, request}) => {
        const baseMethods = new BaseMethods(page);
        const menuLocator = new MenuLocator(page);
        await baseMethods.goToURL();
        await baseMethods.waitForElementToBeVisible(menuLocator.WebsiteLogo);
    });


    test('Validate the header options are displayed', async ({page}) => {
        const topHeader = new TopHeader(page);
        await topHeader.validateOptionsPresent();
    });

    const currencies = ['EUR', 'GBP', 'USD'];
    for (const currency of currencies) {
    test(`Select the ${currency} currency`, async ({page}) => {
        const topHeader = new TopHeader(page);
        await topHeader.selectCurrency(currency);
    });
    }
});