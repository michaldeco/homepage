---
title: Optimalizácia šrotu pri výrobe ocele
slug: scrap-optimization
summary: Ako člen malého tímu som vytvoril súbor nástrojov, ktorý pre každú tavbu ocele odporúča skladbu šrotu. Spája modely strojového učenia, optimalizáciu lineárnym programovaním a webové aplikácie pre operátorov, technológov a nákup. Jeho odporúčania sa niekoľko rokov používali pri každej tavbe v bežnej výrobe.
company: U. S. Steel Košice
role: Dátový vedec
period: 2021–2025
order: 4
tags: [Python, PyTorch, Linear programming, Django, Redis]
---

Moja pozícia bola dátový vedec, ale náš približne dvanásťčlenný tím fungoval ako *full-stack* produktový tím: dátoví vedci aj vyvíjali a prevádzkovali produkčný softvér a ja som často viac programoval ako modeloval.

Približne pätinu každej tavby ocele tvorí šrot. Oceliareň používala desiatky druhov šrotu s rôznym obsahom stopových prvkov, ako sú síra, cín a chróm, s rôznou cenou aj dostupnosťou, pričom každá akosť ocele stanovuje pre tieto prvky horné limity. Výber skladby šrotu preto znamená hľadať rovnováhu medzi nákladmi a rizikom, že tavba akosť nesplní.

V podtíme štyroch až piatich ľudí som pracoval na súbore nástrojov, ktorý tento výber robil:

- **Predikcia:** pre každý stopový prvok jeden model strojového učenia, ktorý predpovedal pravdepodobnosť, že tavba zostane v limite danej akosti.
- **Optimalizácia:** algoritmus, ktorý tieto predikcie skombinoval s lineárnym programovaním a vybral najlepšiu skladbu šrotu pre danú akosť a dostupný šrot.
- **Pre operátorov oceliarne:** webová aplikácia na zadávanie vstupov a prácu s odporúčaniami. Keď som odchádzal, testovalo sa napojenie na váhy v reálnom čase, ktoré zaznamenávalo, čo sa skutočne naložilo, nielen čo sa odporučilo.
- **Pre technológov:** aplikácia na definovanie pravidiel pre jednotlivé akosti, napríklad ktoré druhy šrotu sa nesmú použiť alebo kombinovať a koľko ich je povolené, a prehľad, ktorý vysvetľoval každé odporúčanie: vypočítané riziká a to, ktoré pravidlo alebo nedostatok akého šrotu viedli k danému výberu.
- **Pre oddelenie nákupu:** zjednodušená verzia na mesačné plánovanie nákupu šrotu.

Odporúčania sa niekoľko rokov používali pri každej tavbe, vo dne aj v noci, spočiatku popri pôvodnom softvéri, ktorý mal súbor nástrojov nahradiť. Technológovia používali editor pravidiel a vysvetľujúci prehľad vždy, keď ich potrebovali, a nákup robil plánovanie každý mesiac.

So všetkými tromi skupinami používateľov som pracoval priamo a ich spätná väzba formovala celý súbor nástrojov. Vysvetľujúci prehľad odpovedal na častú otázku technológov, prečo algoritmus zvolil jeden šrot namiesto iného. Keď sa používateľom zdal prvý optimalizátor, evolučný algoritmus, príliš pomalý, nahradili sme ho lineárnym programovaním.

Pracoval som prevažne na *backende*. Aplikácie bežali na Djangu, *frontend* bol najprv v Dashi a neskôr v Reacte, úlohy na pozadí spracúvali *workery* v Dramatiqu s Redisom a dáta boli v databáze Oracle. Nasadzovali sme ich ako Docker kontajnery, neskôr na Kubernetes, s CI/CD v Azure DevOps.
