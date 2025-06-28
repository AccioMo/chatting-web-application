# Start Docker Compose services
Write-Host "Starting Cryptochat application (Frontend & Backend)..." -ForegroundColor Green

# Check if Docker is running
$dockerRunning = Get-Process "Docker Desktop" -ErrorAction SilentlyContinue
if (-not $dockerRunning) {
    Write-Host "Docker does not appear to be running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Start the services
Write-Host "Building and starting containers..." -ForegroundColor Yellow
docker-compose up --build

# Instructions for stopping
Write-Host "To stop the application, press Ctrl+C and then run 'docker-compose down'" -ForegroundColor Cyan
