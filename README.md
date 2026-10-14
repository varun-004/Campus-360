# Campus 360

Comprehensive campus management ecosystem featuring Spring Boot microservices, FastAPI AI/ML predictive analytics, and a modern React portal.

## Architecture

- **Campus 360 Web Portal (`campus-360-frontend`)**: React 19 + Vite + Tailwind CSS
- **Campus 360 Core Backend (`campus-360-backend`)**: Java 17 + Spring Boot 3 + Spring Data JPA + MySQL
- **Campus 360 AI Engine (`ai-ml-service`)**: Python 3.12 + FastAPI + scikit-learn

## Quick Start with Docker

```bash
cd campus-360-backend
docker compose up --build
```

- Web Portal: `http://localhost:5173`
- Backend API: `http://localhost:8080`
- AI/ML Service: `http://localhost:8000`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
