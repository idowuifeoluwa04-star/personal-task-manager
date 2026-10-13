# TaskDuty — Personal Task Manager

A task manager built for the Techstudio internship. Week 1 was the frontend — add, edit, and filter tasks. Week 2 added a backend with authentication, authorization, and user-scoped tasks, tested via Postman (no client integration yet). Week 3 adds search, on both frontend and backend.

## What it does

- Register and log in (passwords hashed, JWT auth)
- Every task route requires login — only you can see, create, update, or delete your own tasks
- Optional filtering by category and completion status
- Search tasks by title or description (case-insensitive), on both frontend and backend
- Frontend: add, edit, delete, mark done, filter by category/status, search

## Built with

React, TypeScript, Tailwind CSS, React Router (frontend) · Node.js, Express, MongoDB, TypeScript, JWT (backend)

## Running it locally

**Frontend:**

```bash
cd client
npm install
npm run dev
```

**Backend:**

```bash
cd server
npm install
npm run dev
```

Needs a `.env` in `server/` with `PORT`, `MONGO_URI`, and `JWT_SECRET`.

## API

| Method | Endpoint                  | Auth |
| ------ | -------------------------- | ---- |
| POST   | `/api/auth/register`       | —    |
| POST   | `/api/auth/login`          | —    |
| GET    | `/api/tasks`                | ✅   |
| GET    | `/api/tasks?search=<term>` | ✅   |
| POST   | `/api/tasks`                | ✅   |
| PUT    | `/api/tasks/:id`            | ✅   |
| DELETE | `/api/tasks/:id`            | ✅   |

Protected routes need `Authorization: Bearer <token>`.

## Known issues

The frontend still uses localStorage and isn't connected to the backend yet — search works independently on each side (frontend filters localStorage data, backend filters MongoDB via query param), but they're not wired together yet. No deployment, runs locally only.