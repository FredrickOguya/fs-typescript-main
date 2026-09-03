import { defineConfig } from '@playwright/test';

declare const process: {
  env: {
    CI?: string;
  };
};

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm run dev',
    cwd: '../patientor/backend',
    url: 'http://localhost:3001/api/ping',
    timeout: 30000,
    reuseExistingServer: !process.env.CI,
  },
});