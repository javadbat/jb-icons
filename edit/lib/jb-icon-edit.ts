import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-edit.css";
import { renderHTML } from "./render.js";
import { registerDefaultVariables } from "jb-core/theme";

const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;

export type JBIconSize = (typeof iconSizes)[number];
export type JBIconColor = (typeof iconColors)[number];

export class JBIconEditWebComponent extends JBBaseComponent {
  get isActive(): boolean {
    return parseBooleanAttribute(this.getAttribute("active"));
  }

  set isActive(value: boolean) {
    this.toggleAttribute("active", value);
  }

  get size(): JBIconSize {
    const size = this.getAttribute("size");
    return iconSizes.includes(size as JBIconSize) ? (size as JBIconSize) : "md";
  }

  set size(value: JBIconSize) {
    this.setAttribute("size", value);
  }

  get color(): JBIconColor | null {
    const color = this.getAttribute("color");
    return iconColors.includes(color as JBIconColor) ? (color as JBIconColor) : null;
  }

  set color(value: JBIconColor | null) {
    if (value === null) {
      this.removeAttribute("color");
    } else {
      this.setAttribute("color", value);
    }
  }

  constructor() {
    super();
    registerDefaultVariables();
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

defineWebComponent("jb-icon-edit", JBIconEditWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-edit": JBIconEditWebComponent;
  }
}
