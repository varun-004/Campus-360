# Campus 360 — Backend API Service

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- MySQL
- Swagger

## Features
- CRUD operations
- DTO (Request & Response)
- Validation using @Valid
- Global Exception Handling
- Pagination
- Search + Pagination
- Sorting
- Swagger API documentation

## How to Run
1. From `campus-360-backend`, run `docker compose up --build`
2. Or configure database in `application.properties` and run the Spring Boot app
3. Open Swagger: http://localhost:8080/swagger-ui/index.html

## Description
REST API for Campus 360 — courses, attendance, marks, analytics, and auth.
Layered architecture: Controller → Service → Repository.
