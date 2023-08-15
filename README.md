## VStream Connect Full Stack

## Usage
Create .env in each respective directory, then run the following code in the root directory.

```
# Run app without logs
make up-silent

# Run app
make up

# Build app
make build

# Rebuild individual container (run app again after building)
docker-compose build {container-name}
```

## Directory Path

    .
    ├── vsc-admin               # Admin dashboard
    │   ├── components          # Components
    │   ├── pages               # Pages / paths
    │   ├── public              # Assets used
    │   ├── services            # Backend calls
    │   ├── styles              # Styling
    │   ├── .env                # Admin env
    │   ├── admin.dockerfile    # Admin dockerfile
    │   ├── package.json        # Dependencies
    │   └── README.md
    ├── vsc-backend             # Backend service
    │   ├── src                 # Source code
    │   │   ├── migrations      # DB migration files
    │   │   └── modules         # Modules
    │   ├── .env                # Backend env
    │   ├── backend.dockerfile  # Backend dockerfile
    │   ├── package.json        # Dependencies
    │   └── README.md
    ├── vsc-frontend            # Website
    │   ├── components          # Components
    │   ├── pages               # Pages / paths
    │   ├── public              # Assets used
    │   ├── services            # Backend calls
    │   ├── styles              # Styling
    │   ├── .env                # Website env
    │   ├── admin.dockerfile    # Website dockerfile
    │   ├── package.json        # Dependencies
    │   └── README.md
    ├── .env                    # Env file
    ├── docker-compose.yml      # Docker compose
    ├── Makefile
    └── README.md