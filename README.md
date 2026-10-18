# Joseph Adeniji: portfolio

Personal portfolio for a full-stack engineer. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4, with a validated, unit-tested contact API and CI on GitHub Actions.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

All copy lives in `src/content/site.ts`: profile, stack layers, projects and client work. Update that file; the components read from it.

Before publishing:

- Set `profile.email` to the address you want public.
- Add `linkedin` and `bookingUrl` (the "Book a call" button appears once `bookingUrl` is set).
- Check every entry in `clientWork` is a site you're happy to name.
- When a project ships, set its `status` to `"Live"` and add `repo` and `demo` links.

## Contact form

`POST /api/contact` validates input with Zod (`src/lib/contact.ts`), drops bot submissions via a honeypot field, and sends mail through [Resend](https://resend.com). Set these environment variables to turn it on:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Where messages are delivered |
| `CONTACT_FROM_EMAIL` | Optional sender, e.g. `Portfolio <hello@yourdomain.com>` |

Without them, the form returns a clear "email me directly" message instead of failing silently.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm test` | Run unit tests (Vitest) |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run build` | Production build |

CI runs lint, typecheck, tests and build on every push and pull request.

## Deploy

Push to GitHub, import the repo on [Vercel](https://vercel.com), and add the environment variables above in the project settings.

## Project structure

```
src/
  app/
    api/contact/route.ts   contact endpoint
    layout.tsx             fonts and metadata
    page.tsx               the page
  components/              StackExplorer, ContactForm
  content/site.ts          all site copy
  lib/contact.ts           validation logic (+ tests in __tests__)
```
