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

# Start Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
