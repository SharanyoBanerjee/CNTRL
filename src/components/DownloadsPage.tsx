import { Component, createSignal, For } from "solid-js";
import { DownloadIcon } from "./Icons";
import "./DownloadsPage.css";

export interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  size: string;
  progress: number;
  status: "completed" | "in_progress" | "paused" | "cancelled";
}

export const DownloadsPage: Component = () => {
  const [downloads] = createSignal<DownloadItem[]>([
    {
      id: "1",
      filename: "tauri_v2_guide.pdf",
      url: "https://tauri.app/tauri_v2_guide.pdf",
      size: "4.2 MB",
      progress: 100,
      status: "completed",
    },
    {
      id: "2",
      filename: "ollama_llama3_model.bin",
      url: "https://ollama.ai/models/llama3",
      size: "3.8 GB",
      progress: 45,
      status: "in_progress",
    },
  ]);

  return (
    <div class="downloads-page">
      <div class="downloads-header">
        <div class="downloads-title-group">
          <DownloadIcon />
          <h2>Downloads Manager</h2>
        </div>
      </div>

      <div class="downloads-list">
        <For each={downloads()}>
          {(item) => (
            <div class="download-card">
              <div class="download-info">
                <span class="download-name">{item.filename}</span>
                <span class="download-meta">
                  {item.size} • {item.url}
                </span>
              </div>
              <div class="download-status-bar">
                <div class="progress-track">
                  <div class="progress-fill" style={{ width: `${item.progress}%` }}></div>
                </div>
                <span class="status-badge">{item.status}</span>
              </div>
            </div>
          )}
        </For>
        {downloads().length === 0 && (
          <div class="downloads-empty">No active or past downloads.</div>
        )}
      </div>
    </div>
  );
};
