import { invoke } from "@tauri-apps/api/core";
import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { browserActions, browserState } from "../stores/browserStore";
import { AuditViewer } from "./AuditViewer";
import { BookmarksPage } from "./BookmarksPage";
import { DownloadsPage } from "./DownloadsPage";
import { HistoryPage } from "./HistoryPage";
import { HomePage } from "./HomePage";
import { PluginManager } from "./PluginManager";
import { SettingsPage } from "./SettingsPage";
import "./WebView.css";

export const WebView: Component = () => {
  const [htmlContent, setHtmlContent] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  let containerRef: HTMLDivElement | undefined;
  let resizeObserver: ResizeObserver | undefined;

  const updateBounds = () => {
    if (containerRef) {
      requestAnimationFrame(() => {
        if (!containerRef) return;
        const rect = containerRef.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        invoke("update_tab_bounds", {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        }).catch(console.error);
      });
    }
  };

  onMount(() => {
    if (containerRef) {
      resizeObserver = new ResizeObserver(() => {
        updateBounds();
      });
      resizeObserver.observe(containerRef);
      updateBounds();
    }
    window.addEventListener("resize", updateBounds);
  });

  onCleanup(() => {
    if (resizeObserver) resizeObserver.disconnect();
    window.removeEventListener("resize", updateBounds);
  });

  createEffect(() => {
    const activeTab = browserState.tabs.find((t) => t.id === browserState.activeTabId);
    updateBounds();

    if (!activeTab || activeTab.url === "about:blank" || activeTab.url.startsWith("cntrl://")) {
      setHtmlContent("");
      return;
    }

    if (activeTab.fallback_mode) {
      setIsLoading(true);
      setError("");
      browserActions
        .fetchFallback(activeTab.url)
        .then((html) => {
          setHtmlContent(html);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(`Failed to load ${activeTab.url}`);
          setIsLoading(false);
        });
    } else {
      setHtmlContent("");
    }
  });

  const activeTab = () => browserState.tabs.find((t) => t.id === browserState.activeTabId);
  const currentUrl = () => activeTab()?.url || "cntrl://home";

  return (
    <div class="webview-container" ref={containerRef}>
      {/* Internal cntrl:// router */}
      {(currentUrl() === "cntrl://home" ||
        currentUrl() === "cntrl://newtab" ||
        currentUrl() === "about:blank") && <HomePage />}
      {currentUrl() === "cntrl://settings" && <SettingsPage />}
      {currentUrl() === "cntrl://plugins" && <PluginManager />}
      {currentUrl() === "cntrl://audit" && <AuditViewer />}
      {currentUrl() === "cntrl://history" && <HistoryPage />}
      {currentUrl() === "cntrl://downloads" && <DownloadsPage />}
      {currentUrl() === "cntrl://bookmarks" && <BookmarksPage />}

      {/* Playwright sandboxed fallback for external URLs */}
      {activeTab()?.fallback_mode && !currentUrl().startsWith("cntrl://") && (
        <>
          {isLoading() && <div class="loading">Loading compatibility mode...</div>}
          {error() && <div class="error">{error()}</div>}
          {!isLoading() && !error() && htmlContent() && (
            <iframe
              class="sandbox-frame"
              srcdoc={htmlContent()}
              sandbox="allow-scripts allow-forms"
            ></iframe>
          )}
        </>
      )}
    </div>
  );
};
