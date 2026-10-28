---
title: Scrap optimization for steelmaking
summary: In a small team, built a toolkit that recommends the scrap mix for each heat of steel, combining machine-learning models, linear-programming optimization and web apps for operators, process engineers and purchasing. Its recommendations were used for every heat in daily production for several years.
company: U. S. Steel Košice
role: Data Scientist
period: 2021–2025
order: 4
tags: [Python, PyTorch, Linear programming, Django, Redis]
---

My title was data scientist, but our team of about twelve worked like a full-stack product team: data scientists also built and ran production software, and I often did more development than modeling.

Roughly a fifth of every heat of steel is scrap. The plant used dozens of scrap types with different levels of trace elements such as sulphur, tin and chromium, and with different prices and availability, while each steel grade sets upper limits on those elements. Choosing the scrap mix means balancing cost against the risk of missing the grade.

In a sub-team of four to five people, I worked on a toolkit that made this choice:

- **Prediction:** one machine-learning model per trace element, predicting the probability that the heat stays within the grade's limit.
- **Optimization:** an algorithm that combined these predictions with linear programming to select the best scrap mix for the grade and the scrap available.
- **For steel shop operators:** a web app to enter inputs and work with the recommendations. A real-time connection to the scales, recording what was actually loaded rather than just what was recommended, was in testing when I left.
- **For process engineers:** an app to define rules per grade, such as which scrap types can't be used or combined and how much of them is allowed, and a view explaining each recommendation: the calculated risks, and which rule or which shortage of scrap led to the choice.
- **For the purchasing department:** a simplified version for monthly scrap planning.

The recommendations were used for every heat, day and night, for several years; at first alongside the legacy software the toolkit was meant to replace. Process engineers used the rules editor and the explanation view whenever they needed them, and purchasing ran its planning every month.

I worked directly with all three groups of users, and their feedback shaped the toolkit. The explanation view answered process engineers' frequent question of why the algorithm chose one scrap over another. When users found the first optimizer, an evolutionary algorithm, too slow, we replaced it with linear programming.

I worked mostly on the backend. The apps ran on Django, with frontends first in Dash and later in React, background workers on Dramatiq and Redis, and an Oracle database, deployed as Docker containers and later on Kubernetes, with CI/CD in Azure DevOps. Scale readings streamed in over a socket API into Redis, which kept both the live data and a history for debugging. We had many unit tests but no UI tests, so before every release someone had to click through the basic functionality by hand. That taught me what missing UI tests cost, and I now write them for the apps I build.
