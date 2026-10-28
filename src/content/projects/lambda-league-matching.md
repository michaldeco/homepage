---
title: Candidate matching and scoring for a recruiting startup
summary: Worked on the scoring that ranked candidates for each open role, and trained its two machine-learning models, one for how well a role fits a candidate's career and one for how likely they are to change jobs. The founder used the ranking daily to decide whom to contact.
company: Lambda League
role: Software Engineer
period: 2025–2026
order: 1
tags: [Python, LightGBM, Embeddings, pgvector, Statistics]
---

Lambda League is a recruiting startup founded by my former manager from GoHealth, who had spent years sourcing candidates for technical roles. I joined as a remote contractor, and the two of us built the data platform, the apps and the scoring behind his work.

The goal was to find, for a given role at a given company, the candidates who fit best and might be willing to join. Each candidate's score combined several sub-scores, from machine-learning models to the similarity between embeddings of the candidate's and the role's profiles, stored in Postgres with pgvector. The sub-scores had different scales, so a normalization layer converted each into a percentile against a regularly refreshed sample of candidates. In the portal app, the recruiter chose which sub-scores to use for each role and with what weights.

I trained two of these sub-scores, both LightGBM classifiers. They started as proofs of concept and ran in production for almost a year:

- **Role fit:** trained on real career histories, with each person's current position as a positive example and positions from other people's careers as negative examples. Features included location, title, industry and years of experience.
- **Job change likelihood:** each position was turned into monthly records, with the time in the position as a feature and a positive label in the month the person moved on, a discrete-time survival model. Since the recruiter needed to know whom to contact first, we evaluated it by ranking quality, with AUC and lift.
