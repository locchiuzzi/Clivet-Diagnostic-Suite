/**
 * ============================================================================
 * CLIVET DIAGNOSTIC SUITE — FIELD SERVICE HUB REGISTRY
 * File: config/suite-registry.js
 * ============================================================================
 *
 * [EN] Declarative, local-first registry loaded synchronously via <script>.
 *      Works identically over local `file://` filesystems (zero CORS errors)
 *      and `https://` servers, with zero external dependencies.
 *
 * [IT] Registro dichiarativo local-first caricato in modo sincrono via <script>.
 *      Funziona senza errori CORS sia su filesystem locale `file://` che su
 *      server `https://`, senza alcuna dipendenza esterna.
 *
 * ----------------------------------------------------------------------------
 * HOW TO ADD A NEW TOOL IN 10 SECONDS / COME AGGIUNGERE UN TOOL IN 10 SECONDI
 * ----------------------------------------------------------------------------
 * 1. [EN] Save your standalone HTML tool in `tools/<category>/<tool-name>.html`.
 *    [IT] Salva il tuo tool HTML in `tools/<category>/<tool-name>.html`.
 * 2. [EN] Copy the commented template at the bottom of `tools` below.
 *    [IT] Copia il template commentato in fondo all'array `tools` qui sotto.
 * 3. [EN] Set a unique `id`, `order`, `href`, `category`, `tone`, `icon`,
 *         `protocols`, `accepts`, and inline `i18n` labels (en/it).
 *    [IT] Imposta `id` univoco, `order`, `href`, `category`, `tone`, `icon`,
 *         `protocols`, `accepts` e le etichette `i18n` (en/it).
 * 4. [EN] Save & reload `index.html` — no edits to `index.html` required.
 *    [IT] Salva e ricarica `index.html` — nessuna modifica a `index.html` richiesta.
 * ============================================================================
 */

(function (global) {
    'use strict';

    /**
     * Recursively freezes plain objects and arrays so runtime hub code
     * can never mutate the declarative registry source of truth.
     *
     * @template T
     * @param {T} target
     * @returns {T}
     */
    function deepFreeze(target) {
        if (target === null || typeof target !== 'object' || Object.isFrozen(target)) {
            return target;
        }
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
            deepFreeze(target[keys[i]]);
        }
        return Object.freeze(target);
    }

    /**
     * @typedef {Object} BookmarkPromptConfig
     * @property {boolean} enabled     - Abilita o disabilita il prompt "Aggiungi ai preferiti"
     * @property {number} snoozeHours  - Ore di attesa dopo chiusura/posticipo prima di riproporlo
     */

    /**
     * @typedef {Object} SuiteUiConfig
     * @property {number} maxVisibleCategories     - Categorie inline massime oltre a "Tutti"
     * @property {boolean} hideEmptyCategories     - Nasconde le categorie con 0 tool attivi
     * @property {number} maxVisibleChips          - Filtri rapidi inline massimi in #quick-chips-row
     * @property {string[]} defaultFavoriteChips   - ID dei chip mostrati di default nella barra
     * @property {BookmarkPromptConfig} bookmarkPrompt - Impostazioni del banner preferiti
     */

    /**
     * @typedef {Object} SuiteCategory
     * @property {string} id      - Unique category identifier
     * @property {number} order   - Display sort order
     * @property {'blue'|'indigo'|'amber'|'teal'|'rose'|'purple'|'sky'|'emerald'|'orange'|'cyan'} tone - Semantic Apple HIG tint token
     * @property {'analyzer'|'editor'|'flasher'|'configurator'|'calculator'|'simulator'|'scada'|'monitor'|'converter'|'utility'} icon - Icon glyph key
     * @property {string} i18nKey - Base dictionary key in `index.html`
     */

    /**
     * @typedef {Object} ProtocolChip
     * @property {string} id                 - Unique chip identifier
     * @property {boolean} enabled           - Set `false` to hide the chip from toolbar and popover
     * @property {'proto'|'ext'|'tag'} type  - Filter matching domain (`protocols`, `accepts`, or `keywords`)
     * @property {string} match              - Lowercase token matched against tool metadata
     * @property {string} label              - Visible pill label
     */

    /**
     * @typedef {Object} ToolLocaleStrings
     * @property {string} title - Localized tool title
     * @property {string} desc  - Localized concise tool description
     */

    /**
     * @typedef {Object} SuiteTool
     * @property {string} id                 - Unique kebab-case tool ID (used for favorites/recents)
     * @property {boolean} enabled           - Set `false` to hide a tool without deleting its entry
     * @property {number} order              - Default display priority
     * @property {string} href               - Relative path from root `index.html`
     * @property {string} category           - Must match one of `categories[].id`
     * @property {'blue'|'indigo'|'amber'|'teal'|'rose'|'purple'|'sky'|'emerald'|'orange'|'cyan'} tone - Card accent tint
     * @property {'analyzer'|'editor'|'flasher'|'configurator'|'calculator'|'simulator'|'scada'|'monitor'|'converter'|'utility'} icon - Tool icon key
     * @property {string} version            - Semantic version string (e.g. `"v1.0.0"`)
     * @property {string[]} protocols        - Supported protocols/domains (lowercase)
     * @property {string[]} accepts          - Accepted file extensions (lowercase with leading dot)
     * @property {string[]} [keywords]       - Technical IT/EN search synonyms and domain tags
     * @property {string[]} platforms        - Capabilities/targets: `"desktop"`, `"mobile"`, `"web-serial"`, `"offline"`
     * @property {string} i18nKey            - Dictionary lookup prefix
     * @property {Object.<string, ToolLocaleStrings>} [i18n] - Optional per-language override `{ en: { title, desc }, it: { title, desc } }`
     */

    const registry = {
        schemaVersion: '1.0',
        suiteVersion: 'v3.0.0',
        releaseDate: '2026-11',

        /**
         * ====================================================================
         * CONFIGURAZIONE INTERFACCIA HUB (`uiConfig`) — GUIDA MANUTENTORE
         * ====================================================================
         * - maxVisibleCategories: numero massimo di categorie visibili
         *   direttamente nel controllo segmentato (#cat-segmented-track) oltre
         *   a "Tutti" (consigliato <= 4 per rispettare il limite Apple HIG di
         *   5 segmenti totali). Le categorie successive vengono raggruppate
         *   automaticamente nel menu pull-down "Altre".
         * - hideEmptyCategories: se `true`, nasconde le categorie che non
         *   contengono alcun tool abilitato (`enabled: true`). Imposta `false`
         *   solo in debug per visualizzare anche gli slot futuri vuoti.
         * - maxVisibleChips: numero massimo di filtri rapidi mostrati inline
         *   in #quick-chips-row. Tutti gli altri chip restano sempre
         *   accessibili e fissabili tra i preferiti dal popover "Filtri".
         * - defaultFavoriteChips: elenco ordinato degli `id` di `protocolChips`
         *   mostrati di default in #quick-chips-row al primo avvio (prima che
         *   il tecnico personalizzi i propri preferiti).
         * - bookmarkPrompt: popup non invasivo "Aggiungi ai preferiti":
         *   `enabled` abilita/disabilita il suggerimento; `snoozeHours` indica
         *   le ore di pausa dopo che l'utente lo chiude o lo posticipa.
         * ====================================================================
         * @type {SuiteUiConfig}
         */
        uiConfig: {
            maxVisibleCategories: 4,
            hideEmptyCategories: true,
            maxVisibleChips: 5,
            defaultFavoriteChips: ['rs485', 'modbus', 'xml', 'log', 'csv'],
            bookmarkPrompt: {
                enabled: true,
                snoozeHours: 72
            }
        },

        /** @type {SuiteCategory[]} */
        categories: [
            { id: 'analyzers',     order: 1,  tone: 'blue',    icon: 'analyzer',     i18nKey: 'catAnalyzers' },
            { id: 'editors',       order: 2,  tone: 'indigo',  icon: 'editor',       i18nKey: 'catEditors' },
            { id: 'flashers',      order: 3,  tone: 'amber',   icon: 'flasher',      i18nKey: 'catFlashers' },
            { id: 'configurators', order: 4,  tone: 'teal',    icon: 'configurator', i18nKey: 'catConfigurators' },
            { id: 'calculators',   order: 5,  tone: 'rose',    icon: 'calculator',   i18nKey: 'catCalculators' },
            { id: 'simulators',    order: 6,  tone: 'purple',  icon: 'simulator',    i18nKey: 'catSimulators' },
            { id: 'scada',         order: 7,  tone: 'sky',     icon: 'scada',        i18nKey: 'catScada' },
            { id: 'monitors',      order: 8,  tone: 'emerald', icon: 'monitor',      i18nKey: 'catMonitors' },
            { id: 'converters',    order: 9,  tone: 'orange',  icon: 'converter',    i18nKey: 'catConverters' },
            { id: 'utilities',     order: 10, tone: 'cyan',    icon: 'utility',      i18nKey: 'catUtilities' }
        ],

        /**
         * ====================================================================
         * FILTRI RAPIDI (`protocolChips`) — COME AGGIUNGERE NUOVI CHIP
         * ====================================================================
         * Aggiungi un oggetto con:
         * - id:      identificativo univoco kebab-case (es. 'canbus', 'pdf')
         * - enabled: `true` per renderlo selezionabile nel popover/preferiti
         * - type:    'proto' -> confrontato con `tool.protocols[]`
         *            'ext'   -> confrontato con `tool.accepts[]` (con punto)
         *            'tag'   -> confrontato con `tool.keywords[]` / `protocols`
         * - match:   token esatto in minuscolo (es. 'bacnet', '.json', 'rtu')
         * - label:   testo mostrato sul chip (es. 'BACnet', '.JSON')
         * ====================================================================
         * @type {ProtocolChip[]}
         */
        protocolChips: [
            { id: 'rs485',  enabled: true, type: 'proto', match: 'rs485',  label: 'RS-485' },
            { id: 'modbus', enabled: true, type: 'proto', match: 'modbus', label: 'Modbus' },
            { id: 'xml',    enabled: true, type: 'ext',   match: '.xml',   label: '.XML' },
            { id: 'log',    enabled: true, type: 'ext',   match: '.log',   label: '.LOG' },
            { id: 'csv',    enabled: true, type: 'ext',   match: '.csv',   label: '.CSV' },
            { id: 'txt',    enabled: true, type: 'ext',   match: '.txt',   label: '.TXT' },
            { id: 'bacnet', enabled: true, type: 'proto', match: 'bacnet', label: 'BACnet' },
            { id: 'tcpip',  enabled: true, type: 'proto', match: 'tcpip',  label: 'TCP/IP' },
            { id: 'json',   enabled: true, type: 'ext',   match: '.json',  label: '.JSON' }
        ],

        /** @type {SuiteTool[]} */
        tools: [
            {
                id: 'alarm-snapshot-analyzer',
                enabled: true,
                order: 1,
                href: 'tools/analyzers/alarm-analyzer-hub.html',
                category: 'analyzers',
                tone: 'blue',
                icon: 'analyzer',
                version: 'v1.0.0',
                protocols: ['diagnostics'],
                accepts: ['.log', '.csv', '.txt'],
                keywords: ['allarmi', 'storico', 'diagnostica', 'errori', 'chiller', 'pompa di calore', 'snapshot', 'history', 'alarms', 'logs', 'faults', 'troubleshooting'],
                platforms: ['desktop', 'mobile', 'offline'],
                i18nKey: 'analyzer'
            },
            {
                id: 'xml-parameter-editor',
                enabled: true,
                order: 2,
                href: 'tools/editors/xml-parameter-editor.html',
                category: 'editors',
                tone: 'indigo',
                icon: 'editor',
                version: 'v1.0.0',
                protocols: ['modbus'],
                accepts: ['.xml'],
                keywords: ['parametri', 'confronto', 'diff', 'modifica', 'lista', 'configurazione', 'parameters', 'xml', 'compare', 'edit', 'list', 'settings'],
                platforms: ['desktop', 'mobile', 'offline'],
                i18nKey: 'xmlEditor'
            },
            {
                id: 'swrbc-flasher',
                enabled: true,
                order: 3,
                href: 'tools/flashers/swrbc-flasher.html',
                category: 'flashers',
                tone: 'amber',
                icon: 'flasher',
                version: 'v1.0.0',
                protocols: ['rs485', 'modbus'],
                accepts: ['.xml'],
                keywords: ['scrittura', 'seriale', 'com', 'aggiornamento', 'upload', 'plc', 'rtu', 'flasher', 'rs485', 'modbus', 'firmware', 'serial'],
                platforms: ['desktop', 'web-serial', 'offline'],
                i18nKey: 'flasher'
            }

            /* ----------------------------------------------------------------
             * [TEMPLATE — TOOL #4 EXAMPLE]
             * Copy, uncomment, and customize to register a new tool without
             * modifying `index.html`. Inline `i18n` overrides take priority
             * over the hub dictionary (automatically falling back to `en`).
             * ----------------------------------------------------------------
            ,{
                id: 'modbus-live-monitor',
                enabled: true,
                order: 4,
                href: 'tools/monitors/modbus-live-monitor.html',
                category: 'monitors',
                tone: 'emerald',
                icon: 'monitor',
                version: 'v1.0.0',
                protocols: ['rs485', 'modbus'],
                accepts: ['.csv', '.log'],
                keywords: ['live', 'polling', 'telemetria', 'registri', 'telemetry', 'trend', 'registers'],
                platforms: ['desktop', 'web-serial', 'offline'],
                i18nKey: 'modbusMonitor',
                i18n: {
                    en: {
                        title: 'Modbus Live Register Monitor',
                        desc: 'Real-time RS-485 register polling, live trend inspection, and CSV telemetry capture.'
                    },
                    it: {
                        title: 'Monitor Live Registri Modbus',
                        desc: 'Lettura in tempo reale dei registri RS-485, analisi trend e acquisizione telemetria CSV.'
                    }
                }
            }
            */
        ]
    };

    global.CLIVET_SUITE_REGISTRY = deepFreeze(registry);
})(typeof window !== 'undefined' ? window : globalThis);
