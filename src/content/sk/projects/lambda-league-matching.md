---
title: Výber a skórovanie kandidátov pre náborový startup
slug: candidate-scoring
summary: Podieľal som sa na systéme skórovania, ktorý zoraďoval kandidátov na každú otvorenú pozíciu, a natrénoval som jeho dva modely strojového učenia. Prvý určoval, ako dobre pozícia nadväzuje na doterajšiu kariéru kandidáta, druhý zas určoval pravdepodobnosť, že kandidát zmení prácu.
company: Lambda League
role: Softvérový inžinier
period: 2025–2026
order: 1
tags: [Python, LightGBM, Statistics, Claude Code]
---

Lambda League je náborový startup, ktorý založil môj bývalý manažér z GoHealth. Predtým roky vyhľadával kandidátov na technické pozície. Pridal som sa k nemu ako externý spolupracovník na diaľku a vo dvojici sme vybudovali dátovú platformu, aplikácie aj systém skórovania, ktoré mu pomáhajú s jeho prácou.

Cieľom bolo pre danú pozíciu v danej firme nájsť kandidátov, ktorí sa na ňu najlepšie hodia a mohli by mať záujem o zmenu. Celkové skóre kandidáta sa skladalo z viacerých čiastkových skóre, od modelov strojového učenia až po rôzne metriky kompatibility. Čiastkové skóre mali rôzne škály, preto ich normalizačná vrstva prevádzala na jednu spoločnú. V aplikácii Portal, v ktorej sa kandidáti skórovali a vyberali na oslovenie, si náborár pre každú pozíciu zvolil, ktoré čiastkové skóre a s akou váhou použije.

Dve z týchto čiastkových skóre som natrénoval ja, obe ako klasifikátory LightGBM. Začínali ako overenie konceptu a v produkcii bežali takmer rok:

- **Zhoda s kariérou:** ako dobre pozícia nadväzuje na doterajšiu kariéru kandidáta. Model sa učil zo skutočných kariérnych histórií.
- **Pravdepodobnosť zmeny práce:** ako pravdepodobne kandidát čoskoro odíde zo súčasnej pozície, modelované metódami analýzy prežívania podľa času stráveného na súčasnej pozícii. Náborár potreboval vedieť, koho osloviť ako prvého, preto sme model hodnotili podľa kvality poradia, pomocou AUC a *liftu*.
