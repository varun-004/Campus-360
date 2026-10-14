import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test",

  workers: 1,

  fullyParallel: false,

  retries: 1,

  reporter: [
    ["html"],
    ["list"],
  ],

  use: {
    baseURL: "http://localhost:5173",

    headless: false,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "on-first-retry",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});