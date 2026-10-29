# Clivet Diagnostic Suite

<p align="center">
  <b>Piattaforma Integrata di Diagnostica, Configurazione e Telemetria per Sistemi HVAC e Pompe di Calore</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status">
  <img src="https://img.shields.io/badge/platform-web%20%7C%20industrial-blue.svg" alt="Platform">
  <img src="https://img.shields.io/badge/domain-HVAC%20%7C%20Energy%20Automation-orange.svg" alt="Domain">
</p>

---

## 🏗️ Panoramica del Progetto

**Clivet Diagnostic Suite** è un ecosistema software centralizzato progettato per ingegneri di campo, tecnici di commissioning e specialisti di R&D nel settore della climatizzazione e dell'efficienza energetica. 

La suite nasce con l'obiettivo di superare la frammentazione degli strumenti di diagnostica tradizionali, integrando in un'unica interfaccia web moderna e reattiva una serie di tool specialistici per l'interazione con i dispositivi di controllo Clivet. Il progetto coniuga tre pilastri ingegneristici fondamentali:
1. **Ingegneria Informatica:** Architettura frontend modulare, performance elevate, persistenza locale dei dati e design system scalabile basato su standard web moderni.
2. **Ingegneria dell'Automazione:** Gestione dei protocolli di comunicazione industriale, flashing dei parametri operativi su bus di campo e analisi in tempo reale degli stati di funzionamento e degli allarmi macchina.
3. **Ingegneria Energetica:** Monitoraggio dei parametri termodinamici, ottimizzazione dei cicli frigoriferi e delle pompe di calore, e diagnostica mirata alla massimizzazione dell'efficienza stagionale (SCOP/SEER) e alla riduzione dei consumi energetici.

---

## 🚀 Architettura e Moduli Principali

La suite è strutturata come un hub centrale che dà accesso a differenti moduli applicativi specializzati:

* **Analizzatore di Telemetria e Log:** Strumenti computazionali per l'importazione, il parsing e la visualizzazione grafica di registri e trend storici provenienti dai controllori di impianto.
* **Editor di Configurazioni (XML/Parametri):** Utility avanzate per la validazione sintattica e semantica dei file di configurazione, la gestione dei setpoint e la personalizzazione dei profili operativi.
* **Tool di Aggiornamento e Flash (Firmware/Parametri):** Interfacce dedicate al download e al caricamento diretto di pacchetti di configurazione e firmware sulle unità installate tramite comunicazione seriale/bus.

---

## 🛠️ Tecnologie Utilizzate

* **Frontend:** HTML5, Tailwind CSS (Design system customizzato con supporto Dark/Light mode nativo), JavaScript ES6+.
* **Architettura:** Single Page Application (SPA) modulare, orientata all'esecuzione client-side per la massima portabilità e velocità di accesso sul campo.
* **Comunicazione & Interfacce:** Standard di comunicazione industriale (Modbus / RS-485) e gestione file strutturati (XML/JSON).

---

## 💡 Vantaggi Operativi

* **Riduzione dei Tempi di Intervento:** Accesso immediato a tutti gli strumenti di diagnostica da qualsiasi dispositivo (tablet, PC, terminali mobili) senza installazioni complesse.
* **Standardizzazione e Affidabilità:** Validazione automatica dei parametri per prevenire errori di configurazione su impianti complessi.
* **Manutenzione Predittiva e Corrective:** Analisi approfondita dei dati di campo per individuare tempestivamente derive prestazionali o anomalie nei cicli termodinamici.

---

## ⚖️ Licenza e Disclaimer

Questo progetto è distribuito sotto **MIT License**, con le seguenti note di esonero di responsabilità:

* **Natura del Progetto:** Questo software è uno strumento di supporto indipendente, sviluppato a titolo personale/professionale come utility di diagnostica e configurazione.
* **Assenza di Affiliazione:** Il progetto **non** è un prodotto ufficiale, né è sponsorizzato, endossato o affiliato in alcun modo con **Clivet S.p.A.** o con i rispettivi marchi registrati. Tutti i nomi di marchi, loghi e riferimenti citati appartengono ai legittimi proprietari e sono utilizzati a solo scopo descrittivo e di interoperabilità tecnica.
* **Esonero di Responsabilità:** Il software viene fornito *"così com'è" (as is)*, senza garanzie di alcun tipo, esplicite o implicite. L'autore non potrà essere ritenuto responsabile per eventuali danni diretti, indiretti, incidentali o conseguenti (inclusi, a titolo esemplificativo, malfunzionamenti di impianti, perdita di dati o fermi macchina) derivanti dall'uso o dall'errata configurazione tramite questo strumento.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USER/APPLICATION FIELD.
