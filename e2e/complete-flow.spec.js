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
    await page.goto('http://localhost:3000');
    
    // Fill email
    await page.locator('input[id="email"]').fill(mockEmail);
    
    // Fill password
    await page.locator('input[id="password"]').fill(mockPassword);
    
    // Click login button
    await page.locator('button:has-text("Login")').click();
    
    // Wait for form page to load (check for form heading)
    await expect(page.locator('text=Fill-in-the-Blank')).toBeVisible({ timeout: 10000 });
  });

  // TEST 2: Fill Form Inputs
  test('TEST 2: User can fill all form input fields', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Login first
    await page.locator('input[id="email"]').fill(mockEmail);
    await page.locator('input[id="password"]').fill(mockPassword);
    await page.locator('button:has-text("Login")').click();
    await expect(page.locator('text=Fill-in-the-Blank')).toBeVisible({ timeout: 10000 });
    
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
    await page.goto('http://localhost:3000');
    
    // Login first
    await page.locator('input[id="email"]').fill(mockEmail);
    await page.locator('input[id="password"]').fill(mockPassword);
    await page.locator('button:has-text("Login")').click();
    await expect(page.locator('text=Fill-in-the-Blank')).toBeVisible({ timeout: 10000 });
    
    // Select dropdown option
    await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
    
    // Verify selection
    await expect(page.locator('select[id="dropdown"]')).toHaveValue(mockDropdown);
  });

  // TEST 4: Complete Form Submission
  test('TEST 4: User can submit complete form with all data', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Login
    await page.locator('input[id="email"]').fill(mockEmail);
    await page.locator('input[id="password"]').fill(mockPassword);
    await page.locator('button:has-text("Login")').click();
    await expect(page.locator('text=Fill-in-the-Blank')).toBeVisible({ timeout: 10000 });
    
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
  test('TEST 5: Form displays submitted answers correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Login
    await page.locator('input[id="email"]').fill(mockEmail);
    await page.locator('input[id="password"]').fill(mockPassword);
    await page.locator('button:has-text("Login")').click();
    await expect(page.locator('text=Fill-in-the-Blank')).toBeVisible({ timeout: 10000 });
    
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
