---
title: Dátová platforma a aplikácie pre náborový startup
slug: data-platform
summary: Spolu so zakladateľom dvojčlenného startupu som vybudoval jeho dátovú platformu a aplikácie. Dagster plnil stredne veľkú databázu Postgres s viac ako sto tabuľkami a API aj webové aplikácie bežali na AWS spravovanom cez Terraform. Zakladateľ tieto nástroje používal každý deň a výrazne mu zvýšili počet kandidátov, ktorých dokázal denne osloviť.
company: Lambda League
role: Softvérový inžinier
period: 2025–2026
order: 3
tags: [Python, PostgreSQL, Dagster, FastAPI, AWS, Terraform, Claude Code]
---

V dvojčlennom tíme sme si väčšinu práce delili a väčšiu časť zvyčajne robil zakladateľ. Mojou prácou bol Terraform, aplikácia pre kandidátov a jednotlivé funkcie spomenuté nižšie.

**Dáta.** Databáza obsahovala údaje o kandidátoch, firmách a školách, prevažne usporiadané do surovej, *staging* a finálnej vrstvy, s vyhľadávacími tabuľkami na rýchle filtrovanie a s množstvom JSONB. Aktualizoval ju denný *job* v Dagsteri, približne s jedným *assetom* na tabuľku, z ktorých asi tretina bola moja, a všetky tabuľky mali svoje modely v SQLAlchemy. Inkrementálne aktualizácie a šírenie nových záznamov do nadväzujúcich tabuliek zabezpečoval malý *framework*, ktorý navrhol prevažne zakladateľ. Zrýchlil som ho: výber nových záznamov z predchádzajúcich tabuliek sa dovtedy počítal znova pre každú dávku, odvtedy sa počítal iba raz a uložil sa do tabuľky, ktorá sa potom zmazala. Dočasné tabuľky neprichádzali do úvahy, pretože pripojenie k databáze išlo cez *proxy*. Spoločne sme pridávali indexy a analyzovali *query* plány, aby sa kandidáti dali rýchlo filtrovať a zoraďovať podľa mnohých rôznych skóre.

**Aplikácie.** Hlavným nástrojom zakladateľa bola aplikácia Portal, v ktorej prezeral kandidátov, vytváral pozície a porovnával s nimi kandidátov. Vznikla v Streamlite a neskôr prešla na React s *backendom* vo FastAPI. Pridal som do nej funkcie ako zostavovač stromu filtrov pre vlastné sady filtrov, profilové stránky firiem, priebeh vyhodnocovania kandidátov a vytváranie pozícií, pri ktorom jazykový model vytiahol z popisu pozície jej atribúty a vyplnil formulár. V pozadí aplikácií prepájalo databázu s externými službami API. Druhú aplikáciu, určenú kandidátom, som postavil sám od začiatku do konca: databázové tabuľky, API *endpointy*, *backend* vo FastAPI a *frontend* v Reacte, všetko v jednom repozitári. Údaje o firmách načítavala na požiadanie od externého poskytovateľa dát, s mesačným rozpočtom, aby nikto nemohol minúť všetky platené kredity. Jej testy bežali v CI: *unit* testy pre API a *backend*, Vitest pre *frontend* a Playwright pre používateľské rozhranie.

**Infraštruktúra.** Založil som repozitár pre Terraform a postupne doň presúval infraštruktúru na AWS, komponent po komponente, s `terraform plan` v CI a `terraform apply` v CD. Aplikácie bežali na ECS za jedným *load balancerom* a na ECS sa z našich notebookov presunula aj *pipeline* v Dagsteri. Veľkosť databázy sme prispôsobili záťaži: keď denný *job* začal bežať v noci, *read* repliku nahradila jedna väčšia inštancia a výkon sme dočasne navyšovali len pri náročných migráciách.

Väčšinu svojho kódu som tam písal s Claude Code, vďaka čomu som toho rýchlo veľa vytvoril. Sústredil som sa na návrh riešenia a myšlienky, na ktorých stojí, a priebežne som pridával testy, pretože vďaka nim AI sama vidí, čo sa pokazilo.
