---
title: Airflow pipelines and shared tooling for a data warehouse
summary: Built Airflow pipelines that fed a layered SQL Server data warehouse, including automated report downloads from insurance carriers' partner portals that had no API, and wrote shared helpers my teammates adopted.
company: GoHealth
role: Data Engineer
period: 2019–2021
order: 2
tags: [Python, Airflow, SQL Server, AWS S3, Jenkins]
---

GoHealth is a US online marketplace for health insurance. I joined one of its data engineering teams, five to eight engineers, and spent most of my time writing Airflow pipelines, from small jobs to large ones.

The largest pipeline collected regular reports from the partner portals of insurance carriers that offered no API. Using Selenium, it signed in to each portal, navigated to the reports, downloaded the CSV and Excel files and loaded each one into the data warehouse. Together the team covered dozens of files; I was responsible for five to ten of the portals. Data that would otherwise have to be downloaded by hand arrived automatically.

The warehouse, mostly SQL Server with some data in AWS S3, was organized in layers: raw copies of the source data, intermediate stages for cleaning and normalization, a top layer for end users, and tables with historical data. My pipelines fed the first stages.

I also looked for code the team kept rewriting. Every pipeline turned Excel column names into database column names, and passed data between its steps through temporary files, each in its own way. I wrote a small function that sanitized column names and two reusable pipeline steps that set up and cleaned up the temporary files, and my teammates started using them too. Since then I follow a simple rule: once I see the same code in two or three places, it becomes a shared function.

The development process was strict, and I learned a lot from it: a local environment with Airflow and SQL Server in Docker, pull requests reviewed by two or three colleagues before a senior engineer merged them, a testing environment before every production deployment, and thorough documentation in Confluence. When the company formed a new Advanced Analytics team, I set up a Jenkins CI/CD pipeline for them, modeled on ours.
