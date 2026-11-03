---
title: Automatizácia denného procesu v Exceli a VBA pomocou Pythonu
slug: excel-automation
summary: Denný dátový proces v Exceli a VBA som krok za krokom a bez jeho prerušenia previedol na plne automatizovaný Python. Na záver som napísal otestovaného klienta v Pythone pre REST API softvéru na predpovede.
company: VSE (skupina innogy)
role: Dátový špecialista
period: 2017–2019
order: 6
tags: [Python, REST API, Excel/VBA automation, Testing]
---

VSE distribuuje a dodáva elektrinu na východnom Slovensku, približne v tretine krajiny. V jej oddelení nákupu elektriny malý tím predpovedal výrobu a spotrebu elektriny.

Keď som nastúpil, vstupné dáta pre softvér na predpovede - excelové a textové súbory na zdieľanom disku - každý deň spracúvali naplánované VBA makrá v Exceli. Excel bol potrebný, pretože prvá verzia predikčného softvéru ponúkala API iba ako knižnicu pre VBA. Makrá sa ťažko čítali aj ladili a proces si stále vyžadoval manuálne kroky, napríklad presúvanie spracovaných súborov medzi priečinkami.

Z vlastnej iniciatívy som túto prácu presunul do Pythonu v dvoch krokoch. Najprv som VBA API dodávateľa obalil niekoľkými funkciami, ktoré Python dokázal volať cez Excel. Novú logiku tak bolo možné písať v Pythone, zatiaľ čo pôvodné riešenie bežalo ďalej a starý VBA kód zostal ako záloha. Neskôr firma prešla na novšiu verziu predikčného softvéru s REST API a ja som pre ňu napísal balík v Pythone: triedu pre pripojenie s prehľadnými metódami na čítanie a zápis, ktorú skripty importovali. Tým Excel z procesu úplne zmizol. Okrem *unit* testov mal balík aj integračné testy, ktoré bežali proti testovacej inštancii softvéru na predpovede: zapísali skutočné dáta, načítali ich späť, porovnali výsledky a potom po sebe upratali.

Vstupy prichádzali z rôznych zdrojov počas celého dňa, od skorých ranných dát a ich opravených verzií až po poludňajšiu predpoveď počasia. Výsledkom bola sada malých skriptov v Pythone, ktoré každý vstup spracovali bez manuálnych krokov, bežali rýchlejšie ako VBA makrá, do logov zapisovali, čo robili, a dali sa oveľa ľahšie čítať aj meniť.
