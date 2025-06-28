# Development startup script
Write-Host "Starting Cryptochat application in DEVELOPMENT mode..." -ForegroundColor Green
Write-Host "This will use Daphne (ASGI) server for WebSocket support" -ForegroundColor Yellow

# Check if Docker is running
$dockerRunning = Get-Process "Docker Desktop" -ErrorAction SilentlyContinue
if (-not $dockerRunning) {
    Write-Host "Docker does not appear to be running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Clean up any existing containers
Write-Host "Cleaning up existing containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

# Start the services in development mode
Write-Host "Starting development containers with live reload..." -ForegroundColor Yellow
Write-Host "Backend: http://localhost:8000 (Daphne ASGI server)" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000 (React dev server)" -ForegroundColor Cyan
Write-Host "WebSocket: ws://localhost:8000/ws/chat/" -ForegroundColor Cyan

docker-compose -f docker-compose.dev.yml up --build

# Instructions for stopping
Write-Host "`nTo stop the application, press Ctrl+C and then run 'docker-compose -f docker-compose.dev.yml down'" -ForegroundColor Cyan
