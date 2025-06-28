#!/bin/bash

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Create superuser if specified
if [ -n "$ADMIN_USERNAME" ] && [ -n "$ADMIN_PASSWORD" ]; then
  echo "Creating or updating superuser..."
  python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='$ADMIN_USERNAME').exists():
    User.objects.create_superuser('$ADMIN_USERNAME', 'admin@example.com', '$ADMIN_PASSWORD');
print('Superuser created or updated.')
  "
fi

# Start Daphne ASGI server for WebSocket support
echo "Starting Daphne ASGI server with WebSocket support..."
exec daphne -b 0.0.0.0 -p 8000 backend.asgi:application
