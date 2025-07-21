# 🎨 DrawSpace — Real-time Collaborative Drawing App

DrawSpace is a full-stack collaborative whiteboard application that supports real-time drawing, erasing, and chatting inside authenticated drawing rooms. Users can draw using various tools like rectangle, circle, pencil, and freehand; erase with soft delete; and have their data persist even after refreshing or rejoining the room.

---

## ✨ Features

- ✅ Real-time drawing with WebSockets
- ✅ Tools: Rectangle, Circle, Pencil, Freehand
- ✅ Eraser with soft-delete (persisted across sessions)
- ✅ Chat inside drawing rooms
- ✅ JWT-based user authentication
- ✅ Persistent storage using PostgreSQL + Prisma ORM
- ✅ Turbo monorepo with shared packages
- ✅ Modular architecture with scalable components

---

## 🧱 Tech Stack

| Layer        | Tech                                        |
|-------------|---------------------------------------------|
| Frontend     | Next.js (App Router), Tailwind CSS          |
| Backend (API) | Express.js (Node.js)                        |
| Real-time    | `ws` WebSocket server                       |
| Database     | PostgreSQL + Prisma ORM                     |
| Auth         | JWT (JSON Web Tokens)                       |
| Monorepo     | Turborepo + PNPM workspaces                 |
| UI Components| `@repo/ui` shared package                   |

---

## 📁 Monorepo Structure

apps/
excelidraw-frontend/     # Next.js frontend
http-backend/            # Express backend (auth & REST)
websocket-backend/       # WebSocket server (real-time draw/chat)

packages/
db/                      # Prisma schema & client
ui/                      # Reusable UI components
backend-common/          # Shared configs (JWT secret, URLs, etc.)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aditya2600/DrawSpace.git
cd drawspace

2. Install dependencies (Turbo repo)

pnpm install

3. Set up environment variables

Create a .env file in each app/package as needed:

For /packages/db/.env and others:

DATABASE_URL=postgresql://your-user:your-pass@localhost:5432/drawspace
JWT_SECRET=your_super_secret_jwt

For /apps/excelidraw-frontend/.env:

NEXT_PUBLIC_HTTP_BACKEND=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080

4. Generate Prisma Client

cd packages/db
pnpm prisma generate
pnpm prisma migrate dev --name init

5. Run all apps

Start all dev servers using Turbo:

pnpm dev

Or run them individually:

# WebSocket server
cd apps/websocket-backend && pnpm dev

# HTTP backend
cd apps/http-backend && pnpm dev

# Frontend
cd apps/excelidraw-frontend && pnpm dev


⸻

🧪 How It Works (Real-Time Drawing Flow)

🖌️ Drawing Flow
	•	User selects a tool and starts drawing on the canvas.
	•	The shape is broadcasted over WebSocket (type: "draw") to all clients in the same room.
	•	The shape is persisted in PostgreSQL (drawing table).
	•	Other users immediately receive and render the shape.
	•	New users joining later fetch the shapes using GET /rooms/:roomId/drawings.

🧽 Erasing Flow
	•	Eraser checks overlap with existing shapes and soft-deletes (deletedAt is set).
	•	type: "erase" is broadcasted with erasedShapeIds.
	•	Other clients remove the shapes visually.
	•	Soft-deleted shapes are excluded when reloading from DB.

⸻

📦 API Overview

HTTP Backend (/apps/http-backend)

Route	Description
POST /auth/signup	Signup new user
POST /auth/signin	Login, returns JWT
POST /room/create	Create new room
GET /room/:slug	Get room ID by slug
GET /rooms/:id/drawings	Get all active drawings

WebSocket Events (/apps/websocket-backend)

Type	Payload	Description
join_room	{ roomId }	Join a room
draw	{ roomId, shape }	Broadcast + persist shape
erase	{ roomId, erasedShapeIds: number[] }	Soft delete shapes
chat	{ roomId, message }	Persist + broadcast chat


⸻

🛡️ Security
	•	JWT token verification for every WebSocket connection.
	•	Auth-protected room creation and data endpoints.
	•	Rate limiting and error handling planned for production hardening.

⸻

🧾 License

MIT License © 2025 