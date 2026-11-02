---
title: Deduplikácia firiem a škôl (entity resolution)
slug: entity-resolution
summary: Identifikátory odvodené z názvov, kvôli ktorým vznikali duplicitné aj chybne zlúčené firmy a školy, som nahradil procesom entity resolution. Stavia na stabilných identifikátoroch zo zdrojových dát a heuristikách párovania, a o neistých prípadoch rozhoduje človek na kontrolnej obrazovke.
company: Lambda League
role: Softvérový inžinier
period: 2025–2026
order: 2
tags: [Python, PostgreSQL, Data quality, Fuzzy matching]
---

V databáze kandidátov tohto startupu dostávali firmy a školy interné identifikátory odvodené z ich názvov. To spôsobovalo dva druhy chýb: jedna firma sa objavovala ako viacero entít a naopak, rôzne firmy sa zlúčili do jednej. Oboje skresľovalo skóre kandidátov, ktoré záviselo od toho, kde ľudia pracovali a študovali.

Kľúčovým zistením bolo, že väčšina surových záznamov už obsahovala stabilné identifikátory zo zdroja, ktoré *pipeline* dovtedy nevyužívala. Tie vyriešili prevažnú väčšinu entít. Na zvyšok nastúpili heuristiky: napríklad záznam, ktorého normalizovaný názov zodpovedal práve jednej existujúcej entite, sa priradil k nej. Pri školách sme skúšali aj aliasy, *blocking* a približné porovnávanie názvov (*fuzzy matching*).

Automatické pravidlá nerozhodnú všetko, preto som do aplikácie Portal pridal sekciu pre *entity resolution*:

- zoznam potenciálnych zhôd s podpornými informáciami, o ktorých rozhodne človek;
- prehľad so štatistikami, napríklad s počtom entít a podozrivých entít, ako je firma s mnohými rôznymi názvami;
- nástroje na ručné zlúčenie entít alebo na ich ponechanie oddelene.

Školy dostali aj hierarchiu univerzít a ich fakúlt, aby absolventi tej istej univerzity, ale rôznych fakúlt, mali rovnaké skóre.

Návrh bol kompromisom medzi štandardným prístupom, teda tabuľkou entít so záznamom zlúčení a rozdelení, a existujúcimi internými identifikátormi, ktoré sa používali v celej databáze. Jeho zavedenie si vyžiadalo migráciu dát a prebudovanie veľkej časti *staging* a finálnej vrstvy. Táto skúsenosť ma naučila, o koľko lacnejšie je vyriešiť identitu záznamov hneď na začiatku dátového projektu.
