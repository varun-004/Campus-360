import { test, expect } from "@playwright/test";

test("Register a new student", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  const timestamp = Date.now();

  await page.getByRole("textbox", { name: "Name" }).fill("Test Student");

  await page
    .getByRole("textbox", { name: "Email" })
    .fill(`student${timestamp}@gmail.com`);

  await page
    .getByRole("textbox", { name: "Password" })
    .fill("Test@123");

  await page.getByRole("button", { name: "Register" }).click();

  // Verify registration succeeded
  await expect(page).toHaveURL(/login|dashboard/);
});