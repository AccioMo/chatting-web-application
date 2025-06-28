# Cryptochat Application

This is a cryptocurrency chat application with both frontend and backend components.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

## Quick Start

### Using the Script (Windows)

1. Open PowerShell
2. Navigate to the project directory:
   ```powershell
   cd path\to\cryptochat
   ```
3. Run the start script:
   ```powershell
   .\start-app.ps1
   ```

### Manual Start

1. Open a terminal/command prompt
2. Navigate to the project directory
3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Stopping the Application

1. Press `Ctrl+C` in the terminal where docker-compose is running
2. Run:
   ```bash
   docker-compose down
   ```

## Environment Variables

If needed, you can modify environment variables in the `docker-compose.yml` file or create a `.env` file in the project root.

Important environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key for AI features

## Notes

- Static files are stored in a Docker volume named `backend_static`
- The frontend is served using Nginx
- Communication between frontend and backend happens through the Nginx proxy
