# Design System & Aesthetics — CNTRL Browser

CNTRL Browser follows a **Mecha-Industrial Design System**: a sleek, dark-first, precision aesthetic with vibrant cyan/amber accents, subtle glassmorphic surfaces, crisp typography, and a 100% vector SVG icon design system (zero emojis).

---

## 1. Color Palette & Theme Tokens

All styles are powered by CSS Custom Properties defined in `src/styles/tokens.css`.

### Core Tokens
```css
:root, [data-theme="dark"] {
  --color-bg-base: #0e0e0e;
  --color-bg-panel: #161616;
  --color-bg-elevated: #1f1f1f;
  --color-border: #2a2a2a;
  --color-border-active: #3d3d3d;
  --color-accent: #e8a020;        /* Amber Glow */
  --color-accent-dim: #7a5210;
  --color-text-primary: #e8e6e0;
  --color-text-secondary: #888480;
  --color-text-danger: #e05555;
  --color-text-success: #55a855;
}

[data-theme="light"] {
  --color-bg-base: #f9f9f9;
  --color-bg-panel: #f0f0f0;
  --color-bg-elevated: #ffffff;
  --color-border: #d0d0d0;
  --color-border-active: #b0b0b0;
  --color-accent: #d88c0c;
  --color-accent-dim: #f3d4a0;
  --color-text-primary: #1c1c1c;
  --color-text-secondary: #666666;
  --color-text-danger: #d03030;
  --color-text-success: #308c30;
}

[data-theme="high-contrast"] {
  --color-bg-base: #000000;
  --color-bg-panel: #000000;
  --color-bg-elevated: #111111;
  --color-border: #ffffff;
  --color-border-active: #ffff00;
  --color-accent: #ffff00;        /* High-contrast yellow */
  --color-accent-dim: #888800;
  --color-text-primary: #ffffff;
  --color-text-secondary: #ffffff;
  --color-text-danger: #ff0000;
  --color-text-success: #00ff00;
}
```

---

## 2. Typography

- **Primary Sans Font**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace / Code Font**: `JetBrains Mono, Fira Code, Menlo, Monaco, Consolas, monospace`

### Type Scale
- **Header 1**: `24px` / `1.3` (Bold 700)
- **Header 2**: `18px` / `1.4` (Semi-bold 600)
- **Body Text**: `14px` / `1.5` (Regular 400)
- **Small / Badges**: `12px` / `1.4` (Medium 500)
- **Code / Mono**: `12px` / `1.5` (Monospace 400)

---

## 3. Vector SVG Icon System (`Icons.tsx`)

All UI components exclusively use clean, 16px/14px vector SVG components (`Icons.tsx`):

- **Navigation**: `BackIcon`, `ForwardIcon`, `ReloadIcon`, `StopIcon`
- **Security & Privacy**: `LockIcon`, `AlertIcon`, `ShieldIcon`
- **Feature Surfaces**: `SettingsIcon`, `PluginIcon`, `AuditIcon`, `HistoryIcon`, `DownloadIcon`, `BookmarkIcon`, `KeyboardIcon`, `TrashIcon`, `ExternalLinkIcon`, `SparklesIcon`

---

## 4. UI Components & Micro-Interactions

1. **Tab Bar (`TabBar.css`)**:
   - Active tabs feature a subtle top border highlight with background elevation.
   - Smooth 120ms cubic-bezier transitions on hover and active state change.
2. **Command Bar Overlay (`CommandBar.css`)**:
   - Fixed centered modal with backdrop blur (`backdrop-filter: blur(12px)`).
   - Live streaming step feed with animated status dots.
3. **Macro Recording Badge**:
   - Floating pulse indicator (`● RECORDING MACRO`) with glowing amber animation.
