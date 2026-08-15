import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-eye.css";
import { renderHTML } from "./render.js";
import { JBBaseComponent, parseBooleanAttribute } from "jb-core";

export class JBIconEyeWebComponent extends JBBaseComponent {
  get open(): boolean {
    return parseBooleanAttribute(this.getAttribute("open"));
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

if (globalThis.customElements && !globalThis.customElements.get("jb-icon-eye")) {
  globalThis.customElements.define("jb-icon-eye", JBIconEyeWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-eye": JBIconEyeWebComponent;
  }
}
