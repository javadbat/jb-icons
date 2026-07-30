import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-arrow-tailed.css";
import { renderHTML } from "./render.js";

const HTMLElementBase = globalThis.HTMLElement ?? (class {} as typeof HTMLElement);

export class JBIconArrowTailedWebComponent extends HTMLElementBase {
  readonly icon: SVGGElement;
  #spin = 0;
  #spinAnimation: Animation | null = null;

  get long(): boolean {
    return this.hasAttribute("long");
  }

  set long(value: boolean) {
    this.toggleAttribute("long", value);
  }

  get spin() {
    return this.#spin;
  }

  set spin(value: number) {
    this.#spin = value;
    this.playSpin();
  }

  connectedCallback() {
    this.syncDirection();
  }

  syncDirection() {
    const rotation = getComputedStyle(this).direction === "rtl" ? "180deg" : "0deg";
    this.style.setProperty("--calculated-bidi-rotation", rotation);
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
    this.icon = shadowRoot.querySelector(".spin-icon")!;
  }

  playSpin(): Animation {
    const currentTransform = getComputedStyle(this.icon).transform;
    this.#spinAnimation?.cancel();
    this.#spinAnimation = this.icon.animate([{ transform: currentTransform }, { transform: `rotate(${this.spin}deg)` }], {
      duration: 300,
      easing: "ease-out",
      fill: "forwards",
    });
    return this.#spinAnimation;
  }
}

if (typeof window !== "undefined" && !window.customElements.get("jb-icon-arrow-tailed")) {
  window.customElements.define("jb-icon-arrow-tailed", JBIconArrowTailedWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-arrow-tailed": JBIconArrowTailedWebComponent;
  }
}
