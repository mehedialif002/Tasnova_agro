#!/bin/sh
set -e

echo "==> Syncing database schema (prisma db push)..."
npx prisma db push --skip-generate

echo "==> Seeding database (safe upsert)..."
npx prisma db seed || echo "Seed step skipped/failed — continuing."

echo "==> Starting Next.js on port ${PORT:-3000}..."
exec npm run start
