---
title: Airflow pipelines and shared tooling for a data warehouse
summary: Built Airflow pipelines that fed a layered SQL Server data warehouse, including automated report downloads from insurance carriers' partner portals that had no API, and wrote shared helpers my teammates adopted.
company: GoHealth
role: Data Engineer
period: 2019–2021
order: 5
tags: [Python, Airflow, SQL Server, AWS S3, Jenkins]
---

GoHealth is a US online marketplace for health insurance. I joined one of its data engineering teams, five to eight engineers, and spent most of my time writing Airflow pipelines, from small jobs to large ones.

The largest pipeline automated the regular download of reports from insurance carriers' portals that offered no API, and loaded each file into the data warehouse. Together the team covered dozens of files; I was responsible for five to ten of the portals. Data that would otherwise have to be downloaded by hand arrived automatically.

The warehouse, mostly SQL Server with some data in AWS S3, was organized in layers: raw copies of the source data, intermediate stages for cleaning and normalization, a top layer for end users, and tables with historical data. My pipelines fed the first stages.

I also looked for problems the team kept solving ad hoc, such as cleaning up column names from Excel files or handling temporary files between pipeline steps, and turned them into small shared helpers my teammates adopted. My rule since then: once the same code appears in two or three places, it becomes a shared function, but not sooner. Beyond my own team, I set up a Jenkins CI/CD pipeline for the newly formed Advanced Analytics team, modeled on ours.

The development process was strict, and I learned a lot from it: a local environment with Airflow and SQL Server in Docker, pull requests reviewed by two or three colleagues before a senior engineer merged them, a testing environment before every production deployment, and thorough documentation in Confluence.
