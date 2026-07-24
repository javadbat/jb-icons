import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-close.css";
import { renderHTML } from "./render.js";

const HTMLElementBase = globalThis.HTMLElement ?? (class {} as typeof HTMLElement);

export class JBIconCloseWebComponent extends HTMLElementBase {
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

if (typeof window !== "undefined" && !window.customElements.get("jb-icon-close")) {
  window.customElements.define("jb-icon-close", JBIconCloseWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-close": JBIconCloseWebComponent;
  }
}
