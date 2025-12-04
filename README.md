# Task Flow

A NestJS-based task queue management system that uses Redis/BullMQ for processing and managing asynchronous tasks.

## Features

- **Task Management**: Create, validate, and queue tasks
- **Queue Strategy**: Uses Redis with BullMQ
- **Data Encryption**: Automatic encryption of task data using AES-256-GCM
- **Type Validation**: Built-in validation using class-validator
- **Database**: SQLite database with Prisma ORM
- **Monorepo Structure**: Separate applications for API and worker

## Project Structure

```
task-flow/
├── apps/
│   ├── task-flow/    # Main API application
│   ├── worker/       # Worker application (processes tasks)
│   └── shared/       # Shared modules (queue, prisma, types)
├── prisma/           # Database schema
└── utils/            # Utility services
```

## Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker (for Redis)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="file:./dev.db"
   API_PORT=3000
   QUEUE_TYPE="REDIS"
   ENCRYPTION_KEY="your-secret-key-here"
   ```

3. **Start Docker services (Redis):**

   ```bash
   docker-compose up -d
   ```

4. **Generate Prisma Client:**

   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

## Running the Application

**Development mode:**

```bash
npm run start:dev
```

**Production mode:**

```bash
npm run build
npm run start:prod
```

## API Usage

### Create a Task

```bash
POST http://localhost:3000/
Content-Type: application/json

{
  "type": "REQUEST",
  "data": {
    "url": "https://example.com",
    "method": "GET",
    "headers": {},
    "body": ""
  }
}
```

**Response:**

```json
{
  "taskId": "uuid-here"
}
```

## Scripts

- `npm run start:dev` - Start in watch mode
- `npm run build` - Build the project
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations

## Queue Configuration

Set `QUEUE_TYPE` environment variable to:

- `"REDIS"` - Uses Redis with BullMQ (default)

## Database

The project uses SQLite by default. The database file is created at `./prisma/db.sqlite` when migrations are run.

## License

UNLICENSED
