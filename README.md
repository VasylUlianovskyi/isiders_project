# Insiders Event Manager

## Getting Started

The project is split into two parts:

- **Client (Frontend)** — React + TypeScript + Sass
- **Server (Backend)** — Node.js + Express + PostgreSQL + TypeScript

---

### Client

```bash
  cd isiders_project/client
  npm install
  npm run dev
```

### Server

```bash
  cd isiders_project/server
  npm install
  npm run dev
```

- Runs on: http://localhost:5000

- Provides the REST API for authentication and event management.

## Tech Stack

#### Frontend:

- React
- TypeScript
- React Router DOM
- Formik + Yup
- react-big-calendar
- date-fns
- Sass

#### Backend:

- Node.js
- Express
- TypeScript
- Sequelize (ORM)
- PostgreSQL
- bcrypt
- jsonwebtoken

## Features

- Authentication — Register and login with JWT-based auth
- Events CRUD — Create, read, update, and delete your events
- Countdown Timer — Timer for upcoming events with live updates
- Form Validation — Formik + Yup for clean, predictable validation
- Reminder Badge — See how many events are close to happening
- Calendar View — Visual calendar and list view with:
- Keyword search
- Importance filtering (normal, important, critical)

## REST API

- POST /api/auth/register — Register new user
- POST /api/auth/login — Authenticate and receive token
- GET /api/events?userId= — Fetch user events
- POST /api/events — Create event
- PUT /api/events/:id — Update event
- DELETE /api/events/:id — Delete event

Tokens are required in the Authorization header:
