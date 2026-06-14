# StoryNest AI

StoryNest AI is a production-minded MVP for generating private, personalized kids' picture-book stories with readable text, 2–3 consistent illustrations, and warm AI narration.

**Tagline:** Personalized picture-book stories with gentle voice narration.  
**Pitch:** Create a mini illustrated bedtime story with readable text and warm AI narration in seconds.

## Features
- Supabase email/password auth with SSR cookies and protected routes.
- 3-page story generation with structured JSON output.
- OpenAI server-side text, image, and TTS generation.
- Private Supabase Storage buckets for story images and audio.
- Signed URLs for private media access.
- Saved story library so reopening stories does **not** call OpenAI again.
- Daily free quotas for text stories, illustrated stories, images, and audio.
- Child-safety input/output filters and visible privacy guidance.
- Warm pastel mobile-first UI.

## Tech stack
Next.js App Router, TypeScript strict mode, Tailwind CSS, Supabase Auth/DB/Storage/RLS, OpenAI Node SDK, Zod, lucide-react, clsx, and tailwind-merge.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Fill `.env.local` with Supabase and OpenAI values. Never commit `.env.local`.

## Supabase setup
1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in SQL editor.
3. Run `supabase/migrations/002_storage_policies.sql`.
4. Confirm private buckets exist: `story-images` and `story-audio`.
5. Configure Auth redirect URLs for local and production domains.
6. Copy the project URL, anon key, and service role key into environment variables.

## Environment variables
See `.env.example`. `NEXT_PUBLIC_*` values are browser-visible. `SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` must only be used server-side in route handlers/utilities.

## OpenAI setup
Create an OpenAI API key and set:
- `OPENAI_TEXT_MODEL=gpt-5-mini`
- `OPENAI_IMAGE_MODEL=gpt-image-2`
- `OPENAI_IMAGE_QUALITY=low`
- `OPENAI_TTS_MODEL=gpt-4o-mini-tts`
- `OPENAI_TTS_VOICE=alloy`

## Cost-control strategy
Text generation is cheapest. Images and audio cost more, so the MVP caps generation to 3 pages, 3 images, and 3 audio clips. Free quotas default to 5 text stories/day, 3 illustrated stories/day, 9 images/day, and 15 audio clips/day. Generated stories and media are cached in Supabase; reopening a saved story does not call OpenAI again. Kill switches `ENABLE_IMAGE_GENERATION=false` and `ENABLE_AUDIO_GENERATION=false` reduce spend immediately.

## Safety and privacy
StoryNest AI is designed for parent and teacher use. It does not ask for children’s photos, full names, addresses, school names, phone numbers, medical data, public profiles, comments, or public sharing. Voice narration is AI-generated and disclosed in the UI. Prompts reject unsafe, private, copyrighted, celebrity, and franchise requests.

## Vercel deployment guide
1. Create Supabase project.
2. Run SQL migrations.
3. Create/confirm private storage buckets.
4. Configure Supabase Auth redirect URLs.
5. Create OpenAI API key.
6. Create local `.env.local` and test locally.
7. Push to GitHub.
8. Import GitHub repo into Vercel.
9. Add environment variables in Vercel dashboard.
10. Deploy.
11. Test signup/login.
12. Test story generation.
13. Test saved library and story reopen.

## GitHub workflow
Commit code only, not secrets. Keep `.env.local` ignored. Use pull requests for feature work and run `npm run typecheck` plus `npm run build` before merging.

## Known MVP limitations
- No payments yet.
- No public sharing yet.
- No user-uploaded child photos.
- No multi-character consistency beyond simple prompt anchoring.
- No advanced image editing workflow yet.
- No background queue yet.
- No admin dashboard yet.

## Future roadmap
**Phase 1:** Text + image + audio generation, auth, library, quotas.  
**Phase 2:** Paid plans, Razorpay/Stripe, more story lengths, more voices, more illustration styles.  
**Phase 3:** Better character consistency with image references/editing, story series, parent-approved sharing links, classroom mode, printable PDF export, multi-language narration.  
**Phase 4:** Admin moderation dashboard, analytics, referral system, premium story pack marketplace.
