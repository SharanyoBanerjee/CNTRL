import { Component, For } from "solid-js";
import { KeyboardIcon } from "./Icons";
import "./ShortcutsModal.css";

interface ShortcutItem {
  key: string;
  description: string;
  category: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { key: "Cmd + T", description: "Open new tab", category: "Navigation" },
  { key: "Cmd + W", description: "Close active tab", category: "Navigation" },
  { key: "Cmd + Shift + T", description: "Reopen last closed tab", category: "Navigation" },
  { key: "Cmd + K", description: "Open AI Intent Command Bar", category: "AI & Search" },
  { key: "Cmd + M", description: "Toggle Macro Library", category: "Automation" },
  { key: "Cmd + Shift + L", description: "Toggle Light/Dark Theme", category: "Appearance" },
  { key: "Cmd + F", description: "Find on page", category: "View" },
  { key: "Cmd + P", description: "Print / Export as PDF", category: "Tools" },
  { key: "Cmd + /", description: "View keyboard shortcuts", category: "Help" },
];

export const ShortcutsModal: Component<{ onClose: () => void }> = (props) => {
  return (
    <div class="shortcuts-backdrop" onClick={props.onClose}>
      <div class="shortcuts-card" onClick={(e) => e.stopPropagation()}>
        <div class="shortcuts-header">
          <div class="shortcuts-title-group">
            <KeyboardIcon />
            <h3>Keyboard Shortcuts</h3>
          </div>
          <button class="close-icon" onClick={props.onClose}>
            ✕
          </button>
        </div>
        <div class="shortcuts-list">
          <For each={SHORTCUTS}>
            {(item) => (
              <div class="shortcut-row">
                <span class="shortcut-desc">{item.description}</span>
                <kbd class="shortcut-kbd">{item.key}</kbd>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
