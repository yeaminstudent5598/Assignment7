Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, featuring a dynamic blog, project showcase, and a secure admin dashboard.

🔗 Live Links

Frontend: https://your-portfolio-domain.vercel.app

Demo Video: https://youtube.com/your-video-link

🔐 Admin Credentials

Email: admin@example.com

Password: adminpassword123 (Set in your prisma/seed.ts file)

✨ Features

Public Features

Modern and responsive homepage with hero section.

Dynamic blog listing page with ISR (Incremental Static Regeneration).

Individual blog detail pages with rich text content, generated statically for speed.

Dynamic project showcase page.

"About Me" section with skills and work experience.

Fully responsive design for all devices.

Admin Features

Secure authentication managed by NextAuth.js.

Private admin dashboard with a professional sidebar layout.

Full CRUD (Create, Read, Update, Delete) functionality for blogs.

Full CRUD functionality for projects.

Rich text editor for blog/project content using TipTap.

Admin password change functionality.

Protected routes and API endpoints for owner-only access.

Technical Features

Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR).

Type-safe API routes with Zod validation.

Centralized error handling for APIs.

Optimized images with Next.js Image component.

Modern toast notifications with Sonner.

Professional form validation with React Hook Form.

Accessible UI components built with shadcn/ui.

🛠️ Tech Stack

Frontend

Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS

UI Components: shadcn/ui

Form Handling: React Hook Form + Zod

Authentication: NextAuth.js

Rich Text Editor: TipTap

Notifications: Sonner

Icons: Lucide React

Backend

Framework: Next.js API Routes

Database: PostgreSQL

ORM: Prisma

Deployment

Platform: Vercel

Database: Neon

📦 Installation & Setup

Prerequisites

Node.js v18+

pnpm (or npm/yarn)

A PostgreSQL database (e.g., from Neon)

1. Clone Repository

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name


2. Install Dependencies

pnpm install


3. Environment Setup

Create a .env file in the root directory and add the following variables:

# Database Connection String from Neon
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth Secret Key (generate a long random string)
AUTH_SECRET="your-super-secret-key-for-next-auth"

# Base URL for local development
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"


4. Database Setup

# Generate Prisma Client based on your schema
pnpm exec prisma generate

# Apply migrations to create database tables
pnpm exec prisma migrate dev

# Seed the database with the initial admin user
pnpm exec prisma db seed


5. Run Development Server

pnpm run dev


Open http://localhost:3000 in your browser.

📁 Project Structure

``` bash
portfolio-fullstack/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
├── public/                  # Static assets
└── src/
    ├── app/
    │   ├── (private)/       # Protected admin routes (e.g., /dashboard)
    │   ├── (public)/        # Public pages (e.g., /, /about, /blogs)
    │   └── api/             # API routes (e.g., /api/v1/blogs)
    ├── components/
    │   ├── ui/              # shadcn/ui components
    │   ├── shared/          # Shared components (Navbar, Footer)
    │   ├── dashboard/       # Dashboard specific components
    │   └── providers/       # Context providers (e.g., AuthProvider)
    └── lib/
        ├── modules/         # Business logic (services, controllers)
        ├── middlewares/     # Custom middlewares (e.g., catchAsync)
        ├── utils/           # Utility functions (e.g., jwt.ts)
        └── validations/     # Zod schemas

```
🚀 Deployment

This project is optimized for deployment on Vercel.

Push your code to a GitHub repository.

Import the project in your Vercel dashboard.

Add the production environment variables in Vercel's project settings.

Deploy!

Environment Variables for Production

DATABASE_URL="your-production-database-url"
AUTH_SECRET="your-production-secret"
NEXT_PUBLIC_API_BASE_URL="[https://your-live-domain.com](https://your-live-domain.com)"


📝 API Endpoints

All endpoints are prefixed with /api/v1.

Authentication

POST /api/auth/signin: (Handled by NextAuth)

POST /api/auth/signout: (Handled by NextAuth)

PATCH /api/v1/auth/change-password: Change admin password (Protected)

Blogs

GET /api/v1/blogs: Get all blogs.

GET /api/v1/blogs/[id]: Get a single blog.

POST /api/v1/blogs: Create a new blog (Protected).

PATCH /api/v1/blogs/[id]: Update a blog (Protected).

DELETE /api/v1/blogs/[id]: Delete a blog (Protected).

Projects

GET /api/v1/projects: Get all projects.

GET /api/v1/projects/[id]: Get a single project.

POST /api/v1/projects: Create a new project (Protected).

PATCH /api/v1/projects/[id]: Update a project (Protected).

DELETE /api/v1/projects/[id]: Delete a project (Protected).

👤 Author

Yeamin Madbor

GitHub: [@your-github-username](https://github.com/your-github-username)

LinkedIn: [Your Name](https://linkedin.com/in/your-linkedin-profile)