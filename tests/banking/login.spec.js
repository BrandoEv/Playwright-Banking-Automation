const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const AccountPage = require('../../pages/AccountPage');
const testData = require('../../test-data/testData');

test.describe('Login Tests', () => {

  test('Customer can successfully log in', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

    // Assert
    await expect(page).toHaveURL(/customer/);
    await expect(accountPage.transactionsBtn).toBeVisible();
    await expect(accountPage.depositBtn).toBeVisible();
    await expect(accountPage.withdrawBtn).toBeVisible();
  });

  test('Customer can logout successfully', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);
    await accountPage.logout();

    // Assert
    await expect(page).toHaveURL(/BankingProject/);
  });

});