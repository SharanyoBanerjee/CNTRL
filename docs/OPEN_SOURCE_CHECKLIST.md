# Open-Source Release Checklist — CNTRL Browser

Use this checklist before tagged public releases.

## 1. Repository Metadata
- [x] Rename `package.json` name to `cntrl-browser`.
- [x] Add project description and MIT license in `package.json` & `Cargo.toml`.
- [x] Set Tauri bundle identifier (`com.cntrl.browser`) in `src-tauri/tauri.conf.json`.
- [x] Add repository URLs and issue tracker metadata.

## 2. Documentation Suite
- [x] `Important Documentation/PRD.md` — Product requirements document.
- [x] `Important Documentation/Architecture.md` — System architecture and IPC diagrams.
- [x] `Important Documentation/Rules.md` — Engineering rules for developers & AI assistants.
- [x] `Important Documentation/Design.md` — Mecha-Industrial design tokens and SVG icon specs.
- [x] `Important Documentation/Memory.md` — State tracker and verification checkpoints.
- [x] `README.md` — Open-source overview, prerequisites, and setup instructions.
- [x] `CONTRIBUTING.md` — Contribution guidelines and code style rules.
- [x] `SECURITY.md` — Security policy and disclosure contact (`security@cntrl-browser.org`).
- [x] `CHANGELOG.md` & `docs/ROADMAP.md` — Release history and feature roadmap.

## 3. Security & Keychain Verification
- [x] Search for plaintext secrets (`rg -n "sk-|api[_-]?key|secret|token"`). Zero plaintext keys on disk.
- [x] 100% OS Keychain integration for API keys (`services/keychain.rs`).
- [x] Single-toggle Privacy Guard blocking remote AI network requests when active.
- [x] Security Guardrail modal (`GuardrailDialog.tsx`) for destructive autonomous AI actions.
- [x] Wasmtime WebAssembly sandbox stub for plugin isolation.

## 4. Verification Checkpoint
- [x] `cargo check`: **PASSED** (0 errors, 0 warnings)
- [x] `npx biome check .`: **PASSED** (0 errors)
- [x] `npm run lint`: **PASSED** (0 errors, 0 warnings)
- [x] `npm run typecheck`: **PASSED** (0 errors)
- [x] `npm test`: **PASSED** (20 Vitest tests)
