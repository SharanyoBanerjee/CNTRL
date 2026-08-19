# Changelog

All notable changes to the CNTRL Browser project will be documented in this file.

## [0.2.0-beta] - 2026-08-19

### Added
- **Internal Router & Landing Page**: Added `cntrl://` internal client & IPC routing mounted to `cntrl://home`, `cntrl://settings`, `cntrl://plugins`, `cntrl://audit`, `cntrl://history`, `cntrl://downloads`, and `cntrl://bookmarks`.
- **Chromium Base Engine (CDP)**: Integrated `ChromiumManager` (`src-tauri/src/services/chromium.rs`) for Chromium target discovery, launch flags, and CDP JSON-RPC commands.
- **Baseline Feature Suite**:
  - `HistoryPage` (`cntrl://history`) for date filtering & history clearing.
  - `DownloadsPage` (`cntrl://downloads`) for download tracking & status monitoring.
  - `BookmarksPage` (`cntrl://bookmarks`) & bookmark star control in `UrlBar.tsx`.
  - `FindInPage` (`Cmd+F`) & Zoom shortcuts.
  - `ShortcutsModal` (`Cmd+/` or `cntrl://shortcuts`) for full keyboard keybinding discovery.
  - `FirstRunConsent` modal detailing local keychain security and zero-plaintext key storage.
  - `GuardrailDialog` confirmation modal for high-risk autonomous AI operations.
- **Accessibility & Themes**: High-contrast theme token set (`data-theme="high-contrast"`), font scaling multipliers, and screen-reader ARIA tags.

### Fixed
- **CI & Linter Baseline**: Restored 100% green pipeline across `cargo check`, `biome`, `eslint`, `typecheck`, and `vitest`.

## [0.1.0] - 2026-07-19

### Added
- **Native Webview Engine**: Multi-tab native OS browser view (macOS WebKit, Windows WebView2, Linux WebKitGTK).
- **Playwright Fallback Engine**: Sandboxed fallback browser engine for complex layouts and compatibility rendering.
- **Secure Key Enclave**: 100% OS Keychain integration (macOS Keychain, Windows Credential Manager, Linux Secret Service).
- **Hybrid AI Router**: 3-tier routing supporting Ollama, Gemini, Groq, HuggingFace, and OpenAI-compatible endpoints.
- **Intent Planner & Executor**: Command bar (`Cmd+K`) natural language intent classification and step execution.
- **Encrypted Memory Engine**: Transactional SQLite persistence via `sqlx` and LanceDB vector store for semantic recall.
- **Background Agent & Scheduler**: `.vibe` macro format recorder, Tokio background runtime worker queue, and cron scheduler.
- **Design System & Theme**: Unified Mecha-Industrial visual tokens with light/dark mode toggle.
- **Documentation Suite**: Added `Important Documentation/` directory containing `PRD.md`, `Architecture.md`, `Rules.md`, `Design.md`, and `Memory.md`.

### Security
- Mandatory Privacy Mode lock blocking remote API calls when enabled.
- Cryptographically logged credential access audit trails.
- Wasmtime sandbox stub for third-party plugin isolation.
