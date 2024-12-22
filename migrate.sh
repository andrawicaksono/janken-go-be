#!/bin/bash

echo "Waiting for PostgreSQL to start..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "PostgreSQL is not ready, waiting..."
  sleep 2
done

echo "Running migrations..."
for f in /usr/src/app/migrations/*.sql; do
  echo "Applying $f..."
  psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f "$f"
done

echo "Migrations applied successfully."
