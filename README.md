# TruyệnNhàTee

Vietnamese manga/novel reading website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark-themed UI inspired by Vietnamese novel sites
- 📚 3 mock stories with 20 chapters each
- 🔐 Role-based access control (Guest / Member / VIP)
- 💎 Gem-based story unlock system
- 📱 Responsive design

## Roles

| Role | Free Chapters | Unlock Cost |
|------|--------------|-------------|
| Guest | 1-10 | Login required |
| Member | 1-10 | 35,000 💎/story |
| VIP | All | Free |

## Demo Accounts

- `demo` / `demo123` — Member with 50,000 💎
- `vip` / `vip123` — VIP (reads everything free)

New registrations start with 50,000 💎.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Auth & state stored in `localStorage`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
