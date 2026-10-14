import { expect } from "@playwright/test";

export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.name = page.getByRole("textbox", { name: "Name" });
    this.email = page.getByRole("textbox", { name: "Email" });
    this.password = page.getByRole("textbox", { name: "Password" });

    this.registerButton = page.getByRole("button", {
      name: "Register",
    });
  }

  async goto() {
    await this.page.goto("/register");
  }

  async register(student) {
    await this.name.fill(student.name);
    await this.email.fill(student.email);
    await this.password.fill(student.password);

    await this.registerButton.click();

    await expect(this.page).toHaveURL(/login|dashboard/);
  }
}