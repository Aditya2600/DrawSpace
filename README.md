# DrawSpace

DrawSpace is a real-time collaborative drawing app with chat, rooms, and persistent storage. The repo is a Turborepo monorepo with a Next.js frontend, Express REST API, and a WebSocket server backed by Postgres and Prisma.

## Features
- Real-time multi-user drawing over WebSockets
- Rooms and JWT-based auth
- Persistent drawings and chat history (Postgres + Prisma)
- Eraser with soft delete and undo/redo
- Shared packages for types, UI, and backend config

## Demos
- App demo (single user): [app-demo.mp4](assets/demos/app-demo.mp4)
- Two-user collaboration: [multi-user-demo.mp4](assets/demos/multi-user-demo.mp4)

## Tech Stack
- Frontend: Next.js, React, Tailwind CSS
- Backend: Express, WebSocket (ws)
- Database: PostgreSQL, Prisma ORM
- Tooling: Turborepo, pnpm, TypeScript

## Project Structure
```
draw-app/
  apps/
    excelidraw-frontend/   # Next.js UI
    http-backend/          # Express REST API
    ws-backend/            # WebSocket server
    web/                   # Optional/legacy UI
  packages/
    db/                    # Prisma schema + client
    common/                # Shared types
    backend-common/        # JWT config
    ui/                    # Shared UI components
    typescript-config/     # Shared TS configs
  docker/
```

## Prerequisites
- Node.js >= 18
- pnpm >= 9
- Postgres >= 14 (local or Docker)

## Local Development

### 1) Install dependencies
```bash
pnpm install
```

### 2) Configure environment
Create `packages/db/.env`:
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
JWT_SECRET=your_secret
```
`JWT_SECRET` defaults to `123123` if not set.

### 3) Setup database
```bash
pnpm --filter @repo/db exec prisma migrate dev --name init
```

### 4) Start all services
```bash
pnpm dev
```

### Local URLs
- Frontend: http://localhost:3000
- HTTP API: http://localhost:3001
- WebSocket: ws://localhost:8080

### Run services individually
```bash
pnpm --filter http-backend dev
pnpm --filter ws-backend dev
pnpm --filter excelidraw-frontend dev
```

### Change API endpoints for the frontend
The frontend currently uses constants in `apps/excelidraw-frontend/config.ts`. Update those values if your backend runs on a different host or port.

## Docker

Start the full stack:
```bash
docker compose up --build
```

For Docker Compose, set `DATABASE_URL` to the Postgres service host:
```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres
```

## Scripts
- `pnpm dev`: run all apps in dev mode
- `pnpm build`: build all apps
- `pnpm lint`: lint all apps
- `pnpm check-types`: typecheck all apps

## License
MIT
