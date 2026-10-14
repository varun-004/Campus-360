import { expect } from "@playwright/test";

export class StudentPage {
  constructor(page) {
    this.page = page;

    // Buttons
    this.addStudentButton = page.getByRole("button", { name: /add student/i });
    this.saveButton = page.getByRole("button", { name: /save/i });

    // Form fields (update selectors later if needed)
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');

    // Search
    this.searchInput = page.getByPlaceholder(/search/i);

    // Table
    this.studentTable = page.locator("table");
  }

  async verifyPageLoaded() {
    await expect(this.studentTable).toBeVisible();
  }

  async clickAddStudent() {
    await this.addStudentButton.click();
  }

  async addStudent(student) {
    await this.clickAddStudent();

    await this.nameInput.fill(student.name);
    await this.emailInput.fill(student.email);
    await this.phoneInput.fill(student.phone);

    await this.saveButton.click();
  }

  async searchStudent(name) {
    await this.searchInput.fill(name);
  }
}