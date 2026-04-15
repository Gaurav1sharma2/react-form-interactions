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
    await page.screenshot({ path: 'screenshots/01-login-page.png', fullPage: true });
    
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
    await page.screenshot({ path: 'screenshots/02-after-login.png', fullPage: true });
  });

  // TEST 2: Fill Form Inputs
  test('TEST 2: User can fill all form input fields', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 15000 });
    
    // Fill form inputs
    await page.locator('input[id="blank1"]').fill(mockBlank1);
    await page.locator('input[id="blank2"]').fill(mockBlank2);
    await page.locator('input[id="blank3"]').fill(mockBlank3);
    await page.screenshot({ path: 'screenshots/03-form-filled.png', fullPage: true });
    
    // Verify inputs are filled
    await expect(page.locator('input[id="blank1"]')).toHaveValue(mockBlank1);
    await expect(page.locator('input[id="blank2"]')).toHaveValue(mockBlank2);
    await expect(page.locator('input[id="blank3"]')).toHaveValue(mockBlank3);
  });

  // TEST 3: Dropdown Selection
  test('TEST 3: User can select dropdown option', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    
    // Select dropdown option
    await page.locator('select[id="dropdown"]').selectOption(mockDropdown);
    await page.screenshot({ path: 'screenshots/04-dropdown-selected.png', fullPage: true });
    
    // Verify selection
    await expect(page.locator('select[id="dropdown"]')).toHaveValue(mockDropdown);
  });

  // TEST 4: Viewport Screenshot (visible area only)
  test('TEST 4: Viewport screenshot - visible area only', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    
    // Viewport screenshot (default - only visible area)
    await page.screenshot({ path: 'screenshots/05-viewport-only.png' });
    
    await expect(page.locator('h1:has-text("Fill-in-the-Blank")')).toBeVisible();
  });

  // TEST 5: Element Screenshot (single element)
  test('TEST 5: Element screenshot - capture button only', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Capture login button element
    await page.locator('button.login-btn').screenshot({ path: 'screenshots/06-login-button.png' });
    
    // Verify button exists
    await expect(page.locator('button.login-btn')).toBeVisible();
  });

  // TEST 6: Screenshot with omitBackground (transparent) - Chromium only
  test('TEST 6: Screenshot with transparent background', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'omitBackground only works in Chromium');
    
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    
    // Screenshot with transparent background (Chromium only)
    await page.screenshot({ 
      path: 'screenshots/07-transparent-bg.png', 
      fullPage: true,
      omitBackground: true 
    });
    
    await expect(page.locator('h1:has-text("Fill-in-the-Blank")')).toBeVisible();
  });

  // TEST 7: In-Memory Screenshot (buffer)
  test('TEST 7: In-memory screenshot buffer', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    
    // Capture screenshot as buffer (in-memory)
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    
    // Verify buffer is not empty
    expect(screenshotBuffer.length).toBeGreaterThan(0);
    
    await expect(page.locator('h1:has-text("Fill-in-the-Blank")')).toBeVisible();
  });

  // TEST 8: Visual Comparison Screenshot - Chromium only
  test('TEST 8: Visual comparison - baseline screenshot', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Visual comparison only works in Chromium');
    
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    
    // Visual comparison with baseline
    await expect(page).toHaveScreenshot('form-page-baseline.png', { fullPage: true });
  });

  // TEST 9: Screenshot with masked elements
  test('TEST 9: Screenshot with masked dynamic content', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Login first
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    
    // Screenshot with masked elements (hide dynamic content)
    await page.screenshot({ 
      path: 'screenshots/09-masked-content.png', 
      fullPage: true,
      mask: [page.locator('input[id="blank1"]')]
    });
    
    await expect(page.locator('h1:has-text("Fill-in-the-Blank")')).toBeVisible();
  });

  // TEST 10: Multiple Screenshots in Sequence
  test('TEST 10: Multiple screenshots - step by step', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Step 1: Login page
    await page.screenshot({ path: 'screenshots/10-step1-login-page.png', fullPage: true });
    
    // Step 2: Fill credentials
    await page.fill('input[id="email"]', mockEmail);
    await page.fill('input[id="password"]', mockPassword);
    await page.screenshot({ path: 'screenshots/10-step2-filled-credentials.png', fullPage: true });
    
    // Step 3: After login
    await page.click('button.login-btn');
    await page.waitForSelector('h1:has-text("Fill-in-the-Blank")', { timeout: 8000 });
    await page.screenshot({ path: 'screenshots/10-step3-after-login.png', fullPage: true });
    
    // Step 4: Fill form
    await page.locator('input[id="blank1"]').fill(mockBlank1);
    await page.locator('input[id="blank2"]').fill(mockBlank2);
    await page.locator('input[id="blank3"]').fill(mockBlank3);
    await page.screenshot({ path: 'screenshots/10-step4-form-filled.png', fullPage: true });
    
    await expect(page.locator('input[id="blank1"]')).toHaveValue(mockBlank1);
  });
});
