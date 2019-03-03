#!/bin/bash

echo Collecting Static Files
python3 manage.py collectstatic --no-input

echo Migrating
python3 manage.py makemigrations
python3 manage.py migrate

echo Starting Gunicorn.
exec gunicorn spoticode.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --reload \
    --forwarded-allow-ips="*"