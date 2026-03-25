const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const AccountPage = require('../../pages/AccountPage');
const testData = require('../../test-data/testData');

test.describe('Deposit Tests', () => {

  test('Customer can deposit money successfully', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

    // Get balance before deposit
    const balanceBefore = await accountPage.getBalance();
    console.log('Balance before deposit:', balanceBefore);

    // Deposit money
    await accountPage.deposit(testData.deposit.amount);

    // Get balance after deposit
    const balanceAfter = await accountPage.getBalance();
    console.log('Balance after deposit:', balanceAfter);

    // Assert
    await expect(balanceAfter).toBe(balanceBefore + parseInt(testData.deposit.amount));
  });

  test('Deposit shows success message', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);
    await accountPage.deposit(testData.deposit.amount);

    // Assert
    const message = await accountPage.getMessage();
    console.log('Message:', message);
    await expect(message).toContain('Deposit Successful');
  });

});