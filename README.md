**Playwright Banking Automation Framework**

A real-world end-to-end test automation framework built to simulate how QA engineers 
test banking applications in production environments. This project demonstrates my 
ability to design scalable, maintainable automation using industry-standard patterns.

**Why I Built This**

Most QA portfolios show basic form submissions or simple click tests. I wanted to build 
something that reflects what actually matters in enterprise QA — financial logic 
validation, negative testing, and a clean architecture that a whole team could work with.

**What It Tests**

This framework automates a full banking user journey:

- A customer logs in and is authenticated successfully
- They deposit money and the balance updates correctly
- They withdraw money and the balance reflects the deduction
- The system correctly blocks withdrawals that exceed the available balance
- Every transaction is recorded and visible in the transaction history
- The customer can log out securely

**Technologies**

- Playwright (JavaScript) — browser automation and assertions
- Page Object Model — keeps tests clean and maintainable
- Centralised Test Data — all test values managed in one place
- Node.js — runtime environment

**Test Results**

10 tests across 4 suites — all passing.

| Suite | Tests | What It Validates |
|-------|-------|-------------------|
| Login | 2 | Authentication and logout |
| Deposit | 2 | Balance update and success message |
| Withdrawal | 3 | Balance deduction, success message, insufficient funds |
| Transactions | 3 | Transaction count, Credit entries, Debit entries |

**Project Structure**
```
playwright-banking-automation/
├── pages/
│   ├── LoginPage.js          # Login and logout actions
│   ├── AccountPage.js        # Deposit, withdraw, balance checks
│   └── TransactionPage.js    # Transaction history validation
├── tests/banking/
│   ├── login.spec.js
│   ├── deposit.spec.js
│   ├── withdrawal.spec.js
│   └── transactions.spec.js
├── test-data/
│   └── testData.js           # Centralised test data
└── playwright.config.js      # Global configuration
```

**Getting Started**

Clone the repo:
```bash
git clone https://github.com/BrandoEv/Playwright-Banking-Automation.git
cd Playwright-Banking-Automation
```

Install dependencies:
```bash
npm install
npx playwright install
```

Run all tests:
```bash
npx playwright test
```

Run a specific suite:
```bash
npx playwright test tests/banking/login.spec.js
```

View the HTML report:
```bash
npx playwright show-report
```

**Application Under Test**

[XYZ Bank — GlobalsQA Banking Project](https://www.globalsqa.com/angularJs-protractor/BankingProject/)

A realistic banking application used by QA engineers worldwide for automation practice.

**What I Learned Building This**

Working through this project taught me how to handle Angular app timing issues, 
how to structure page objects so they stay reusable across multiple test files, 
and how to write negative tests that prove a system fails safely — not just that 
it works when everything goes right.
