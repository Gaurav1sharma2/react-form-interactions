import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Original: 3 tests on Chromium - PARALLEL
    {
      name: 'chromium-parallel',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: true,
    },
    
    // New Scenario: Same 3 tests on 3 browsers - SEQUENTIAL
    {
      name: 'chromium-sequential',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
    },
    {
      name: 'firefox-sequential',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
    },
    {
      name: 'webkit-sequential',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
    },
  ],

  webServer: undefined,
});
