# Portfolio Analytics And SEO Dashboard

This document describes the v1 measurement contract for `juanobrach.dev`.

## Environment Variables

Browser-public configuration:

- `PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 4 measurement id.
- `PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console verification token.
- `PUBLIC_POSTHOG_KEY`: PostHog browser project token.
- `PUBLIC_POSTHOG_HOST`: PostHog host, defaulting to `https://us.i.posthog.com`.
- `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`: Cloudflare Web Analytics token.
- `PUBLIC_PORTFOLIO_CHAT_ENABLED`: set to `true` only when the public assistant
  is ready to render.
- `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`: public assistant Edge
  Function routing credentials.

Edge Function PostHog capture config:

- `ENTITY_BUILDERS_CORE_POSTHOG_KEY`: preferred shared Entity Builders
  production PostHog project token for backend capture.
- `ENTITY_BUILDERS_CORE_POSTHOG_HOST`: shared backend ingest host, defaulting to
  `https://us.i.posthog.com` when omitted.
- `PORTFOLIO_POSTHOG_API_KEY`: fallback alias used by `portfolio-chat` during
  migration.
- `PORTFOLIO_POSTHOG_HOST`: portfolio-specific ingest host override.

`ENTITY_BUILDERS_CORE_POSTHOG_KEY` can be the same `phc_...` project token as
`PUBLIC_POSTHOG_KEY`. Backend telemetry keeps a separate env var so server
capture can be enabled, disabled, or moved independently from browser analytics.
Do not use or expose privileged PostHog personal API keys, Gemini keys, Supabase
service role keys, prompts, visitor messages, assistant replies, or
authorization headers in browser code or analytics events.

## PostHog Project Strategy

The portfolio SHOULD share the same PostHog production project used by other
Entity Builders apps, similar to the shared Supabase project model. Separation
is done through event properties, not separate projects:

- `app`: `portfolio`
- `environment`: `production`, `development`, or `local`
- `page_type`, `route`, `slug`, `surface`, and `destination_type` for portfolio
  behavior

Dashboards and funnels for the portfolio should filter on `app = portfolio`.
Create a separate PostHog project only if the shared project becomes too noisy,
requires different access control, or starts collecting product-specific data
with different privacy constraints.

## Search Console

Set up the property for `https://juanobrach.dev`, deploy the verification meta
tag through `PUBLIC_GOOGLE_SITE_VERIFICATION`, then submit:

- `https://juanobrach.dev/sitemap-index.xml`
- `https://juanobrach.dev/sitemap-0.xml` if Search Console asks for a concrete
  sitemap file.

Review queries in three groups:

- Branded identity: Juan Obrach, Juan Manuel Obrach, juanobrach.dev.
- Professional profile: Senior Product Engineer, React Native, AI systems,
  mobile product engineer, Argentina or remote fit.
- Technical topics: React Native, monorepos, OpenSpec, Supabase, AI workflows,
  agent workflows.

Search Console is the source of truth for impressions, clicks, average
position, indexing coverage, sitemap status, and structured data feedback.

## Dashboard V1

Use GA/Search Console for acquisition and PostHog for behavior after the click.
The dashboard should answer only these six questions first:

1. Organic search visitors.
2. Top landing pages by route and page type.
3. Case study conversion: `case_study_view -> cv_download/contact_click`.
4. Writing conversion: `article_view -> case_study_view/about/contact_click`.
5. Assistant useful rate:
   `assistant_submit -> contact_click/cv_download/linkedin_click/case_study_view`.
6. Top assistant topics by safe category.

## Event Property Schema

Meaningful PostHog events should use this shared property shape when available:

- `app`: `portfolio`
- `environment`
- `route`
- `page_type`
- `slug`
- `surface`
- `action`
- `destination_type`
- `referrer_type`
- `question_topic`
- `message_length_bucket`
- `assistant_outcome`

Never include raw assistant text, assistant replies, email body text, salary
details, hidden prompts, auth headers, API keys, or visitor-entered personal
data.

## Future Follow-Up

An opt-in lead or transcript flow should be a separate OpenSpec change. It must
define visitor consent, stored fields, retention period, access model, deletion
behavior, and verification before storing conversation content.
