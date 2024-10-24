#!/bin/sh
# Generate Prisma client at runtime when DATABASE_URL is available
echo "Running Prisma generate..."
npm run db:generate

# Execute the main container command
exec "$@"
