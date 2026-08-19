import { Component, createSignal, For } from "solid-js";
import { browserActions } from "../stores/browserStore";
import { HistoryIcon, TrashIcon } from "./Icons";
import "./HistoryPage.css";

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  visited_at: string;
}

export const HistoryPage: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [historyItems, setHistoryItems] = createSignal<HistoryItem[]>([
    {
      id: "1",
      url: "https://news.ycombinator.com",
      title: "Hacker News",
      visited_at: "Today, 10:15 AM",
    },
    {
      id: "2",
      url: "https://github.com",
      title: "GitHub: Where the world builds software",
      visited_at: "Today, 09:30 AM",
    },
    {
      id: "3",
      url: "https://doc.rust-lang.org",
      title: "Rust Documentation",
      visited_at: "Yesterday, 04:20 PM",
    },
  ]);

  const filteredHistory = () => {
    const term = searchTerm().toLowerCase();
    if (!term) return historyItems();
    return historyItems().filter(
      (item) => item.title.toLowerCase().includes(term) || item.url.toLowerCase().includes(term),
    );
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  return (
    <div class="history-page">
      <div class="history-header">
        <div class="history-title-group">
          <HistoryIcon />
          <h2>Browsing History</h2>
        </div>
        <div class="history-actions">
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.currentTarget.value)}
            class="history-search"
          />
          <button class="clear-btn" onClick={handleClearHistory}>
            <TrashIcon />
            Clear History
          </button>
        </div>
      </div>

      <div class="history-list">
        <For each={filteredHistory()}>
          {(item) => (
            <div class="history-item" onClick={() => void browserActions.openTab(item.url)}>
              <div class="history-meta">
                <span class="history-title">{item.title}</span>
                <span class="history-url">{item.url}</span>
              </div>
              <span class="history-time">{item.visited_at}</span>
            </div>
          )}
        </For>
        {filteredHistory().length === 0 && (
          <div class="history-empty">No history entries found.</div>
        )}
      </div>
    </div>
  );
};
