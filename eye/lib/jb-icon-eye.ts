import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-eye.css";
import { renderHTML } from "./render.js";

const HTMLElementBase = globalThis.HTMLElement ?? (class {} as typeof HTMLElement);

export class JBIconEyeWebComponent extends HTMLElementBase {
  get open(): boolean {
    return this.hasAttribute("open");
  }

  set open(value: boolean) {
    this.toggleAttribute("open", value);
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: "open",
      clonable: true,
      serializable: true,
    });
    const template = document.createElement("template");
    template.innerHTML = `<style>${VariablesCSS}\n${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

if (typeof window !== "undefined" && !window.customElements.get("jb-icon-eye")) {
  window.customElements.define("jb-icon-eye", JBIconEyeWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-eye": JBIconEyeWebComponent;
  }
}
