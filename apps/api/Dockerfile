FROM node:20-alpine AS builder
RUN apk add --no-cache openssl libc6-compat
RUN corepack enable
WORKDIR /app
COPY . .
RUN yarn install --immutable
RUN yarn workspace @app/shared build
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" \
    yarn workspace @app/api prisma generate
RUN yarn workspace @app/api build

FROM node:20-alpine
RUN apk add --no-cache openssl libc6-compat
RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 4000
CMD ["sh", "-c", "yarn workspace @app/api prisma migrate deploy && exec node apps/api/dist/main.js"]