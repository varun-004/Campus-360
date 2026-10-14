import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.email = page.getByRole("textbox", { name: "Email" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();

    // Verify successful login
    await expect(this.page).toHaveURL(/dashboard/);
  }
}