---
title: Replacing a VBA workbook with a tested Python pipeline
company: VSE (innogy group)
role: Data Specialist
period: 2017–2019
order: 3
tags: [Python, REST API, End-to-end testing, Legacy migration]
---

VSE distributes and supplies electricity across eastern Slovakia, roughly a third of the country. In its electricity purchase department, a small team forecast electricity production and consumption. Part of the electricity came from solar panels, and at that scale even a few percent of solar power makes the forecasts strongly dependent on the weather.

The input data for the forecasting software arrived as Excel and text files and was prepared by a large VBA macro in a single Excel workbook that was nearly impossible to debug or change. On my own initiative, I replaced it with a Python library and a set of small, dedicated scripts that talked to the forecasting software through its REST API. Every script was configurable and easy to debug, and an end-to-end test suite ran against a test instance of the forecasting software. The new pipeline ran reliably and made changes much easier to make.
