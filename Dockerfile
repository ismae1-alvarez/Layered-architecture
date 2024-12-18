# Install dependencies only when needed
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat
# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiamos el archivo .env para que las variables de entorno estén disponibles
COPY .env ./

# Build the app with cache dependencies
FROM node:22-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Production image, copy all the files and run next
FROM node:22-alpine AS runner


# Instalar pnpm
RUN npm install -g pnpm
# Set working directory
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/dist ./dist
COPY .env ./

CMD [ "node", "dist/app" ]
