import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/loginHelper";

test("Admin Login", async ({ page }) => {
  await loginAsAdmin(page);

  await expect(page).toHaveURL(/dashboard/);
});