---
title: Dátová platforma a aplikácie pre náborový startup
slug: data-platform
summary: So zakladateľom dvojčlenného startupu sme vybudovali jeho dátovú platformu a aplikácie. Dagster plnil stredne veľkú databázu Postgres s viac ako sto tabuľkami a API aj webové aplikácie bežali na AWS spravovanom cez Terraform. Nástroje sa používali každý deň a výrazne zvýšili počet kandidátov, ktorých sa podarilo denne osloviť.
company: Lambda League
role: Softvérový inžinier
period: 2025–2026
order: 3
tags: [Python, PostgreSQL, Dagster, FastAPI, AWS, Terraform, Claude Code]
---

V dvojčlennom tíme sme si väčšinu práce delili, takže som pracoval naprieč celým *stackom*, od nastavenia Terraformu až po aplikáciu pre kandidátov.

**Dáta.** Databáza Postgres obsahovala údaje o kandidátoch, firmách a školách, často usporiadané do surovej, *staging* a finálnej vrstvy, s vyhľadávacími tabuľkami na rýchle filtrovanie a s množstvom JSONB stĺpcov. Aktualizoval ju denný *job* v Dagsteri, približne s jedným *assetom* na tabuľku, a všetky tabuľky mali svoje modely v SQLAlchemy. Inkrementálne aktualizácie a šírenie nových záznamov do nadväzujúcich tabuliek zabezpečoval malý vlastný *framework*. Aplikáciám sprístupňovalo naše dáta API vo Flasku.

**Aplikácie.** Hlavným nástrojom bola aplikácia pre náborárov na prezeranie kandidátov, vytváranie pozícií a porovnávanie kandidátov s nimi. Vznikla v Streamlite a neskôr prešla na React s *backendom* vo FastAPI. Mala profilové stránky kandidátov a firiem, množstvo filtrov a dokonca aj zostavovač stromu filtrov na vytváranie a ukladanie vlastných sád filtrov. Pri vytváraní novej pozície mohol používateľ vyplniť povinné polia sám alebo ich nechať automaticky vyplniť jazykovým modelom podľa popisu pozície. Druhú aplikáciu, určenú kandidátom, som postavil sám od začiatku do konca: databázové tabuľky, API *endpointy*, *backend* vo FastAPI a *frontend* v Reacte, všetko v jednom *polyglot* repozitári. Údaje o firmách načítavala na požiadanie od externého poskytovateľa dát, s mesačným rozpočtom, aby nikto nemohol minúť všetky platené kredity. Jej testy bežali v CI: *unit* testy pre API a *backend*, Vitest pre *frontend* a Playwright pre používateľské rozhranie.

**Infraštruktúra.** Infraštruktúru na AWS sme mali definovanú v repozitári pre Terraform, s `terraform plan` v CI a `terraform apply` v CD. Aplikácie bežali na ECS za jedným *load balancerom* a na ECS bežali aj *pipeline* v Dagsteri a databázové API.

Väčšinu svojho kódu som tam písal s Claude Code, vďaka čomu som toho rýchlo veľa vytvoril. Sústredil som sa na návrh riešenia a myšlienky, na ktorých stojí, a priebežne som pridával testy, pretože vďaka nim AI sama vidí, čo sa pokazilo.
