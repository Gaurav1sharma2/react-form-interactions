import { test, expect } from '@playwright/test';

// ============================================
// MODE 3: PLAYWRIGHT E2E TESTS (5 Tests Only)
// ============================================
// Tests real browser interactions
// Chrome (Chromium) engine only for speed
// Mock Data: user@example.com / password123

test.describe('Complete E2E Tests - Login & Form', () => {
  
  // Mock credentials
  const mockEmail = 'user@example.com';
  const mockPassword = 'password123';
  const mockBlank1 = 'JavaScript';
  const mockBlank2 = 'JavaScript';
  const mockBlank3 = 'useEffect';
  const mockDropdown = 'hooks';

  // TEST 1: Login Functionality
  test('TEST 1: User can login with valid credentials', async ({ page }) => {
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
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
  });

  // TEST 2: Fill Form Inputs
  test('TEST 2: User can fill all form input fields', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 15000 });
    
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
  test('TEST 3: User can select dropdown option', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 15000 });
    
    // Select dropdown option
    await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
    
    // Verify selection
    await expect(page.locator('select[id="dropdown"]')).toHaveValue(mockDropdown);
  });
});
