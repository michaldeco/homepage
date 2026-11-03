---
title: Data platform and apps for a recruiting startup
slug: data-platform
summary: Together with the founder of a two-person startup, we built its data platform and apps. Dagster fed a medium-sized Postgres database of over a hundred tables, and the APIs and web apps ran on AWS, managed in Terraform. These tools were used daily, and they significantly increased the number of candidates contacted per day.
company: Lambda League
role: Software Engineer
period: 2025–2026
order: 3
tags: [Python, PostgreSQL, Dagster, FastAPI, AWS, Terraform, Claude Code]
---

In a team of two, we shared most of the work. Hence, I touched almost everything from the terraform setup to candidate-facing app.

**Data.** The Postgres database held candidate, company and school data, often organized in raw, staging and final layers, with search tables for fast filtering and plenty of JSONB columns. A daily Dagster job updated it, with roughly one asset per table, and all tables were mapped to SQLAlchemy models. We had a small custom framework that handled incremental updates and propagated new records downstream. We had also an API in flask, that provided apps with access to our data.

**Apps.** The main tool was a recruiter-facing app, where one can browse candidates, create roles and match candidates against them. It started in Streamlit and later moved to React with a FastAPI backend. It had candidate and company profile pages, a lot of filters, even a filter tree builder to create and save custom filter sets. User could create a new role, either by filling in required fields, or those fields could be automatically extracted from the job description by LLM. I built a second, candidate-facing app on my own, end to end: database tables, API endpoints, a FastAPI backend and a React frontend, all in one polyglot repository. It fetched company data from an external data provider on demand, with a monthly budget so that no one could use up the paid credits. Its tests ran in CI: unit tests for the API and backend, Vitest for the frontend and Playwright for the UI.

**Infrastructure.** We had a Terraform repository where our AWS infrastructure was defined, with `plan/apply` as CI/CD steps. The apps ran on ECS behind one load balancer, and the Dagster pipeline and database API ran on ECS as well.

I wrote most of my code there with Claude Code, which let me build a lot quickly. My focus was on the design and the ideas behind it, and I added tests consistently, because they let the AI see for itself what broke.
