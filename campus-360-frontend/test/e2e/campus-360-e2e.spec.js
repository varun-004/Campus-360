import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CoursePage } from "../pages/CoursePage";
import { createStudent } from "../utils/studentFactory";
import { EnrollmentPage } from "../pages/EnrollmentPage";
import { AttendancePage } from "../pages/AttendancePage";

test("Campus 360 End-to-End", async ({ page }) => {

 // Register Student
const registerPage = new RegisterPage(page);
const student = createStudent();

await registerPage.goto();
await registerPage.register(student);

// Login as Admin
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login("admin1@gmail.com", "12345");


// Create Course
const dashboard = new DashboardPage(page);
await dashboard.openCourses();

// Create Course
const course = new CoursePage(page);
await course.createCourse();

// Enroll Student
const enrollment = new EnrollmentPage(page);
await enrollment.enrollStudent();

const attendance = new AttendancePage(page);

await dashboard.openMarkAttendance();

await attendance.markAttendance();
await attendance.openHistory();

await attendance.selectCourse("5");
await expect(attendance.historyTable).toBeVisible();
await attendance.verifyHistoryLoaded();

await attendance.searchStudent(student.name);

await attendance.exportCsv();
});
