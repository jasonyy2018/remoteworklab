# RemoteWorkLab - Remote Work & Freelance Productivity Tools Guide

This is a high-performance content blog and product review system built with **Next.js 16.3 (App Router & Turbopack)** + **TypeScript** + **SQLite (Prisma ORM)** + **Tailwind CSS**. Designed specifically for SEO traffic acquisition and monetization via **Amazon Affiliate links, Software Affiliate links, and Google AdSense**.

---

## 🌟 Key Features & Architecture

1. **Next.js 16.3 App Router & ISR Optimization**
   - Built with Next.js 16.3 App Router & Turbopack engine.
   - Incremental Static Regeneration (ISR) set to `revalidate = 3600` (1 hour) for instant response & dynamic updates.

2. **SEO & Search Engine Optimization**
   - **Dynamic Metadata**: Title, description, Open Graph, Twitter Cards per page.
   - **Auto Sitemap & Robots**: Dynamically generated `/sitemap.xml` and `/robots.txt`.
   - **JSON-LD Structured Data**: `Article`, `FAQPage`, `Product/Review` (Google Search Rich Snippet Ratings), and `BreadcrumbList`.
   - **Clean URL Structure**: e.g., `/blog/best-time-tracking-apps-for-freelancers`.

3. **Monetization Components**
   - **Affiliate Disclaimer Banner**: Displayed prominently at top of posts.
   - **Product Comparison & Review Cards**: `AffiliateProduct` model with rating, pros & cons, price, and CTA buttons tagged with `rel="nofollow sponsored"`.
   - **AdSense Placeholders**: Built-in responsive Google AdSense slots for in-article and sidebar placements.

4. **Admin Dashboard (`/admin`)**
   - NextAuth.js credentials authentication.
   - Article CRUD (Markdown editor, slug auto-gen, category assignment, SEO customization), category management, and affiliate product library.

5. **Docker Containerization & SQLite Persistence**
   - Multi-stage Dockerfile with automatic `docker-entrypoint.sh` database initialization.
   - `docker-compose.yml` with Volume mounting for SQLite file (`dev.db`) persistence.

---

## 🛠️ Local Development Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed Sample Data
```bash
# Sync Prisma schema to SQLite
npx prisma db push

# Seed default categories, author, admin account, and sample articles
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000).

### 4. Admin Dashboard Login
- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email**: `admin@remoteworklab.com`
- **Password**: `adminpassword123` *(Configurable in `.env`)*

---

## 🐳 Docker Production Deployment

### Build and Start Container (Auto-initializes SQLite database)
```bash
docker compose down && docker compose build --no-cache && docker compose up -d
```
> **Note**: `docker-entrypoint.sh` automatically detects if `/app/prisma/dev.db` exists upon container startup. If not, it executes `prisma db push` and seeds initial categories/admin user automatically!

---

## 📂 Project Structure

```
remoteworklab/
├── app/
│   ├── (auth)/admin/login/page.tsx   # Admin Login
│   ├── admin/                         # Admin Dashboard (Posts, Categories, Products)
│   ├── api/                           # API Routes (Auth, Posts, Contact)
│   ├── blog/                          # Blog List & Post Details (/blog/[slug])
│   ├── category/                      # Category Filtering (/category/[slug])
│   ├── about/                         # About Us
│   ├── contact/                       # Contact Us Form
│   ├── disclosure/                    # Affiliate Disclosure
│   ├── privacy-policy/                # Privacy Policy
│   ├── layout.tsx                     # Root Layout
│   ├── page.tsx                       # Homepage (Hero, Featured, Category Grid)
│   ├── robots.ts                      # Dynamic robots.txt
│   └── sitemap.ts                     # Dynamic sitemap.xml
├── components/
│   ├── admin/                         # Admin UI Components
│   ├── blog/                          # Blog Components (Comparison, FAQ, MDX, Cards)
│   ├── common/                        # Shared Components (Header, Footer, AdSense, Pagination)
│   └── seo/                           # JSON-LD Structured Data
├── lib/
│   ├── auth.ts                        # NextAuth.js Config
│   ├── prisma.ts                      # PrismaClient Singleton
│   └── utils.ts                       # Helpers (formatDate, readingTime, slugify)
├── prisma/
│   ├── schema.prisma                  # SQLite Database Schema
│   └── seed.ts                        # Database Seed Script
├── docker-entrypoint.sh               # Docker Entrypoint Script
├── Dockerfile                         # Multi-stage Dockerfile
├── docker-compose.yml                 # Docker Compose Config
├── package.json
└── README.md
```
