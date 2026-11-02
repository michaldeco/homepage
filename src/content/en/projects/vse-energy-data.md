---
title: Automating a daily Excel/VBA process with Python
summary: Moved a daily Excel/VBA data process to fully automated Python, step by step and without stopping it, ending with a tested Python client for the forecasting software's REST API.
company: VSE (innogy group)
role: Data Specialist
period: 2017–2019
order: 6
tags: [Python, REST API, Excel/VBA automation, Testing]
---

VSE distributes and supplies electricity across eastern Slovakia, roughly a third of the country. In its electricity purchase department, a small team forecast electricity production and consumption.

When I joined, the input data for the forecasting software, Excel and text files on a shared drive, was processed every day by scheduled VBA macros in Excel. Excel was needed because the first version of the forecasting software offered its API only as a library for VBA. The macros were hard to read and debug, and the process still needed manual steps, such as moving processed files between folders.

On my own initiative, I moved this work to Python in two steps. First, I wrapped the vendor's VBA API in a few functions that Python could call through Excel, so new logic could be written in Python while the existing setup kept running, with the old VBA code kept as a fallback. Later, the company upgraded to a version of the forecasting software with a REST API, and I wrote a Python package for it: a connection class with clear read and write methods, which the scripts imported. That removed Excel from the process completely. Besides unit tests, the package had integration tests that ran against a test instance of the forecasting software: they wrote real data, read it back, compared the results and cleaned up afterwards.

Inputs arrived from different sources throughout the day, from early-morning data and its corrected versions to the midday weather forecast. The result was a set of small Python scripts that processed each of them without manual steps, ran faster than the VBA macros, logged what they did, and were much easier to read and change.
