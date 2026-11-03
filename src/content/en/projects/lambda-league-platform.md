---
title: Data platform and apps for a recruiting startup
slug: data-platform
summary: The founder of a two-person startup and I built its data platform and apps. Dagster fed a medium-sized Postgres database of over a hundred tables, and the APIs and web apps ran on AWS, managed in Terraform. These tools were used daily, and they significantly increased the number of candidates contacted per day.
company: Lambda League
role: Software Engineer
period: 2025–2026
order: 3
tags: [Python, PostgreSQL, Dagster, FastAPI, AWS, Terraform, Claude Code]
---

In a team of two, we shared most of the work, so I worked on almost everything, from the Terraform setup to the candidate-facing app.

**Data.** The Postgres database held candidate, company and school data, often organized in raw, staging and final layers, with search tables for fast filtering and plenty of JSONB columns. A daily Dagster job updated it, with roughly one asset per table, and all tables were mapped to SQLAlchemy models. We had a small custom framework that handled incremental updates and propagated new records downstream. We also had a Flask API that gave the apps access to the data.

**Apps.** The main tool was a recruiter-facing app for browsing candidates, creating roles and matching candidates against them. It started in Streamlit and later moved to React with a FastAPI backend. It had candidate and company profile pages, many filters, and even a filter tree builder for creating and saving custom filter sets. When creating a new role, the user could fill in the required fields or let a language model extract them from the job description. I built a second, candidate-facing app on my own, end to end: database tables, API endpoints, a FastAPI backend and a React frontend, all in one polyglot repository. It fetched company data from an external data provider on demand, with a monthly budget so that no one could use up the paid credits. Its tests ran in CI: unit tests for the API and backend, Vitest for the frontend and Playwright for the UI.

**Infrastructure.** Our AWS infrastructure was defined in a Terraform repository, with `terraform plan` in CI and `terraform apply` in CD. The apps ran on ECS behind one load balancer, and the Dagster pipeline and database API ran on ECS as well.

I wrote most of my code there with Claude Code, which let me build a lot quickly. My focus was on the design and the ideas behind it, and I added tests consistently, because they let the AI see for itself what broke.
