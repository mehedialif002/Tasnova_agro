# ---------- base ----------
FROM node:20-alpine AS base
# Prisma needs openssl on Alpine
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# ---------- deps (install + prisma client) ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

# ---------- builder (next build) ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are baked into the client bundle at build time,
# so they must be present during `next build`.
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_ORDER_WHATSAPP_TEXT
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_ORDER_WHATSAPP_TEXT=$NEXT_PUBLIC_ORDER_WHATSAPP_TEXT

RUN npm run build

# ---------- runner (production) ----------
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# Keep full node_modules so the prisma CLI is available at runtime
# for `prisma db push` and seeding.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
