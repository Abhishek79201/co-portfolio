# Feature Landscape

**Domain:** Two-person dev studio portfolio website (technical, backend-focused credibility)
**Researched:** 2026-04-01
**Overall confidence:** MEDIUM-HIGH (synthesized from multiple web sources, competitor patterns, and domain conventions)

---

## Table Stakes

Features visitors expect from a professional dev studio site. Missing any of these and the site feels amateur, incomplete, or untrustworthy. Visitors will leave.

| # | Feature | Why Expected | Complexity | Notes |
|---|---------|--------------|------------|-------|
| 1 | **Studio identity hero** | First 5 seconds must answer "who are you, what do you do." A personal portfolio hero won't work for a studio pitch. Must say: two devs, one studio, we build things. | Low | Rewrite existing Hero component copy + layout |
| 2 | **Team section with photos, roles, and tech stacks** | Prospects need to know who they're hiring. Two founders with clear roles, headshots, brief bios, and linked profiles (GitHub, LinkedIn). | Low | New section. Keep it tight -- two cards, not a sprawling page. |
| 3 | **Project showcase grid (6 projects)** | The portfolio IS the product. Each project needs: thumbnail/screenshot, name, one-line description, tech badges, and link to live site or case study. | Low-Med | Exists partially. Needs restructuring for studio context + new projects (Zorova, EmpireInvestmentBank). |
| 4 | **Case study index page (`/case-studies`)** | Prospects who want depth need a dedicated page listing all case studies with thumbnails and summaries. This is the "prove it" page. | Med | New route. Cards linking to individual case studies. |
| 5 | **Individual case study pages (`/case-studies/[slug]`)** | The single most important conversion tool. Each deep case study must follow: Problem > Architecture > Implementation > Results. This is where technical depth lives. | High | New dynamic route. See "Case Study Page Anatomy" below. |
| 6 | **Responsive, fast-loading design** | Your site IS a project. A slow or broken portfolio on mobile destroys credibility instantly. Core Web Vitals must be green. | Low | Already handled by Next.js + Vercel. Verify after adding new pages. |
| 7 | **Clear contact CTA / inquiry form** | Every page needs a path to "work with us." The contact form should be short (name, email, message -- 3 fields max). | Low | Exists. Needs copy update from personal to studio framing. Add persistent CTA in nav or footer. |
| 8 | **SEO: Organization schema, meta tags, OG images** | Discovery through search. Must update from Person to Organization schema. Each case study needs its own OG image and meta description. | Med | Partially exists. Needs schema migration + per-page meta. |
| 9 | **Navigation that scales** | Current single-page nav won't work with case study routes. Need a nav that handles both the landing page sections AND the `/case-studies` routes cleanly. | Low-Med | Update existing Navigation component. |
| 10 | **Footer with studio info** | Professional studios have footers: studio name, email, social links, copyright. Signals legitimacy. | Low | Add or update footer component. |

---

## Case Study Page Anatomy (Deep Dive)

This is the highest-value feature, so it deserves detailed specification. Based on research into what makes agency case studies compelling and convert:

### Required Sections (in order)

1. **Hero with project name + one-line outcome** -- Result-focused headline, e.g., "How we cut DynamoDB costs 60% while scaling to 50K users" rather than generic "GleeMeet Case Study."
2. **Project snapshot sidebar/banner** -- Client name (if applicable), timeline, team size, tech stack badges, link to live site.
3. **The Challenge** -- 2-3 paragraphs. What problem existed? What were the business constraints? Why was this hard? Written as narrative, not a spec doc.
4. **Architecture overview with diagram** -- THE differentiator for a backend-focused studio. Visual system diagram showing: services, databases (DynamoDB, MongoDB, Redis, OpenSearch), data flow arrows, caching layers. Use static SVG or clean image -- not a generic cloud diagram, but one specific to the project.
5. **Tech stack rationale** -- Why these tools? Not just a logo wall, but "We chose Redis + OpenSearch because X, not Elasticsearch alone because Y." This is where Abhishek and Vatsal's shared pattern (Redis + OpenSearch + primary DB) gets showcased.
6. **Implementation highlights** -- 2-3 specific technical decisions with before/after or explanation. Code-level thinking without showing proprietary code. E.g., "BERT vector embeddings + KNN for matching in GleeMeet" or "Bull Queue for async job processing."
7. **Results & metrics** -- Quantified outcomes. Query latency reduction, cost savings, user growth, performance improvements. Before/after comparisons where possible. Even rough numbers beat no numbers.
8. **Team attribution** -- Who worked on this, what each person's role was. Reinforces the "two devs who ship together" narrative.
9. **CTA** -- "Want similar results? Let's talk." Link to contact.

### Visual Elements

- Architecture diagrams (static SVG preferred for performance and dark theme consistency)
- Tech stack icon badges
- Before/after metric callout cards
- Optional: annotated screenshots of the live product

---

## Differentiators

Features that set this studio apart from the hundreds of generic agency sites. Not expected by visitors, but create a "these guys are legit" reaction.

| # | Feature | Value Proposition | Complexity | Notes |
|---|---------|-------------------|------------|-------|
| 1 | **Architecture diagrams in case studies** | Most small studios show screenshots. Showing system architecture diagrams (Redis caching layer, OpenSearch integration, DynamoDB patterns) signals deep backend expertise that frontend-heavy portfolios lack. This is THE key differentiator. | Med | Create per-project SVG diagrams. Can be simplified box-and-arrow style -- clarity over beauty. |
| 2 | **Shared technical pattern narrative** | Frame the Redis + OpenSearch + primary DB pattern as a deliberate methodology applied across projects. "We've applied this architecture pattern across 3 products, reducing query costs by X%." Pattern recognition > one-off projects. | Low | Copy/content strategy. Weave into case studies and About section. |
| 3 | **Metric callout cards** | Large, visually prominent numbers: "60% cost reduction", "3x query speed", "50K+ users." These create visual anchors and social proof. Place them in case studies and possibly on the landing page as aggregate stats. | Low | Styled stat cards. Simple component. |
| 4 | **"How we work" methodology section** | Brief section (landing page or standalone) explaining the studio's approach: MVP-first, then scale. Technical discovery > architecture > build > optimize. Shows process maturity beyond "we write code." | Low | New section on landing page. 3-4 steps with icons. |
| 5 | **Scroll-triggered animations on case study pages** | GSAP + ScrollTrigger for revealing architecture diagrams, animating data flow arrows, or progressive section reveals. The site already uses GSAP -- extend it to case study pages for a premium feel. Awwwards-tier studios (Heartbeat, Firstborn) use this to make case studies feel like stories, not documents. | Med-High | Extend existing GSAP setup. Be disciplined -- animations should serve the narrative, not distract. |
| 6 | **Client vs. internal project distinction** | Labeling Zorova as "client project" while GleeMeet is "co-founded" shows range: the studio both builds its own products AND takes on client work. This duality is attractive to prospects. | Low | Badge/tag on project cards. |
| 7 | **Tech stack credibility grouping** | Instead of a flat icon grid, group technologies by layer: Frontend, Backend, Database, Infrastructure, Search/Analytics. Shows architectural thinking in how you present your tools. | Low | Redesign existing tech display. |
| 8 | **"Built together since..." origin story** | Brief narrative about GEC Modasa > Screenplay > X-Byte shared history. Establishes the partnership as battle-tested, not just two friends with a website. Place in About section. | Low | Copy only. |

---

## Anti-Features

Features to deliberately NOT build. Each one is tempting but would waste effort, dilute the message, or create maintenance burden for a 2-person studio.

| # | Anti-Feature | Why Avoid | What to Do Instead |
|---|--------------|-----------|-------------------|
| 1 | **Blog / content section** | Two devs don't have time to maintain a blog. Stale blog = worse than no blog. Signals abandonment. | Case studies ARE the content. They demonstrate expertise without requiring ongoing publishing cadence. |
| 2 | **Testimonials section** | No testimonial infrastructure exists yet. Fake-looking or missing testimonials hurt more than help. | Let the case study results speak. Add testimonials later when you have real client quotes from Zorova etc. |
| 3 | **Pricing page** | Public pricing limits negotiation, attracts tire-kickers, and doesn't match a studio that does custom work. | "Let's discuss your project" CTA. Qualify leads through conversation. |
| 4 | **Services page with generic offerings** | "We do web dev, mobile dev, cloud, AI, blockchain..." is what every agency says. Meaningless. | Let the case studies demonstrate what you build. The WORK is the services page. |
| 5 | **CMS / admin panel** | 6 projects and 2 team members. Hardcoded content is manageable and removes an entire class of complexity (auth, API, database, hosting). | Keep data in TypeScript files/constants. Update by editing code. Revisit at 20+ projects. |
| 6 | **Individual team member portfolio pages** | Splits the brand. The studio is the entity prospects hire, not individuals. Individual pages invite prospects to poach one person. | Team section on landing page with links to LinkedIn/GitHub for those who want individual depth. |
| 7 | **Dark/light mode toggle** | The dark aesthetic IS the brand identity. A light mode doubles the design surface area for zero conversion benefit. The existing dark theme with violet/pink/cyan/lime accents is distinctive. | Commit to dark theme. Ensure sufficient contrast for accessibility. |
| 8 | **Complex contact form with project brief fields** | Long forms kill conversion for small studios. Budget/timeline fields scare away prospects who haven't decided yet. | 3 fields: name, email, message. Qualify in the first email exchange instead. |
| 9 | **Animated logo/loading screen** | Loading screens are anti-patterns for performance. They exist to hide slow sites, and this site should be fast by default on Vercel + Next.js. | Optimize real performance instead. First contentful paint should be fast enough to not need a loader. |
| 10 | **Live chat widget** | Two people can't staff a live chat. Unanswered chats are worse than no chat. Creates expectation of instant response. | Email/form contact. Set expectation: "We'll respond within 24 hours." |

---

## Feature Dependencies

```
Studio identity rebrand (hero, about, nav, footer, meta)
    |
    +-- Team section (requires studio identity decisions)
    |
    +-- Project data restructuring (add new projects, add metadata)
            |
            +-- Project showcase grid (depends on restructured data)
            |
            +-- Case study index page /case-studies (depends on project data)
                    |
                    +-- Individual case study pages /case-studies/[slug]
                            |
                            +-- Architecture diagrams (per-project, created for case studies)
                            |
                            +-- Metric callout cards (per-project data)
                            |
                            +-- Scroll animations on case studies (GSAP extension)

Contact CTA updates (independent, can happen anytime)
SEO/schema migration (depends on studio identity decisions)
```

**Key dependency insight:** The project data model is the linchpin. Before building any showcase or case study UI, the data structure for projects must be defined (name, slug, description, tech stack, metrics, architecture diagram path, team members involved, project type [client/internal], case study content). Get this right first and everything else flows from it.

---

## MVP Recommendation

### Build First (Phase 1 -- Studio Foundation)

1. **Studio identity rebrand** -- Hero, About, Nav, Footer copy and layout. This unblocks everything else.
2. **Team section** -- Two cards. Quick to build, immediately signals "studio not solo dev."
3. **Project data model** -- Define the TypeScript types/constants for all 6 projects with all metadata needed for both the grid and case studies.
4. **Updated project showcase grid** -- Using the new data model. All 6 projects with proper thumbnails and tech badges.
5. **Contact form copy update** -- Studio framing. Persistent CTA.

### Build Second (Phase 2 -- Case Studies)

1. **Case study index page** (`/case-studies`) -- Grid of case study cards.
2. **Case study page template** (`/case-studies/[slug]`) -- The full anatomy described above.
3. **3 deep case studies** -- GleeMeet, CareerBox, Zorova. These are the strongest stories with the Redis+OpenSearch pattern.
4. **Architecture diagrams** -- SVG diagrams for each deep case study.
5. **Metric callout cards** -- Aggregate stats on landing page + per-project in case studies.

### Build Third (Phase 3 -- Polish)

1. **Scroll-triggered animations** on case study pages.
2. **SEO per-page optimization** -- OG images, meta descriptions, schema for each case study.
3. **"How we work" methodology section**.
4. **URL verification** -- All external project links confirmed live.

### Defer Indefinitely

- Blog, testimonials, pricing, services page, CMS, individual portfolios, dark/light toggle, live chat.

---

## Sources

- [Shopify: How to Write a Web Design Case Study](https://www.shopify.com/partners/blog/87782278-how-to-write-a-web-design-case-study-that-lands-new-clients)
- [Webflow: Write the Perfect Case Study](https://webflow.com/blog/write-the-perfect-case-study)
- [Articulate Marketing: How to Design an Effective Case Study Section](https://www.articulatemarketing.com/blog/how-to-design-an-effective-case-study-section-for-your-website)
- [Vev: 10 Amazing Case Study Design Examples](https://www.vev.design/blog/case-study-design-examples/)
- [Creatitive: 5 Conversion-Focused Features Every Studio Website Needs](https://creatitive.com/conversion-focused-features-every-studio-website-needs/)
- [Proposify: Agency Website Do's and Don'ts](https://www.proposify.com/blog/agency-website-dos-donts-design-mistakes)
- [Creative Bloq: 8 Common Portfolio Mistakes](https://www.creativebloq.com/features/8-common-portfolio-mistakes-and-how-to-fix-them)
- [Wix: Common Portfolio Mistakes](https://www.wix.com/blog/common-portfolio-mistakes)
- [Caffeine Marketing: 16 Best Software Development Website Examples](https://www.caffeinemarketing.com/blog/16-best-software-development-website-examples)
- [Awwwards: Heartbeat Agency Portfolio Case Study](https://www.awwwards.com/case-study-heartbeat-agency-portfolio.html)
- [Digital Thrive: This Is How We Built It Case Studies](https://digitalthriveai.com/en-us/resources/web-design/this-is-how-we-built-it-case-studies/)
- [Orbit Media: Lead Generation Best Practices](https://www.orbitmedia.com/blog/lead-generation-website-practices/)
- [DEV Community: Modern Team Sections for React Projects](https://dev.to/isanjayjoshi/modern-team-sections-pages-you-can-use-in-your-react-projects-51m1)
