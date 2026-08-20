import { defineWebComponent, JBBaseComponent } from "jb-core";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-triangle.css";
import { renderHTML } from "./render.js";
import { getRoundedTriangle } from './utils.js';

export class JBIconTriangleWebComponent extends JBBaseComponent {
  readonly icon: SVGGElement;
  trianglePath: SVGGElement;
  #spin = 0;
  #spinAnimation: Animation | null = null;

  get spin() {
    return this.#spin;
  }

  set spin(value: number) {
    this.#spin = value;
    this.playSpin();
  }
  #round: number = 0;
  get round() {
    return this.#round;
  }
  set round(value: number) {
    this.#round = value;
    this.trianglePath.setAttribute("d", getRoundedTriangle(value));
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
    this.trianglePath = shadowRoot.querySelector(".triangle-path")!;
  }
  static get observedAttributes() {
    return ['round'];
  }
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "round":
        this.round = Number(newValue ?? 0);
        break;
    }
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

defineWebComponent("jb-icon-triangle", JBIconTriangleWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-triangle": JBIconTriangleWebComponent;
  }
}
