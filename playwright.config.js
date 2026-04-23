import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
import * as os from 'os';

const reportConfig = {
  open: process.env.CI ? 'never' : 'always',
  folderPath: 'ortoni-report',
  filename: 'ortoni-report.html',
  title: 'React Form Interactions - Test Report',
  projectName: 'React Form Interactions',
  testType: 'Functional',
  authorName: os.userInfo().username,
  base64Image: false,
  stdIO: false,
  meta: {
    'Test Cycle': 'Apr, 2026',
    version: '1.0',
    description: 'E2E tests for login and form interactions with screenshots',
    release: '1.0',
    platform: os.type(),
  },
};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['ortoni-report', reportConfig],
  ],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
  },

  projects: [
    // Original: 3 tests on Chromium - PARALLEL (3 workers)
    {
      name: 'chromium-parallel',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: true,
      workers: 3,
    },
    
    // New Scenario: Same 3 tests on 3 browsers - SEQUENTIAL (1 worker each)
    {
      name: 'chromium-sequential',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
      workers: 1,
    },
    {
      name: 'firefox-sequential',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
      workers: 1,
    },
    {
      name: 'webkit-sequential',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
      workers: 1,
    },
  ],

  webServer: undefined,
});
