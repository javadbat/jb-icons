import { defineWebComponent, JBBaseComponent } from "jb-core";
import { registerDefaultVariables } from "jb-core/theme";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-refresh.css";
import { renderHTML } from "./render.js";

export class JBIconRefreshWebComponent extends JBBaseComponent {
  #isLoading = false;
  readonly icon: SVGGElement;
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
    registerDefaultVariables();
    const shadowRoot = this.attachShadow({
      mode: "open",
      clonable: true,
      serializable: true,
    });
    const template = document.createElement("template");
    template.innerHTML = `<style>${VariablesCSS}\n${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.icon = shadowRoot.querySelector(".icon")!;
    this.animation = this.icon.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { id: "spin", duration: 400, iterations: 1 });
    this.animation.cancel();
    this.animation.onfinish = () => {
      if (this.isLoading) {
        this.animation.play();
      }
    };
  }
}

defineWebComponent("jb-icon-refresh", JBIconRefreshWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-refresh": JBIconRefreshWebComponent;
  }
}
