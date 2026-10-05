# TaskDuty — Personal Task Manager

A task manager built for the Techstudio internship. Week 1 was the frontend — add, edit, and filter tasks. Week 2 adds a backend with authentication, authorization, and user-scoped tasks, tested via Postman (no client integration yet).

## What it does

- Register and log in (passwords hashed, JWT auth)
- Every task route requires login — only you can see, create, update, or delete your own tasks
- Optional filtering by category and completion status
- Frontend: add, edit, delete, mark done, filter by category/status

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

| Method | Endpoint             | Auth |
| ------ | -------------------- | ---- |
| POST   | `/api/auth/register` | —    |
| POST   | `/api/auth/login`    | —    |
| GET    | `/api/tasks`         | ✅   |
| POST   | `/api/tasks`         | ✅   |
| PUT    | `/api/tasks/:id`     | ✅   |
| DELETE | `/api/tasks/:id`     | ✅   |

Protected routes need `Authorization: Bearer <token>`.

## Known issues

The frontend still uses localStorage and isn't connected to the backend yet — that's planned for later. No deployment, runs locally only.
