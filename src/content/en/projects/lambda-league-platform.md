---
title: Data platform and apps for a recruiting startup
summary: With the founder of a two-person startup, built its data platform and apps, a medium-sized Postgres database of over a hundred tables fed by Dagster, with APIs and web apps on AWS managed in Terraform. The founder used the tools daily, and they significantly increased the number of candidates he could contact per day.
company: Lambda League
role: Software Engineer
period: 2025–2026
order: 3
tags: [Python, PostgreSQL, Dagster, FastAPI, AWS, Terraform]
---

In a team of two, we shared most of the work, usually with the founder doing the larger part. The Terraform setup, a candidate-facing app and the individual features mentioned below were mine.

**Data.** The database held candidate, company and school data, mostly organized in raw, staging and final layers, with search tables for fast filtering and plenty of JSONB. A daily Dagster job updated it, with roughly one asset per table, about a third of them mine, and all tables were mapped to SQLAlchemy models. A small framework, mostly the founder's design, handled incremental updates and propagated new records downstream. I made it faster: the selection of new upstream records, which used to be recalculated for every batch, was then calculated once and stored in a table that was dropped afterwards. Temporary tables weren't an option because the database connection went through a proxy. Together we added indexes and analysed query plans so candidates could be filtered and sorted by many different scores quickly.

**Apps.** The founder's main tool was the portal, where he browsed candidates, created roles and matched candidates against them. It started in Streamlit and later moved to React with a FastAPI backend. I added features such as a filter tree builder for custom filter sets, company profile pages, the progress of candidate evaluation, and role creation, where a language model extracted the role's attributes from the job description and filled in the form. Behind the apps, an API connected the database with external services. I built a second, candidate-facing app on my own, end to end: database tables, API endpoints, a FastAPI backend and a React frontend in one repository. It fetched company data from an external data provider on demand, with a monthly budget so that no one could use up the paid credits. Its tests ran in CI: unit tests for the API and backend, Vitest for the frontend and Playwright for the UI.

**Infrastructure.** I set up the Terraform repository and moved the AWS infrastructure into it one component at a time, with `terraform plan` in CI and `terraform apply` in CD. The apps ran on ECS behind one load balancer, and the Dagster pipeline moved from our laptops to ECS as well. We sized the database to the workload: once the daily job ran at night, a bigger single instance replaced a read replica, and we scaled up temporarily only for heavy migrations.

I wrote most of my code there with Claude Code, which let me build a lot quickly. My focus was on the design and the ideas behind it, and I added tests consistently, because they let the AI see for itself what broke.
