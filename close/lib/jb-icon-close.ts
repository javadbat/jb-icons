import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-close.css";
import { renderHTML } from "./render.js";
import { JBBaseComponent } from "jb-core";

export class JBIconCloseWebComponent extends JBBaseComponent {
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

if (globalThis.customElements && !globalThis.customElements.get("jb-icon-close")) {
  globalThis.customElements.define("jb-icon-close", JBIconCloseWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-close": JBIconCloseWebComponent;
  }
}
