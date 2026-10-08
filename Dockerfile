# =========================
# Stage 1: Build Frontend
# =========================
FROM node:20-bookworm-slim AS frontend-builder

WORKDIR /frontend

COPY frontend-centa/package*.json ./
RUN npm ci

COPY frontend-centa/ ./

RUN npm run build


# =========================
# Stage 2: Build Backend
# =========================
FROM node:20-bookworm-slim AS backend-builder

WORKDIR /backend

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY backend-centa/package*.json ./
RUN npm ci

COPY backend-centa/prisma ./prisma
RUN npx prisma generate

COPY backend-centa/ ./
RUN npm run build


# =========================
# Stage 3: Production
# =========================
FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /backend/package*.json ./
COPY --from=backend-builder /backend/node_modules ./node_modules
COPY --from=backend-builder /backend/dist ./dist
COPY --from=backend-builder /backend/prisma ./prisma

COPY --from=frontend-builder /frontend/dist ./frontend-dist

EXPOSE 3075

CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]
