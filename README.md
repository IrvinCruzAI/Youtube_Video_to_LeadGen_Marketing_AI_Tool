# YouTube to Leads AI

> Transform any YouTube video into a complete marketing funnel. 13 AI-generated assets from one URL.

[![License: Private](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)

**[🚀 Try Live Demo](https://youtube-to-leads-ai.bolt.host)** | **[For Recruiters](#portfolio-analysis)** | **[Tech Stack](#tech-stack)** | **[Quick Start](#quick-start)**

**A [FutureCrafters](https://www.futurecrafters.ai) Project** • Built by [Irvin Cruz](https://irvincruz.com)

---

## TL;DR (30-Second Scan)

**What:** Paste a YouTube URL → Get 13 complete marketing assets AI-generated in minutes: lead magnets, landing pages, email sequences, social media content, SEO articles, quizzes, and more.

**Why Different:** Complete marketing funnel from one video (not just a summary). Multi-step AI pipeline with specialized prompts for each asset type. Persistent job queue with progress tracking.

**For Recruiters:** Demonstrates multi-step AI orchestration, state management at scale, API integration architecture, progress tracking UI, and complete product thinking (input → processing → 13 outputs).

**For Businesses:** Content creators and marketers can turn their YouTube content into complete lead generation funnels without writing a single word themselves.

**Tech:** React 18 + TypeScript + Zustand + Multi-API architecture (YouTube + OpenRouter) + LocalStorage persistence + 13-step AI pipeline.

---

## The Problem

**Content Creators:** You've created valuable YouTube content. But it just sits there. You need: lead magnets, landing pages, email sequences, social media promotion. Creating these manually = weeks of work.

**Marketers:** Repurposing content is your growth strategy. But turning one video into blog posts, social content, email campaigns, and lead magnets requires: transcription, analysis, copywriting, design briefs. Too slow.

**Agencies:** Clients send you their videos. They want: "Turn this into a lead magnet and promote it." You spend 40+ hours per video: transcribing, outlining, writing, designing, creating nurture sequences.

**Current "Solutions" Fail:**
- ❌ **Manual transcription** = Hours of work, error-prone
- ❌ **ChatGPT copy-paste** = 13 separate prompts, no consistency, manual assembly
- ❌ **Summarization tools** = Give you text, not marketing assets
- ❌ **Generic AI writers** = Create one thing (blog post OR email), not complete funnels

**The gap:** No tool that takes a YouTube video and generates an *entire marketing funnel* — from transcript analysis to lead magnets to email sequences — all in one automated pipeline.

---

## The Solution

### Complete Marketing Funnel from One URL

**Input:** Paste any YouTube URL

**Output (13 AI-Generated Assets):**

1. **Transcript Scraper** — Extracted YouTube auto-captions
2. **Knowledge Extractor** — Key points, main concepts, and takeaways
3. **Persona Snapper** — Viewer personas, pain points, and objections
4. **Quiz Bank Builder** — Question/answer pairs (beginner/intermediate/advanced)
5. **Lead Magnet Draft** — PDF outline ready for design
6. **Landing Page Copy** — Headline, benefits, CTA, testimonial structure
7. **LP Design Brief** — Visual design instructions for landing page
8. **Social Teasers** — 5+ social media posts to promote content
9. **SEO Article** — Full blog post (1500+ words) optimized for search
10. **Hero Image Prompt** — AI image generation prompt for visuals
11. **Mini-Infographic Brief** — Data visualization instructions
12. **Email Welcome** — New subscriber onboarding email
13. **Nurture Sequence** — 5-email drip campaign for conversions

### Multi-Step AI Pipeline

```
YouTube URL
  ↓
Fetch Video Details (title, channel, thumbnail)
  ↓
Extract Transcript (YouTube captions API)
  ↓
AI Pipeline (13 specialized steps):
  → Step 1: Transcript analysis
  → Step 2: Knowledge extraction
  → Step 3: Persona identification
  → Step 4: Quiz generation
  → Step 5-13: Marketing asset creation
  ↓
Results Dashboard:
  - All 13 assets displayed
  - Copy to clipboard
  - Export options
  - Job history saved
```

### Persistent Job Queue

**Why this matters:**
- Processing takes 5-10 minutes (13 AI calls)
- You can close the browser and come back
- Multiple jobs tracked simultaneously
- Results saved in localStorage (survive page refresh)

**Job Management:**
- Create multiple jobs (different videos)
- See progress for each step (YT1 → YT13)
- View completed jobs anytime
- Delete old jobs when done

---

## Portfolio Analysis

> **For Recruiters & Hiring Managers**

### What This Project Demonstrates

#### 1. Multi-Step AI Orchestration

**Not a single AI call:**
- 13 different AI prompts, each specialized for one asset type
- Sequential pipeline: Step 2 uses output from Step 1, etc.
- Progress tracking across all steps
- Error handling per step (one failure doesn't break entire pipeline)

**Why this matters:** Production AI systems require orchestration. This shows ability to chain AI calls, handle dependencies, and track progress—not just "call OpenAI once."

#### 2. State Management at Scale

**Complex State Requirements:**
- Multiple jobs (videos) tracked simultaneously
- Each job has: status, progress, 13 results, error states
- Results persist across page refreshes (localStorage)
- Active job switching (view different video results)
- History management (delete old jobs)

**Why this matters:** Real apps have complex state. This shows Zustand mastery, persistence strategy, and state normalization (jobs as objects with nested results).

#### 3. Multi-API Architecture

**API Integration:**
- **YouTube API** — Video details (title, channel, thumbnail)
- **Transcript API** — Extract captions (Make.com webhook with fallback)
- **OpenRouter API** — 13 AI generation calls (GPT-4, Claude, etc.)

**Error Handling:**
- Transcript fetch fails? Use demo transcript (graceful degradation)
- API rate limit? Show error, allow retry
- Network timeout? Preserve partial results

**Why this matters:** Production apps integrate multiple services. This shows error handling, fallback strategies, and API orchestration—not just happy-path coding.

#### 4. Progress Tracking UI

**User Experience:**
- Real-time progress bar (0% → 100%)
- Current step indicator ("Processing: Knowledge Extractor...")
- Completed steps checklist (✓ YT1, ✓ YT2, ⏳ YT3)
- Estimated time remaining

**Why this matters:** Long-running processes need feedback. This shows UX thinking—users aren't left wondering "Is it working?"

#### 5. Complete Product Thinking

**Full User Journey:**
- **Input:** Paste YouTube URL → Validate → Start processing
- **Processing:** Show progress → Display partial results as they complete
- **Results:** View all 13 assets → Copy to clipboard → Export
- **History:** See past jobs → Switch between them → Delete when done

**Not just a feature demo:**
- Job management (multiple videos)
- Persistence (results survive refresh)
- Export workflow (copy individual assets)
- Error recovery (retry failed steps)

### For AI Strategy Manager / Product Roles

**Most candidates show ONE:**
- Single AI integration (call OpenAI, display result)
- State management (but simple state)
- API integration (one service, happy path only)

**This project shows ALL:**
- ✅ Multi-step AI pipeline (13 specialized calls, sequential dependencies)
- ✅ State management at scale (multiple jobs, nested results, persistence)
- ✅ Multi-API orchestration (YouTube + Transcript + OpenRouter)
- ✅ Progress tracking (real-time feedback for long operations)
- ✅ Complete product workflow (input → processing → results → history)
- ✅ Error handling (graceful degradation, fallback strategies)

**That's the orchestration + product thinking AI roles require.**

### Interview Talking Points

**2-Minute Story:**

> "I built YouTube to Leads AI to solve a content repurposing problem: marketers have valuable YouTube content but turning one video into a complete marketing funnel—lead magnets, landing pages, email sequences, social posts—takes 40+ hours manually.
>
> This tool automates the entire pipeline. Paste a YouTube URL, and it generates 13 marketing assets: transcript analysis, persona identification, quiz questions, lead magnet outline, landing page copy, design briefs, social media posts, SEO article, email welcome, and 5-email nurture sequence.
>
> Architecturally, it's a multi-step AI pipeline. Each asset gets a specialized prompt—lead magnets need different framing than social posts. The pipeline runs sequentially because later steps use earlier outputs (can't write landing page copy without persona analysis).
>
> For production use, I built persistent job management. Processing takes 5-10 minutes, so users can close the browser and come back. Jobs are saved in localStorage, progress is tracked per-step, and results survive page refreshes.
>
> For AI Strategy roles, this demonstrates orchestration thinking: not just 'call AI once,' but chaining multiple AI steps, handling dependencies, tracking progress, and building complete workflows—not feature demos."

**Key Stats:**
- 13 AI-generated marketing assets from one URL
- Multi-step pipeline (sequential AI calls with dependencies)
- Persistent job queue (process multiple videos simultaneously)
- 18 TypeScript files, 168KB source code
- React 18 + Zustand + Multi-API architecture

**Technical Highlights:**
- **AI orchestration** — 13 specialized prompts, sequential pipeline
- **State management** — Zustand for complex job tracking + results storage
- **Multi-API integration** — YouTube + Transcript + OpenRouter
- **Progress tracking** — Real-time feedback, per-step progress
- **Persistence strategy** — LocalStorage for job history (survive refresh)

---

## Features

### 13 Marketing Assets Generated

#### Content Analysis
- ✅ **Transcript Scraper** — YouTube auto-captions extracted
- ✅ **Knowledge Extractor** — Key points and main concepts
- ✅ **Persona Snapper** — Viewer personas and pain points

#### Lead Generation
- ✅ **Quiz Bank Builder** — Question/answer pairs for quizzes
- ✅ **Lead Magnet Draft** — PDF outline ready for design
- ✅ **Landing Page Copy** — Complete copy (headline, benefits, CTA)
- ✅ **LP Design Brief** — Visual design instructions

#### Content Marketing
- ✅ **Social Teasers** — Multiple social media posts
- ✅ **SEO Article** — Full blog post (1500+ words)
- ✅ **Hero Image Prompt** — AI image generation prompt
- ✅ **Mini-Infographic Brief** — Data visualization guide

#### Email Marketing
- ✅ **Email Welcome** — New subscriber onboarding
- ✅ **Nurture Sequence** — 5-email drip campaign

### Technical Features
- ✅ **Persistent job queue** — Results saved across sessions
- ✅ **Multi-job management** — Process multiple videos simultaneously
- ✅ **Progress tracking** — Real-time step-by-step updates
- ✅ **Copy to clipboard** — One-click export for each asset
- ✅ **Responsive UI** — Works on desktop and mobile
- ✅ **Error recovery** — Graceful degradation, fallback strategies

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript** — Type-safe component architecture
- **Vite** — Lightning-fast dev/build pipeline
- **Zustand** — Lightweight state management (job queue + results)
- **react-router-dom** — Multi-page navigation
- **react-markdown** — Markdown rendering for AI outputs
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icon library

### APIs & Integration
- **YouTube oEmbed API** — Video details (title, channel, thumbnail)
- **Transcript API** — Caption extraction (Make.com webhook + fallback)
- **OpenRouter API** — Multi-model AI gateway (GPT-4, Claude, etc.)

### Data Layer
- **LocalStorage** — Job history and results persistence
- **Zustand Store** — Reactive state management
- **Type-safe models** — Job and JobResult interfaces

### Code Quality
- **TypeScript strict mode** — 100% type coverage
- **ESLint** — Code style enforcement
- **Component architecture** — Modular, reusable components
- **Custom hooks** — Logic reuse (useJobContext)

---

## How It Works

### Architecture Flow

```
User pastes YouTube URL
  ↓
Validate URL format
  ↓
Create job in Zustand store
  ↓
Fetch video details (YouTube oEmbed):
  - Title
  - Channel name
  - Thumbnail
  ↓
Extract transcript (Make.com webhook):
  - YouTube auto-captions
  - Fallback: Use demo transcript if API fails
  ↓
AI Pipeline (13 steps via OpenRouter):
  YT1: Transcript → Store result
  YT2: Knowledge extraction (uses YT1 output)
  YT3: Persona analysis (uses YT1 + YT2)
  YT4: Quiz generation (uses YT2)
  YT5: Lead magnet outline (uses YT2 + YT3)
  YT6: Landing page copy (uses YT3 + YT5)
  YT7: Design brief (uses YT6)
  YT8: Social posts (uses YT2)
  YT9: SEO article (uses YT1 + YT2)
  YT10: Hero image prompt (uses YT2)
  YT11: Infographic brief (uses YT2)
  YT12: Welcome email (uses YT3)
  YT13: Nurture sequence (uses YT3 + YT12)
  ↓
Each step:
  - Update progress (0% → 100%)
  - Mark step complete
  - Store result in job.results array
  - Save to localStorage
  ↓
Display results:
  - Show all 13 assets
  - Copy to clipboard
  - View past jobs
```

### API Integration Details

#### YouTube oEmbed API
```typescript
GET https://www.youtube.com/oembed?url={videoUrl}&format=json

Response:
{
  "title": "Video Title",
  "author_name": "Channel Name",
  "thumbnail_url": "https://..."
}
```

#### Transcript API (Make.com Webhook)
```typescript
POST https://hook.us1.make.com/...

Body: { youtubeUrl: "https://youtube.com/watch?v=..." }

Response:
{
  "transcript": "Full video transcript text..."
}

// Fallback: If API fails, use demo transcript
```

#### OpenRouter API (13 Calls)
```typescript
POST https://openrouter.ai/api/v1/chat/completions

Headers: {
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}

Body: {
  "model": "anthropic/claude-3.5-sonnet",
  "messages": [
    {
      "role": "system",
      "content": "You are a [specialized role for this step]..."
    },
    {
      "role": "user",
      "content": "[Step-specific prompt with transcript/previous outputs]"
    }
  ]
}

Response:
{
  "choices": [{
    "message": {
      "content": "[Generated marketing asset]"
    }
  }]
}
```

---

## Why This Architecture?

### Multi-Step Pipeline Over Single AI Call

**Decision:** 13 specialized AI calls instead of one "generate everything" call

**Why:**
- ✅ Each asset needs different prompting (lead magnets ≠ social posts)
- ✅ Later steps use earlier outputs (landing page copy needs persona analysis)
- ✅ Granular progress tracking (users see which step is running)
- ✅ Error isolation (one step fails, others continue)

**Tradeoff:** Takes longer (13 API calls vs 1), costs more ($0.50-$1 per video). Worth it for quality and specialization.

### Zustand Over Redux

**Decision:** Zustand for state management

**Why:**
- ✅ Simpler API (no actions, reducers, dispatch)
- ✅ Less boilerplate (define store, done)
- ✅ TypeScript-friendly (type inference works great)
- ✅ Hooks-based (React-native API)
- ✅ Lightweight (1KB vs Redux 10KB)

**Tradeoff:** Less ecosystem (fewer devtools, middleware). For this app's complexity, Zustand is perfect.

### LocalStorage Over Database

**Decision:** LocalStorage for job persistence

**Why:**
- ✅ Fast (instant reads/writes)
- ✅ Private (data stays on user's device)
- ✅ Simple deployment (no backend database server)
- ✅ Offline-capable (works without internet after first load)

**Tradeoff:** Data not synced across devices, 5MB storage limit. For MVP use case (store 10-20 jobs), this is fine. Can add cloud sync later.

---

## Quick Start

### Prerequisites
- Node.js 18+
- OpenRouter API key (for AI generation)
- Make.com webhook URL (for transcript extraction, optional—has fallback)

### Installation

```bash
# Clone repository
git clone https://github.com/IrvinCruzAI/Youtube_Video_to_LeadGen_Marketing_AI_Tool.git
cd Youtube_Video_to_LeadGen_Marketing_AI_Tool

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your API keys to .env
# VITE_OPENROUTER_API_KEY=your_key_here
# VITE_TRANSCRIPT_WEBHOOK_URL=your_make_webhook_url (optional)

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### First-Time Use

1. **Paste YouTube URL** (any public video with captions)
2. **Click "Generate Assets"** → Processing starts
3. **Watch progress** (13 steps, ~5-10 minutes)
4. **View results** → All 13 assets displayed
5. **Copy to clipboard** → Use in your marketing

**[Try Live Demo →](https://youtube-to-leads-ai.bolt.host)**

---

## Use Cases

### Content Creators
- **Problem:** Created valuable YouTube content but need lead magnets, landing pages, email sequences to monetize it
- **Solution:** Paste video URL → Get complete marketing funnel
- **Result:** Turn every video into a lead generation asset

### Marketing Agencies
- **Problem:** Clients send videos, want full marketing campaigns built around them
- **Solution:** Automate 40+ hours of manual work into 10 minutes
- **Result:** 10x faster client deliverables, higher margins

### Course Creators
- **Problem:** Have educational videos but need: quizzes, lead magnets, promotional content
- **Solution:** Generate all assets from existing videos
- **Result:** Launch faster, more marketing materials

### Solo Marketers
- **Problem:** Doing everything yourself—content, design, copywriting
- **Solution:** Automate the copywriting and asset creation
- **Result:** Focus on strategy, not execution

---

## Project Stats

| Metric | Value |
|--------|-------|
| Marketing assets generated | 13 |
| AI pipeline steps | 13 (sequential) |
| API integrations | 3 (YouTube, Transcript, OpenRouter) |
| TypeScript files | 18 |
| Source code size | 168KB |
| Components | 8 (Header, Sidebar, Input, Steps, Results, JobItem, MainContent, JobContext) |
| State management | Zustand |
| Persistence | LocalStorage |

---

## About FutureCrafters

YouTube to Leads AI is part of FutureCrafters' portfolio of AI productivity tools.

**More Projects:**
- [NewsGen AI](https://github.com/IrvinCruzAI/AI_News_Generator) — 10-second article generation from headlines
- [Marketing Dashboard](https://github.com/IrvinCruzAI/Marketing_Dashboard) — 6 AI marketing generators with business context engine
- [WebinarStudio](https://github.com/IrvinCruzAI/WebinarStudio) — Enterprise webinar content pipeline (115 TypeScript files)
- [PostCraft](https://github.com/IrvinCruzAI/Linkedin_PostCraft) — Voice-to-LinkedIn content engine
- Rory — AI content engine with custom voice modeling

**Services:**
- AI Exploration Session ($500)
- Paid Diagnostic ($1,500)
- Control Layer Sprint ($5,000)
- FutureCrafters Labs ($2K-6K/mo)

### Get In Touch

**Portfolio/Hiring:**
- LinkedIn: [linkedin.com/in/irvincruzrodriguez](https://linkedin.com/in/irvincruzrodriguez)
- Website: [irvincruz.com](https://irvincruz.com)
- Email: irvin@futurecrafters.ai

**Product/Business:**
- 📞 [Book consultation](https://calendar.app.google/5of8AAhCW2FVV2Eg7)
- 📧 hello@futurecrafters.ai
- 🌐 [futurecrafters.ai](https://futurecrafters.ai)

---

**For recruiters:** Demonstrates multi-step AI orchestration, state management at scale, multi-API integration, and complete product workflow—production-ready AI execution.

---

*A FutureCrafters Project • Built by [Irvin Cruz](https://irvincruz.com) ☀️*  
*Last Updated: February 2026*
