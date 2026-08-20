import { Component, createSignal, For } from "solid-js";
import { aiState } from "../stores/aiStore";
import { browserActions, browserState } from "../stores/browserStore";
import {
  AuditIcon,
  BookmarkIcon,
  DownloadIcon,
  HistoryIcon,
  PluginIcon,
  SettingsIcon,
} from "./Icons";
import "./HomePage.css";

export const HomePage: Component = () => {
  const [intentInput, setIntentInput] = createSignal("");

  const navigateActiveOrOpen = (targetUrl: string) => {
    let url = targetUrl.trim();
    if (!url) return;

    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("cntrl://")) {
      if (url.includes(".") && !url.includes(" ")) {
        url = `https://${url}`;
      } else {
        url = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
      }
    }

    if (browserState.activeTabId) {
      void browserActions.navigate(browserState.activeTabId, url);
    } else {
      void browserActions.openTab(url);
    }
  };

  const handleIntentSubmit = (e: Event) => {
    e.preventDefault();
    const query = intentInput().trim();
    if (!query) return;

    navigateActiveOrOpen(query);
    setIntentInput("");
  };

  const quickLinks = [
    { title: "Settings", url: "cntrl://settings", icon: SettingsIcon },
    { title: "Plugin Sandbox", url: "cntrl://plugins", icon: PluginIcon },
    { title: "Audit Trail", url: "cntrl://audit", icon: AuditIcon },
    { title: "Browsing History", url: "cntrl://history", icon: HistoryIcon },
    { title: "Downloads", url: "cntrl://downloads", icon: DownloadIcon },
    { title: "Bookmarks", url: "cntrl://bookmarks", icon: BookmarkIcon },
  ];

  return (
    <div class="cntrl-home">
      <div class="cntrl-home-content">
        <div class="cntrl-logo-badge">
          <span class="logo-text">CNTRL</span>
          <span class="logo-sub">AUTONOMOUS BROWSER v0.2.0</span>
        </div>

        <form class="cntrl-intent-box" onSubmit={handleIntentSubmit}>
          <input
            type="text"
            placeholder="Search, enter URL, or type an intent (e.g. 'google.com', 'news', 'cntrl://settings')..."
            value={intentInput()}
            onInput={(e) => setIntentInput(e.currentTarget.value)}
            class="cntrl-intent-input"
          />
          <button type="submit" class="cntrl-intent-submit">
            Navigate
          </button>
        </form>

        <div class="cntrl-status-bar">
          <div class="status-item">
            <span class="status-dot active" />
            AI Router: <strong class="tier-tag">{aiState.tier}</strong>
          </div>
          <div class="status-item">
            <span class="status-dot active" />
            Privacy Guard: <strong>Active</strong>
          </div>
          <div class="status-item">
            <span class="status-dot active" />
            Engine: <code>Chromium CDP</code>
          </div>
        </div>

        <div class="cntrl-quick-grid">
          <For each={quickLinks}>
            {(item) => {
              const IconComp = item.icon;
              return (
                <button class="quick-card" onClick={() => navigateActiveOrOpen(item.url)}>
                  <span class="quick-icon">
                    <IconComp />
                  </span>
                  <span class="quick-title">{item.title}</span>
                  <span class="quick-url">{item.url}</span>
                </button>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
};
