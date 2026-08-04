# RemoteWorkLab - 远程办公与自由职业效率工具评测博客系统

这是一个基于 **Next.js Latest (App Router)** + **TypeScript** + **SQLite (Prisma ORM)** + **Tailwind CSS** 构建的高性能内容型博客与产品评测网站。专门为通过 SEO 获取自然流量、并通过 **Amazon 联盟链接、软件联盟链接与 Google AdSense 广告**变现而设计。

---

## 🌟 核心特性与架构

1. **Next.js App Router & ISR 优化**
   - 采用 Next.js 最新 App Router 架构 (`app/` 目录结构)。
   - 使用 ISR（Incremental Static Regeneration）增量静态生成，设置 `revalidate = 3600`，兼顾高速静态响应与数据更新。

2. **SEO 搜索引擎终极优化**
   - **动态 Metadata**：每个页面自适应 title, description, Open Graph, Twitter Cards。
   - **自动 Sitemap & Robots**：动态生成 `/sitemap.xml` 与 `/robots.txt`。
   - **JSON-LD 结构化数据**：包含 `Article`, `FAQPage`, `Product/Review` (支持 Google 搜索结果星级展示), `BreadcrumbList` 模式。
   - **干净 URL 结构**：如 `/blog/best-time-tracking-apps-for-freelancers`。

3. **联盟营销与变现**
   - **联盟免责声明栏**：文章顶部显眼位置展示透明度提示。
   - **对比表格与评测卡片**：使用 `AffiliateProduct` 模型，包含产品图、评分、优缺点列表，购买按钮包含 `rel="nofollow sponsored"` 属性。
   - **AdSense 广告预留**：内置文章前段、文末与侧边栏的响应式 Google AdSense 占位组件。

4. **后台管理系统 (`/admin`)**
   - 使用 NextAuth.js 实现 Credentials 凭据鉴权登录。
   - 提供文章列表、新建文章（支持 Markdown 实时输入、自定义 SEO 字段、自动生成 Slug、分类关联）、联盟产品库与分类管理。

5. **Docker 容器化与 SQLite 持久化**
   - 多阶段构建 Dockerfile (`node:alpine` 镜像，支持 Standalone 输出)。
   - `docker-compose.yml` 搭配 Volume 挂载，保障容器重启后 SQLite 数据库文件 (`dev.db`) 不丢失。

---

## 🛠️ 本地开发运行指南

### 1. 安装依赖
```bash
npm install
```

### 2. 初始化数据库与 Seed 数据
```bash
# 生成 Prisma Client 并创建 SQLite 数据库结构
npx prisma db push

# 播种预设分类、作者、管理员账号与精选评测文章
npm run db:seed
```

### 3. 启动本地开发服务器
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 查看网站前台。

### 4. 登录后台管理系统
- **后台地址**：[http://localhost:3000/admin](http://localhost:3000/admin)
- **默认管理员账号**：`admin@remoteworklab.com`
- **默认管理员密码**：`adminpassword123` *(可在 `.env` 中重置)*

---

## 🐳 Docker 生产环境部署

### 1. 构建并启动 Docker 容器
```bash
docker-compose up -d --build
```

### 2. 容器首次初始化数据库与 Seed
容器启动后，在宿主机执行以下命令初始化 Docker 容器内的 SQLite 数据库：
```bash
docker exec -it remoteworklab_app npx prisma db push
docker exec -it remoteworklab_app npx tsx prisma/seed.ts
```

### 3. 数据持久化说明
SQLite 数据库文件保存在容器内的 `/app/prisma` 目录下，并通过 `docker-compose.yml` 中的 `sqlite_data` Volume 挂载在宿主机。即使执行 `docker-compose down` 重新构建容器，所有文章与配置数据均不会丢失。

---

## 📂 项目文件树结构

```
remoteworklab/
├── app/
│   ├── (auth)/admin/login/page.tsx   # 后台登录页面
│   ├── admin/                         # 后台管理系统路由
│   ├── api/                           # API 接口 (Auth, Posts, Contact)
│   ├── blog/                          # 博客列表与文章详情页 (/blog/[slug])
│   ├── category/                      # 分类列表页 (/category/[slug])
│   ├── about/                         # 关于我们页面
│   ├── contact/                       # 联系我们页面
│   ├── disclosure/                    # 联盟声明页面
│   ├── privacy-policy/                # 隐私政策页面
│   ├── layout.tsx                     # 根布局
│   ├── page.tsx                       # 首页 (Hero, 推荐文章, 分类)
│   ├── robots.ts                      # 动态 robots.txt 生成器
│   └── sitemap.ts                     # 动态 sitemap.xml 生成器
├── components/
│   ├── admin/                         # 后台管理 UI 组件 (PostForm, Nav)
│   ├── blog/                          # 博客组件 (Comparison, FAQ, MDX, Cards)
│   ├── common/                        # 通用组件 (Header, Footer, AdSense, Pagination)
│   └── seo/                           # JSON-LD 结构化数据注入
├── lib/
│   ├── auth.ts                        # NextAuth.js 配置
│   ├── prisma.ts                      # PrismaClient 单例
│   └── utils.ts                       # 工具函数 (formatDate, readingTime, slugify)
├── prisma/
│   ├── schema.prisma                  # 数据库结构 Schema
│   └── seed.ts                        # 种子数据初始化脚本
├── Dockerfile                         # 多阶段 Docker 构建文件
├── docker-compose.yml                 # Docker 服务编排与 Volume 挂载
├── package.json
└── README.md
```
