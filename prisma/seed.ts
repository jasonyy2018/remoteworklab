import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

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
      bio: '资深远程办公工程师与自由职业顾问，专注测试各类效率工具与远程办公硬件，帮助全职远程团队及自由职业者提高工作产出与生活质量。',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
  });
  console.log(`Author created: ${author.name}`);

  // 3. Create Categories
  const categoriesData = [
    {
      name: 'Software Reviews',
      slug: 'software-reviews',
      description: '深入评测适用于远程团队和自由职业者的软件工具、SaaS 产品与效率软件。',
    },
    {
      name: 'Home Office Setup',
      slug: 'home-office-setup',
      description: '人体工学椅、升降桌、显示器及桌面搭设指南，打造高效舒适的居家办公环境。',
    },
    {
      name: 'Productivity Tips',
      slug: 'productivity-tips',
      description: '时间管理、工作流自动化与专注力提升指南，打破居家办公延误与倦怠。',
    },
    {
      name: 'Freelance Guide',
      slug: 'freelance-guide',
      description: '接单报价、客户沟通、合同签订与财务税务实用避坑指南。',
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
      title: '2026年最佳自由职业者时间追踪软件对比评测 (Toggl vs Clockify vs Rize)',
      slug: 'best-time-tracking-apps-for-freelancers',
      seoTitle: '2026自由职业时间追踪软件评测：Toggl / Clockify / Rize',
      metaDescription: '精选3款主流自由职业时间追踪工具，深度对比功能、价格、自动化程度与报表分析，帮你精准记录工时与项目开单。',
      seoDescription: '精选3款主流自由职业时间追踪工具，深度对比功能、价格、自动化程度与报表分析，帮你精准记录工时与项目开单。',
      excerpt: '精准记录项目工时是自由职业者保障收益的关键。本文深度评测 Toggl Track、Clockify 与 Rize AI 三款热门工具，助你选择最适合的打卡利器。',
      coverImage: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      isReview: true,
      categoryId: categories[0].id,
      authorId: author.id,
      publishedAt: new Date(),
      faqsJson: JSON.stringify([
        {
          question: '自由职业者为什么需要专门的时间追踪软件？',
          answer: '时间追踪软件不仅能帮助你精准向客户按小时计费提供证明，还能让你清晰了解时间消耗在哪些非核心任务上，从而优化工作流与报价策略。'
        },
        {
          question: '免费版 Clockify 够用吗？',
          answer: '对于单打独斗的独立自由职业者，Clockify 免费版功能非常完整，涵盖不限项目数与工时记录，完全满足日常打卡与报表导出。'
        }
      ]),
      content: `
在远程办公与自由职业的世界里，**时间就是你最核心的资产**。无论你是按小时向客户报酬，还是按项目固定价格结算，清楚掌握自己在每个任务上花费的时间，都是提升每小时产出与精细化管理生活的关键。

今天我们将深度评测市面上最受欢迎的三款时间追踪软件：**Toggl Track**、**Clockify** 以及带有 AI 智能分析的 **Rize**。

---

## 为什么精准工时记录如此重要？

1. **防止收益流失**：忘记记录沟通、修改需求的时间，等于在免费为客户加班。
2. **科学项目报价**：通过历史工时数据，为未来项目估算更合理的价格区间。
3. **识别注意力黑洞**：发现社交媒体和无意义会议占用的高效时间段。

---

## 三款主流工具深度评测与对比

下面是针对自由职业者核心需求的详细对比列表：
      `,
      products: {
        create: [
          {
            name: 'Toggl Track',
            description: '界面极简、体验绝佳的跨平台计时工具，支持一键打卡与漂亮可视化图表。',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
            affiliateUrl: 'https://example.com/aff/toggl',
            price: '免费版 / $9/月起',
            prosJson: JSON.stringify(['极简 UI，几无学习成本', '多端同步与浏览器插件强大', '支持按客户与项目生成专业PDF报表']),
            consJson: JSON.stringify(['高级付费版价格稍贵', '缺乏自动截图或深层行为分析']),
            rating: 4.8,
          },
          {
            name: 'Clockify',
            description: '功能极其强大的免费工时追踪器，适合预算有限的自由职业者及小团队。',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
            affiliateUrl: 'https://example.com/aff/clockify',
            price: '免费版 / $3.99/月起',
            prosJson: JSON.stringify(['免费版无人数与记录限制', '支持发票生成与工时审批', '丰富的团队管理功能']),
            consJson: JSON.stringify(['界面样式略显传统', '移动端偶尔存在同步延迟']),
            rating: 4.6,
          },
          {
            name: 'Rize AI',
            description: '基于 AI 的智能注意力与时间追踪器，全自动记录软件使用与专注度评分。',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
            affiliateUrl: 'https://example.com/aff/rize',
            price: '$14.99/月 (提供14天试用)',
            prosJson: JSON.stringify(['全程后台自动打卡，免去手动开启', 'AI 专注度评分与过劳提醒', '极其精美的日间时间轴拆解']),
            consJson: JSON.stringify(['无完全免费版本', '对隐私保护敏感者需要时间适应']),
            rating: 4.9,
          },
        ]
      }
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: '打造极致舒服的居家办公环境：2026人体工学椅与升降桌选购全指南',
      slug: 'home-office-ergonomics-setup-guide',
      seoTitle: '居家办公人体工学选购指南 2026：升降桌与人体工学椅推荐',
      metaDescription: '告别腰酸背痛！专为长期居家远程办公者整理的人体工学桌椅选购要素、环境布置与高性价比装备推荐。',
      seoDescription: '告别腰酸背痛！专为长期居家远程办公者整理的人体工学桌椅选购要素、环境布置与高性价比装备推荐。',
      excerpt: '长时间坐在不舒适的座椅前是远程办公健康的第一杀手。本文为你拆解升降桌、人体工学椅与显示器支架的最佳配置方案。',
      coverImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      isReview: false,
      categoryId: categories[1].id,
      authorId: author.id,
      publishedAt: new Date(Date.now() - 86400000 * 2),
      faqsJson: JSON.stringify([
        {
          question: '升降桌真的有必要买双电机吗？',
          answer: '双电机升降桌承重力更强、升降过程更平稳顺滑且噪音较低，如果你的桌面放置了双显示器或重型设备，强烈建议选择双电机。'
        }
      ]),
      content: `
居家远程办公意味着你每天可能有 **8-10 个小时** 需要在同一个区域度过。一套优质的人体工学设备不仅能大幅减少腰椎与颈椎压力，还能有效提升工作专注度。

## 1. 人体工学椅选购要点

* **腰靠支撑**：必须具备可调节高度与深度的腰托。
* **扶手自由度**：至少支持 3D/4D 调节，确保打字时手臂得到自然依托。
* **网布透气性**：高弹力高透气网布在夏日居家时体验极佳。

## 2. 电动升降桌的优势

实现“坐站交替办公”是缓解下肢血流不畅与腰部疲劳的最有效方式。建议设定每工作 45 分钟站立办公 15 分钟。
      `
    }
  });

  const post3 = await prisma.post.create({
    data: {
      title: '自由职业者如何制定不可拒绝的高价报价方案（附模版）',
      slug: 'freelance-pricing-and-proposal-guide',
      seoTitle: '自由职业高价报价指南与项目合同撰写技巧',
      metaDescription: '拒绝低价卷内耗！教你从按时计费转变为按价值计费（Value-Based Pricing），提升客单价与客户信任度。',
      seoDescription: '拒绝低价卷内耗！教你从按时计费转变为按价值计费（Value-Based Pricing），提升客单价与客户信任度。',
      excerpt: '还在用低廉的时薪打吸引客户？掌握按价值计费的核心逻辑，建立清晰的项目提案模板，让客户心甘情愿付高价。',
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      isReview: false,
      categoryId: categories[3].id,
      authorId: author.id,
      publishedAt: new Date(Date.now() - 86400000 * 5),
      content: `
许多自由职业者陷入的最大的误区，就是以为**更低的价格能带来更多客户**。实际上，低价往往吸引来的是要求苛刻、沟通成本极高且预算有限的客户。

## 从“卖时间”到“卖解决方案”

当你告诉客户你的时薪是 $50 时，客户会在心里计算每个小时的成本；而当你为客户展示一个能帮他们增加 $50,000 销售额的方案并报价 $8,000 时，客户看到的是 **收益**。

### 核心步骤：

1. 深入询问客户的商业目标与痛点
2. 提供 3 个不同层级的阶梯报价（Basic / Pro / Premium）
3. 设定明确的交付边界与付款节点（如 50% 预付款）
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
