const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const AccountPage = require('../../pages/AccountPage');
const testData = require('../../test-data/testData');

test.describe('Withdrawal Tests', () => {

  test('Customer can withdraw money successfully', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

    // Deposit first so there is money to withdraw
    await accountPage.deposit(testData.deposit.amount);

    // Get balance before withdrawal
    const balanceBefore = await accountPage.getBalance();
    console.log('Balance before withdrawal:', balanceBefore);

    // Withdraw
    await accountPage.withdraw(testData.withdrawal.validAmount);

    // Check what message appears after withdrawal
    const withdrawMessage = await accountPage.getMessage();
    console.log('Withdraw message:', withdrawMessage);

    // Get balance after withdrawal
    const balanceAfter = await accountPage.getBalance();
    console.log('Balance after withdrawal:', balanceAfter);

    // Assert
    await expect(balanceAfter).toBe(balanceBefore - parseInt(testData.withdrawal.validAmount));
  });

  test('Withdrawal shows success message', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

    // Deposit first
    await accountPage.deposit(testData.deposit.amount);

    // Withdraw
    await accountPage.withdraw(testData.withdrawal.validAmount);

    // Assert
    const message = await accountPage.getMessage();
    console.log('Message:', message);
    await expect(message).toContain('Transaction successful');
  });

  test('Customer cannot withdraw more than balance', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

    // Try to withdraw more than balance
    await accountPage.withdraw(testData.withdrawal.invalidAmount);

    // Assert
    const message = await accountPage.getMessage();
    console.log('Message:', message);
    await expect(message).toContain('Transaction Failed');
  });

});