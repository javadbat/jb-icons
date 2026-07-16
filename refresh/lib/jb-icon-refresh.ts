import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-refresh.css";
import { renderHTML } from "./render.js";

const HTMLElementBase = globalThis.HTMLElement ?? (class {} as typeof HTMLElement);

export class JBIconRefreshWebComponent extends HTMLElementBase {
  #isLoading = false;
  readonly icon: SVGSVGElement;
  readonly animation: Animation;

  get isLoading(): boolean {
    return this.#isLoading;
  }

  set isLoading(value: boolean) {
    if (!this.#isLoading && value) {
      this.animation.play();
    }
    this.#isLoading = value;
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
    this.icon = shadowRoot.querySelector("svg")!;
    this.animation = this.icon.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
      { id: "spin", duration: 400, iterations: 1 },
    );
    this.animation.cancel();
    this.animation.onfinish = () => {
      if (this.isLoading) {
        this.animation.play();
      }
    };
  }
}

if (typeof window !== "undefined" && !window.customElements.get("jb-icon-refresh")) {
  window.customElements.define("jb-icon-refresh", JBIconRefreshWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-refresh": JBIconRefreshWebComponent;
  }
}
