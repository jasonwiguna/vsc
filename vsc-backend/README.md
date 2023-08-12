## VStream Connect Backend

## Usage

```
# Build app
npm run build

# Rum app in docker
docker-compose up -d backend

# Rebuild docker container (run app again after building)
docker-compose build backend

# Create migration (run this inside the docker container)
npm run typeorm:create-migration

# Run migrations (run this inside the docker container)
npm run typeorm:run-migrations

# Revert migrations (run this inside the docker container)
npm run typeorm:revert-migration
```
