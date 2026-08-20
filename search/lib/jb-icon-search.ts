import { defineWebComponent, JBBaseComponent } from "jb-core";
import CSS from "./jb-icon-search.css";
import VariablesCSS from "../../style/variables.css";
import { renderHTML } from "./render.js";

const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;

export type JBIconSize = (typeof iconSizes)[number];
export type JBIconColor = (typeof iconColors)[number];

export class JBIconSearchWebComponent extends JBBaseComponent {
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
    const shrinkLineAnimation = this.spinnerLine.animate([{ d: 'path("M800 800 L 900 900")' }, { d: 'path("M820 820 L 830 830")' }], { id: "ShrinkLine", duration: 400 });
    shrinkLineAnimation.cancel();

    const curveLineAnimation = this.spinnerLine.animate(
      [
        {
          d: 'path("M 816 827 A 440 440 0 0 0 827 816")',
        },
        { d: 'path("M 510 950 A 440 440 0 0 0 950 510")' },
      ],
      { id: "CurveLine", duration: 400 },
    );
    curveLineAnimation.cancel();

    const spinAnimation = this.spinnerBox.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(180deg)" }, { transform: "rotate(360deg)" }], {
      id: "Spin",
      duration: 1000,
      iterations: 1,
    });
    spinAnimation.cancel();

    const reverseCurveLineAnimation = this.spinnerLine.animate(
      [
        { d: 'path("M 510 950 A 440 440 0 0 0 950 510")' },
        {
          d: 'path("M 816 827 A 440 440 0 0 0 827 816")',
        },
      ],
      { id: "ReverseCurveLine", duration: 400 },
    );
    reverseCurveLineAnimation.cancel();

    const growLineAnimation = this.spinnerLine.animate([{ d: 'path("M820 820 L 830 830")' }, { d: 'path("M800 800 L 900 900")' }], { id: "GrowLine", duration: 400 });
    growLineAnimation.cancel();

    shrinkLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute("d", "M 816 827 A 440 440 0 0 0 827 816");
      curveLineAnimation.play();
    };
    curveLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute("d", "M 510 950 A 440 440 0 0 0 950 510");
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
      this.spinnerLine.setAttribute("d", "M820 820 L 830 830");
      growLineAnimation.play();
    };
    growLineAnimation.onfinish = () => {
      this.spinnerLine.setAttribute("d", "M800 800 L 900 900");
    };

    shrinkLineAnimation.play();
  }
}

defineWebComponent("jb-icon-search", JBIconSearchWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-search": JBIconSearchWebComponent;
  }
}
