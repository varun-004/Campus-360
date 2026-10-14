export class CoursePage {
  constructor(page) {
    this.page = page;

    this.addCourseButton = page.getByRole("button", {
      name: "Add Course",
    });

    this.courseName = page.getByRole("textbox", {
      name: "Course Name",
    });

    this.courseCode = page.getByRole("textbox", {
      name: "Course Code",
    });

    this.credits = page.getByRole("spinbutton", {
      name: "Credits",
    });

    this.teacher = page.getByLabel("Teacher*");

    this.createButton = page.getByRole("button", {
      name: "Create Course",
    });
  }

  async createCourse() {

    const timestamp = Date.now();

    const course = {
      name: `Software Engineering ${timestamp}`,
      code: `SE${timestamp}`,
      credits: "4",
      teacher: "3",
    };

    await this.addCourseButton.click();

    await this.courseName.fill(course.name);
    await this.courseCode.fill(course.code);
    await this.credits.fill(course.credits);
    await this.teacher.selectOption(course.teacher);

    await this.createButton.click();

    return course;
  }
}