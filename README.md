# Books & Trunks Society - Web Application

A comprehensive platform designed for the **Books & Trunks Society**, a community-driven initiative focused on literacy, impact storytelling, and member engagement.

## Overview
This application serves as a dual-purpose platform:
- **Public Site**: Showcase community stories, gallery, impact metrics, and events.
- **Admin Dashboard**: Comprehensive management of stories, gallery items, community members, user requests, and society events.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, TailwindCSS, Framer Motion |
| **Backend** | Node.js, Express (v5) |
| **Database** | PostgreSQL (NeonDB), Prisma ORM |
| **Authentication** | Clerk (Auth & User Management) |
| **Media** | Cloudinary (Image Hosting) |
| **Deployment** | Vercel |

---

## Installation & Setup

To install and run this project on a new machine, follow these steps:

### 1. Prerequisites
- **Node.js**: v20 or higher recommended.
- **npm**: v10 or higher.
- **Accounts**: You will need active accounts on **Clerk**, **Neon.tech**, and **Cloudinary**.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd bnt_app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Create a `.env` file in the root directory and populate it with the following keys. Refer to `CLERK_SETUP.md` and `PRISMA_SETUP_COMPLETE.md` for more details.

```env
# Database (NeonDB)
DATABASE_URL="postgresql://user:pass@ep-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-direct.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Clerk Auth
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Cloudinary
CLOUDINARY_URL=cloudinary://key:secret@cloud_name
VITE_CLOUDINARY_CLOUD_NAME=cloud_name
```

### 5. Initialize Database
Generate the Prisma client and push the schema to your database:
```bash
npm run prisma:generate
npm run prisma:push
```

### 6. Run the Application
Start both the Vite frontend and the Express backend simultaneously:
```bash
npm run dev:all
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

## Project Structure

```text
├── prisma/               # Database schema and migrations
├── server/               # Express API implementation
│   ├── routes/           # API endpoints (Stories, Gallery, Events, etc.)
│   └── middleware/       # Clerk auth and logging middleware
├── src/                  # React Frontend
│   ├── components/       # UI Components & Layouts
│   ├── pages/            # View components (Public & Admin)
│   ├── lib/              # API clients and utilities
│   └── assets/           # Static styles and images
└── vercel.json           # Deployment configuration
```

---

## Key Scripts

- `npm run dev:all`: Start frontend (Vite) and backend (Express) in parallel.
- `npm run prisma:studio`: Open a GUI to view and edit your database records.
- `npm run build`: Compile TypeScript and build for production.
- `npm run server`: Run only the backend server.
- `npm run community:sync`: Sync community member data from Clerk/Auth to logic.

---

## Security & Access Control
- **Public Access**: Home, Stories, Impact, and Gallery.
- **Protected Access**: Members directory, Events, and User Requests (Logged-in only).
- **Admin Access**: Full Dashboard (`/admin`) for content and society management.

---

## License
Private project for the Books & Trunks Society.
