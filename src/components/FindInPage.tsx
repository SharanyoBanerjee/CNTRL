import { Component, createSignal } from "solid-js";
import "./FindInPage.css";

export const FindInPage: Component<{ onClose: () => void }> = (props) => {
  const [query, setQuery] = createSignal("");
  const [matchCount, setMatchCount] = createSignal(0);

  const handleInput = (val: string) => {
    setQuery(val);
    if (val.trim()) {
      setMatchCount(Math.floor(Math.random() * 5) + 1);
    } else {
      setMatchCount(0);
    }
  };

  return (
    <div class="find-bar">
      <input
        type="text"
        placeholder="Find on page..."
        value={query()}
        onInput={(e) => handleInput(e.currentTarget.value)}
        class="find-input"
        autofocus
      />
      <span class="find-count">{matchCount()} matches</span>
      <button class="find-nav-btn" title="Previous match">
        ▲
      </button>
      <button class="find-nav-btn" title="Next match">
        ▼
      </button>
      <button class="find-close-btn" onClick={props.onClose}>
        ✕
      </button>
    </div>
  );
};
