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

## 📄 Licenza

Questo progetto è distribuito sotto licenza proprietaria Clivet S.p.A. Tutti i diritti riservati.
