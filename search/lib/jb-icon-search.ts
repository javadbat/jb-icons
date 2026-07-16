import CSS from "./jb-icon-search.css";
import VariablesCSS from "../../style/variables.css";
import { renderHTML } from "./render.js";

const HTMLElementBase = globalThis.HTMLElement ?? (class {} as typeof HTMLElement);
const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;

export type JBIconSize = (typeof iconSizes)[number];
export type JBIconColor = (typeof iconColors)[number];

export class JBIconSearchWebComponent extends HTMLElementBase {
  #isLoading = false;
  readonly spinnerLine: SVGPathElement;
  readonly spinnerBox: SVGGElement;

  get isLoading(): boolean {
    return this.#isLoading;
  }

  set isLoading(value: boolean) {
    if (!this.#isLoading && value === true) {
      this.#playLoadingAnimation();
    }
    this.#isLoading = value;
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
    const shadowRoot = this.attachShadow({
      mode: "open",
      clonable: true,
      serializable: true,
    });
    const template = document.createElement("template");
    template.innerHTML = `<style>${VariablesCSS}\n${CSS}</style>\n${renderHTML()}`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.spinnerLine = shadowRoot.querySelector(".convertable-line") as SVGPathElement;
    this.spinnerBox = shadowRoot.querySelector(".spin-line-group") as SVGGElement;
  }

  #playLoadingAnimation(): void {
    const shrinkLineAnimation = this.spinnerLine.animate(
      [
        { d: 'path("M400 400 L 450 450")' },
        { d: 'path("M410 410 L 415 415")' },
      ],
      { id: "ShrinkLine", duration: 400 },
    );
    shrinkLineAnimation.cancel();

    const curveLineAnimation = this.spinnerLine.animate(
      [
        {
          d: 'path("M 407.82484150097946 413.25475607450323 A 220 220 0 0 0 413.25475607450323 407.8248415009794")',
        },
        { d: 'path("M 255 475 A 220 220 0 0 0 475 255")' },
      ],
      { id: "CurveLine", duration: 400 },
    );
    curveLineAnimation.cancel();

    const spinAnimation = this.spinnerBox.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(180deg)" },
        { transform: "rotate(360deg)" },
      ],
      { id: "Spin", duration: 1000, iterations: 1 },
    );
    spinAnimation.cancel();

    const reverseCurveLineAnimation = this.spinnerLine.animate(
      [
        { d: 'path("M 255 475 A 220 220 0 0 0 475 255")' },
        {
          d: 'path("M 407.82484150097946 413.25475607450323 A 220 220 0 0 0 413.25475607450323 407.8248415009794")',
        },
      ],
      { id: "ReverseCurveLine", duration: 400 },
    );
    reverseCurveLineAnimation.cancel();

    const growLineAnimation = this.spinnerLine.animate(
      [
        { d: 'path("M410 410 L 415 415")' },
        { d: 'path("M400 400 L 450 450")' },
      ],
      { id: "GrowLine", duration: 400 },
    );
    growLineAnimation.cancel();

    shrinkLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute(
        "d",
        "M 407.82484150097946 413.25475607450323 A 220 220 0 0 0 413.25475607450323 407.8248415009794",
      );
      curveLineAnimation.play();
    };
    curveLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute("d", "M 255 475 A 220 220 0 0 0 475 255");
      spinAnimation.play();
    };
    spinAnimation.onfinish = () => {
      if (this.isLoading) {
        spinAnimation.play();
      } else {
        reverseCurveLineAnimation.play();
      }
    };
    reverseCurveLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute("d", "M410 410 L 415 415");
      growLineAnimation.play();
    };
    growLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute("d", "M400 400 L 450 450");
    };

    shrinkLineAnimation.play();
  }
}

if (typeof window !== "undefined" && !window.customElements.get("jb-icon-search")) {
  window.customElements.define("jb-icon-search", JBIconSearchWebComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-search": JBIconSearchWebComponent;
  }
}
