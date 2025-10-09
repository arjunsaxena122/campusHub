# 🎓 CampusHub – Role-Based College Portal ( Backend )

- CampusHub is a backend API for a college portal system where users have different roles (Student, Faculty, Admin), each with specific permissions to access and manage resources such as announcements, results, events, and course materials.

- This project demonstrates Role-Based Access Control (RBAC), multi-role workflows, and proper access restrictions.

## 🚀 Tech Stack
- Node.js + Express.js – Server and routing

- MongoDB + Mongoose – Database and schema modeling

- JWT (JSON Web Tokens) – Authentication & Authorization

- bcrypt.js – Secure password hashing


## 👥 Roles Involved
- **Student**: View announcements, results, courses
- **Faculty**: Upload course materials, post announcements
- **Admin**: Manage users, publish results, full access

## 🧩 API Overview

### 🔐 Auth & API Key:
- POST /auth/register → Register user with a role (default: student)
- POST /auth/login → Login, return JWT
- POST /auth/api-key → Generate API key
- GET /auth/me → Get current user profile

## 📢 Announcements:
- POST /announcements → Faculty/Admin only
- GET /announcements → Accessible to all roles

## 🎓 Results:
- POST /results → Admin only
- GET /results/:studentId →
- Student: Only own results
- Faculty/Admin: Any student's results

## 📚 Courses & Materials:
- GET /courses → All roles
- POST /courses → Admin only
- POST /courses/:courseId/materials → Faculty only
- GET /courses/:courseId/materials → Students & faculty

## ⚙️ Admin-only:
- GET /admin/users → List all users
- PUT /admin/users/:id/role → Change user role

## ⚙️ Project Setup

### 1. Clone the Repository

```bash
https://github.com/arjunsaxena122/campusHub.git
cd campusHub
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

- Duplicate .env.example as .env and update the values as needed.

### 4. Run the Server

```bash
pnpm run dev
```

Server will start on http://localhost:3000

## 🎯 End Goal
- Express.js API with robust RBAC system
- JWT authentication
- API key requirement
- Role-based route protection
- Postman collection showing user flows for each role
- Modular, clean, production-quality backend