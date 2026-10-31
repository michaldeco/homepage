---
title: Airflow pipeline a spoločné nástroje pre dátový sklad
summary: Vytváral som pipeline v Airflow, ktoré plnili viacvrstvový dátový sklad v SQL Serveri, vrátane automatického sťahovania reportov z partnerských portálov poisťovní, ktoré nemali API. Napísal som aj spoločné pomocné funkcie, ktoré prevzali kolegovia z tímu.
company: GoHealth
role: Dátový inžinier
period: 2019–2021
order: 5
tags: [Python, Airflow, SQL Server, AWS S3, Jenkins]
---

GoHealth je americká online platforma na predaj zdravotného poistenia. Pridal som sa k jednému z jej tímov dátových inžinierov, ktorý mal päť až osem ľudí, a väčšinu času som písal *pipeline* v Airflow, od malých až po veľké.

Najväčšia *pipeline* automatizovala pravidelné sťahovanie reportov z portálov poisťovní, ktoré neponúkali API, a každý súbor nahrala do dátového skladu. Tím spolu pokrýval desiatky súborov a ja som mal na starosti päť až desať portálov. Dáta, ktoré by inak niekto musel sťahovať ručne, prichádzali automaticky.

Sklad, prevažne v SQL Serveri a čiastočne v AWS S3, bol rozdelený do vrstiev: surové kópie zdrojových dát, medzistupne na čistenie a normalizáciu, horná vrstva pre koncových používateľov a tabuľky s historickými dátami. Moje *pipeline* plnili prvé stupne.

Hľadal som aj problémy, ktoré tím opakovane riešil *ad hoc*, napríklad čistenie názvov stĺpcov z excelových súborov alebo prácu s dočasnými súbormi medzi krokmi *pipeline*, a premenil som ich na malé spoločné pomocné funkcie, ktoré kolegovia prevzali. Odvtedy sa riadim pravidlom: keď sa rovnaký kód objaví na dvoch či troch miestach, stane sa z neho spoločná funkcia, ale nie skôr. Mimo vlastného tímu som novovzniknutému tímu Advanced Analytics nastavil CI/CD *pipeline* v Jenkinse podľa vzoru tej našej.

Vývojový proces bol prísny a veľa som sa z neho naučil: lokálne prostredie s Airflow a SQL Serverom v Dockeri, *pull requesty*, ktoré skontrolovali dvaja či traja kolegovia, kým ich *senior* inžinier zlúčil, testovacie prostredie pred každým nasadením do produkcie a dôkladná dokumentácia v Confluence.
