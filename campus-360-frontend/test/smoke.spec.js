import { test } from "@playwright/test";
import { loginAsAdmin } from "./helpers/loginHelper";

test("Admin Login", async ({ page }) => {
  await loginAsAdmin(page);
});