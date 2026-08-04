#!/bin/sh
set -e

echo "==> Syncing Prisma database schema..."
npx prisma db push --accept-data-loss

echo "==> Running seed script for admin user and default categories..."
npx tsx prisma/seed.ts || echo "==> Seed script completed with existing records."

exec "$@"
