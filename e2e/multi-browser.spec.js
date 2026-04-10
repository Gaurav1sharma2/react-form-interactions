import { test, expect } from '@playwright/test';

// ============================================
// MULTI-BROWSER E2E TESTS (5 Tests × 3 Browsers)
// ============================================
// Same test scenarios as complete-flow.spec.js
// Runs on Chromium, Firefox, and WebKit
// Sequential execution (no parallel)

test.describe('Multi-Browser E2E Tests - Login & Form', () => {
  
  // Mock credentials
  const mockEmail = 'user@example.com';
  const mockPassword = 'password123';
  const mockBlank1 = 'JavaScript';
  const mockBlank2 = 'JavaScript';
  const mockBlank3 = 'useEffect';
  const mockDropdown = 'hooks';

  // TEST 1: Login Functionality
  test('MB-TEST 1: User can login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Verify login page loaded
    await expect(page.locator('h1:has-text("Login")')).toBeVisible();
    
    // Fill email
    await page.fill('input[id="email"]', mockEmail);
    
    // Fill password
    await page.fill('input[id="password"]', mockPassword);
    
    // Click login button
    await page.click('button.login-btn');
    
    // Wait for form page to load (check for form heading)
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 10000 });
  });

  // TEST 2: Fill Form Inputs
  test('MB-TEST 2: User can fill all form input fields', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 10000 });
    
    // Fill blank 1
    await page.locator('input[id="blank1"]').fill(mockBlank1);
    await expect(page.locator('input[id="blank1"]')).toHaveValue(mockBlank1);
    
    // Fill blank 2
    await page.locator('input[id="blank2"]').fill(mockBlank2);
    await expect(page.locator('input[id="blank2"]')).toHaveValue(mockBlank2);
    
    // Fill blank 3
    await page.locator('input[id="blank3"]').fill(mockBlank3);
    await expect(page.locator('input[id="blank3"]')).toHaveValue(mockBlank3);
  });

  // TEST 3: Dropdown Selection
  test('MB-TEST 3: User can select dropdown option', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 10000 });
    
    // Select dropdown option
    await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
    
    // Verify selection
    await expect(page.locator('select[id="dropdown"]')).toHaveValue(mockDropdown);
  });

  // TEST 4: Complete Form Submission
  test('MB-TEST 4: User can submit complete form with all data', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 10000 });
    
    // Fill all inputs
    await page.locator('input[id="blank1"]').fill(mockBlank1);
    await page.locator('input[id="blank2"]').fill(mockBlank2);
    await page.locator('input[id="blank3"]').fill(mockBlank3);
    await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
    
    // Submit form
    await page.locator('button:has-text("Submit")').click();
    
    // Verify success message
    await expect(page.locator('text=Form submitted successfully')).toBeVisible({ timeout: 5000 });
  });

  // TEST 5: Form Displays Submitted Answers
  test('MB-TEST 5: Form displays submitted answers correctly', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 10000 });
    
    // Fill all inputs
    await page.locator('input[id="blank1"]').fill(mockBlank1);
    await page.locator('input[id="blank2"]').fill(mockBlank2);
    await page.locator('input[id="blank3"]').fill(mockBlank3);
    await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
    
    // Submit form
    await page.locator('button:has-text("Submit")').click();
    
    // Verify answers display with specific selectors
    await expect(page.locator('.answers-display')).toContainText(mockBlank1);
    await expect(page.locator('.answers-display')).toContainText(mockBlank3);
    await expect(page.locator('.answers-display')).toContainText(mockDropdown);
  });
});
