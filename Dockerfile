FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 10000

# Render PORT env variable deta hai (default 10000)
CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn web.wsgi:application --bind 0.0.0.0:${PORT:-10000}"]
