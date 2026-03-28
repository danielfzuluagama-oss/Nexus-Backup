# Research Framework — OSINT Sources, B2B Databases & Signal Detection

> Reference for the `market-intelligence` skill. Use this file to select the right sources for each research objective.

---

## 1. OSINT Source Directory

### 1a. Company Research Sources

| Source | Type | Access | Best For |
|-------|------|--------|---------|
| **LinkedIn** | Social/Professional | Free (limited) / Sales Nav (paid) | Headcount, roles, executive profiles, org structure signals |
| **Crunchbase** | Startup/funding DB | Free (limited) / Pro ($49/mo) | Funding history, investors, acquisition data, founding year |
| **AngelList / Wellfound** | Startup DB | Free | Early-stage companies, founding team, equity info |
| **PitchBook** | Investment DB | Enterprise (expensive) | Deep financial, M&A, cap tables |
| **Owler** | Competitive intel | Free (limited) | Revenue estimates, competitor lists, news alerts |
| **Glassdoor** | Employer review | Free | Culture signals, management quality, retention proxy |
| **G2 / Capterra** | Software reviews | Free | Tech stack of reviewers, competitor customers |
| **BuiltWith** | Tech profiling | Free (basic) / Pro ($295/mo) | Website tech stack detection |
| **Wappalyzer** | Tech profiling | Browser extension (free) | Instant tech stack on any website |
| **Apollo.io** | B2B data platform | Free (limited) / Paid ($49/mo) | Contact emails, firmographics, intent signals |
| **ZoomInfo** | B2B data platform | Enterprise | Deep contact and company data (expensive) |
| **Hunter.io** | Email finder | Free (25/mo) / Paid | Email patterns, domain verification |
| **Wayback Machine** | Web archive | Free | Historical website versions, old pricing, past messaging |

### 1b. Public Figure Research Sources

| Source | Type | Best For |
|-------|------|---------|
| **LinkedIn** | Professional | Career history, education, connections, posts |
| **Twitter/X** | Social | Real-time opinions, engagement style, network |
| **Google Search** | General | Articles, interviews, press mentions, controversies |
| **YouTube** | Video | Conference talks, panels, podcast appearances |
| **Podcast directories** | Audio | Spotify/Apple — search by name for appearances |
| **GitHub** | Code | Technical executives — contribution activity, repos |
| **Academia.edu / ResearchGate** | Academic | Researchers and technical leaders — publications |
| **BoardEx / BoardProspects** | Board data | Board memberships, governance roles |

### 1c. Territory / Geographic Research Sources

| Source | Coverage | Data Types |
|-------|---------|-----------|
| **World Bank Open Data** | Global | GDP, trade, demographics, development indicators |
| **IMF Data** | Global | Economic outlook, fiscal data, current account |
| **UN Data (data.un.org)** | Global | Population, human development, labor |
| **OECD iLibrary** | OECD countries | Detailed economic and social statistics |
| **Statista** | Global | Market sizes, industry data (requires subscription for full data) |
| **Trading Economics** | 196 countries | Real-time indicators, historical data, forecasts |
| **The Global Economy** | 200 countries | 300+ indicators, free |
| **Gobierno de Colombia** | Colombia | DANE (statistics), DNP (planning), MinTIC (tech) |
| **INEGI** | Mexico | Population, economy, geography |
| **IBGE** | Brazil | Demographics, economy, geography |
| **Latinbarometro** | LatAm | Public opinion, political climate, social trends |

### 1d. Sector / Industry Research Sources

| Source | Best For |
|-------|---------|
| **Gartner** | Enterprise tech market sizes, Magic Quadrants |
| **Forrester** | Enterprise tech + CX research |
| **IBISWorld** | Industry revenue and growth (US/global) |
| **Euromonitor** | Consumer markets, FMCG, emerging markets |
| **Grand View Research / MarketsandMarkets** | Market size reports (many are paywalled) |
| **McKinsey Global Institute** | Free strategic research on major industries |
| **CB Insights** | Startup investment trends by sector |
| **Vertical-specific trade associations** | Primary data from industry organizations |

---

## 2. Signal Detection Methods

### 2a. Funding Signal Detection

**Sources:** Crunchbase, TechCrunch, VentureBeat, Dealroom (EU), LAVCA (LatAm)

**Detection Protocol:**
1. Set up Google Alert: `[company name] funding` OR `[company name] raised`
2. Monitor Crunchbase "Recent Funding" by geography + sector
3. Follow lead investors on LinkedIn — they announce portco raises
4. Check PR Newswire / BusinessWire for press release funding announcements

**Signal Decay:** Funding signal is most actionable in the first 30-90 days after announcement. After 180 days, it has likely been deployed and urgency decreases. [INFERRED]

### 2b. Executive Change Detection

**Sources:** LinkedIn, executive announcement press releases, Google News

**Detection Protocol:**
1. Set up LinkedIn "People" alert for target companies
2. Use LinkedIn Sales Navigator "Decision Maker" change alerts (paid)
3. Google Alert: `[company] announces [appoints | names | hires]`
4. Check company News/Press section directly for leadership announcements

**Why it matters:** New executives evaluate existing vendors within their first 90 days [INFERRED]. They bring preferences from prior companies. A new CTO from AWS = likely to standardize on AWS. A new VP Sales from HubSpot = likely to evaluate HubSpot if not using it.

### 2c. Job Posting Analysis

**Sources:** LinkedIn Jobs, Indeed, Glassdoor, Greenhouse/Lever job pages, company careers page

**Detection Protocol:**
1. Search by keyword matching your pain category: "data pipeline", "ERP migration", "compliance officer"
2. Count volume: 5+ roles in same function = investment signal
3. Analyze required tools: reveals current stack AND desired stack
4. Note recency: roles posted >90 days suggest hiring difficulty (a pain itself)
5. Check seniority: Director+ roles = strategic initiative, IC roles = tactical execution

**Job Posting Parsing Template:**
```
Role: [Title]
Required tools: [Stack mentioned]
Inferred pain: [What problem are they trying to solve by hiring this role?]
Inferred budget: [SR roles = budget approved; IC roles = active project]
Signal strength: High (5+ roles) / Medium (2-4 roles) / Low (1 role)
```

### 2d. Tech Stack Detection

**Method 1 — BuiltWith/Wappalyzer:** Scan company website for client-side tech (analytics, marketing, A/B testing, chat). Reliable for B2C and marketing tools; limited for backend/internal tools.

**Method 2 — Job Postings:** Engineering job postings list required tools. Most reliable signal for backend stack and infrastructure.

**Method 3 — GitHub Org:** Check `github.com/[company-handle]` for public repos. Reveals language choices, frameworks, and sometimes infrastructure configs.

**Method 4 — Press/Blog:** Engineering blogs and product blogs name the stack. Medium, Substack, dev.to, and company blog pages.

**Method 5 — Integration Pages:** Most SaaS companies publish integration lists. Check competitor integration pages for "who else is in their ecosystem."

**Method 6 — LinkedIn Skills:** Aggregate the "Skills" section across 5-10 engineers at the company. The skill distribution reveals the stack in use.

### 2e. Competitive Landscape Mapping

**Step 1 — Seed the competitor list:**
- G2 or Capterra category page: "Products in [category]"
- "Alternatives to [known player]" Google search
- BuiltWith "Market share" for tech categories
- LinkedIn ad targeting: "People who follow [competitor]"

**Step 2 — Classify competitors:**

| Type | Definition | Strategic Response |
|-----|-----------|-------------------|
| Direct | Same ICP, same solution | Differentiate on 1-2 specific dimensions |
| Indirect | Same problem, different approach | Reframe the category |
| Adjacent | Tangential overlap | Monitor for product expansion |
| Emerging | New entrant with similar vision | Accelerate, track funding |

**Step 3 — Track competitor signals:**
- Pricing page changes
- Job postings (what are they building?)
- Customer reviews on G2 (what do customers praise AND complain about?)
- Conference presence and messaging
- LinkedIn thought leadership topics

---

## 3. Evidence Tagging Quick Reference

| Tag | When to Use | Example |
|----|-----------|--------|
| `[EXPLICIT]` | Stated by a primary source | "Founded in 2018 per official website [EXPLICIT]" |
| `[INFERRED]` | Logically derived from signals | "Revenue estimated $10-20M based on Series A size [INFERRED]" |
| `[OPEN]` | Data gap that matters to the research | "Org structure below VP level unknown [OPEN — check LinkedIn]" |
| `[est.]` | Estimate (use inline for numbers) | "340 employees [est. LinkedIn, ±15%]" |

**Rules:**
- Every numeric claim must be tagged
- Every "likely" or "probably" statement must be `[INFERRED]`
- Never present an inferred claim as a fact — the tag creates epistemic honesty
- `[OPEN]` items must include a resolution path in parentheses

---

## 4. Research Quality Checklist

Before delivering any intelligence output:

- [ ] At least 3 independent sources consulted for key claims
- [ ] Revenue/headcount figures labeled as estimates for private companies
- [ ] All evidence tags applied to every factual claim
- [ ] Source URLs included in the evidence log section
- [ ] Research date noted (intelligence has a shelf life)
- [ ] [OPEN] items listed with resolution paths
- [ ] No fabricated statistics or invented quotes
- [ ] Competitor data cross-validated (G2 + press + company site)

---

## 5. Source Reliability Hierarchy

**Tier 1 — Primary Sources (highest trust):**
Official company websites, SEC filings, press releases, government registries, academic publications

**Tier 2 — Curated Secondaries:**
LinkedIn (self-reported), Crunchbase (community-maintained + funded), established trade press (TechCrunch, Reuters)

**Tier 3 — Derived/Estimated:**
BuiltWith stack detection, headcount from LinkedIn (±15-20%), revenue estimates from funding proxies

**Tier 4 — Soft Signals:**
Glassdoor reviews, anonymous community posts, social media sentiment

Always note the tier when delivering research. Tier 1 = `[EXPLICIT]`. Tier 2-3 = `[EXPLICIT]` with source noted or `[INFERRED]`. Tier 4 = `[INFERRED]` with low confidence flag.
