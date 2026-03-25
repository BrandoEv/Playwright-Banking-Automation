const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const AccountPage = require('../../pages/AccountPage');
const TransactionPage = require('../../pages/TransactionPage');
const testData = require('../../test-data/testData');


test.describe('Transaction Tests', () => {

    test('Transaction Load after Deposit' , async ({page}) => {

        // Arrange
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        const transactionsPage = new TransactionPage(page);

        // Act
        await loginPage.goto();
        await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);
        
        // Make deposit and wait for success
        await accountPage.deposit(testData.deposit.amount);
        const depositMessage = await accountPage.getMessage();
        console.log('Deposit message:', depositMessage);
        await accountPage.page.waitForTimeout(1000); // Wait for transaction to be recorded
        
        // Navigate to transactions
        await accountPage.goToTransactions();

        // wait for transactions to load
        await transactionsPage.transactionTable.waitFor({ state: 'visible' });
        await transactionsPage.tableRows.first().waitFor({ state: 'visible', timeout: 5000 });

        // Assert
        const count = await transactionsPage.getTransactionCount();
        console.log('Transaction count:', count);
        expect(count).toBeGreaterThan(0);
        
    });

    test('Deposit appears as Credit in Transactions', async ({ page }) => {

        // Arrange
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        const transactionPage = new TransactionPage(page);

        // Act
        await loginPage.goto();
        await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

        // Make deposit and wait for success
        await accountPage.deposit(testData.deposit.amount);
        const depositMessage = await accountPage.getMessage();
        console.log('Deposit message:', depositMessage);
        await accountPage.page.waitForTimeout(1000); // Wait for transaction to be recorded

        // Navigate to transactions
        await accountPage.goToTransactions();

        // wait for transactions to load
        await transactionPage.transactionTable.waitFor({ state: 'visible' });
        await transactionPage.tableRows.first().waitFor({ state: 'visible', timeout: 5000 });

        // Assert
        const firstRow = transactionPage.tableRows.first();
        const type = await firstRow.locator('td').nth(2).textContent();
        console.log('Transaction type:', type);
        expect(type.trim()).toBe('Credit');
    });

    test('Withdrawal appears as Debit in Transactions', async ({ page }) => {

        // Arrange
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        const transactionPage = new TransactionPage(page);

        // Act
        await loginPage.goto();
        await loginPage.loginAsCustomer(testData.customer.firstName + ' ' + testData.customer.lastName);

        // Deposit first so there is money to withdraw
        await accountPage.deposit(testData.deposit.amount);
        await accountPage.page.waitForTimeout(1000); // Wait for transaction to be recorded

        // Withdraw
        await accountPage.withdraw(testData.withdrawal.validAmount);
        const withdrawMessage = await accountPage.getMessage();
        console.log('Withdraw message:', withdrawMessage);
        await accountPage.page.waitForTimeout(1000); // Wait for transaction to be recorded

        // Navigate to transactions
        await accountPage.goToTransactions();

        // wait for transactions to load
        await transactionPage.transactionTable.waitFor({ state: 'visible' });
        await transactionPage.tableRows.first().waitFor({ state: 'visible', timeout: 5000 });

        // Assert
        const lastAmount = await transactionPage.getLastTransactionAmount();
        const lastType = await transactionPage.getLastTransactionType();
        console.log('Last transaction type:', lastType, 'Amount:', lastAmount);
        expect(lastType).toContain('Debit');
        expect(lastAmount).toBe(parseInt(testData.withdrawal.validAmount));
    });
});