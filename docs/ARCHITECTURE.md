# Architecture & System Design — CNTRL Browser

CNTRL Browser is split into a SolidJS frontend (TypeScript) and a Tauri v2 Rust backend with an integrated **Chromium Base Engine Controller (`ChromiumManager`)**.

## Runtime Architecture Flow

```text
User
  -> SolidJS UI
  -> Solid Stores / Decoupled EventBus
  -> Tauri IPC Commands
  -> Rust Services (BrowserService, ChromiumManager, AiRouter, Keychain, Memory)
  -> Native Webviews / Chromium CDP Engine Target
```

## Frontend Architecture

Lives in `src/`:

- `src/App.tsx`: Root shell initializing AI store, macro store, `cntrl://home` default tab, keyboard listeners (`Cmd+/`, `Cmd+F`, `Cmd+P`), and `FirstRunConsent`.
- `src/components/WebView.tsx`: Client-side & IPC router handling `cntrl://home`, `cntrl://settings`, `cntrl://plugins`, `cntrl://audit`, `cntrl://history`, `cntrl://downloads`, `cntrl://bookmarks`.
- `src/components/HomePage.tsx`: Custom CNTRL intent landing page (`cntrl://home`).
- `src/components/HistoryPage.tsx`: Browsing history manager (`cntrl://history`).
- `src/components/DownloadsPage.tsx`: Downloads manager (`cntrl://downloads`).
- `src/components/BookmarksPage.tsx`: Bookmarks manager (`cntrl://bookmarks`).
- `src/components/ShortcutsModal.tsx`: Keyboard keybindings discovery modal (`Cmd+/` / `cntrl://shortcuts`).
- `src/components/GuardrailDialog.tsx`: Confirmation modal for high-risk autonomous AI actions.
- `src/components/FirstRunConsent.tsx`: Privacy onboarding modal.
- `src/components/Icons.tsx`: 100% vector SVG icon components (zero emojis).

## Backend Architecture

Lives in `src-tauri/src/`:

- `lib.rs`: Registers plugins (shell, opener, os, keyring, notification), SQLite database (`cntrl-browser.db`), and commands.
- `services/chromium.rs`: `ChromiumManager` providing OS binary discovery, launch parameter configuration (`--remote-debugging-port=9222`), and CDP JSON-RPC command serialization (`Page.navigate`, `Runtime.evaluate`, `Target.createTarget`).
- `services/browser.rs`: Manages tab lifecycle (`BrowserService`). Keeps native OS child webviews hidden for `cntrl://` routes to prevent overlay blocking.
- `services/ai/router.rs`: 3-tier model router (Tier 1 Ollama, Tier 2 Gemini/Groq/HF/OpenRouter, Tier 3 OpenAI-compat).
- `services/keychain.rs`: OS Keychain integration (macOS Keychain, Windows Credential Manager, Linux Secret Service).
- `services/memory/db.rs`: Transactional SQLite persistence via `sqlx` and LanceDB vector recall.

## Development Task Reference Table

| Task | File / Directory |
|---|---|
| Main App Layout & Listeners | `src/App.tsx` |
| `cntrl://` Internal Router | `src/components/WebView.tsx` |
| Chromium CDP Controller | `src-tauri/src/services/chromium.rs` |
| Native Webview Service | `src-tauri/src/services/browser.rs` |
| Vector SVG Icon Suite | `src/components/Icons.tsx` |
| Settings & Data Control | `src/components/SettingsPage.tsx` |
| Keychain & Key Management | `src-tauri/src/services/keychain.rs` |
| Global Design Tokens | `src/styles/tokens.css` |
