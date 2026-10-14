import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardLink = page.getByRole("link", { name: "Dashboard" });

    this.coursesLink = page.getByRole("link", { name: "Courses" });
    this.markAttendanceLink = page.getByRole("link", { name: "Mark Attendance" });
    this.attendanceHistoryLink = page.getByRole("link", { name: "Attendance History" });
    this.attendanceReportLink = page.getByRole("link", { name: "Attendance Report" });

    this.marksEntryLink = page.getByRole("link", { name: "Marks Entry" });
    this.marksReportLink = page.getByRole("link", { name: "Marks Report" });
    this.topPerformersLink = page.getByRole("link", { name: "Top Performers" });

    this.analyticsLink = page.getByRole("link", {
      name: "Student Risk Analytics",
    });

    this.teachersLink = page.getByRole("link", {
      name: "Teachers",
    });

    this.logoutButton = page.getByRole("button", {
      name: /logout/i,
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardLink).toBeVisible();
  }

  async openCourses() {
    await this.coursesLink.click();
  }

  async openTeachers() {
    await this.teachersLink.click();
  }

  async openMarkAttendance() {
    await this.markAttendanceLink.click();
  }

  async openAttendanceHistory() {
    await this.attendanceHistoryLink.click();
  }

  async openAttendanceReport() {
    await this.attendanceReportLink.click();
  }

  async openMarksEntry() {
    await this.marksEntryLink.click();
  }

  async openMarksReport() {
    await this.marksReportLink.click();
  }

  async openTopPerformers() {
    await this.topPerformersLink.click();
  }

  async openAnalytics() {
    await this.analyticsLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}