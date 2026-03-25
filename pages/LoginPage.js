class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.customerLoginBtn = page.locator('button[ng-click="customer()"]');
    this.userSelect = page.locator('[id="userSelect"]');
    this.loginBtn = page.locator('button[type="submit"]');
  }

  // Navigate to the banking app homepage
  async goto() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');
  }

  // Click customer login, select Harry Potter, click login
  async loginAsCustomer(customerName) {
    await this.customerLoginBtn.click();
    await this.userSelect.selectOption({ label: customerName });
    await this.loginBtn.click();
  }
}

module.exports = LoginPage;