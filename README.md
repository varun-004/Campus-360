# Campus 360

**Campus 360** is a full-stack student management platform designed to
bring student records, courses, attendance, marks, analytics, and
AI-assisted student risk insights into one application.

> **Project status:** This README documents the project structure and
> the technology stack currently described for Campus 360. Exact
> features and deployment commands can vary with the current source code
> and Docker configuration; confirm the relevant files before deploying
> publicly.

## Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Architecture](#architecture)
-   [Technology Stack](#technology-stack)
-   [Repository Structure](#repository-structure)
-   [Prerequisites](#prerequisites)
-   [Run with Docker](#run-with-docker)
-   [Run Services Individually](#run-services-individually)
-   [Configuration and Environment
    Variables](#configuration-and-environment-variables)
-   [API and Documentation](#api-and-documentation)
-   [Security Notes](#security-notes)
-   [Troubleshooting](#troubleshooting)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

## Overview

Campus 360 provides role-oriented workflows for administrators,
teachers, and students. It combines a React web interface, a Spring Boot
REST API, a MySQL database, and a Python-based ML service.

The application is intended to help educational institutions manage
day-to-day academic information and review student performance from a
centralized interface.

## Features

The following capabilities are part of the project's described scope.
Availability in a specific checkout depends on the implementation and
configuration in that version.

-   **Authentication and access control:** JWT-based authentication and
    role-based access for Admin, Teacher, and Student accounts.
-   **Student management:** Maintain student information and records.
-   **Teacher management:** Manage teacher accounts and related
    information.
-   **Course management:** Create and view courses and manage student
    enrollments.
-   **Attendance:** Record and review attendance information.
-   **Marks and performance:** Enter marks and review academic
    performance.
-   **Analytics dashboards:** Summaries and charts for academic data.
-   **Student risk insights:** AI/ML-assisted analysis based on
    available academic indicators.
-   **Reports:** Report generation where supported by the current
    backend.
-   **Responsive web interface:** React-based user interface, including
    a public landing page.

## Architecture

``` text
Browser
   |
   v
React + Vite frontend
   |
   | HTTP / REST API
   v
Spring Boot backend
   |                  \
   v                   v
MySQL database      FastAPI ML service
```

In Docker deployments, services should communicate using their Docker
Compose service names on the internal network. Browser requests must use
a browser-accessible backend URL or a configured reverse-proxy
path---not a Docker-only hostname.

## Technology Stack

  Component        Technology
  ---------------- -----------------------------------------------
  Frontend         React, Vite, Tailwind CSS
  Backend          Java, Spring Boot, Spring Security, JWT
  Database         MySQL
  AI/ML service    Python, FastAPI, scikit-learn (as configured)
  API testing      Postman; Swagger/OpenAPI if enabled
  Containers       Docker and Docker Compose
  Source control   Git and GitHub

## Repository Structure

The repository is organized as a combined project. Folder names may
differ if the project has been renamed locally.

``` text
Campus-360/
├── ai-ml-service/                     # Python ML API and model files
├── campus-360-backend/                # Spring Boot backend
├── campus-360-frontend/               # React frontend
├── Campus-360-API.postman_collection.json
├── .gitignore
└── README.md
```

Look for `Dockerfile` and `compose.yaml` / `docker-compose.yml` files in
the repository and service folders to determine the current container
build contexts and startup location.

## Prerequisites

For local development, install the tools required by the services you
intend to run:

-   Git
-   Docker Desktop with Docker Compose (recommended for running the full
    stack)
-   Java and Maven for running the backend outside Docker
-   Node.js and npm for running the frontend outside Docker
-   Python and pip for running the ML service outside Docker
-   MySQL, if you are not using the database container

Use the Java, Node.js, Python, and MySQL versions specified in the
project's Dockerfiles, build files, and dependency manifests when
available.

## Run with Docker

### 1. Clone the repository

``` bash
git clone https://github.com/varun-004/Campus-360.git
cd Campus-360
```

### 2. Configure environment variables

Inspect the root and service-level Docker Compose files and application
configuration. Create local environment files from provided example
files if available. Do not commit real `.env` files or credentials.

### 3. Start the services

If a Compose file exists at the repository root:

``` bash
docker compose up -d --build
```

If Compose is stored in a service folder, run the command from that
folder or pass its file explicitly, for example:

``` bash
docker compose -f path/to/docker-compose.yml up -d --build
```

Use the actual path to the Compose file in this repository.

### 4. Check service status and logs

``` bash
docker compose ps
docker compose logs --tail=100
```

To follow a particular service's logs:

``` bash
docker compose logs -f <service-name>
```

Replace `<service-name>` with the service name shown by
`docker compose ps`.

### 5. Open the application

The local ports previously used in this project are listed below, but
verify the current Compose port mappings before relying on them.

  Service                               Common local URL
  ------------------------------------- ------------------------------
  Frontend                              http://localhost:5173
  Spring Boot backend                   http://localhost:8080
  FastAPI ML service                    http://localhost:8000
  FastAPI health endpoint, if enabled   http://localhost:8000/health

If the frontend is served through an Nginx container, its host port may
differ from the Vite development port. Use the host port displayed by
`docker compose ps`.

### Stop the services

``` bash
docker compose down
```

This normally preserves named volumes. **Do not** add `-v` unless you
intentionally want to delete Compose-managed volumes, which may include
database data.

## Run Services Individually

These are general development commands. Check the service manifests and
configuration first, because the exact command and required environment
variables depend on the current implementation.

### Frontend

``` bash
cd campus-360-frontend
npm install
npm run dev
```

Build for production:

``` bash
npm run build
```

### Backend

``` bash
cd campus-360-backend
```

If the project includes a Maven wrapper, use it:

``` bash
./mvnw spring-boot:run
```

On Windows PowerShell:

``` powershell
.\mvnw.cmd spring-boot:run
```

Otherwise, if Maven is installed:

``` bash
mvn spring-boot:run
```

Configure the database connection, JWT settings, CORS origins, and ML
service URL before starting the backend.

### AI/ML service

``` bash
cd ai-ml-service
python -m venv .venv
```

Activate the environment:

Windows PowerShell:

``` powershell
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

``` bash
source .venv/bin/activate
```

Install the dependencies using the service's dependency file, if
present. For example:

``` bash
pip install -r requirements.txt
```

Start FastAPI using the module and application object defined by the
service. A common pattern is:

``` bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Use this command only if the entry file is `main.py` and the FastAPI
object is named `app`; otherwise, use the actual entry point.

## Configuration and Environment Variables

Environment variable names must match the backend, frontend, ML service,
and Compose configuration in this checkout. Common configuration
categories include:

  -----------------------------------------------------------------------
  Setting                             Purpose
  ----------------------------------- -----------------------------------
  Database URL/host, port, name       Connect the backend to MySQL

  Database username/password          Authenticate to MySQL

  JWT signing secret/key              Sign and validate access tokens

  CORS allowed origins                Permit requests from the deployed
                                      frontend

  ML service base URL                 Let the backend call the FastAPI
                                      service

  Frontend API base URL               Let the browser reach the deployed
                                      backend or reverse proxy

  Model path/settings                 Load the required ML model and
                                      supporting files
  -----------------------------------------------------------------------

Use a strong, unique production JWT secret. Store secrets in local
environment variables or the hosting provider's secret manager. Do not
place secrets in React/Vite variables: values exposed to the frontend
bundle are public.

In Docker, internal service URLs typically use Compose service names,
for example `http://ai-ml-service:8000`, if that is the configured
service name. A browser cannot normally resolve that Docker hostname
directly.

## API and Documentation

The repository includes `Campus-360-API.postman_collection.json` for API
testing. Import it into Postman and configure its base URL and
authentication variables according to the collection and current backend
routes.

If Swagger/OpenAPI is enabled, check the backend configuration and
security settings for the documentation URL. Common Springdoc paths
include `/swagger-ui/index.html` and `/v3/api-docs`, but the actual
availability depends on the application configuration.

## Security Notes

Before making the repository public:

-   Ensure no real `.env` files, passwords, API keys, JWT secrets,
    database dumps, or private credentials are committed.
-   Review any tracked `src/.env` or service-specific environment file
    carefully.
-   Keep `node_modules`, build output, Python virtual environments, test
    reports, and generated files out of Git unless intentionally
    required.
-   Use separate credentials for development and production.
-   Configure CORS to allow only the required frontend origins.
-   Use HTTPS for public services and secure database connections.
-   Rotate any secret that was previously committed or exposed; deleting
    it from the latest commit alone does not remove it from Git history.
-   Avoid publishing personal or production data in SQL backups or
    Postman examples.

## Troubleshooting

### A container does not start

``` bash
docker compose ps
docker compose logs --tail=150 <service-name>
```

Check environment variables, image build errors, port conflicts, health
checks, and service dependencies.

### Backend cannot connect to MySQL

-   Confirm the database container or managed database is running.
-   Verify host, port, database name, username, and password.
-   From inside Docker, use the database service name and container port
    rather than `localhost`.
-   Confirm the database is ready before the backend initializes.

### Frontend API requests fail

-   Verify the configured API base URL.
-   Check browser developer tools for network and CORS errors.
-   Ensure a browser-facing URL or reverse proxy is used rather than a
    Docker-internal hostname.
-   Confirm the backend is reachable and the endpoint path is correct.

### AI/ML requests fail

-   Check the ML service logs and health endpoint, if configured.
-   Confirm required Python dependencies and model files are present.
-   Verify the backend's ML service URL and Docker service name.
-   Check that the model loads successfully on startup.

### Port already in use

Check the port mappings in Compose and stop conflicting local services
or change the host-side port mapping. Keep internal container ports and
host ports distinct.

## Deployment

The project can be deployed as separate services or using a platform
that supports Docker Compose. A typical deployment needs:

1.  A public frontend URL.
2.  A reachable Spring Boot backend URL.
3.  A managed or securely hosted MySQL database with persistent storage.
4.  A reachable FastAPI ML service and its model artifacts.
5.  Correct production environment variables, CORS settings, and HTTPS.
6.  A deployment strategy for database initialization and schema
    migrations.

Free hosting tiers may have sleep limits, resource limits, storage
restrictions, or usage quotas. Confirm each provider's current terms
before choosing it. Local Docker Compose configuration does not
automatically mean that a multi-service project can be deployed
unchanged to every hosting provider.

## Contributing

1.  Create a feature branch.
2.  Make focused changes.
3.  Run the relevant build or checks for the service you changed.
4.  Do not commit credentials, generated artifacts, or local environment
    files.
5.  Open a pull request describing the change.

## License

No license is specified in this README. Add a `LICENSE` file if you
intend to grant others explicit permission to use, modify, and
distribute this project.
