# Accessibility Guide — CNTRL Browser

CNTRL Browser prioritizes inclusive, high-contrast, and screen-reader accessible user experiences across all desktop operating systems.

## 1. High-Contrast Theme (`data-theme="high-contrast"`)

Users can enable High-Contrast mode in Settings → Appearance or by applying `data-theme="high-contrast"` on the root document element.

### High-Contrast Color Tokens
- **Background Base**: `#000000` (Pure Black)
- **Borders**: `#ffffff` (Pure White)
- **Active Focus & Accent**: `#ffff00` (High-Contrast Yellow)
- **Primary Text**: `#ffffff` (Pure White)
- **Danger Text**: `#ff0000` (Pure Red)
- **Success Text**: `#00ff00` (Pure Green)

---

## 2. Screen-Reader & ARIA Labels

- All interactive buttons (`TabBar.tsx`, `UrlBar.tsx`, `WindowControls.tsx`) include explicit `aria-label` or `title` attributes.
- Input elements include associated `<label>` tags with matching `for` attributes.
- Model lists and score lists include `role="list"` and `role="listitem"` tags.
- Decorative SVG icons include `aria-hidden="true"`.

---

## 3. Keyboard Navigation Shortcuts

- `⌘L` / `Ctrl+L`: Focus Address Bar
- `⌘T` / `Ctrl+T`: Open New Tab (`cntrl://home`)
- `⌘W` / `Ctrl+W`: Close Active Tab
- `⌘Shift+T`: Reopen Last Closed Tab
- `⌘K`: Open AI Command Bar
- `⌘M`: Toggle Macro Library
- `⌘/`: View All Keyboard Shortcuts Modal
- `⌘F`: Find in Page Overlay
- `⌘P`: Print / Export PDF