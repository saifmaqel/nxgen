# Docker Setup for NxGen Application

This project is containerized using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Git (for cloning the repository)

## Quick Start

1. **Clone the repository** (if not already done)

   ```bash
   git clone <your-repo-url>
   cd nxgen
   ```

2. **Start all services**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Database: localhost:5432

## Available Commands

### Start all services

```bash
docker-compose up
```

### Start in detached mode (background)

```bash
docker-compose up -d
```

### Rebuild and start

```bash
docker-compose up --build
```

### Stop all services

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f
```

### View logs for specific service

```bash
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f db
```

### Restart a specific service

```bash
docker-compose restart server
```

### Remove all containers and volumes

```bash
docker-compose down -v
```

## Services

- **db**: PostgreSQL 16 database

  - Port: 5433
  - User: postgres
  - Password: 1234
  - Database: nxgen

- **server**: Node.js backend with Prisma

  - Port: 3000
  - Auto-runs migrations on startup

- **client**: React + Vite frontend
  - Port: 5173
  - Hot reload enabled

## Database Migrations

Migrations run automatically when the server starts. To run manually:

```bash
docker-compose exec server npx prisma migrate deploy
```

## Troubleshooting

### Port already in use

If ports 3000, 5173, or 5433 are already in use, stop the conflicting services or modify the ports in `docker-compose.yml`.

### Database connection issues

Ensure the database service is healthy:

```bash
docker-compose ps
```

### Reset everything

```bash
docker-compose down -v
docker-compose up --build
```

## Development

The application uses volume mounting, so changes to your code will be reflected immediately without rebuilding containers.

## Production Deployment

For production, you would:

1. Use production Dockerfiles with optimized builds
2. Use environment-specific configuration
3. Deploy to cloud platforms (AWS, GCP, Heroku, etc.)
