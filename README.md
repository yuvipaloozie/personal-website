# Yuvraj Tripathy: personal website

![Next.js](https://img.shields.io/badge/Next.js-203858?style=flat-square)
![React](https://img.shields.io/badge/React-203858?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-203858?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-203858?style=flat-square)
![Canvas animation](https://img.shields.io/badge/Canvas%20animation-203858?style=flat-square)

My engineering and applied-ML portfolio, built with [Next.js](https://nextjs.org) and originally bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The site brings together projects, research writing and experience through an animated chemical-process diagram.

Routes live in `src/app/`; the shared project and profile content is in `src/lib/`. The process rendering is in `src/components/PlantDiagram.tsx`, with the supporting background geometry in `src/lib/process-depth.ts`.

## Getting Started

Install the dependencies with `npm ci`, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Next.js examples often use `app/page.tsx`. This repository uses `src/app/page.tsx` to render `src/components/ProcessHome.tsx`; edits appear automatically in the development server.

Fonts are served locally from `public/fonts/`, with CSS font-face rules for Instrument Sans, Geist Pixel and Geist Mono. The framework documentation covers [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts); [Geist](https://vercel.com/font) is the source of the pixel and monospace families.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

The framework source is in [the Next.js GitHub repository](https://github.com/vercel/next.js).

## Deploy on Vercel

The website deploys through the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

