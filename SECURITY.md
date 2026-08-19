# Security Policy — CNTRL Browser

CNTRL Browser prioritizes local-first privacy, cryptographically-signed audit logging, zero-plaintext key storage, and secure sandboxing. Treat all browser, webview, fallback rendering, credentials, model-provider, and automation code as security-sensitive.

## Supported Versions

| Version | Status |
|---|---|
| `v0.1.0` (v0.x Beta) | ✅ Supported for Security Fixes |
| `< 0.1.0` | ❌ End of Life |

## Reporting a Vulnerability

Please do **NOT** disclose vulnerabilities publicly before maintainers have had time to investigate and publish a patch.

Preferred private reporting channel:
- **Email**: `security@cntrl-browser.org`
- **GitHub**: Private Vulnerability Reporting on `Omnikon-Org/CNTRL`

When reporting a vulnerability, include:
- A concise summary and affected commit / release version.
- Step-by-step reproduction instructions or safe proof-of-concept.
- Severity assessment (e.g. exposure of keys, local file leakage, remote code execution).

## Security Infrastructure Implemented

1. **OS Keychain Secret Storage**: 100% of API keys (Gemini, Groq, OpenRouter, HuggingFace) are stored in native OS keychains (`apple-native`, `windows-native`, `sync-secret-service`). Zero plaintext secrets on disk.
2. **Privacy Guard**: Hard toggle blocking all remote AI API network calls when active.
3. **Sandboxed Compatibility Renderer**: Fallback iframe rendering executed under strict `sandbox="allow-scripts allow-forms"`.
4. **WASM Plugin Sandbox**: Wasmtime WebAssembly engine isolating third-party extensions with zero unmonitored filesystem/network access.
5. **Cryptographic Audit Log**: Immutable local SQLite audit database recording all credential accesses and autonomous AI commands.

## Scope

In scope:
- CNTRL desktop shell, native child webviews, and IPC interface.
- Local Keychain storage, SQLite memory database, and LanceDB vector store.
- Fallback renderer sandbox behavior.
- AI provider key routing and Privacy Guard enforcement.

Out of scope:
- Vulnerabilities on third-party websites loaded within child webviews (unless CNTRL Browser amplifies the issue).
- External AI provider server-side outages or responses.
