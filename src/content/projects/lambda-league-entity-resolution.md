---
title: Entity resolution for companies and schools
summary: Replaced name-based IDs, which caused duplicate and wrongly merged companies and schools, with entity resolution based on stable source identifiers and matching heuristics, plus a review screen where a person decides the uncertain cases.
company: Lambda League
role: Software Engineer
period: 2025–2026
order: 2
tags: [Python, PostgreSQL, Data quality, Fuzzy matching]
---

In the startup's candidate database, companies and schools originally got their internal IDs from their names. That caused two kinds of errors: one company appearing as several entities, and different companies merged into one. Both distorted the candidate scores, which depended on where people had worked and studied.

The key finding was that most raw records already carried stable identifiers from their source, which the pipeline had not been using. These resolved the large majority of entities. For the rest, heuristics took over: for example, a record whose normalized name matched exactly one existing entity was assigned to it. For schools, we also tried aliases, blocking and fuzzy name matching.

Automatic rules can't decide everything, so I added an entity-resolution section to the portal app:

- a review queue of potential matches, with supporting information, for a person to decide;
- a dashboard with statistics, such as the number of entities and of suspicious ones, for example a company with many different names;
- tools to merge entities or keep them separate by hand.

Schools also got a hierarchy of universities and their departments, so that alumni of the same university scored the same.

The design was a compromise between a standard approach, an entity table with a journal of merges and splits, and the existing internal IDs used throughout the database. Introducing it meant migrating data and rebuilding large parts of the staging and final layers. Companies and schools were done when I left; people were next. The experience taught me how much cheaper it is to get identity right at the start of a data project.
