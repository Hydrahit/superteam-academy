# 🎓 Superteam Academy

> **A Web3 Learning Management System built on Solana — soulbound XP tokens, on-chain credentials, and gamified progress for the LATAM developer community.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-superteam--academy.vercel.app-6366f1?style=for-the-badge)](https://superteam-academy.vercel.app)
[![PR #70](https://img.shields.io/badge/PR-%2370-green?style=for-the-badge&logo=github)](https://github.com/solanabr/superteam-academy/pull/70)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tests](https://img.shields.io/badge/Tests-283_passing-22c55e?style=for-the-badge)](https://vitest.dev)
[![i18n](https://img.shields.io/badge/i18n-EN_|_PT--BR_|_ES-f59e0b?style=for-the-badge)](https://next-intl-docs.vercel.app)

---

## 🌐 Live Demo

**→ [https://superteam-academy.vercel.app](https://superteam-academy.vercel.app)**

Connect any Solana wallet (Phantom / Solflare) on **Devnet** — no real SOL needed.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (this repo)                  │
│         Next.js 14 App Router · TypeScript · Tailwind    │
├─────────────────────────────────────────────────────────┤
│  Auth Layer        │  Supabase Auth (Google OAuth)       │
│                    │  Ed25519 wallet signature verify     │
│                    │  HttpOnly cookie sessions (@supabase/ssr) │
├─────────────────────────────────────────────────────────┤
│  On-chain Layer    │  Token-2022 XP tokens (soulbound)   │
│                    │  Metaplex Core NFT credentials       │
│                    │  Course PDAs + Enrollment PDAs       │
│                    │  256-bit lesson bitmap per learner   │
├─────────────────────────────────────────────────────────┤
│  Off-chain Layer   │  Supabase PostgreSQL                 │
│                    │  Helius DAS API (leaderboard)        │
│                    │  Streaks + achievements (frontend)   │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🪙 On-chain Gamification (per spec)
| Feature | Implementation |
|---|---|
| **XP Tokens** | Token-2022 `NonTransferable` (soulbound). Wallet balance = XP |
| **Levels** | `Level = floor(√(xp / 100))` — derived, never stored |
| **Credentials** | Metaplex Core NFTs with `PermanentFreezeDelegate` — upgraded **in-place**, no wallet clutter |
| **Course PDAs** | On-chain program-derived accounts per course |
| **Enrollment PDAs** | Per-learner, closeable after completion to reclaim rent |
| **Lesson Progress** | 256-bit bitmap — up to 256 lessons per course, gas-efficient |
| **Achievements** | 256-bit bitmap, each backed by a soulbound Core NFT |
| **Leaderboard** | Off-chain — Helius DAS API indexes XP token balances |
| **Streaks** | Frontend-only — localStorage + Supabase (per spec) |

### 🔐 Authentication
- Google OAuth via Supabase Auth
- Wallet linking with **Ed25519 signature verification** on the server
- Zero trust: JWT validated server-side on every protected route
- HttpOnly cookie sessions — XSS resistant

### 🌎 Internationalization
Full EN / PT-BR / ES support via `next-intl` — every string translated, locale persists across sessions.

### 📊 Dashboard
- Real-time XP + level display
- Streak tracker with visual history
- Achievement showcase
- Course progress overview

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict, 0 errors) |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Supabase Auth + @supabase/ssr |
| Wallet | @solana/wallet-adapter (Wallet Standard) |
| On-chain | Anchor · Token-2022 · Metaplex Core |
| Indexing | Helius DAS API |
| Database | Supabase PostgreSQL |
| Testing | Vitest + @testing-library/react |
| i18n | next-intl |
| Deployment | Vercel |

---

## 🧪 Test Coverage

**283 tests · ~90% coverage**

| Module | Tests | Coverage |
|---|---|---|
| `lib/utils.ts` | 55 | 100% |
| `lib/auth-service.ts` | 38 | ~95% |
| `MockLearningProgressService` | 52 | ~90% |
| `SupabaseProgressService` | 35 | ~95% |
| `middleware.ts` | 28 | ~85% |
| `app/api/auth/link-wallet` | 25 | ~95% |
| `contexts/AuthContext` | 24 | ~80% |
| Integration tests | 26 | — |

```bash
npm test              # run all 283 tests
npm run test:coverage # full coverage report
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- A Phantom or Solflare wallet (switch to **Devnet**)

### Setup

```bash
# 1. Clone
git clone https://github.com/Hydrahit/superteam-academy
cd superteam-academy

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env.local
```

**.env.local minimum config:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_BACKEND=supabase
```

```bash
# 4. Run
npm run dev
# → http://localhost:3000
```

---

## 📁 Project Structure

```
onchain-academy/app/
├── app/                        # Next.js App Router pages
│   ├── (platform)/dashboard/   # Protected dashboard
│   ├── courses/[slug]/         # Course pages
│   │   └── lessons/[lessonId]/ # Lesson viewer
│   ├── leaderboard/            # Global leaderboard
│   └── api/auth/               # Auth API routes
├── components/
│   ├── lesson/LessonView.tsx   # Monaco editor + lesson UI
│   ├── wallet/WalletButton.tsx # Wallet connect + XP display
│   └── auth/AuthButton.tsx     # Full auth state machine
├── contexts/
│   └── AuthContext.tsx         # Global auth state (5 stages)
├── lib/
│   ├── auth-service.ts         # Google OAuth + wallet linking
│   ├── services/               # Learning progress service layer
│   │   ├── index.ts            # Service factory (mock/supabase/onchain)
│   │   ├── learning-progress.ts# Core service + MockService
│   │   └── SupabaseProgressService.ts
│   └── supabase/               # Server + browser Supabase clients
├── middleware.ts               # Auth guard + i18n routing
└── messages/                   # EN / PT-BR / ES translations
    ├── en.json
    ├── pt-br.json
    └── es.json
```

---

## 🔑 Key Design Decisions

### Service Repository Pattern
One interface, three implementations — switch with a single env var:
```typescript
NEXT_PUBLIC_BACKEND=mock       // instant dev, no DB
NEXT_PUBLIC_BACKEND=supabase   // production backend
NEXT_PUBLIC_BACKEND=onchain    // full Solana integration
```

### Zero-Trust Auth
```typescript
// ❌ Never do this
const { session } = await supabase.auth.getSession()

// ✅ Always validate JWT on the server
const { data: { user } } = await supabase.auth.getUser()
```

### Ed25519 Wallet Verification
The wallet link flow proves ownership cryptographically — the server verifies the signature before writing to DB. Replay attacks are prevented by embedding the user ID + timestamp in the signed message.

---

## 🌍 Internationalization

Every page is fully translated:
```
/en/courses     → English
/pt-br/courses  → Português
/es/courses     → Español
```

Language detection priority: URL prefix → cookie → `en` (never Accept-Language header, to avoid stale-cookie bugs).

---

## 👤 Author

**Hydrahit** — [@Hydrahit_nad on X](https://x.com/Hydrahit_nad)

Submission for the [Superteam Brazil Academy Bounty](https://earn.superteam.fun)

---

## 📄 License

MIT — see [LICENSE](./LICENSE)
