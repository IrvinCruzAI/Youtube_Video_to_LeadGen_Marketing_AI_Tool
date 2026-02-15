# YouTube to Leads AI

> Transform any YouTube video into a complete marketing funnel. 13 AI-generated assets from one URL.

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)

**[🚀 Try Live Demo](https://youtube-to-leads-ai.bolt.host)** | **[Technical Highlights](#technical-highlights)** | **[Tech Stack](#tech-stack)** | **[Quick Start](#quick-start)**

![Screenshot](assets/screenshot.png)

**A [FutureCrafters](https://www.futurecrafters.ai) Project** • Built by [Irvin Cruz](https://irvincruz.com)

---

## TL;DR (30-Second Scan)

**What:** Paste a YouTube URL → Get 13 complete marketing assets AI-generated in minutes: lead magnets, landing pages, email sequences, social media content, SEO articles, quizzes, and more.

**Why Different:** Complete marketing funnel from one video (not just a summary). Sequential AI pipeline with specialized prompts. Persistent job queue with progress tracking.

**Technical Showcase:** Demonstrates multi-step AI orchestration, state management at scale, API integration architecture, and complete product thinking (input → processing → 13 outputs).

**For Businesses:** Content creators and marketers turn YouTube content into complete lead generation funnels without writing a single word.

**Tech:** React 18 + TypeScript + Zustand + Multi-API (YouTube + OpenRouter) + LocalStorage + 13-step pipeline.

---

## The Problem

**Content Creators:** YouTube content created, but it just sits there. Need lead magnets, landing pages, email sequences, social promotion. Creating manually = weeks of work.

**Marketers:** Repurposing content is the growth strategy, but one video → blog posts + social + emails + lead magnets requires transcription, analysis, copywriting, design briefs. Too slow.

**Agencies:** Clients send videos wanting full campaigns. Manually: 40+ hours transcribing, outlining, writing, designing, creating nurture sequences.

**Current "Solutions" Fail:**
- ❌ **Manual transcription** = Hours, error-prone
- ❌ **ChatGPT copy-paste** = 13 separate prompts, no consistency
- ❌ **Summarization tools** = Text only, not marketing assets
- ❌ **Generic AI writers** = One thing (blog OR email), not funnels

**The gap:** No tool generates an *entire marketing funnel* from one video—transcript analysis to lead magnets to email sequences—all automated.

---

## The Solution

### Complete Marketing Funnel from One URL

**Input:** Paste any YouTube URL

**Output (13 AI-Generated Assets):**

1. **Transcript Scraper** — YouTube auto-captions
2. **Knowledge Extractor** — Key points and concepts
3. **Persona Snapper** — Viewer personas and pain points
4. **Quiz Bank Builder** — Q&A pairs (beginner/intermediate/advanced)
5. **Lead Magnet Draft** — PDF outline
6. **Landing Page Copy** — Headline, benefits, CTA
7. **LP Design Brief** — Visual design instructions
8. **Social Teasers** — 5+ social media posts
9. **SEO Article** — Full blog post (1500+ words)
10. **Hero Image Prompt** — AI image generation prompt
11. **Mini-Infographic Brief** — Data visualization guide
12. **Email Welcome** — New subscriber onboarding
13. **Nurture Sequence** — 5-email drip campaign

### How It Works

```
YouTube URL → Video Details → Transcript Extraction
  ↓
13 AI Steps (Sequential):
  YT1: Transcript → YT2: Knowledge → YT3: Personas
  YT4-13: Specialized asset generation (each uses prior outputs)
  ↓
Results Dashboard (copy, export, history)
```

### Persistent Job Queue

- Processing: 5-10 minutes per video
- Close browser anytime (jobs saved in localStorage)
- Track multiple jobs simultaneously
- View completed jobs, delete when done

---

## Technical Highlights

### What This Demonstrates

#### 1. Multi-Step AI Orchestration

**Sequential pipeline:**
- 13 specialized prompts (lead magnets ≠ social posts ≠ emails)
- Dependencies: Later steps use earlier outputs (landing copy needs persona analysis)
- Progress tracking across all steps
- Error isolation (one failure doesn't break pipeline)

**Why this matters:** Production AI requires orchestration, not single calls. Shows chaining, dependency handling, and progress tracking.

#### 2. State Management at Scale

**Complex state:**
- Multiple jobs tracked simultaneously
- Each job: status, progress, 13 results, error states
- localStorage persistence (survives refresh)
- Active job switching
- History management

**Why this matters:** Real apps have complex state. Shows Zustand mastery, persistence strategy, state normalization.

#### 3. Multi-API Architecture

**Three APIs integrated:**
- YouTube (video details)
- Transcript extraction (Make.com webhook + fallback)
- OpenRouter (13 AI generation calls)

**Error handling:**
- Transcript fails? Demo transcript fallback
- Rate limit? Error message + retry
- Timeout? Preserve partial results

**Why this matters:** Production apps integrate multiple services with fallback strategies.

#### 4. Progress Tracking UI

- Real-time progress bar (0-100%)
- Current step indicator
- Completed steps checklist (✓ YT1, ✓ YT2, ⏳ YT3)

**Why this matters:** Long operations need feedback. UX thinking, not just technical execution.

#### 5. Complete Product Workflow

- **Input:** Paste URL → Validate → Start
- **Processing:** Progress → Partial results display
- **Results:** All 13 assets → Copy → Export
- **History:** Past jobs → Switch → Delete

Not just a demo—full job management, persistence, export workflow.

### What Makes This Different

**Most candidates show:**
- Single AI integration
- Simple state management
- One API, happy path only

**This shows:**
- ✅ Sequential 13-step pipeline
- ✅ Multi-job state management
- ✅ Multi-API orchestration with fallbacks
- ✅ Real-time progress tracking
- ✅ Complete product workflow

---

## Project Story

**90-Second Version:**

> "YouTube to Leads AI solves content repurposing: marketers have valuable videos but turning one into a marketing funnel—lead magnets, landing pages, emails, social—takes 40+ hours manually.
>
> Paste a YouTube URL, get 13 marketing assets: transcript analysis, personas, quiz questions, lead magnet, landing page copy, design briefs, social posts, SEO article, email welcome, 5-email nurture sequence.
>
> It's a sequential 13-step AI pipeline. Each asset gets specialized prompting—lead magnets need different framing than social posts. Steps run sequentially because later ones use earlier outputs.
>
> For production, I built persistent job management. Processing takes 5-10 minutes, so users close the browser and return. Jobs saved in localStorage, progress tracked per-step, results survive refresh.
>
> This demonstrates AI orchestration: chaining multiple steps, handling dependencies, tracking progress—not just 'call OpenAI once.'"

**Key Stats:**
- 13 AI-generated assets from one URL
- Sequential pipeline with dependencies
- Persistent multi-job queue
- 18 TypeScript files, 168KB source
- React 18 + Zustand + Multi-API

---

## Features

### 13 Marketing Assets Generated

**Content Analysis:**
- ✅ Transcript Scraper
- ✅ Knowledge Extractor
- ✅ Persona Snapper

**Lead Generation:**
- ✅ Quiz Bank Builder
- ✅ Lead Magnet Draft
- ✅ Landing Page Copy
- ✅ LP Design Brief

**Content Marketing:**
- ✅ Social Teasers
- ✅ SEO Article (1500+ words)
- ✅ Hero Image Prompt
- ✅ Mini-Infographic Brief

**Email Marketing:**
- ✅ Email Welcome
- ✅ Nurture Sequence (5 emails)

### Technical Features
- ✅ Persistent job queue
- ✅ Multi-job management
- ✅ Real-time progress tracking
- ✅ Copy to clipboard
- ✅ Responsive UI
- ✅ Error recovery with fallbacks

---

## Performance

| Metric | Value |
|--------|-------|
| **Processing Time** | 5-10 minutes (13 AI calls) |
| **Cost Per Video** | $0.50-$1.00 (OpenRouter usage) |
| **Job Capacity** | ~20 videos (localStorage limit) |
| **TypeScript Files** | 18 |
| **Source Code** | 168KB |
| **API Integrations** | 3 (YouTube, Transcript, OpenRouter) |

---

## Challenges & Learnings

### Challenge 1: Sequential Pipeline = Long Wait Times

**Problem:** 13 AI calls take 5-10 minutes. Users don't want to sit and watch.

**Solution:** Persistent job queue with localStorage. Users close browser, come back later. Progress tracked per-step.

**Learning:** Long operations require: (1) background execution, (2) persistence across sessions, (3) progress visibility.

---

### Challenge 2: API Rate Limits on OpenRouter

**Problem:** High-frequency testing hit rate limits. Pipeline broke mid-process.

**Solution:** Exponential backoff (1s → 2s → 4s → 8s delays). User feedback on retries. Partial result preservation.

**Learning:** Always handle rate limits gracefully. Show users what's happening, don't silently fail.

---

### Challenge 3: LocalStorage 5MB Limit

**Problem:** Heavy users hit storage limit after 15-20 videos. Jobs started failing silently.

**Solution:** "Delete old jobs" feature prominently displayed. Job cleanup on error. Warning at 80% capacity.

**Learning:** Browser storage has limits. Design for cleanup from Day 1, not as retrofit.

---

### Challenge 4: Sequential Dependencies = Error Cascades

**Problem:** If Step 3 (personas) failed, Steps 5, 6, 12, 13 couldn't run. Users got partial results with no explanation.

**Solution:** Error isolation per step. Mark step as failed but continue others. Show which assets depend on failed steps.

**Learning:** In complex pipelines, isolate failures. One error shouldn't kill everything.

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript** — Type-safe components
- **Vite** — Fast dev/build
- **Zustand** — Lightweight state management
- **react-router-dom** — Multi-page navigation
- **react-markdown** — Render AI outputs
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons

### APIs & Integration
- **YouTube oEmbed API** — Video details
- **Transcript API** — Caption extraction (Make.com + fallback)
- **OpenRouter API** — Multi-model AI gateway

### Data Layer
- **LocalStorage** — Job history persistence
- **Zustand Store** — Reactive state
- **TypeScript interfaces** — Type-safe models

---

## Architecture Decisions

### Why Sequential Pipeline Over Single Call?

**Decision:** 13 specialized prompts instead of one "generate everything" call

**Why:**
- ✅ Each asset needs different prompting
- ✅ Later steps use earlier outputs (dependencies)
- ✅ Granular progress tracking
- ✅ Error isolation

**Tradeoff:** Longer processing (13 calls vs 1), higher cost ($0.50-$1 per video). Worth it for quality.

---

### Why Zustand Over Redux?

**Decision:** Zustand for state management

**Why:**
- ✅ Simpler API (no actions/reducers/dispatch)
- ✅ Less boilerplate
- ✅ TypeScript-friendly
- ✅ Lightweight (1KB vs Redux 10KB)

**Tradeoff:** Less ecosystem (fewer devtools). Perfect for this complexity level.

---

### Why LocalStorage Over Database?

**Decision:** LocalStorage for job persistence

**Why:**
- ✅ Fast (instant reads/writes)
- ✅ Private (data stays on device)
- ✅ Simple deployment (no backend)
- ✅ Offline-capable

**Tradeoff:** Data not synced across devices, 5MB limit. Fine for MVP (10-20 jobs). Can add cloud sync later.

---

## Quick Start

### Prerequisites
- Node.js 18+
- OpenRouter API key
- Make.com webhook (optional—has fallback)

### Installation

```bash
git clone https://github.com/IrvinCruzAI/Youtube_Video_to_LeadGen_Marketing_AI_Tool.git
cd Youtube_Video_to_LeadGen_Marketing_AI_Tool
npm install
cp .env.example .env
# Add API keys to .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### First Use

1. Paste YouTube URL
2. Click "Generate Assets"
3. Watch progress (5-10 min)
4. View/copy all 13 assets

**[Try Live Demo →](https://youtube-to-leads-ai.bolt.host)**

---

## Use Cases

| Audience | Problem | Solution | Result |
|----------|---------|----------|--------|
| **Content Creators** | YouTube content sits idle | Paste URL → Get funnel | Monetize every video |
| **Agencies** | 40+ hours per client video | 10-minute automation | 10x faster delivery |
| **Course Creators** | Need quizzes, lead magnets | Generate from videos | Launch faster |
| **Solo Marketers** | Doing everything manually | Automate copywriting | Focus on strategy |

---

## About FutureCrafters

YouTube to Leads AI is part of FutureCrafters' AI productivity tools portfolio.

**More Projects:**
- [NewsGen AI](https://github.com/IrvinCruzAI/AI_News_Generator) — 10-second article generation
- [Marketing Dashboard](https://github.com/IrvinCruzAI/Marketing_Dashboard) — 6 AI marketing generators
- [WebinarStudio](https://github.com/IrvinCruzAI/WebinarStudio) — Enterprise webinar pipeline
- [PostCraft](https://github.com/IrvinCruzAI/Linkedin_PostCraft) — Voice-to-LinkedIn engine

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


---

*A FutureCrafters Project • Built by [Irvin Cruz](https://irvincruz.com) ☀️*  
*Last Updated: February 2026*


