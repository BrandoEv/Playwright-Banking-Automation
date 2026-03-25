class AccountPage {
  constructor(page) {
    this.page = page;

    // Top navigation
    this.accountNumber = page.locator('[ng-hide="noAccount"]');
    this.balance = page.locator('[ng-hide="noAccount"] strong').nth(1);
    this.currency = page.locator('[ng-hide="noAccount"] strong').nth(2);

    // Buttons
    this.depositBtn = page.locator('button[ng-click="deposit()"]');
    this.withdrawBtn = page.locator('button[ng-click="withdrawl()"]');
    this.transactionsBtn = page.locator('button[ng-click="transactions()"]');
    this.logoutBtn = page.locator('button.logout');

    // Message
    this.message = page.locator('[ng-show="message"]');
  }

  // Get current balance as a number
  async getBalance() {
    const balanceText = await this.balance.textContent();
    return parseInt(balanceText.trim());
  }

  // Deposit money into account
  async deposit(amount) {
    await this.depositBtn.click();
    await this.page.locator('[ng-model="amount"]').waitFor({ state: 'visible' });
    await this.page.locator('[ng-model="amount"]').fill(amount);
    await this.page.locator('button[type="submit"]').filter({ hasText: 'Deposit' }).click();
  }

  // Withdraw money from account
  async withdraw(amount) {
    await this.withdrawBtn.click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('[ng-model="amount"]').fill('500');
    await this.page.locator('button[type="submit"]').filter({ hasText: 'Withdraw' }).click();
  }

  // Get success or error message
  async getMessage() {
    await this.page.waitForFunction(() => {
      const el = document.querySelector('[ng-show="message"]');
      return el && el.textContent.trim() !== '';
    });
    const text = await this.message.textContent();
    return text.trim();
  }

  // Logout of the account
  async logout() {
    await this.logoutBtn.click();
  }

  // Go to transactions page
  async goToTransactions() {
    await this.transactionsBtn.click();
  }
}

module.exports = AccountPage;