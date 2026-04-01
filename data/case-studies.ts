import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gleemeet',
    projectSlug: 'gleemeet',
    title: 'GleeMeet: Real-Time Dating at Scale',
    tagline: 'How we built a dating platform with BERT matching, Redis caching, and DynamoDB cost optimization',
    challenge:
      'Dating platforms face a unique engineering paradox: users expect instant, hyper-relevant matches while generating massive read-heavy workloads that scale non-linearly with growth. Every swipe triggers profile lookups, compatibility scoring, and real-time presence checks. A naive implementation hammers the primary database on every interaction, and at scale those costs become unsustainable.\n\n' +
      'GleeMeet needed to go beyond keyword filters. Users wanted matches based on personality compatibility, shared interests, and behavioral signals that simple field-matching cannot capture. Traditional relational queries would require expensive full-table scans as the user base grew, and the latency budget for a swipe-and-match flow is measured in milliseconds, not seconds.\n\n' +
      'The core challenge was designing a system that could serve real-time, ML-powered matches without letting infrastructure costs scale linearly with user activity. We needed a layered architecture where the most expensive operations (vector similarity, profile enrichment) happened asynchronously, while the hot path stayed lean and cache-first.',

    patternSpotlight: {
      dbName: 'DynamoDB',
      body: 'GleeMeet routes all hot-path reads through Redis, keeping profile cards, presence status, and match queues in-memory. OpenSearch with BERT vector embeddings handles compatibility scoring offline, writing ranked match lists back to DynamoDB. The primary database only handles writes and cold-path lookups, dramatically reducing per-request cost at scale.',
    },

    architectureDiagram: 'gleemeet',

    techRationale: [
      {
        technology: 'DynamoDB',
        problem: 'User profile and match data needed single-digit millisecond reads with predictable costs at unpredictable scale. Relational databases struggle with the variable access patterns of a dating app where read-to-write ratios shift dramatically during peak hours.',
        solution: 'DynamoDB provides consistent read latency regardless of table size, and its on-demand capacity mode absorbs traffic spikes without provisioning overhead. We designed single-table access patterns for profiles, matches, and conversations to minimize round trips.',
      },
      {
        technology: 'OpenSearch + BERT',
        problem: 'Keyword-based matching misses the nuance of personality compatibility. Users who describe their interests differently but share deep compatibility would never surface in traditional filter queries.',
        solution: 'We generate BERT vector embeddings from user profiles and index them in OpenSearch. K-nearest-neighbor (KNN) queries find semantically similar profiles in sub-second time. Match scoring runs as a background job, pre-computing ranked lists that Redis serves instantly on the hot path.',
      },
      {
        technology: 'Redis + Bull Queue',
        problem: 'Real-time features like online presence, typing indicators, and match notifications require sub-10ms response times. Hitting DynamoDB for every presence check would exhaust read capacity and add unnecessary latency.',
        solution: 'Redis caches active user sessions, presence state, and pre-computed match queues. Bull Queue handles asynchronous tasks like re-ranking matches after profile updates, sending push notifications, and syncing cache invalidations across application instances.',
      },
    ],

    implementationHighlights: [
      {
        title: 'Single-table DynamoDB design',
        detail: 'All entity types (profiles, matches, conversations, messages) share one DynamoDB table with composite sort keys. This eliminates cross-table joins and allows complex access patterns through GSI overloading, reducing both cost and latency.',
      },
      {
        title: 'Offline BERT matching pipeline',
        detail: 'Profile embeddings are generated on write and indexed in OpenSearch. A scheduled pipeline re-scores matches nightly, while real-time updates trigger incremental re-ranking through Bull Queue jobs. The hot path never calls the ML model directly.',
      },
      {
        title: 'WebSocket presence layer',
        detail: 'Real-time presence and typing indicators use WebSocket connections backed by Redis pub/sub. Connection state is stored in Redis with TTL-based expiry, so presence automatically degrades gracefully when connections drop.',
      },
      {
        title: 'Cache-first read architecture',
        detail: 'Profile card data follows a read-through caching pattern: Redis is checked first, and only on cache miss does the application hit DynamoDB. Cache warm-up runs during off-peak hours to pre-populate frequently accessed profiles.',
      },
    ],

    results: [
      {
        metric: 'Match Quality',
        description: 'BERT-powered vector matching delivers significantly more relevant suggestions than keyword-based approaches, with users engaging more deeply with recommended profiles compared to filter-only discovery.',
      },
      {
        metric: 'Response Latency',
        description: 'Cache-first architecture keeps the swipe-to-match hot path consistently under the perceptible delay threshold, even during peak evening hours when concurrent sessions spike.',
      },
      {
        metric: 'Infrastructure Cost',
        description: 'Layered caching and offline match pre-computation dramatically reduce DynamoDB read unit consumption versus a direct-query approach, keeping per-user infrastructure cost flat as the user base grows.',
      },
    ],

    team: [
      {
        name: 'Abhishek Vaghela',
        contribution: 'Led frontend architecture with Next.js and Redux, built the real-time WebSocket presence system, and implemented the swipe interaction flow with optimistic UI updates.',
      },
      {
        name: 'Vatsal Zinzuvadiya',
        contribution: 'Designed the DynamoDB single-table schema, built the BERT vector matching pipeline with OpenSearch KNN, and implemented the Redis caching layer with Bull Queue for async job processing.',
      },
    ],
  },

  {
    slug: 'careerbox',
    projectSlug: 'careerbox',
    title: 'CareerBox: MVP to Scale Career Platform',
    tagline: 'Building a career platform from MVP to production with MongoDB, Redis, and OpenSearch',
    challenge:
      'CareerBox started as a hypothesis: could a focused career platform outperform generic job boards by emphasizing quality over quantity? The business needed to validate this quickly, which meant shipping a functional MVP in weeks, not months. But the architecture had to support the eventual scale of thousands of concurrent job seekers and recruiters without a rewrite.\n\n' +
      'The technical tension was classic MVP-to-scale: move fast enough to test the market, but make foundational choices that hold up when traffic grows by orders of magnitude. Job search has particularly demanding requirements because users expect sub-second results with complex filters (location, salary range, experience level, skills) while recruiters need real-time analytics on listing performance.\n\n' +
      'We adopted a deliberate two-phase approach. Phase one shipped with MongoDB handling both reads and writes, simple caching, and server-side rendering for SEO. Phase two introduced Redis and OpenSearch as the platform proved traction, layering on performance without disrupting the working product.',

    patternSpotlight: {
      dbName: 'MongoDB',
      body: 'CareerBox uses MongoDB as its primary data store for job listings, company profiles, and user accounts. Redis handles session management and caches frequently accessed job listings and search results. OpenSearch powers the job search interface with faceted filtering, geo-queries, and full-text relevance scoring that MongoDB text indexes cannot match at scale.',
    },

    architectureDiagram: 'careerbox',

    techRationale: [
      {
        technology: 'MongoDB',
        problem: 'Job listings have varied schemas (different fields per industry, optional requirements, nested company data). A rigid relational schema would slow down the MVP iteration cycle and require migrations with every product experiment.',
        solution: 'MongoDB flexible document model lets us iterate on listing structure without downtime migrations. Embedded documents for company data reduce lookup joins, and the aggregation pipeline handles analytics queries that recruiters need for listing performance dashboards.',
      },
      {
        technology: 'Next.js SSR',
        problem: 'Career platforms live and die by organic search traffic. Job listings must be indexable by search engines, and time-to-first-byte directly impacts search ranking. A client-rendered SPA would be invisible to job seekers searching Google.',
        solution: 'Next.js server-side rendering generates SEO-ready HTML for every job listing page. Dynamic metadata (title, description, structured data) is built at request time from the database, ensuring search engines see complete, keyword-rich pages.',
      },
      {
        technology: 'OpenSearch',
        problem: 'As listing volume grew, MongoDB text search became a bottleneck. Users needed faceted search (filter by location + salary + experience simultaneously) with relevance scoring, and MongoDB could not deliver this without expensive aggregation pipelines on every query.',
        solution: 'OpenSearch indexes all active listings with custom analyzers for skill matching and geo-point fields for location search. Faceted queries return results with sub-100ms latency and built-in relevance scoring, while MongoDB remains the system of record.',
      },
    ],

    implementationHighlights: [
      {
        title: 'MVP-first architecture',
        detail: 'The initial launch ran entirely on MongoDB with basic in-memory caching. This validated the product hypothesis with minimal infrastructure. Redis and OpenSearch were introduced incrementally once traffic patterns were understood, avoiding premature optimization.',
      },
      {
        title: 'Incremental OpenSearch migration',
        detail: 'Search was migrated from MongoDB to OpenSearch without downtime using a dual-write pattern. New listings wrote to both stores simultaneously. The search UI switched to OpenSearch queries behind a feature flag, allowing gradual rollout and instant rollback.',
      },
      {
        title: 'Session-aware Redis caching',
        detail: 'Redis caches authenticated sessions and personalized search results. Cache keys include user context (saved preferences, search history), so returning users see relevant results immediately while the full query runs in the background.',
      },
      {
        title: 'SEO-optimized dynamic pages',
        detail: 'Every job listing generates structured data (JobPosting schema), canonical URLs, and social meta tags at render time. Sitemap generation runs on a cron schedule, indexing new listings within hours of creation.',
      },
      {
        title: 'Recruiter analytics pipeline',
        detail: 'Listing view counts, application rates, and search impression data flow through a lightweight event pipeline into MongoDB aggregation views. Recruiters see real-time dashboards without impacting search query performance.',
      },
    ],

    results: [
      {
        metric: 'Search Performance',
        description: 'Migration from MongoDB text search to OpenSearch reduced search latency from noticeable delays to near-instant responses, particularly for complex multi-filter queries that previously stalled under load.',
      },
      {
        metric: 'SEO Visibility',
        description: 'Server-side rendered job listings with structured data markup significantly improved organic search indexation, with new listings appearing in search results within hours rather than days.',
      },
      {
        metric: 'Scale Readiness',
        description: 'The layered architecture (MongoDB for writes, Redis for sessions and hot data, OpenSearch for search) handles traffic growth without requiring application-level changes, validating the MVP-to-scale approach.',
      },
      {
        metric: 'Development Velocity',
        description: 'The incremental architecture approach allowed the team to ship the initial product in weeks while adding performance layers as traffic demanded, avoiding both premature optimization and costly rewrites.',
      },
    ],

    team: [
      {
        name: 'Abhishek Vaghela',
        contribution: 'Architected the Next.js SSR pipeline for SEO-optimized job pages, built the recruiter analytics dashboard, and led the frontend implementation with responsive design and accessibility.',
      },
      {
        name: 'Vatsal Zinzuvadiya',
        contribution: 'Designed the MongoDB schema and aggregation pipelines, implemented the dual-write OpenSearch migration strategy, and built the Redis session and caching layer.',
      },
    ],
  },

  {
    slug: 'zorova',
    projectSlug: 'zorova',
    title: 'Zorova: Home Spa Marketplace Architecture',
    tagline: 'Designing a marketplace for home spa services with MERN, Redis, and OpenSearch',
    challenge:
      'Zorova is a marketplace connecting home spa service providers with consumers across Indian cities. Marketplace platforms carry a unique engineering burden: every feature must work for two distinct user types with opposing needs. Providers need booking management, availability calendars, and earnings tracking. Consumers need service discovery, real-time availability, and seamless booking. The data model must serve both sides without duplicating logic.\n\n' +
      'Service discovery is the critical conversion path. A consumer searching for a specific treatment in their area needs relevant results instantly, filtered by availability, price range, provider rating, and distance. The search must feel fast even when querying across thousands of providers with complex scheduling constraints. A slow or irrelevant search result set means a lost booking.\n\n' +
      'As a client project, there were additional constraints: the architecture needed to be maintainable by a team that did not build it, the deployment had to work within existing AWS infrastructure, and the timeline required delivering a production-ready marketplace in a compressed schedule.',

    patternSpotlight: {
      dbName: 'MongoDB',
      body: 'Zorova uses MongoDB as the primary store for provider profiles, consumer accounts, service catalogs, and booking records. Redis caches provider availability windows and frequently searched service results, keeping the booking flow responsive. OpenSearch powers geo-aware service discovery with distance scoring, treatment-type facets, and real-time availability filtering.',
    },

    architectureDiagram: 'zorova',

    techRationale: [
      {
        technology: 'MongoDB',
        problem: 'Marketplace data is inherently relational (providers have services, services have bookings, bookings have consumers) but the schema evolves rapidly as the product discovers what metadata providers and consumers actually need.',
        solution: 'MongoDB document model stores provider profiles with embedded service catalogs and nested availability rules. This eliminates join-heavy queries for the most common read path (consumer browsing providers) while allowing schema evolution through optional fields as the product iterates.',
      },
      {
        technology: 'OpenSearch',
        problem: 'Consumers search by location, treatment type, price range, rating, and real-time availability simultaneously. MongoDB geospatial queries work for simple proximity search, but combining geo-distance scoring with faceted filters and text relevance requires a dedicated search engine.',
        solution: 'OpenSearch indexes all active providers with geo-point coordinates, service type keyword fields, and availability time windows. A single query returns results ranked by a blended score of proximity, relevance, and rating, with sub-100ms response times even across dense metro areas.',
      },
      {
        technology: 'Redis',
        problem: 'Availability is the highest-churn data in a booking marketplace. Provider schedules change constantly as bookings are made and cancelled. Hitting MongoDB for real-time availability on every search result would create unacceptable latency spikes.',
        solution: 'Redis stores availability windows as sorted sets keyed by provider ID and date. When a booking is confirmed or cancelled, the availability cache updates immediately. Search results annotate each provider with live availability from Redis, keeping the booking path fast and accurate.',
      },
    ],

    implementationHighlights: [
      {
        title: 'Dual-persona data model',
        detail: 'Provider and consumer schemas share a common user base document with role-specific extensions. This simplifies authentication and allows the system to support users who are both providers and consumers without data duplication.',
      },
      {
        title: 'Geo-aware service discovery',
        detail: 'OpenSearch geo-distance queries are combined with service-type facets and availability filters in a single compound query. Results are scored by a weighted blend of proximity, provider rating, and price relevance, tuned to maximize booking conversion.',
      },
      {
        title: 'Real-time availability caching',
        detail: 'Provider availability is stored as Redis sorted sets with Unix timestamp scores. Checking availability for a time slot is a single ZRANGEBYSCORE operation, making slot lookups effectively instant. Cache invalidation triggers on every booking state change.',
      },
      {
        title: 'Booking conflict resolution',
        detail: 'Concurrent booking attempts for the same provider time slot are handled through Redis-based distributed locking. The lock-check-book-release cycle prevents double bookings without requiring database-level pessimistic locks that would slow down the entire provider query path.',
      },
    ],

    results: [
      {
        metric: 'Discovery Relevance',
        description: 'Geo-aware OpenSearch queries with blended scoring surface nearby, highly-rated providers first, resulting in users finding relevant services without excessive scrolling or filter adjustments.',
      },
      {
        metric: 'Booking Flow Speed',
        description: 'Redis-cached availability and distributed locking keep the search-to-confirmed-booking path responsive, with real-time slot accuracy that prevents the frustration of selecting an already-booked time.',
      },
      {
        metric: 'Handoff Quality',
        description: 'Clean separation between the data layer (MongoDB), search layer (OpenSearch), and cache layer (Redis) made the codebase straightforward for the client team to maintain and extend after delivery.',
      },
    ],

    team: [
      {
        name: 'Abhishek Vaghela',
        contribution: 'Built the React consumer-facing frontend with service discovery UI, booking flow, and provider profile pages. Implemented the responsive design for mobile-first marketplace browsing.',
      },
      {
        name: 'Vatsal Zinzuvadiya',
        contribution: 'Architected the Node.js backend with the dual-persona data model, implemented OpenSearch geo-queries for service discovery, and designed the Redis availability caching and distributed booking lock system.',
      },
    ],
  },
];
