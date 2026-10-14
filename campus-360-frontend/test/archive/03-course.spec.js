import { test } from "@playwright/test";
import { loginAsAdmin } from "../helpers/loginHelper";
import { DashboardPage } from "../pages/DashboardPage";
import { CoursePage } from "../pages/CoursePage";

test("Create Course", async ({ page }) => {
  await loginAsAdmin(page);

  const dashboard = new DashboardPage(page);
  const course = new CoursePage(page);

  await dashboard.openCourses();

  await course.createCourse();
});