# Production Roadmap — CNTRL Browser

This document outlines the current version status and future development milestones for CNTRL Browser.

---

## 🚀 v0.2.0-beta (Current Version — Completed)

### Phase 0 — Stabilize & CI
- [x] 100% Green CI pipeline (`cargo check`, `eslint`, `biome`, `typecheck`, `vitest`).
- [x] Triage open issues & set v0.x beta milestone scope.

### Phase 1 — Foundation
- [x] Internal `cntrl://` router mounted in frontend & IPC backend.
- [x] Built-in pages mounted: `SettingsPage`, `PluginManager`, `AuditViewer`.
- [x] CNTRL custom landing page (`cntrl://home` / `cntrl://newtab`).

### Phase 2 — Baseline Browser Features
- [x] History Manager (`cntrl://history` & date search).
- [x] Downloads Manager (`cntrl://downloads` & status monitoring).
- [x] Bookmarks Manager (`cntrl://bookmarks` & star in `UrlBar.tsx`).
- [x] Find in Page (`Cmd+F`) & Zoom shortcuts (`Cmd +/-/0`).
- [x] Keyboard Shortcuts Sheet (`Cmd+/` / `cntrl://shortcuts`).
- [x] HTTPS lock details & HTTP security warning indicator.
- [x] Print / Save as PDF command (`Cmd+P`).

### Phase 3 — Trust & Release Blockers
- [x] Wasmtime plugin sandbox isolation & safety labeling.
- [x] AI Intent confirmation guardrail modal (`GuardrailDialog.tsx`).
- [x] Privacy Policy & First-Run Consent modal (`FirstRunConsent.tsx`).
- [x] Clear Memory DB & Audit Log in Settings.
- [x] Security review & `SECURITY.md` disclosure contact (`security@cntrl-browser.org`).

### Phase 4 — Identity, Settings & Accessibility
- [x] Brand icons wired into `tauri.conf.json`.
- [x] Full Settings surface (Appearance, Shortcuts, Language, Accessibility, Performance, Privacy, AI Router, OS Handlers).
- [x] High-contrast theme (`data-theme="high-contrast"`), font scaling multipliers, and screen-reader ARIA tags.

---

## 🔮 Deferred to v1.1 Release

The following complex browser features are intentionally deferred to the `v1.1` milestone:

1. **Incognito / Private Browsing Windows**
2. **Granular Cookie & Domain Permission Manager**
3. **Autofill & Saved Password Enclave**
4. **On-Device Machine Translation**
5. **Vertical Tab Strip Option**
6. **Distraction-Free Reader Mode**
7. **Tab Suspender for Low-Memory Modes**
8. **Split-Screen Dual View Engine**
9. **Multi-Workspace Environment Isolation**
10. **Page Annotation & Markup Tools**
