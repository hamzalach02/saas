# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy necessary files
COPY package*.json ./
COPY prisma ./prisma
COPY .env .env
COPY . .

# Install dependencies and generate Prisma client
RUN npm ci
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app runs on
EXPOSE 3000

# Run Prisma migrations before starting the app
CMD npx prisma migrate deploy && npm run start
