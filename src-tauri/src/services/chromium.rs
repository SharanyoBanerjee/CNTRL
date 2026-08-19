// services/chromium.rs
//
// Chromium Base Engine Controller & Chrome DevTools Protocol (CDP) Manager.
// Provides process management, executable discovery, launch parameter configuration,
// and CDP command serialization for unified Chromium rendering and navigation.

use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Arc;
use parking_lot::RwLock;

const DEFAULT_CDP_PORT: u16 = 9222;

/// System-detected or user-configured Chromium binary information.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChromiumBinaryInfo {
    pub path: PathBuf,
    pub name: String,
    pub is_custom: bool,
}

/// Settings for launching and connecting to the Chromium engine.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChromiumConfig {
    pub binary_path: Option<PathBuf>,
    pub cdp_port: u16,
    pub headless: bool,
    pub user_data_dir: Option<PathBuf>,
    pub additional_flags: Vec<String>,
}

impl Default for ChromiumConfig {
    fn default() -> Self {
        Self {
            binary_path: None,
            cdp_port: DEFAULT_CDP_PORT,
            headless: false,
            user_data_dir: None,
            additional_flags: vec![
                "--no-first-run".to_string(),
                "--no-default-browser-check".to_string(),
                "--disable-background-networking".to_string(),
                "--disable-sync".to_string(),
            ],
        }
    }
}

/// CDP Target Information structure (returned by Chromium HTTP endpoint /json/list)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CdpTarget {
    pub id: String,
    pub title: String,
    pub url: String,
    #[serde(rename = "type")]
    pub target_type: String,
    #[serde(rename = "webSocketDebuggerUrl")]
    pub websocket_debugger_url: Option<String>,
}

/// CDP JSON-RPC Request structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CdpRequest {
    pub id: u64,
    pub method: String,
    pub params: serde_json::Value,
}

/// CDP JSON-RPC Response structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CdpResponse {
    pub id: u64,
    pub result: Option<serde_json::Value>,
    pub error: Option<serde_json::Value>,
}

/// Main Chromium Manager responsible for discovering binaries, formatting launch parameters,
/// and generating CDP interaction payloads.
#[derive(Clone)]
pub struct ChromiumManager {
    config: Arc<RwLock<ChromiumConfig>>,
    active_targets: Arc<RwLock<Vec<CdpTarget>>>,
}

impl Default for ChromiumManager {
    fn default() -> Self {
        Self::new()
    }
}

impl ChromiumManager {
    pub fn new() -> Self {
        Self {
            config: Arc::new(RwLock::new(ChromiumConfig::default())),
            active_targets: Arc::new(RwLock::new(Vec::new())),
        }
    }

    pub fn with_config(config: ChromiumConfig) -> Self {
        Self {
            config: Arc::new(RwLock::new(config)),
            active_targets: Arc::new(RwLock::new(Vec::new())),
        }
    }

    /// Automatically discover available Chromium / Chrome binary on the host OS.
    pub fn find_system_chromium(&self) -> Option<ChromiumBinaryInfo> {
        let candidates = get_chromium_candidate_paths();
        for path in candidates {
            if path.exists() && path.is_file() {
                let name = path
                    .file_name()
                    .map(|n| n.to_string_lossy().to_string())
                    .unwrap_or_else(|| "Chromium".to_string());
                return Some(ChromiumBinaryInfo {
                    path,
                    name,
                    is_custom: false,
                });
            }
        }
        None
    }

    /// Build the full CLI arguments required to launch Chromium with CDP enabled.
    pub fn build_launch_args(&self, target_url: Option<&str>) -> Vec<String> {
        let config = self.config.read();
        let mut args = vec![format!("--remote-debugging-port={}", config.cdp_port)];

        if config.headless {
            args.push("--headless=new".to_string());
        }

        if let Some(ref data_dir) = config.user_data_dir {
            args.push(format!("--user-data-dir={}", data_dir.display()));
        }

        for flag in &config.additional_flags {
            args.push(flag.clone());
        }

        if let Some(url) = target_url {
            args.push(url.to_string());
        } else {
            args.push("about:blank".to_string());
        }

        args
    }

    /// Generate CDP Page.navigate payload for a given URL.
    pub fn format_page_navigate_cmd(&self, request_id: u64, url: &str) -> CdpRequest {
        CdpRequest {
            id: request_id,
            method: "Page.navigate".to_string(),
            params: serde_json::json!({ "url": url }),
        }
    }

    /// Generate CDP Runtime.evaluate payload to execute JavaScript.
    pub fn format_evaluate_script_cmd(&self, request_id: u64, expression: &str) -> CdpRequest {
        CdpRequest {
            id: request_id,
            method: "Runtime.evaluate".to_string(),
            params: serde_json::json!({
                "expression": expression,
                "returnByValue": true
            }),
        }
    }

    /// Generate CDP Target.createTarget payload to open a new tab.
    pub fn format_create_target_cmd(&self, request_id: u64, url: &str) -> CdpRequest {
        CdpRequest {
            id: request_id,
            method: "Target.createTarget".to_string(),
            params: serde_json::json!({ "url": url }),
        }
    }

    /// Generate CDP Target.closeTarget payload to close a tab.
    pub fn format_close_target_cmd(&self, request_id: u64, target_id: &str) -> CdpRequest {
        CdpRequest {
            id: request_id,
            method: "Target.closeTarget".to_string(),
            params: serde_json::json!({ "targetId": target_id }),
        }
    }

    /// Update tracked active CDP targets.
    pub fn set_active_targets(&self, targets: Vec<CdpTarget>) {
        *self.active_targets.write() = targets;
    }

    /// Retrieve currently tracked active CDP targets.
    pub fn get_active_targets(&self) -> Vec<CdpTarget> {
        self.active_targets.read().clone()
    }

    /// Get current Chromium config.
    pub fn get_config(&self) -> ChromiumConfig {
        self.config.read().clone()
    }

    /// Update Chromium config.
    pub fn update_config(&self, new_config: ChromiumConfig) {
        *self.config.write() = new_config;
    }
}

/// Helper function to return OS-specific candidate paths for Chrome / Chromium.
fn get_chromium_candidate_paths() -> Vec<PathBuf> {
    let mut paths = Vec::new();

    #[cfg(target_os = "macos")]
    {
        paths.push(PathBuf::from(
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        ));
        paths.push(PathBuf::from(
            "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
        ));
        paths.push(PathBuf::from(
            "/Applications/Chromium.app/Contents/MacOS/Chromium",
        ));
        paths.push(PathBuf::from(
            "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
        ));
        paths.push(PathBuf::from(
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        ));
    }

    #[cfg(target_os = "linux")]
    {
        paths.push(PathBuf::from("/usr/bin/google-chrome"));
        paths.push(PathBuf::from("/usr/bin/google-chrome-stable"));
        paths.push(PathBuf::from("/usr/bin/chromium-browser"));
        paths.push(PathBuf::from("/usr/bin/chromium"));
        paths.push(PathBuf::from("/usr/bin/brave-browser"));
        paths.push(PathBuf::from("/snap/bin/chromium"));
    }

    #[cfg(target_os = "windows")]
    {
        if let Ok(program_files) = std::env::var("PROGRAMFILES") {
            let base = Path::new(&program_files);
            paths.push(base.join("Google\\Chrome\\Application\\chrome.exe"));
            paths.push(base.join("Chromium\\Application\\chrome.exe"));
            paths.push(base.join("BraveSoftware\\Brave-Browser\\Application\\brave.exe"));
            paths.push(base.join("Microsoft\\Edge\\Application\\msedge.exe"));
        }
        if let Ok(program_files_x86) = std::env::var("PROGRAMFILES(X86)") {
            let base = Path::new(&program_files_x86);
            paths.push(base.join("Google\\Chrome\\Application\\chrome.exe"));
            paths.push(base.join("Microsoft\\Edge\\Application\\msedge.exe"));
        }
        if let Ok(local_app_data) = std::env::var("LOCALAPPDATA") {
            let base = Path::new(&local_app_data);
            paths.push(base.join("Google\\Chrome\\Application\\chrome.exe"));
        }
    }

    paths
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn chromium_manager_initializes_with_default_config() {
        let manager = ChromiumManager::new();
        let config = manager.get_config();
        assert_eq!(config.cdp_port, DEFAULT_CDP_PORT);
        assert!(!config.headless);
        assert!(config.additional_flags.contains(&"--no-first-run".to_string()));
    }

    #[test]
    fn build_launch_args_includes_cdp_port_and_flags() {
        let manager = ChromiumManager::new();
        let args = manager.build_launch_args(Some("https://google.com"));
        assert!(args.iter().any(|a| a.contains("--remote-debugging-port=")));
        assert!(args.contains(&"https://google.com".to_string()));
    }

    #[test]
    fn format_cdp_commands_generates_valid_structures() {
        let manager = ChromiumManager::new();
        let nav_cmd = manager.format_page_navigate_cmd(1, "https://example.com");
        assert_eq!(nav_cmd.id, 1);
        assert_eq!(nav_cmd.method, "Page.navigate");
        assert_eq!(nav_cmd.params["url"], "https://example.com");

        let eval_cmd = manager.format_evaluate_script_cmd(2, "document.title");
        assert_eq!(eval_cmd.id, 2);
        assert_eq!(eval_cmd.method, "Runtime.evaluate");
        assert_eq!(eval_cmd.params["expression"], "document.title");
    }

    #[test]
    fn candidate_paths_returns_non_empty_list() {
        let paths = get_chromium_candidate_paths();
        assert!(!paths.is_empty(), "Candidate paths list must not be empty");
    }
}
