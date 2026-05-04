# SunCart – Summer Essentials Store

Modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, and beach accessories.

Live URL: https://your-deployment-url.vercel.app

## Key Features

- Hero campaign, popular products, care tips, and top brand highlights
- Full product catalog with protected product details
- BetterAuth email/password and Google sign-in
- My Profile page with update information flow
- Fully responsive layout across mobile, tablet, and desktop

## Tech Stack

- Next.js (App Router)
- Tailwind CSS + DaisyUI
- BetterAuth

## NPM Packages Used

- better-auth
- better-sqlite3
- animate.css
- daisyui

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create environment variables:

```bash
copy .env.example .env.local
```

3. Run BetterAuth migrations (creates the SQLite tables):

```bash
npx auth@latest migrate
```

4. Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.
