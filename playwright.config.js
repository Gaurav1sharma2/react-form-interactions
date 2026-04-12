import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
    },
    {
      name: 'chromium-multi',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/multi-browser.spec.js',
      fullyParallel: false,
    },
    {
      name: 'firefox-multi',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/multi-browser.spec.js',
      fullyParallel: false,
    },
    {
      name: 'webkit-multi',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/multi-browser.spec.js',
      fullyParallel: false,
    },
  ],

  webServer: undefined,
});
