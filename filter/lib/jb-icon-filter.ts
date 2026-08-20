import { defineWebComponent, JBBaseComponent } from "jb-core";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-filter.css";
import { renderHTML } from "./render.js";

export class JBIconFilterWebComponent extends JBBaseComponent {
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

defineWebComponent("jb-icon-filter", JBIconFilterWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-filter": JBIconFilterWebComponent;
  }
}
