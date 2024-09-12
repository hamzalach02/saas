#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

# Start the Next.js app
npm run start