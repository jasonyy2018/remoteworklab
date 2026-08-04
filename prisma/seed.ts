import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with English content...');

  // 1. Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@remoteworklab.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // 2. Create Author
  const author = await prisma.author.create({
    data: {
      name: 'Jason Chen',
      bio: 'Senior remote software engineer and productivity consultant. Jason spends hundreds of hours testing productivity SaaS, home office hardware, and workflow automation to help remote professionals work smarter.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
  });
  console.log(`Author created: ${author.name}`);

  // 3. Create Categories
  const categoriesData = [
    {
      name: 'Software Reviews',
      slug: 'software-reviews',
      description: 'In-depth, hands-on reviews of productivity software, time trackers, and SaaS tools for freelancers and remote teams.',
    },
    {
      name: 'Home Office Setup',
      slug: 'home-office-setup',
      description: 'Ergonomic chairs, standing desks, monitor mounts, and desk accessories to build an optimal work environment.',
    },
    {
      name: 'Productivity Tips',
      slug: 'productivity-tips',
      description: 'Time management frameworks, deep work focus strategies, and workflow automation guides.',
    },
    {
      name: 'Freelance Guide',
      slug: 'freelance-guide',
      description: 'Value-based pricing tactics, client proposals, contracts, and financial workflows for independent creators.',
    },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories.push(createdCat);
  }
  console.log(`Categories seeded: ${categories.length}`);

  // 4. Create Tags
  const tagNames = ['Notion', 'Time Tracking', 'Ergonomics', 'AI Tools', 'Invoicing'];
  const tags = [];
  for (const name of tagNames) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    tags.push(tag);
  }

  // 5. Create Sample Posts with Affiliate Products & FAQs
  const post1 = await prisma.post.create({
    data: {
      title: 'Best Time Tracking Apps for Freelancers in 2026 (Toggl vs Clockify vs Rize)',
      slug: 'best-time-tracking-apps-for-freelancers',
      seoTitle: 'Best Time Tracking Apps for Freelancers 2026: Toggl vs Clockify vs Rize',
      metaDescription: 'Discover the top 3 time tracking tools for freelancers. Compare features, pricing, automatic tracking, and client invoicing reports.',
      seoDescription: 'Discover the top 3 time tracking tools for freelancers. Compare features, pricing, automatic tracking, and client invoicing reports.',
      excerpt: 'Accurate time tracking is essential to protect your revenue as a freelancer. We break down Toggl Track, Clockify, and Rize AI to help you pick the best tool.',
      coverImage: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      isReview: true,
      categoryId: categories[0].id,
      authorId: author.id,
      publishedAt: new Date(),
      faqsJson: JSON.stringify([
        {
          question: 'Why do freelancers need dedicated time tracking software?',
          answer: 'Time tracking software provides verifiable hour logs for client billing and helps identify non-billable tasks that drain your daily productivity.'
        },
        {
          question: 'Is Clockify free version sufficient for solo freelancers?',
          answer: 'Yes! Clockify offers an exceptionally generous free tier with unlimited projects and time logs, making it ideal for solo freelancers on a budget.'
        }
      ]),
      content: `
In the world of remote work and freelancing, **time is your most valuable asset**. Whether you bill clients by the hour or deliver fixed-scope projects, tracking where your hours go is crucial for increasing your effective hourly rate.

Today we are taking a deep dive into three of the most popular time trackers on the market: **Toggl Track**, **Clockify**, and AI-powered **Rize**.

---

## Why Accurate Time Tracking Matters

1. **Prevent Revenue Leakage**: Unrecorded client calls and revision requests quickly add up to unpaid overtime.
2. **Data-Driven Project Quotes**: Use historical time logs to estimate future client proposals with confidence.
3. **Eliminate Distractions**: Identify non-essential meetings and social media loops taking away your peak focus hours.

---

## Hands-On Comparison & Ratings
      `,
      products: {
        create: [
          {
            name: 'Toggl Track',
            description: 'Beautiful, intuitive cross-platform time tracker with one-click timers and polished reporting.',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
            affiliateUrl: 'https://example.com/aff/toggl',
            price: 'Free / $9 per mo',
            prosJson: JSON.stringify(['Clean UI with zero learning curve', 'Robust browser extension & mobile app', 'Export professional client PDF reports']),
            consJson: JSON.stringify(['Paid tiers can be expensive for teams', 'No automatic activity tracking']),
            rating: 4.8,
          },
          {
            name: 'Clockify',
            description: 'Feature-packed time tracking tool with an unlimited free tier for budget-conscious freelancers.',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
            affiliateUrl: 'https://example.com/aff/clockify',
            price: 'Free / $3.99 per mo',
            prosJson: JSON.stringify(['Unlimited users and tracking on free plan', 'Built-in invoicing & timesheet approvals', 'Comprehensive team management']),
            consJson: JSON.stringify(['Interface feels slightly outdated', 'Occasional sync delays on mobile']),
            rating: 4.6,
          },
          {
            name: 'Rize AI',
            description: 'Intelligent AI time tracker that runs automatically in the background with focus metrics.',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
            affiliateUrl: 'https://example.com/aff/rize',
            price: '$14.99 per mo (14-day free trial)',
            prosJson: JSON.stringify(['100% automated tracking without manual timers', 'Focus score analytics & burnout warnings', 'Visually stunning daily timeline']),
            consJson: JSON.stringify(['No permanent free tier', 'Requires comfort with background monitoring']),
            rating: 4.9,
          },
        ]
      }
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Ultimate Home Office Ergonomics Guide: Standing Desks & Chairs for 2026',
      slug: 'home-office-ergonomics-setup-guide',
      seoTitle: 'Ultimate Home Office Ergonomics Setup Guide 2026: Standing Desks & Chairs',
      metaDescription: 'Say goodbye to back pain! Complete buyer guide for ergonomic chairs, standing desks, and monitor arms for remote workers.',
      seoDescription: 'Say goodbye to back pain! Complete buyer guide for ergonomic chairs, standing desks, and monitor arms for remote workers.',
      excerpt: 'Sitting in an uncomfortable chair for 8+ hours is the leading cause of remote fatigue. Here is how to configure your workspace for peak comfort.',
      coverImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      isReview: false,
      categoryId: categories[1].id,
      authorId: author.id,
      publishedAt: new Date(Date.now() - 86400000 * 2),
      faqsJson: JSON.stringify([
        {
          question: 'Are dual-motor standing desks worth the extra cost?',
          answer: 'Yes! Dual-motor standing desks offer higher weight capacities, smoother elevation adjustments, and quieter operation compared to single-motor models.'
        }
      ]),
      content: `
Working remotely means spending **8 to 10 hours a day** at the exact same desk. Investing in ergonomic equipment isn't a luxury—it's essential for long-term health and focus.

## 1. Key Features of an Ergonomic Chair

* **Adjustable Lumbar Support**: Must offer height and depth adjustments to maintain natural spine curvature.
* **3D/4D Armrests**: Relieve tension in your shoulders and wrists during long typing sessions.
* **Breathable Mesh**: Keeps you cool during warm summer days.

## 2. Benefits of Electric Standing Desks

Alternating between sitting and standing every 45 minutes boosts blood circulation and reduces lumbar spine pressure significantly.
      `
    }
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'How Freelancers Can Pitch High-Ticket Client Proposals (Value-Based Pricing)',
      slug: 'freelance-pricing-and-proposal-guide',
      seoTitle: 'Freelance Value-Based Pricing Guide & Winning Proposals Strategy',
      metaDescription: 'Stop competing on price! Learn how to transition from hourly billing to value-based pricing and win high-budget clients.',
      seoDescription: 'Stop competing on price! Learn how to transition from hourly billing to value-based pricing and win high-budget clients.',
      excerpt: 'Competing on low hourly rates is a recipe for burnout. Master value-based pricing to structure proposals that clients gladly pay high rates for.',
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      isReview: false,
      categoryId: categories[3].id,
      authorId: author.id,
      publishedAt: new Date(Date.now() - 86400000 * 5),
      content: `
The biggest mistake freelance consultants make is believing **cheaper prices attract better clients**. In reality, low rates attract demanding clients with tight budgets and endless revision requests.

## Shift from "Selling Hours" to "Delivering Business Outcomes"

When you tell a client your hourly rate is $50, they calculate costs. When you demonstrate how your solution will generate $50,000 in new revenue and quote $8,000, they see **return on investment (ROI)**.

### Actionable Steps:

1. Uncover the client's core business problem during discovery calls.
2. Provide 3 tiered option packages (Basic / Pro / Premium).
3. Set clear scope boundaries and demand a 50% upfront deposit.
      `
    }
  });

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
