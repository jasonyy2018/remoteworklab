#!/bin/sh
set -e

echo "==> Syncing Prisma database schema and ensuring admin account and seed data..."
npx prisma db push
npx tsx prisma/seed.ts

exec "$@"
