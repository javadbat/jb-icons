import { registerDefaultVariables } from "jb-core/theme";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-delete.css";
import { renderHTML } from "./render.js";

const HTMLElementBase = globalThis.HTMLElement ?? (class {} as typeof HTMLElement);
const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;

export type JBIconSize = (typeof iconSizes)[number];
export type JBIconColor = (typeof iconColors)[number];

export class JBIconDeleteWebComponent extends HTMLElementBase {
  readonly door: SVGGElement;
  #isOpen = false;
  #doorAnimation: Animation | null = null;

  get isOpen(): boolean {
    return this.#isOpen;
  }

  set isOpen(value: boolean) {
    if (this.#isOpen === value) return;
    if (value) {
      this.playOpenAnimation();
    } else {
      this.playCloseAnimation();
    }
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
    this.door = shadowRoot.querySelector(".door")!;
  }

  playOpenAnimation(): Animation {
    this.#isOpen = true;
    this.#doorAnimation?.cancel();
    this.#doorAnimation = this.door.animate([{ transform: "translate(0, 0) rotate(0deg)" }, { transform: "translate(-9rem, -5rem) rotate(-18deg)" }], {
      id: "open",
      duration: 200,
      easing: "ease",
      fill: "forwards",
      iterations: 1,
    });
    return this.#doorAnimation;
  }

  playCloseAnimation(): Animation {
    this.#isOpen = false;
    this.#doorAnimation?.cancel();
    this.#doorAnimation = this.door.animate([{ transform: "translate(-9rem, -5rem) rotate(-18deg)" }, { transform: "translate(0, 0) rotate(0deg)" }], {
      id: "close",
      duration: 200,
      easing: "ease",
      fill: "forwards",
      iterations: 1,
    });
    return this.#doorAnimation;
  }
}

if (typeof window !== "undefined" && !window.customElements.get("jb-icon-delete")) {
  window.customElements.define("jb-icon-delete", JBIconDeleteWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-delete": JBIconDeleteWebComponent;
  }
}
