class TransactionPage {
  constructor(page) {
    this.page = page;

    // Table headers
    this.transactionTable = page.locator('.table');
    this.tableRows = page.locator('tbody tr');

    // Transaction details
    this.transactionDate = page.locator('tbody tr td').nth(0);
    this.transactionAmount = page.locator('tbody tr td').nth(1);
    this.transactionType = page.locator('tbody tr td').nth(2);

    // Back button
    this.backBtn = page.locator('button[ng-click="back()"]');
  }

  // Get total number of transactions
  async getTransactionCount() {
    return await this.tableRows.count();
  }

  // Get the type of the last transaction (Credit or Debit)
  async getLastTransactionType() {
    const count = await this.tableRows.count();
    const lastRow = this.tableRows.nth(count - 1);
    const type = await lastRow.locator('td').nth(2).textContent();
    return type.trim();
  }

  // Get the amount of the last transaction
  async getLastTransactionAmount() {
    const count = await this.tableRows.count();
    const lastRow = this.tableRows.nth(count - 1);
    const amount = await lastRow.locator('td').nth(1).textContent();
    return parseInt(amount.trim());
  }

  // Check if a transaction exists with a specific amount and type
  async transactionExists(amount, type) {
    const rows = await this.tableRows.count();
    for (let i = 0; i < rows; i++) {
      const rowAmount = await this.tableRows.nth(i).locator('td').nth(1).textContent();
      const rowType = await this.tableRows.nth(i).locator('td').nth(2).textContent();
      if (rowAmount.trim() === amount && rowType.trim() === type) {
        return true;
      }
    }
    return false;
  }

  // Go back to account page
  async goBack() {
    await this.backBtn.click();
  }
}

module.exports = TransactionPage;