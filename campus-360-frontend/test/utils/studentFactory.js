export function createStudent() {
  const timestamp = Date.now();

  return {
    name: `Student ${timestamp}`,
    email: `student${timestamp}@gmail.com`,
    password: "12345",
  };
}