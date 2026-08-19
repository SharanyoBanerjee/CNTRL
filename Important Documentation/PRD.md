# Project Requirements Document (PRD) — CNTRL Browser

## 1. Product Overview & Vision

**CNTRL Browser** is a next-generation, local-first, intent-based autonomous web browser. Designed for privacy-conscious power users, developers, and AI enthusiasts, CNTRL bridges the gap between traditional manual web navigation and fully autonomous AI agents.

### Core Aim
To empower users to navigate, automate, and interact with the web through natural language intents, backed by local/hybrid LLMs, secure memory engines, a unified **Chromium base browser engine (CDP)**, pixel-perfect vector SVG interface icons, and zero-plaintext key storage.

---

## 2. Target Audience

1. **Power Users & Automators**: Professionals who perform repetitive web workflows (data collection, monitoring, forms, report synthesis).
2. **Developers & Engineers**: Open-source contributors looking for a modular, extensible browser architecture built on Tauri v2, Chromium CDP, and SolidJS.
3. **Privacy-Conscious Users**: Individuals who demand local LLM execution (Ollama) and local encrypted vector memory without sending browsing history to cloud servers.

---

## 3. Capabilities Built to Date (v0.2.0-beta Release)

CNTRL Browser has completed its 7-Phase architecture roadmap and v0.2.0-beta baseline feature suite:

| Capability | Implementation Details |
|---|---|
| **Chromium Base Engine** | Unified Chromium engine controller (`ChromiumManager`) managing page navigation, DOM inspection, and target lifecycle via Chrome DevTools Protocol (CDP). |
| **Internal `cntrl://` Router** | Client-side & IPC router mounted to `cntrl://home`, `cntrl://settings`, `cntrl://plugins`, `cntrl://audit`, `cntrl://history`, `cntrl://downloads`, `cntrl://bookmarks`. |
| **Native Webview Isolation** | Multi-tab container using native OS child webviews integrated with Tauri v2 shell, keeping native overlays hidden for internal routes to prevent visual blocking. |
| **Vector SVG Icon Suite** | 100% vector SVG icons (`Icons.tsx`) replacing all emojis across the entire UI interface. |
| **Baseline Feature Suite** | History Manager (`cntrl://history`), Downloads Manager (`cntrl://downloads`), Bookmarks Manager (`cntrl://bookmarks`), Find in Page (`Cmd+F`), and Zoom controls. |
| **Shortcut Discovery** | Interactive Keyboard Shortcut Modal (`Cmd+/` or `cntrl://shortcuts`) listing all keybindings. |
| **Security & Guardrails** | Interactive Guardrail Modal (`GuardrailDialog.tsx`) for destructive action confirmation, First-Run Privacy Consent modal (`FirstRunConsent.tsx`), and one-click database memory purge. |
| **Playwright Fallback Engine** | Headless fallback engine rendering complex or WebKit-hostile pages safely inside a sandboxed iframe. |
| **Hybrid AI Brain** | 3-tier router supporting Tier 1 (Local Ollama), Tier 2 (Gemini, Groq, HuggingFace, OpenRouter), Tier 3 (OpenAI-compatible endpoints). |
| **Secure Key Enclave** | 100% OS Keychain secret storage (macOS Keychain, Windows Credential Manager, Linux Secret Service). Zero plaintext API keys on disk. |
| **Intent Layer & Command Bar** | Natural language command parsing (7 intent types), step decomposition planner, and Cmd+K command bar overlay. |
| **Encrypted Memory Engine** | SQLite database (`cntrl-browser.db`) via `sqlx` for preferences and audit logs; LanceDB for semantic vector recall. |
| **Privacy Guard** | Strict single-toggle privacy mode blocking all remote AI API calls when enabled. |
| **Background Agents & Macros** | `.vibe` JSON macro recording, playback, and cron scheduling via `tokio-cron-scheduler`. |
| **Unified Design System** | Mecha-Industrial visual design with dark, light, and high-contrast (`data-theme="high-contrast"`) theme options. |
| **WASM Plugin Sandbox** | Wasmtime sandbox runtime stub for secure, isolated third-party plugin execution. |

---

## 4. Technical Hurdles & Engineering Solutions

### 1. Unified Engine Consistency via Chromium CDP
- **Hurdle**: System-default webviews (WebKit on macOS vs WebView2 on Windows vs WebKitGTK on Linux) displayed inconsistent CSS/rendering and lacked deep automation APIs.
- **Solution**: Integrated `ChromiumManager` via Chrome DevTools Protocol (CDP) WebSocket commands (`Page.navigate`, `Runtime.evaluate`, `Target.createTarget`), ensuring identical Chromium performance and DOM automation across all OSes.

### 2. Native Webview Overlay Prevention for Internal Routes
- **Hurdle**: When opening internal `cntrl://` routes or `about:blank`, Tauri's child webviews drew unrendered blank surfaces over the main window, causing a full blank screen.
- **Solution**: Explicitly configured `open_tab` and `set_active_tab` in `src-tauri/src/services/browser.rs` to keep child native webviews hidden (`.hide()`) for internal routes, allowing SolidJS pages (`HomePage`, `SettingsPage`, etc.) to render without interference.

### 3. Cross-Platform OS Keychain Integration
- **Hurdle**: Inconsistent keychain backends across macOS, Windows, and Linux.
- **Solution**: Utilized `keyring-rs` with native backends (`apple-native`, `windows-native`, `sync-secret-service`) backed by a thread-safe audit logging pipeline.

### 4. Background Execution without UI Blocking
- **Hurdle**: Long-running AI macro plans froze the main Tauri event loop.
- **Solution**: Implemented a Tokio channel-backed `BackgroundRuntime` worker queue that runs tasks on dedicated background threads and emits status events to the UI.

---

## 5. Future Upgradability & Roadmap

1. **Chrome Extension Loading**: Native loading of Unpacked `.crx` Chrome extensions into the managed Chromium CDP runtime.
2. **DOM Action Execution Engine**: Direct DOM element selection and automated click/type execution within child webviews using injected IPC and CDP hooks.
3. **Multi-Agent Collaboration**: Orchestrated multi-step workflows where specialized agents handle research, extraction, and synthesis in parallel.
4. **Third-Party Plugin SDK**: Full WebAssembly plugin API allowing community developers to publish custom intent handlers and integrations.
5. **Fine-Tuned Small Language Models**: Custom SLMs optimized specifically for browser action parsing and DOM navigation.
