# Aurum Watches

Full-stack watch e-commerce MVP with an Angular storefront and a Spring Boot API.

## What Is Included

- Premium watch catalog with search, brand/category filters, sorting, and product details.
- Local cart with quantity controls.
- JWT signup/login.
- Protected mock checkout that creates paid orders and reduces stock.
- Protected order history.
- MySQL persistence and startup seed data.

## Run The Backend

1. Start MySQL and create/use credentials for `watch_store`.
2. From `backend/`, run:

```powershell
.\mvnw.cmd spring-boot:run
```

By default the API uses:

```text
DB_URL=jdbc:mysql://localhost:3306/watch_store?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=password
```

Override those environment variables if your MySQL credentials differ.

## Run The Frontend

From `frontend/`, install dependencies and start Angular:

```powershell
npm install
npm start
```

Angular runs at `http://localhost:4200` and proxies `/api` to `http://localhost:8082`.

## Verify

```powershell
cd backend
.\mvnw.cmd test

cd ..\frontend
npm run build
```
