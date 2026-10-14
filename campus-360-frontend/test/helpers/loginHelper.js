import { LoginPage } from "../pages/LoginPage";
import { adminUser, studentUser } from "../data/users";

export async function loginAsAdmin(page) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(adminUser.email, adminUser.password);
}

export async function loginAsStudent(page) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(studentUser.email, studentUser.password);
}