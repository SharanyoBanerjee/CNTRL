import { Component, createSignal, For } from "solid-js";
import { browserActions } from "../stores/browserStore";
import { BookmarkIcon } from "./Icons";
import "./BookmarksPage.css";

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  folder: string;
}

export const BookmarksPage: Component = () => {
  const [bookmarks] = createSignal<BookmarkItem[]>([
    { id: "1", title: "GitHub", url: "https://github.com", folder: "Dev" },
    { id: "2", title: "Hacker News", url: "https://news.ycombinator.com", folder: "News" },
    { id: "3", title: "Rust Docs", url: "https://doc.rust-lang.org", folder: "Dev" },
  ]);

  return (
    <div class="bookmarks-page">
      <div class="bookmarks-header">
        <div class="bookmarks-title-group">
          <BookmarkIcon />
          <h2>Bookmarks Manager</h2>
        </div>
      </div>

      <div class="bookmarks-grid">
        <For each={bookmarks()}>
          {(item) => (
            <div class="bookmark-card" onClick={() => void browserActions.openTab(item.url)}>
              <span class="bookmark-folder">{item.folder}</span>
              <span class="bookmark-title">{item.title}</span>
              <span class="bookmark-url">{item.url}</span>
            </div>
          )}
        </For>
        {bookmarks().length === 0 && <div class="bookmarks-empty">No bookmarks saved yet.</div>}
      </div>
    </div>
  );
};
