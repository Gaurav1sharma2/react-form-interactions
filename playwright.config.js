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
    // Original: 5 tests on Chromium - PARALLEL (untouched)
    {
      name: 'chromium-parallel',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: true,
    },
    
    // New Scenario: Same 5 tests on 3 browsers - SEQUENTIAL (no cache, no parallel)
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
