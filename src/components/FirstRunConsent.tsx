import { Component } from "solid-js";
import { ShieldIcon } from "./Icons";
import "./FirstRunConsent.css";

export const FirstRunConsent: Component<{ onAccept: () => void }> = (props) => {
  return (
    <div class="consent-backdrop">
      <div class="consent-card">
        <div class="consent-header">
          <span class="consent-icon">
            <ShieldIcon />
          </span>
          <h2>Privacy & Security Notice</h2>
        </div>

        <div class="consent-body">
          <p>
            Welcome to <strong>CNTRL Browser</strong> — the local-first, intent-driven autonomous
            browser.
          </p>
          <div class="consent-bullets">
            <div class="bullet-item">
              <strong>Key Enclave:</strong> All API keys are stored in your native OS Keychain
              (macOS Keychain, Windows Credential Manager, Linux Secret Service).
            </div>
            <div class="bullet-item">
              <strong>Local Vector Memory:</strong> Task history and vector embeddings stay strictly
              on your local device.
            </div>
            <div class="bullet-item">
              <strong>Privacy Guard:</strong> You can toggle Privacy Guard at any time in Settings
              to block all remote network calls.
            </div>
          </div>
        </div>

        <div class="consent-footer">
          <button class="btn-accept" onClick={props.onAccept}>
            I Understand & Consent
          </button>
        </div>
      </div>
    </div>
  );
};
