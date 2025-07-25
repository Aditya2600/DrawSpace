# 🎨 DrawSpace — Real-Time Collaborative Drawing App

**DrawSpace** is a full-stack collaborative whiteboard built with a modern **monorepo architecture**. It supports **multi-user drawing, chatting, and erasing in real-time** — with full data persistence and authentication.

---

## ✨ Features

- 🖊️ Real-time drawing with `WebSockets`
- 🔒 Secure user login/signup with JWT Auth
- 🧼 Soft-delete erase mechanism (persists after refresh)
- 💬 In-room live chat
- 🏘️ Room-based collaboration and control
- 🗂️ Monorepo architecture using TurboRepo
- 📦 Shared UI + DB schema packages
- 🐳 Docker + GitHub Actions CI/CD Ready

---

## 🧱 Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Frontend      | Next.js (App Router), Tailwind CSS               |
| Backend (API) | Express.js (Node.js)                             |
| Real-Time     | `ws` WebSocket server                            |
| Database      | PostgreSQL + Prisma ORM                          |
| Auth          | JWT (JSON Web Tokens)                            |
| Monorepo      | Turborepo + PNPM Workspaces                      |
| Infra / CI    | Docker, GitHub Actions, DockerHub                |

---

## 📁 Project Structure
```bash
drawspace/
├── apps/
│   ├── excelidraw-frontend/     # Next.js frontend
│   ├── http-backend/            # Express REST backend
│   └── websocket-backend/       # WebSocket server
├── packages/
│   ├── db/                      # Prisma schema + client
│   ├── ui/                      # Shared UI components
│   └── backend-common/          # JWT / utils / types
└── docker/
├── Dockerfile.frontend
├── Dockerfile.backend
└── Dockerfile.ws
```
---

## 🚀 Getting Started (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/Aditya2600/DrawSpace.git
cd DrawSpace
```
### 2. Install Dependencies (PNPM + Turborepo)
```bash
pnpm install
```
### 3. Environment Variables
```bash
/packages/db/.env

DATABASE_URL=postgresql://your-user:your-pass@localhost:5432/drawspace
JWT_SECRET=your_super_secret_key

/apps/excelidraw-frontend/.env

NEXT_PUBLIC_HTTP_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```
### 4. Setup the Database
```bash
cd packages/db
pnpm prisma generate
pnpm prisma migrate dev --name init
```
### 5. Run All Services (Turborepo Dev)
```bash
pnpm dev
```
Or individually:

#### WebSocket Server
```bash
cd apps/websocket-backend
pnpm dev
```
#### REST API Backend
```bash
cd apps/http-backend
pnpm dev
```
#### Frontend
```bash
cd apps/excelidraw-frontend
pnpm dev
```

⸻

## ✅ Production .env for Frontend:

NEXT_PUBLIC_HTTP_BACKEND_URL=https://drawspace-api.onrender.com
NEXT_PUBLIC_WS_URL=wss://drawspace-ws.onrender.com

Ensure your backend servers have proper CORS, HTTPS, and WebSocket support enabled.

⸻

## 🐳 Docker Support

All services support Docker builds (multi-stage):

docker compose up --build


⸻

## 🔄 CI/CD
	•	✅ GitHub Actions for image builds
	•	✅ DockerHub integration
	•	✅ Secrets managed via GitHub Secrets
	•	✅ SSH deployment to VM (optional)

⸻

## 🧪 Demo Snapshots

### 🎥 Demo 1: Sign Up → Create Room

[![Demo 1 Thumbnail](assets/demo-signup-thumb.png)](https://drive.google.com/file/d/1vsNnSjo3YcuHSkB2YfOMI5wQM8UKNeBq/view?usp=sharing)

### 🎥 Demo 2: Real-Time Drawing (Multi-user)

[![Demo 2 Thumbnail](assets/demo-draw-thumb.png)](https://drive.google.com/file/d/18T5AWGzjhUFUTFT-c7mgJj3kKMd3EJj2/view?usp=sharing)

👨‍💻 Author

Aditya Meshram
GitHub @Aditya2600 · LinkedIn

⸻

📜 License

MIT License © 2025

⸻

💡 “Inspired by Excalidraw — built from scratch for hands-on learning in real-time systems, auth, and scalable architecture.”

---