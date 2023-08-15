class TopHeaderLocator {
    constructor(page) {
        this.page = page;
        this.CurrencyDropDown = page.getByRole("button", {name: 'Currency'});
        this.EUROption = page.locator('button[name="EUR"]')
        this.GBPOption = page.locator('button[name="GBP"]')
        this.USDOption = page.locator('button[name="USD"]')
        this.selectedCurrency = page.locator('.btn.btn-link.dropdown-toggle strong');
        this.ContactNumber = page.locator('ul.list-inline li').nth(1);
        this.MyAccount = page.getByTitle(`My Account`);
        this.Register = page.getByText(`Register`);
        this.Login = page.getByText(`Login`);
        this.WishList = page.getByTitle(`Wish List (0)`);
        this.ShoppingCart = page.getByTitle(`Shopping Cart`);
        this.Checkout = page.getByTitle(`Checkout`);
    }
}

module.exports = TopHeaderLocator;