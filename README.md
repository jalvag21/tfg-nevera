# TFG Nevera Inteligente (Multi-nevera)

Aplicación web para gestionar la calidad y el estado de los alimentos en una o varias neveras.
Stack: React (Vite) + Tailwind + React Router + TanStack Query | Node.js (Express) + MongoDB (Mongoose) | JWT | Docker Compose | PWA (básico).

## Estructura
```
tfg-nevera/
  docker/
    docker-compose.yml
  frontend/
  backend/
  docs/
```
## Desarrollo local
1) Backend:
#previametne instalar:
winget install OpenJS.NodeJS.LTS

```bash
cd backend
cp .env.example .env
## Cambiar si en local en .env 
MONGO_URI=mongodb://127.0.0.1:27017/tfg-nevera
# Si usas Docker para Mongo, arráncalo desde docker/ (ver abajo)

#levantar back app
npm i
npm run dev
#Si GET http://localhost:4000/api/health responde ok (codigo 200) está funcionando correctamente.

#para levantar docker de mongo si no está ya levantado y falla npm run dev
docker run --name mongo -p 27017:27017 -d mongo:7
```
2) Frontend:
#previametne instalarr:
npm i -D @vitejs/plugin-react

```bash
cd frontend
npm i
npm run dev
```
3) Abrir http://localhost:5173

## Docker (todo en un comando)
```bash
cd docker
docker compose up --build
```
- Frontend: http://localhost:5173
- API: http://localhost:4000
- Mongo Express: http://localhost:8081

## Exportación JSON/CSV
- `GET /api/foods/export?fridge=<id>&format=json|csv`
- `GET /api/readings/export?fridge=<id>&format=json|csv`

## PWA
- Manifest y `sw.js` mínimos en `frontend/public`. Registro en `main.jsx`.
