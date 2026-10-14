import { expect } from "@playwright/test";

export class TeacherPage {
  constructor(page) {
    this.page = page;

    this.addTeacherButton = page.getByRole("button", { name: /add teacher/i });
    this.saveButton = page.getByRole("button", { name: /save/i });

    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.departmentInput = page.locator('input[name="department"]');

    this.searchInput = page.getByPlaceholder(/search/i);

    this.teacherTable = page.locator("table");
  }

  async verifyPageLoaded() {
    await expect(this.teacherTable).toBeVisible();
  }

  async addTeacher(teacher) {
    await this.addTeacherButton.click();

    await this.nameInput.fill(teacher.name);
    await this.emailInput.fill(teacher.email);
    await this.departmentInput.fill(teacher.department);

    await this.saveButton.click();
  }

  async searchTeacher(name) {
    await this.searchInput.fill(name);
  }
}