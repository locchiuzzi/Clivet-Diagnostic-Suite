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
     * @typedef {Object} SuiteCategory
     * @property {string} id      - Unique category identifier
     * @property {number} order   - Display sort order
     * @property {'blue'|'indigo'|'amber'|'emerald'|'purple'|'cyan'} tone - Semantic Apple HIG tint token
     * @property {'analyzer'|'editor'|'flasher'|'monitor'|'converter'|'utility'} icon - Icon glyph key
     * @property {string} i18nKey - Base dictionary key in `index.html`
     */

    /**
     * @typedef {Object} ProtocolChip
     * @property {string} id             - Unique chip identifier
     * @property {'proto'|'ext'} type    - Filter matching domain (`protocols` vs `accepts`)
     * @property {string} match          - Lowercase token matched against tool metadata
     * @property {string} label          - Visible pill label
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
     * @property {'blue'|'indigo'|'amber'|'emerald'|'purple'|'cyan'} tone - Card accent tint
     * @property {'analyzer'|'editor'|'flasher'|'monitor'|'converter'|'utility'} icon - Tool icon key
     * @property {string} version            - Semantic version string (e.g. `"v1.0.0"`)
     * @property {string[]} protocols        - Supported protocols/domains (lowercase)
     * @property {string[]} accepts          - Accepted file extensions (lowercase with leading dot)
     * @property {string[]} platforms        - Capabilities/targets: `"desktop"`, `"mobile"`, `"web-serial"`, `"offline"`
     * @property {string} i18nKey            - Dictionary lookup prefix (`tool_<i18nKey>_title` / `_desc`)
     * @property {Object.<string, ToolLocaleStrings>} [i18n] - Optional per-language override `{ en: { title, desc }, it: { title, desc } }`
     */

    const registry = {
        schemaVersion: '1.0',
        suiteVersion: 'v3.0.0',
        releaseDate: '2026-11',

        /** @type {SuiteCategory[]} */
        categories: [
            { id: 'analyzers',  order: 1, tone: 'blue',    icon: 'analyzer',  i18nKey: 'cat_analyzers' },
            { id: 'editors',    order: 2, tone: 'indigo',  icon: 'editor',    i18nKey: 'cat_editors' },
            { id: 'flashers',   order: 3, tone: 'amber',   icon: 'flasher',   i18nKey: 'cat_flashers' },
            { id: 'monitors',   order: 4, tone: 'emerald', icon: 'monitor',   i18nKey: 'cat_monitors' },
            { id: 'converters', order: 5, tone: 'purple',  icon: 'converter', i18nKey: 'cat_converters' },
            { id: 'utilities',  order: 6, tone: 'cyan',    icon: 'utility',   i18nKey: 'cat_utilities' }
        ],

        /** @type {ProtocolChip[]} */
        protocolChips: [
            { id: 'rs485',  type: 'proto', match: 'rs485',  label: 'RS-485' },
            { id: 'modbus', type: 'proto', match: 'modbus', label: 'Modbus' },
            { id: 'xml',    type: 'ext',   match: '.xml',   label: '.XML' },
            { id: 'log',    type: 'ext',   match: '.log',   label: '.LOG' },
            { id: 'csv',    type: 'ext',   match: '.csv',   label: '.CSV' }
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
