# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DimDev Portfolio is a modern Next.js 14 portfolio website with CMS integration, Stripe payments, and email functionality. The site showcases developer services (POC, MVP, Full Dev) and projects managed through Notion CMS.

**Stack:**
- Frontend: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion
- Backend: Next.js API Routes
- Services: Notion API (CMS), Stripe (payments), Brevo (emails), Google Analytics, Calendly (bookings)

## Development Commands

```bash
# Development
npm run dev        # Start dev server at localhost:3000

# Production
npm run build      # Build for production
npm start          # Start production server

# Code quality
npm run lint       # Run ESLint
```

## Architecture & Key Patterns

### Project Structure

- **`app/`** - Next.js App Router pages and API routes
  - `page.tsx` - Homepage with Hero, Services, Portfolio Preview, CTA sections
  - `works/` - Portfolio listing and individual project pages (dynamic routes via `[slug]`)
  - `services/` - Services pricing page with service request modals
  - `contact/` - Contact form page
  - `checkout/` - Success/cancel pages for Stripe payments (legacy)
  - `api/` - API routes:
    - `api/service-request/` - Handles detailed service request forms
    - `api/contact/` - Handles general contact form
    - `api/checkout/` - Creates Stripe checkout sessions (legacy)
    - `api/stripe/webhook/` - Handles Stripe webhooks (legacy)

- **`components/`** - React components organized by purpose
  - `layout/` - Header, Footer (persistent across pages)
  - `sections/` - Hero, Services, PortfolioPreview, CTA (homepage sections)
  - `ui/` - Button, Card, BookingWidget, CheckoutButton (opens service request modal), Modal, ServiceRequestForm (reusable UI)

- **`lib/`** - Core business logic and utilities
  - `notion.ts` - Notion API client with `getProjects()` and `getProjectBySlug(slug)`
  - `stripe.ts` - Stripe integration with `createCheckoutSession()`, webhook verification
  - `constants.ts` - Site config, services data, navigation items (SITE_CONFIG, SERVICES, NAV_ITEMS)
  - `types.ts` - TypeScript interfaces (Project, Service, ContactForm, NotionProject)
  - `analytics.ts` - Google Analytics tracking
  - `utils.ts` - Helper utilities

### Notion CMS Integration

Projects are fetched from Notion database with these properties:
- **Required**: Name (title), Slug, Description, Image, Tags, Stack, Status
- **Optional**: Featured (checkbox), DeliveryBadge/Duration, Client, Results, LiveURL, GithubURL
- **Filter**: Only projects with `Status = "Published"` are displayed
- **Sorting**: Featured projects appear first

**Important**:
- Projects are fetched server-side (SSR) with 1-hour revalidation
- Images must be from allowed domains in `next.config.js` (Unsplash, Cloudinary, Notion, AWS S3)
- Slugs must be unique and URL-safe

### Service Request Flow (New UX - No Direct Payment)

1. User clicks "Demander un devis" button on Services page (`CheckoutButton` component)
2. Modal opens with detailed `ServiceRequestForm` asking for:
   - Contact info (name, email, company, phone)
   - Project goals and main features (detailed text)
   - Timeline and budget preferences
   - Referral source
3. Form data sent to `/api/service-request` route
4. Email sent via Brevo to site owner with detailed project info
5. Success message shown in modal with next steps (reply within 24h)
6. Owner manually sends payment link after validating the project scope

**Important**:
- This replaces the direct Stripe checkout flow for better UX
- Users now get scope validation before payment
- Payment happens after consultation via manual link sent by email
- Stripe infrastructure (`/api/checkout`, `/api/stripe/webhook`) still exists for future use

### Contact Form Flow

1. User fills form on `/contact` page
2. Form data sent to `/api/contact` route
3. Email sent via Brevo API to `EMAIL_FROM` address
4. Reply-to set to user's email for easy responses

### Styling System

**Custom Tailwind theme** (see `tailwind.config.ts`):
- `primary` - #556B2F (Olive green, main brand color)
- `accent` - #FF6B8A (Coral pink, CTAs and highlights)
- `dark` - #0B0B0B (Deep black, text and backgrounds)
- `surface` - #F6F5F3 (Warm gray, backgrounds)

**Fonts**:
- Sans: Inter (body text)
- Heading: Poppins (headings, weights: 400, 600, 700)
- Mono: Roboto Mono (code/technical)

**Import paths**: Use `@/` alias (e.g., `@/components/ui/Button`, `@/lib/constants`)

## Environment Variables

Required variables (see `.env.example` for full list):

```bash
# Notion CMS (required for projects)
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx

# Stripe (required for payments)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_POC=price_xxxxx
STRIPE_PRICE_MVP=price_xxxxx
NEXT_PUBLIC_URL=https://dimdev.pro

# Brevo Email (required for contact form)
BREVO_API_KEY=your_brevo_api_key
EMAIL_FROM=contact@dimdev.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Calendly (optional)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/username
```

## Important Notes

- **Language**: UI and content are in French (fr_FR locale)
- **Image optimization**: Always use Next.js `<Image>` component, add new domains to `next.config.js` if needed
- **Data fetching**: Projects use ISR (Incremental Static Regeneration) with 1-hour revalidation
- **Error handling**: All API routes return JSON with `{ error: "message" }` on failure
- **Type safety**: Use defined types from `lib/types.ts`, avoid `any` except for Notion responses
- **Analytics**: Google Analytics tracks page views, button clicks, form submissions
- **Responsive design**: Mobile-first approach, test on mobile breakpoints

## Deployment

Project is deployed on Vercel. On push to `main`:
1. Vercel builds with `npm run build`
2. Environment variables must be set in Vercel dashboard
3. Stripe webhook endpoint must point to `https://your-domain.com/api/stripe/webhook`

## Modifying Content

- **Site info**: Edit `SITE_CONFIG` in `lib/constants.ts`
- **Services/pricing**: Edit `SERVICES` array in `lib/constants.ts`
- **Navigation**: Edit `NAV_ITEMS` in `lib/constants.ts`
- **Projects**: Add/edit in Notion database (no code changes needed)
- **Color scheme**: Modify `tailwind.config.ts` theme colors
