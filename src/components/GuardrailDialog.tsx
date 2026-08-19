import { Component } from "solid-js";
import { AlertIcon } from "./Icons";
import "./GuardrailDialog.css";

interface GuardrailProps {
  title: string;
  actionMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const GuardrailDialog: Component<GuardrailProps> = (props) => {
  return (
    <div class="guardrail-backdrop" onClick={props.onCancel}>
      <div class="guardrail-card" onClick={(e) => e.stopPropagation()}>
        <div class="guardrail-badge">
          <AlertIcon /> SECURITY GUARDRAIL CONFIRMATION
        </div>
        <h3>{props.title}</h3>
        <p class="guardrail-msg">{props.actionMessage}</p>

        <div class="guardrail-footer">
          <button class="btn-cancel" onClick={props.onCancel}>
            Cancel
          </button>
          <button class="btn-confirm" onClick={props.onConfirm}>
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
