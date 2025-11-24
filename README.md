# NxGen - IoT Device Temperature Dashboard

A full-stack application for monitoring and managing IoT device temperature readings. Built with React, Node.js, Express, PostgreSQL, and Prisma.

## Tech Stack

- **Frontend**: React 19 + Vite + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Prisma v7
- **Containerization**: Docker + Docker Compose

## Prerequisites

Before you begin, make sure you have installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/downloads)

That's it! Docker will handle everything else.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/saifmaqel/nxgen.git
cd nxgen
```

### 2. Start the Application

Run this single command to start everything:

```bash
docker-compose up --build
```

This will:

- Start PostgreSQL database
- Run database migrations

<!-- - Seed the database with sample data --> not working

- Note: To seed your database run:

```bash
docker-compose exec server npm run seed
```

- Start the backend server
- Start the frontend development server

### 3. Access the Application

Once everything is running, open your browser:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Database Setup

The database is automatically configured when you run `docker-compose up`. Here's what happens:

1. PostgreSQL container starts on port `5433`
2. Database `nxgen` is created
3. Prisma migrations run automatically
<!-- 4. Sample devices and temperature data are seeded --> not working

- Note: To seed your database run:

```bash
docker-compose exec server npm run seed
```

4. Please run this command to seed your database:

```bash
docker-compose exec server npm run seed
```

### Manual Database Commands

If you need to run database commands manually:

```bash
# Run migrations
docker-compose exec server npx prisma migrate deploy

# Seed the database
docker-compose exec server npm run seed

# Open Prisma Studio (database GUI)
docker-compose exec server npx prisma studio
```

## API Usage

The backend provides REST APIs for managing devices and temperature readings.

### Base URL

```
http://localhost:3000
```

### API Endpoints

#### 1. Get All Devices

```bash
curl http://localhost:3000/devices
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Sensor A",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

#### 2. Add a New Device

```bash
curl -X POST http://localhost:3000/devices \
  -H "Content-Type: application/json" \
  -d '{"name": "My New Sensor"}'
```

**Response:**

```json
{
  "data": {
    "id": 2,
    "name": "My New Sensor",
    "createdAt": "2025-01-20T14:30:00Z"
  }
}
```

#### 3. Add Temperature Reading

```bash
curl -X POST http://localhost:3000/devices/1/data \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-01-20T15:00:00Z",
    "value": 23.5
  }'
```

**Response:**

```json
{
  "data": {
    "id": 1,
    "deviceId": 1,
    "timestamp": "2025-01-20T15:00:00Z",
    "value": 23.5
  }
}
```

#### 4. Get Temperature Readings (Date Range)

```bash
curl "http://localhost:3000/devices/1/data?from=2025-01-01T00:00:00Z&to=2025-01-31T23:59:59Z"
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "deviceId": 1,
      "timestamp": "2025-01-15T10:00:00Z",
      "value": 22.5
    },
    {
      "id": 2,
      "deviceId": 1,
      "timestamp": "2025-01-20T15:00:00Z",
      "value": 23.5
    }
  ]
}
```

### Testing with Rest Client

1.  I have creted rest-test that you can use to test the API, make sure you have "Rest Client" extension installed in your vscode

2.  Open rest-test file and run the tests

### Unit Testing with Jest

Unfortunately not all tests are passing because of this mock database issue(i mentioned in Challenges I Faced section), but I've added the unit tests for your review.

## Using the Frontend

### Features

1. **Device Management**

   - View all registered devices
   - Add new devices
   - Select a device to view its temperature data

2. **Temperature Monitoring**
   - View temperature readings in a table
   - Filter by date range
   - Add new temperature readings
   - Visualize data with charts

### How to Use

1. **Open the app**: Navigate to http://localhost:5173

2. **Add a device**:

   - Click the "Add Device" button
   - Enter a device name
   - Click "Save"

3. **Select a device**:

   - Click on any device from the list
   - The temperature panel will appear

4. **View temperature data**:

   - Use the date pickers to select a date range
   - Temperature readings will be displayed in a table and chart

5. **Add temperature reading**:
   - Click "Add Temperature"
   - Enter timestamp and temperature value
   - Click "Save"

### Useful Commands

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Restart a service
docker-compose restart server

# Remove everything (including database)
docker-compose down -v
```

### Hot Reload

Both frontend and backend support hot reload:

- Edit files in `client/src/` - frontend auto-refreshes
- Edit files in `server/` - backend auto-restarts

## Summary

### Project Overview

This is a full-stack IoT temperature monitoring system where you can register devices and track their temperature readings over time. I built it with Docker to make setup easy - just one command and everything runs.

### Tech Choices

- **Docker** - Makes setup simple, no need to install dependencies manually
- **Prisma** - Type-safe database access with automatic migrations
- **React + Vite** - Fast development with instant hot reload
- **Redux** - Manages which device is selected across components
- **PostgreSQL** - Reliable database for storing device and temperature data

### Challenges I Faced

**1. UI Design and Workflow**
One of the first and most important challenges was designing the UI and figuring out the app workflow. I had to think about how users would interact with the app, how to select devices, view temperature data, filter by date ranges, and add new readings. I focused on making the UI simple and easy to use, and I also wanted to build a UI that would showcase my skills in React, React Router DOM, and Redux.

**2. Prisma Testing with Jest**
I ran into a major problem when trying to test Prisma with Jest. The Prisma client kept initializing and running tests against the real database instead of a mock, which caused tests to fail. This is a common issue with Prisma, and using Prisma v7 probably wasn't the best choice for this project. I didn't have time to fix it properly since I was working this sunday. Unfortunately, not all tests are passing because of this mock database issue, but I've added the unit tests for your review.

**3. Docker Database Seeding**
Getting the database to seed automatically when the container starts was challenging. I tried running the seed script in the Dockerfile, but it failed because the database wasn't ready yet. I ended up making it a manual step that you run after the containers are up.

## Troubleshooting

### Port Already in Use

If you get port conflicts, stop the services using those ports or change them in `docker-compose.yml`:

- Frontend: 5173
- Backend: 3000
- Database: 5433

### Database Connection Failed

Check if the database is healthy:

```bash
docker-compose ps
```

If the database is unhealthy, restart it:

```bash
docker-compose restart db
```

### Reset Everything

If something goes wrong, reset everything:

```bash
docker-compose down -v
docker-compose up --build
```
