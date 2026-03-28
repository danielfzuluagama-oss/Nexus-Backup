# CV Patterns — PAR Framework, ATS Strategies & Industry Templates

> Reference for the `cv-enhancement` skill. Use this file to select the right patterns for rewriting, ATS optimization, and industry-specific formatting.

---

## 1. PAR Framework — Complete Reference

### 1a. Framework Definition

PAR = Problem → Action → Result

Every work experience bullet answers three questions in sequence:
1. **P — Problem / Context:** What was the situation, challenge, or objective?
2. **A — Action:** What did you specifically do? (your contribution, not the team's)
3. **R — Result:** What measurably changed? Quantify whenever possible.

The result is the most important element. Most CV bullets stop at the action. [EXPLICIT]

### 1b. PAR Transformation Matrix

| Duty Language (BAD) | PAR Language (GOOD) | What Changed |
|--------------------|---------------------|-------------|
| "Managed the marketing team" | "Led 7-person content team to 3x organic traffic growth (12K→38K monthly visitors) in 9 months by restructuring editorial calendar and launching SEO sprint program" | Added team size, metric, timeframe, mechanism |
| "Worked on improving customer support" | "Reduced average ticket resolution time from 4.2 days to 18 hours by implementing Intercom automated triage for Tier 1 issues, freeing L2 agents for complex cases" | Added before/after metric, tool, mechanism |
| "Responsible for sales in LATAM region" | "Grew LATAM territory from $0 to $2.4M ARR in 18 months, closing 14 enterprise contracts across 7 countries; exceeded quota by 140% in FY2023" | Added revenue, deal count, geography, quota % |
| "Developed backend APIs" | "Engineered microservices API layer (Node.js + GraphQL) processing 80K req/day, reducing frontend load time from 3.1s to 0.8s and eliminating 4 legacy service dependencies" | Added stack, scale, performance metric, debt reduction |
| "Created training programs" | "Designed and delivered 12-module onboarding curriculum for 45 new hires, reducing time-to-productivity from 90 days to 52 days (42% improvement)" | Added scope, count, before/after metric |

### 1c. PAR Sentence Structures

**Structure A — Result-first (strongest for senior roles):**
`[Metric improved/achieved] by [action taken] ([mechanism/context])`

Example: "Reduced customer churn 28% by implementing automated health score monitoring (Gainsight) with proactive intervention playbooks for accounts below threshold."

**Structure B — Action-first (clearest for mid-level):**
`[Action verb + scope] + [result clause]`

Example: "Built self-serve analytics dashboard (Tableau + BigQuery) used by 12 product managers weekly, eliminating 6h/week of manual reporting requests to the data team."

**Structure C — Context-bridge (useful when problem is not obvious):**
`[Context/problem], [action taken]; [result achieved]`

Example: "Inheriting a team of 3 junior engineers with 60% sprint delivery rate, restructured estimation process and introduced pair programming; delivery rate reached 89% within 2 quarters."

### 1d. Metric Hierarchy (when multiple options exist)

Prefer metrics in this order:
1. Revenue / ARR / deal size (strongest business impact)
2. Cost reduction / savings (second strongest)
3. Efficiency gain (time saved, headcount avoided)
4. Scale (users, transactions, records, team size)
5. Quality improvement (error rate, NPS, retention)
6. Speed improvement (time-to-market, cycle time, latency)
7. Process milestone (launched X, completed Y, implemented Z)

---

## 2. ATS Optimization Strategies

### 2a. How ATS Systems Work

ATS (Applicant Tracking Systems) parse CVs before any human sees them:
1. File is ingested and parsed into structured fields (name, email, experience, education, skills)
2. Parser extracts text — tables and columns often parse incorrectly
3. Keywords are matched against the job description
4. Threshold score determines whether the CV is shown to a recruiter

**Major ATS Systems and Their Known Quirks:**

| ATS | Used By | Key Quirk |
|----|--------|---------|
| Workday | Enterprise (Fortune 500) | Struggles with tables; prefers simple formatting |
| Greenhouse | Tech startups / mid-market | Handles PDFs well; good keyword matching |
| Lever | Tech companies | Good at parsing; likes chronological structure |
| Taleo (Oracle) | Large enterprise | Most stringent parser; plain text preferred |
| iCIMS | Large enterprise | Handles PDFs; keyword density matters |
| BambooHR | SMB | Simpler parser; most formatting works |
| Workable | Startups/SMB | Modern parser; handles PDFs reasonably |

### 2b. Format Rules for Maximum ATS Compatibility

**SAFE formatting:**
- Single column layout (no side-by-side columns)
- Standard section headers: Summary, Experience, Education, Skills, Certifications
- Bullet points using standard characters (•, -, *)
- Dates in consistent format: "Month Year – Month Year" or "MM/YYYY"
- Font: Arial, Calibri, Garamond, or Georgia (standard system fonts)
- File: .docx or text-extracted PDF (not design tool exports)

**AVOID:**
- Tables for experience layout (column parsing breaks date-company association)
- Text boxes (often not parsed)
- Headers/footers for contact info (often invisible to parsers)
- Graphics, icons, colored backgrounds
- Creative section names ("My Journey", "Where I've Been", "Superpowers")
- Embedded images (photo, logo, chart)

### 2c. Keyword Insertion Protocol

1. Copy the target job description into a doc
2. Extract the top 20 most important terms:
   - Job title variants ("Product Manager", "PM", "Senior PM")
   - Hard skills (programming languages, tools, platforms)
   - Soft skills used in the posting (but with lower ATS weight)
   - Industry terms (SaaS, fintech, agile, HIPAA, GDPR)
   - Methodologies (Scrum, Kanban, OKRs, Six Sigma)
3. Map each term to your experience — where does this keyword belong naturally?
4. Insert naturally in experience bullets and skills section
5. Do NOT: keyword-stuff the skills section with 50+ items or add skills you don't have

**Keyword Density Rule:** Each important skill/tool should appear 2-3 times in the document. Once in the skills section, once or twice in the experience bullets where genuinely used.

### 2d. ATS Score Estimation

Before submitting, self-check:
- Does the job title in your most recent role match (or closely mirror) the target role title?
- Do your top 5 technical skills each appear at least once in your experience bullets (not just the skills section)?
- Is the professional summary written to mirror the language of the job description?
- Are the required years of experience visible (calculate from dates)?
- Does education section include the degree name exactly as stated (e.g., "Bachelor of Science in Computer Science" not "CS degree")?

---

## 3. Industry-Specific Templates

### 3a. Technology / Software Engineering

**CV Structure Priority:**
1. Skills section FIRST (or immediately after summary) — ATS heavily weights tech stack match
2. Experience with quantified engineering impact
3. Projects / Open Source (if relevant)
4. Education (year only if 5+ years out of school)

**Key Metrics for Tech CVs:**
- Lines of code / PRs merged (lower value — use sparingly)
- System scale: requests/day, users served, data volume
- Performance improvements: latency, uptime, error rate
- Delivery velocity: sprints delivered, release cadence
- Incident reduction: downtime reduced, P0 incidents resolved
- Cost optimization: infrastructure cost savings

**Must-Have Sections for Tech Roles:**
- Technical Skills (categorized: languages, frameworks, cloud, tools, databases)
- GitHub/Portfolio link (inline with name or in contact section)

### 3b. Product Management

**CV Structure Priority:**
1. Professional summary with product type (B2B SaaS, consumer, marketplace, etc.)
2. Experience bullets focused on outcomes, not feature lists
3. Methods/tools section (Figma, Jira, Mixpanel, etc.)

**Key Metrics for PM CVs:**
- Feature adoption rates
- Revenue attributed to initiatives
- DAU/MAU improvements
- NPS or CSAT changes
- Time-to-market improvements
- A/B test wins (with lift %)
- Team size led (cross-functional)

**Common PM CV Mistake:** Listing features shipped ("Built X feature") instead of outcomes ("X feature drove 18% increase in activation rate").

### 3c. Sales / Business Development

**CV Structure Priority:**
1. Professional summary with deal size, segment, geography
2. Experience bullets organized around quota attainment and deal highlights
3. Tools section (CRM, sales enablement, outreach tools)

**Must-Have Metrics:**
- Quota attainment (X% of quota, every year)
- Revenue generated ($X ARR / TCV)
- Deal size range ($X avg / $X largest deal)
- Win rate vs. target
- Pipeline generated
- Team size led (for managers)
- Geography / territory scope

**Sales CV Template Bullets:**
```
- Closed $3.2M in new enterprise ARR in FY2023, attaining 128% of quota;
  largest deal: $480K TCV with [Fortune 100 type] client (6-month sales cycle)
- Built greenfield territory in Colombia from $0 to $1.8M pipeline in 9 months;
  converted 22% of SQLs to closed-won (vs. 15% team average)
```

### 3d. Consulting / Professional Services

**CV Structure Priority:**
1. Summary with specialization, industries served, and client profile
2. Experience showing client impact and engagement scope
3. Education prominently placed (top MBA, relevant certifications)

**Key Metrics:**
- Number of clients / engagements
- Engagement scope (team size, budget, duration)
- Revenue impact for clients
- Process improvements (% efficiency gain, cost saved)
- Recommendations implemented
- Geography and industry breadth

**Consulting CV Specificity:** Do not name clients without permission. Use: "Fortune 500 automotive manufacturer", "Series B fintech startup in Brazil", "Government agency, 5,000+ employees".

### 3e. Finance / Banking

**CV Structure Priority:**
1. Summary with sector specialization and deal types
2. Experience with financial metrics front and center
3. Certifications (CFA, CPA, FRM) prominently after summary or in a dedicated section
4. Education (GPA if >3.5 and within 7 years)

**Key Metrics:**
- Deal sizes ($X M deal, $X B fund)
- Assets under management (AUM)
- Portfolio returns vs. benchmark
- Cost savings / efficiency improvements
- Regulatory compliance metrics
- Budget ownership

### 3f. Operations / Supply Chain

**Key Metrics:**
- Cost reduction ($ and %)
- Cycle time improvement
- Inventory turns / inventory reduction
- On-time delivery rate improvement
- Headcount efficiency (output per FTE)
- Vendor consolidation (from X to Y suppliers)
- SLA compliance rate

### 3g. Academic / Research

**Different Format Conventions:**
- CV length: no page limit (unlike commercial CVs)
- Publications section: mandatory, use standard citation format
- Conferences/presentations: dedicated section
- Grants and fellowships: dedicated section
- Teaching experience: dedicated section
- Education: first section after contact info (unlike commercial CVs)

---

## 4. Career Level Calibration Guide

### Junior (0-3 years)

**Strategy:** Compensate for limited professional experience with depth on projects, coursework, and transferable skills.

**Sections to emphasize:**
- Projects (academic, personal, open source)
- Relevant coursework (if recent grad)
- Internships and part-time roles
- Extracurricular leadership

**Bullet depth:** Task + tool + learning outcome. "Built X using Y, resulting in Z" or "Contributed to X, gaining proficiency in Y."

### Mid-Level (3-7 years)

**Strategy:** Demonstrate ownership of outcomes, not just tasks. Show consistent delivery.

**Sections to emphasize:**
- Experience with quantified bullets
- Skills/tools section
- Notable projects or promotions

**Bullet depth:** Full PAR. Every bullet should have a metric or at minimum a scope indicator.

### Senior (7-15 years)

**Strategy:** Elevate from "what I did" to "what I changed." Strategy, leadership, business impact.

**CV length:** 2 pages acceptable. Focus on last 10 years; compress earlier roles.

**Bullet depth:** Business impact > technical detail. "Led" and "drove" > "built" and "wrote."

### Executive (15+ years)

**Strategy:** Board-level narrative. Revenue, P&L, org transformation, vision execution.

**CV length:** 2-3 pages. Earlier roles can be one-liners.

**What to include:**
- Board memberships and advisory roles
- M&A experience
- P&L ownership (state the size: "$120M revenue org")
- Company-wide initiatives (not department-level)
- External recognition (speaking, awards, industry influence)

---

## 5. Action Verb Reference Bank

### Leadership & Management
Led, Directed, Managed, Scaled, Built, Grew, Recruited, Mentored, Coached, Aligned, Reorganized, Transformed, Championed, Unified

### Technical & Engineering
Engineered, Architected, Developed, Designed, Deployed, Implemented, Automated, Optimized, Refactored, Migrated, Integrated, Built, Shipped, Launched

### Analysis & Strategy
Analyzed, Evaluated, Modeled, Forecasted, Benchmarked, Diagnosed, Quantified, Identified, Researched, Mapped, Assessed, Audited

### Commercial & Revenue
Closed, Negotiated, Grew, Expanded, Retained, Acquired, Upsold, Generated, Recovered, Converted, Pitched, Secured

### Operations & Process
Streamlined, Reduced, Eliminated, Standardized, Implemented, Launched, Delivered, Improved, Accelerated, Simplified, Restructured, Consolidated

### Communication & Influence
Presented, Facilitated, Authored, Published, Trained, Influenced, Partnered, Aligned, Negotiated, Advised, Consulted

---

## 6. Metrics Injection Cheat Sheet

When the user's CV lacks numbers, use these proxy questions to extract them:

| Vague Phrase | Ask This | Typical Metric Form |
|-------------|---------|-------------------|
| "Large team" | How many direct reports? Indirect reports? | "Led 12-person team (8 direct)" |
| "Significant revenue" | What was the ARR or deal size? | "$3.2M ARR" / "$450K avg deal" |
| "Improved performance" | From X to Y? Or % change? | "Reduced from 4.2s to 0.9s (78%)" |
| "Many clients" | How many active accounts? | "Managed 23 enterprise accounts" |
| "Saved money" | $ saved per month/year? Headcount avoided? | "Saved $180K/year in vendor costs" |
| "Fast delivery" | Old cycle time vs. new? | "Cut deployment cycle from 3 weeks to 2 days" |
| "Global team" | How many countries/time zones? | "12-person team across 4 countries" |
| "Large budget" | $ amount managed? | "Managed $2.4M annual marketing budget" |
