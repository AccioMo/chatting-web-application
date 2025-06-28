# Run without Docker - Development mode
Write-Host "Starting Cryptochat in LOCAL development mode (no Docker)..." -ForegroundColor Green

# Start backend
Write-Host "Starting Django backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver 8000"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting React frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "Backend running on http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend running on http://localhost:3000" -ForegroundColor Cyan
Write-Host "Close both terminal windows to stop the application" -ForegroundColor Cyan
