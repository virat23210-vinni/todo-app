# SparkTrack — Teen To-Do & Expense Tracker

SparkTrack is a two-application React and Express project for private task management, expense tracking, budgets, charts, and constructive spending insights.

## Structure

```
├── frontend-todo/    # Vite + React client
├── backend-todo/     # Express REST API (MVC-style)
└── database/schema.sql
```

The backend flows from routes → controllers → services → repository/Supabase. Passwords are hashed with bcrypt (12 rounds); JWTs identify the caller; all repository reads and writes scope records by the JWT user ID. The browser only receives a JWT and public profile fields—never a password hash or a Supabase service key.

## Setup

1. Create a Supabase project. In its SQL Editor, run `database/schema.sql`.
2. Copy `backend-todo/.env.example` to `backend-todo/.env`, then provide the project URL, **service role** key, and a long random `JWT_SECRET`. Keep this file private.
3. Copy `frontend-todo/.env.example` to `frontend-todo/.env`. `VITE_API_URL` is safe in the browser. The frontend deliberately has no Supabase credential.
4. Start the API:

```bash
cd backend-todo
npm install
npm run dev
```

5. In a second terminal start the web app:

```bash
cd frontend-todo
npm install
npm run dev
```

Open `http://localhost:5173`.

## API

All non-auth routes require `Authorization: Bearer <JWT>`.

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- CRUD: `/api/tasks`, `/api/expenses`, `/api/categories`, `/api/budgets`, `/api/savings`
- `PATCH /api/tasks/:id/status`
- Analytics: `GET /api/analytics/summary`, `/category`, `/daily`, `/monthly`, `/budget`
- `GET /api/insights`

Successful responses use `{ success: true, data }`; failures use `{ success: false, message, error: { code } }`.

## Security and database notes

The Express server is the only holder of `SUPABASE_SERVICE_ROLE_KEY`; it has an ownership condition on every user-owned query. The SQL schema enables RLS as defense in depth. Because this app uses its own bcrypt/JWT authentication instead of Supabase Auth, direct public-table access should remain disabled; if you later introduce Supabase Auth, add policies based on `auth.uid()` before exposing the anon key.

Helmet, narrowly configured CORS, auth rate limiting, JSON body limits, Zod validation, safe error responses, bcrypt, and JWT expiry are enabled. Amounts are stored numerically and rendered with INR formatting in the client.

## Analytics and recommendations

The analytics service computes month-scoped totals, category grouping, daily data, budget use, and remaining budget from stored expenses. `financialInsightsService` derives friendly messages only from those calculated values, including 80%/100% budget thresholds and a category-share threshold over 30%; it does not claim AI-generated advice.

## Deployment

Deploy `frontend` as a static Vite build (`npm run build`) and `backend` to a Node-compatible host. Set `FRONTEND_URL` to the deployed client origin, set production environment variables in the host secret manager, and use HTTPS.
