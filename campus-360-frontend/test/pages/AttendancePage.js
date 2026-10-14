import { expect } from "@playwright/test";

export class AttendancePage {
  constructor(page) {
    this.page = page;

    // Mark Attendance
    this.courseDropdown = page.getByRole("combobox");
    this.presentButtons = page.getByRole("button", { name: "Present" });
    this.absentButtons = page.getByRole("button", { name: "Absent" });
    this.saveButton = page.getByRole("button", { name: "Save Attendance" });

    // Attendance History
    this.searchBox = page.getByPlaceholder("Search student...");
    this.exportButton = page.getByRole("button", {
      name: "Export CSV",
    });

    this.dateInput = page.locator('input[type="date"]');

    this.historyTable = page.locator("table");
  }

  // ----------------------------
  // Mark Attendance
  // ----------------------------

  async markAttendance(courseId = "5") {
    await this.courseDropdown.selectOption(courseId);

    await this.presentButtons.first().click();
    await this.presentButtons.nth(1).click();

    if (await this.saveButton.isVisible().catch(() => false)) {
      await this.saveButton.click();
    }
  }

  // ----------------------------
  // Attendance History
  // ----------------------------

  async openHistory() {
    await this.page.getByRole("link", {
      name: "Attendance History",
    }).click();
  }

  async selectCourse(courseId) {
    await this.courseDropdown.selectOption(courseId);
  }

  async selectDate(date) {
    await this.dateInput.fill(date);
  }

  async searchStudent(studentName) {
    await this.searchBox.fill(studentName);
  }

  async verifyHistoryLoaded() {
    await expect(this.historyTable).toBeVisible();
  }

  async exportCsv() {
    const downloadPromise =
      this.page.waitForEvent("download");

    await this.exportButton.click();

    await downloadPromise;
  }
}