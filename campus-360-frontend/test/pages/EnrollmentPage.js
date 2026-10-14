export class EnrollmentPage {
  constructor(page) {
    this.page = page;

    this.viewDetailsButtons = page.getByRole("button", {
      name: "View Details",
    });

    this.enrollStudentButton = page.getByRole("button", {
      name: "Enroll Student",
    });

    this.studentDropdown = page.getByRole("combobox");

    this.enrollButton = page.getByRole("button", {
      name: "Enroll",
      exact: true,
    });
  }

  async enrollStudent(studentId = "6") {
    // Opens the selected course
    await this.viewDetailsButtons.nth(4).click();

    // Opens enrollment modal
    await this.enrollStudentButton.click();

    // Select student
    await this.studentDropdown.selectOption(studentId);

    // Confirm enrollment
    await this.enrollButton.click();
  }
}