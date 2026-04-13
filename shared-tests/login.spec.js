import { test, expect } from '@playwright/test';

const mockEmail = 'user@example.com';
const mockPassword = 'password123';

export const loginTests = {
  // TEST 1: Login Functionality
  test1: async (page) => {
    test('TEST 1: User can login with valid credentials', async ({ page }) => {
      await page.goto('http://localhost:3001');
      
      // Verify login page loaded
      await expect(page.locator('h1:has-text("Login")')).toBeVisible();
      
      // Fill login form
      await page.fill('input[id="email"]', mockEmail);
      await page.fill('input[id="password"]', mockPassword);
      
      // Submit login
      await page.click('button.login-btn');
      
      // Verify form page loaded after login
      await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
      await expect(page.locator('h1:has-text("Fill-in-the-Blank")')).toBeVisible();
    });
  },

  // TEST 2: Fill Form Inputs
  test2: async (page) => {
    test('TEST 2: User can fill all form input fields', async ({ page }) => {
      await page.goto('http://localhost:3001');
      
      // Login first
      await page.fill('input[id="email"]', mockEmail);
      await page.fill('input[id="password"]', mockPassword);
      await page.click('button.login-btn');
      await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
      
      // Fill form inputs
      const mockBlank1 = 'Answer 1';
      const mockBlank2 = 'Answer 2';
      const mockBlank3 = 'Answer 3';
      
      await page.locator('input[id="blank1"]').fill(mockBlank1);
      await page.locator('input[id="blank2"]').fill(mockBlank2);
      await page.locator('input[id="blank3"]').fill(mockBlank3);
      
      // Verify inputs are filled
      await expect(page.locator('input[id="blank1"]')).toHaveValue(mockBlank1);
      await expect(page.locator('input[id="blank2"]')).toHaveValue(mockBlank2);
      await expect(page.locator('input[id="blank3"]')).toHaveValue(mockBlank3);
    });
  },

  // TEST 3: Dropdown Selection
  test3: async (page) => {
    test('TEST 3: User can select dropdown option', async ({ page }) => {
      await page.goto('http://localhost:3001');
      
      // Login first
      await page.fill('input[id="email"]', mockEmail);
      await page.fill('input[id="password"]', mockPassword);
      await page.click('button.login-btn');
      await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
      
      // Select dropdown option
      const mockDropdown = 'Option 1';
      await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
      
      // Verify selection
      await expect(page.locator('select[id="dropdown"]')).toHaveValue(mockDropdown);
    });
  },
};
