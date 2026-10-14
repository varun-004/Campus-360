import { test } from "@playwright/test";
import { loginAsAdmin } from "../../helpers/loginHelper";
import { DashboardPage } from "../../pages/DashboardPage";

test("Admin Dashboard should load successfully", async ({ page }) => {
  await loginAsAdmin(page);

  const dashboard = new DashboardPage(page);

  await dashboard.verifyDashboardLoaded();
});