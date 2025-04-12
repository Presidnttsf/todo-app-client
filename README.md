# React + Vite

# Full-Stack Todo List Application

![Todo App Screenshot](./screenshot.png) <!-- Add a screenshot later -->

A complete task management system with user authentication, CRUD operations, filtering, and pagination.

## Features

- **User Authentication**
  - Register with email/password
  - Login/Logout functionality
  - Protected routes
  - JWT token-based authentication

- **Task Management**
  - Create, Read, Update, Delete tasks
  - Task status tracking (PENDING/DONE)
  - Due dates for tasks
  - Search by task name
  - Filter by status/date
  - Pagination (10 tasks per page)

- **Technical Stack**
  - **Frontend**: React, Redux Toolkit, React Router, TailwindCSS
  - **Backend**: Express.js, MongoDB, Mongoose
  - **Deployment**: Render (Backend), Vercel/Netlify (Frontend)


## Project Structure
todo-app/
├── client/ # Frontend (Vite + React)
│ ├── public/
│ ├── src/
│ │ ├── app/ # Redux store
│ │ ├── features/ # Redux slices
│ │ ├── services/ # API services
│ │ ├── components/ # Shared components
│ │ ├── App.jsx # Root component
│ │ └── main.jsx # Vite entry point
│ ├── vite.config.js # Vite configuration
│ └── package.json

 Developed by Tauseef Akhtar
