# Superteam Academy

**On-chain education platform built on Solana for the Superteam Brazil community.**

Learn Web3, complete courses, pass quizzes, and earn verifiable NFT certificates — all powered by Solana and Anchor.

---

## Features

- **Wallet-Based Auth** — Sign in with Phantom, Backpack, or Solflare. No email or password needed.
- **Structured Courses** — 5 curated courses covering Web3 fundamentals through advanced Solana development.
- **Interactive Quizzes** — Server-graded quizzes with anti-cheat (answers never sent to client). 70% passing threshold.
- **On-Chain Progress** — Course enrollment, lesson completions, and XP tracked via Solana PDAs.
- **NFT Certificates** — Mint a soulbound-style NFT certificate upon course completion.
- **Leaderboard** — XP-based rankings across all learners.
- **Admin Dashboard** — Platform analytics, course management, and activity monitoring.
- **Dark-Mode UI** — Fully responsive design with Framer Motion animations.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS 3.4, Framer Motion |
| Auth | NextAuth.js with Solana wallet signature verification |
| Database | PostgreSQL via Prisma ORM |
| Blockchain | Solana (Anchor 0.29), SPL Token, Metaplex |
| Wallet | `@solana/wallet-adapter` (Phantom, Backpack, Solflare) |
| Fonts | Space Grotesk (display), DM Sans (body), JetBrains Mono (code) |

---

## Project Structure

```
superteam-academy/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout + providers
│   ├── globals.css               # Design system + animations
│   ├── courses/
│   │   ├── page.tsx              # Course catalog (search + filter)
│   │   └── [slug]/
│   │       ├── page.tsx          # Course detail + enrollment
│   │       └── lessons/
│   │           └── [lessonId]/
│   │               └── page.tsx  # Lesson viewer + quiz trigger
│   ├── dashboard/
│   │   └── page.tsx              # User dashboard (progress + certs)
│   ├── leaderboard/
│   │   └── page.tsx              # XP rankings
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── courses/
│       │   ├── route.ts              # GET all courses
│       │   └── [slug]/
│       │       ├── route.ts          # GET single course
│       │       └── enroll/route.ts   # POST enroll
│       ├── lessons/[lessonId]/
│       │   ├── route.ts              # GET lesson content
│       │   └── complete/route.ts     # POST mark complete
│       ├── quizzes/[lessonId]/
│       │   ├── route.ts              # GET quiz questions
│       │   └── submit/route.ts       # POST submit answers
│       ├── certificates/route.ts     # GET certs + POST mint NFT
│       ├── dashboard/route.ts        # GET dashboard data
│       └── leaderboard/route.ts      # GET rankings
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed nav + wallet button
│   │   └── Footer.tsx            # 3-column footer
│   ├── landing/
│   │   ├── HeroSection.tsx       # Animated hero + floating card
│   │   ├── HowItWorks.tsx        # 3-step process
│   │   ├── FeaturedCourses.tsx   # Course preview cards
│   │   ├── StatsBar.tsx          # Animated count-up stats
│   │   ├── NFTShowcase.tsx       # Certificate feature showcase
│   │   ├── Testimonials.tsx      # Community quotes
│   │   └── CTABanner.tsx         # Gradient CTA
│   ├── courses/
│   │   ├── CourseCard.tsx        # Reusable course card
│   │   ├── LessonSidebar.tsx     # Lesson nav + completion marks
│   │   └── QuizModal.tsx         # Quiz dialog with scoring
│   └── dashboard/
│       ├── StatsOverview.tsx     # 4-stat summary
│       ├── ProgressCard.tsx      # Course progress bar
│       └── CertificateCard.tsx   # NFT cert display + mint button
├── lib/
│   ├── prisma.ts                 # Prisma singleton
│   ├── utils.ts                  # Helpers (cn, truncateWallet, etc.)
│   ├── auth.ts                   # NextAuth config + wallet verify
│   ├── providers.tsx             # Client providers wrapper
│   └── solana/
│       ├── wallet.ts             # Wallet adapter setup
│       ├── nft.ts                # Metaplex NFT minting
│       └── program.ts           # Anchor program interface + PDAs
├── prisma/
│   ├── schema.prisma             # 7 models (User, Course, Lesson, Quiz, etc.)
│   └── seed.ts                   # 5 courses, 43 lessons, 86 quiz questions
├── programs/superteam_academy/
│   ├── Cargo.toml                # Rust dependencies
│   └── src/
│       └── lib.rs                # Anchor program (6 instructions)
├── tests/
│   └── superteam_academy.ts      # 15 integration tests
├── Anchor.toml                   # Anchor config
├── package.json                  # Dependencies
├── tailwind.config.ts            # Custom theme
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
└── .env.example                  # Environment variables
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Solana CLI + Anchor CLI (for on-chain program)
- A Solana wallet (Phantom, Backpack, or Solflare)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/superteam-academy.git
cd superteam-academy
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/superteam_academy"
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SOLANA_NETWORK="devnet"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed with sample data (5 courses, 43 lessons, 86 quiz questions)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Solana Program

### Build & Deploy

```bash
# Build the program
anchor build

# Run tests (requires local validator)
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

### Program Instructions

| Instruction | Description | Authority |
|-------------|-------------|-----------|
| `initialize_platform` | Set up platform with admin authority | Admin |
| `create_course` | Register a course on-chain | Admin |
| `enroll` | Student enrolls in a course | Student |
| `complete_lesson` | Record lesson completion + award XP | Student |
| `mint_certificate` | Mint NFT certificate for completed course | Student |
| `deactivate_course` | Deactivate a course | Admin |

### PDA Structure

| Account | Seeds | Description |
|---------|-------|-------------|
| Platform | `["platform"]` | Global platform state |
| Course | `["course", course_id]` | Course metadata |
| Enrollment | `["enrollment", student, course]` | Enrollment record |
| Progress | `["progress", student, course]` | Lesson progress + XP |
| Certificate | `["certificate", student, course]` | Minted certificate data |

### XP System

- **+10 XP** per lesson completed
- **+50 XP** bonus on course completion
- **70%** minimum quiz score to pass
- Rankings on the leaderboard are sorted by total XP

---

## API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/courses` | Optional | List courses (search + difficulty filter) |
| GET | `/api/courses/[slug]` | Optional | Course detail with lessons |
| POST | `/api/courses/[slug]/enroll` | Required | Enroll in a course |
| GET | `/api/lessons/[lessonId]` | Optional | Lesson content + navigation |
| POST | `/api/lessons/[lessonId]/complete` | Required | Mark lesson complete |
| GET | `/api/quizzes/[lessonId]` | Required | Get quiz questions (no answers) |
| POST | `/api/quizzes/[lessonId]/submit` | Required | Submit quiz + get graded results |
| GET | `/api/certificates` | Required | User's certificates |
| POST | `/api/certificates` | Required | Mint NFT certificate |
| GET | `/api/dashboard` | Required | Dashboard stats + enrolled courses |
| GET | `/api/leaderboard` | Optional | Paginated XP rankings |

---

## Database Schema

**7 Models:** User, Course, Lesson, Quiz, Enrollment, LessonCompletion, Certificate

- **User** — Wallet address as primary identifier
- **Course** — Title, slug, description, difficulty, lessons
- **Lesson** — Content (markdown), video URL, order within course
- **Quiz** — JSON array of questions with options, correct answers, explanations
- **Enrollment** — Links user to course with progress percentage
- **LessonCompletion** — Tracks which lessons a user has finished
- **Certificate** — NFT mint address and metadata URI

---

## Seed Data

The seed file populates 5 complete courses:

| Course | Difficulty | Lessons | Quiz Questions |
|--------|-----------|---------|----------------|
| Web3 Basics | Beginner | 5 | 10 |
| Intro to Solana | Beginner | 8 | 16 |
| Building dApps with Anchor | Intermediate | 10 | 20 |
| DeFi Fundamentals | Intermediate | 8 | 16 |
| Advanced Solana Security | Advanced | 12 | 24 |
| **Total** | | **43** | **86** |

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#0A0A0F` |
| Primary (Green) | `#00C896` |
| Accent (Purple) | `#9945FF` |
| Surface | `white/5` with `border-white/10` |
| Display Font | Space Grotesk |
| Body Font | DM Sans |
| Mono Font | JetBrains Mono |
| Border Radius | `2xl` (16px) |
| Animations | Framer Motion fade-up, stagger |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with Solana for the **Superteam Brazil** community.
