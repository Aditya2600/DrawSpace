# ✅ Step 1: Base build stage using lightweight Node Alpine image
FROM node:22-alpine AS base

WORKDIR /app

# ✅ Step 2: Copy core workspace config + install tool
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
RUN corepack enable && corepack prepare pnpm@latest --activate

# ✅ Step 3: Copy only package.json files for all packages (for dependency resolution)
COPY packages/db/package.json ./packages/db/package.json
COPY apps/ws-backend/package.json ./apps/ws-backend/package.json
COPY packages/backend-common/package.json ./packages/backend-common/package.json

# ✅ Step 4: Install dependencies
RUN pnpm install --frozen-lockfile

# ✅ Step 5: Copy full source (including Prisma schema & other sources)
COPY packages/db ./packages/db
COPY apps/ws-backend ./apps/ws-backend
COPY packages/backend-common ./packages/backend-common
COPY packages/typescript-config ./packages/typescript-config 

RUN ls -la /app/packages/db/prisma && cat /app/packages/db/prisma/schema.prisma

# Declare build ARG
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL


# ✅ Step 7: Build WebSocket backend (Prisma + TS build)
RUN pnpm --filter ws-backend run build


# ✅ Step 8: Runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

# ✅ Step 9: Copy build output and runtime dependencies
COPY --from=base /app/apps/ws-backend/dist ./dist
COPY --from=base /app/apps/ws-backend/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/db/prisma ./prisma  

# ✅ Step 10: Set runtime config
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "./dist/index.js"]