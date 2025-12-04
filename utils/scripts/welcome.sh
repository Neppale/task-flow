#!/bin/bash

set -e

echo "Starting Docker Compose services..."

if ! docker-compose up -d; then
  echo "Failed to start services with docker-compose."
  exit 1
fi

echo "Docker Compose services started."

echo "Running Prisma migrations..."
if ! npm run prisma:migrate; then
  echo "Failed to run Prisma migrations."
  exit 1
fi

echo "Prisma migrations applied."
echo "Welcome to Task Flow!"
echo "You can now begin development."
