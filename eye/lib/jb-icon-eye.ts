import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-eye.css";
import { renderHTML } from "./render.js";

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

defineWebComponent("jb-icon-eye", JBIconEyeWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-eye": JBIconEyeWebComponent;
  }
}
