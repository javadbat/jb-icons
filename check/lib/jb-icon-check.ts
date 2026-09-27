import { defineWebComponent, JBBaseComponent, parseBooleanAttribute } from "jb-core";
import { registerDefaultVariables } from "jb-core/theme";
import VariablesCSS from "../../style/variables.css";
import CSS from "./jb-icon-check.css";
import { renderHTML } from "./render.js";

const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;

export type JBIconSize = (typeof iconSizes)[number];
export type JBIconColor = (typeof iconColors)[number];

/**length of the short leg of the tick: 192√2 ≈ 271.5*/
const CHECK_FIRST_LEG_LENGTH = 272;
/**full length of the tick path: 192√2 + 448√2 ≈ 905.1, rounded up so the settled dash covers the whole mark*/
const CHECK_MARK_LENGTH = 906;
/**dash offset where the first leg is complete and the pen sits exactly on the corner*/
const CHECK_CORNER_OFFSET = CHECK_MARK_LENGTH - CHECK_FIRST_LEG_LENGTH;
/**the first stroke is written quickly and decelerates into the corner*/
const CHECK_FIRST_STROKE_EASING = "cubic-bezier(0.215, 0.61, 0.355, 1)";
/**after the direction change the long stroke starts slowly, flicks, then lands softly at the tip*/
const CHECK_SECOND_STROKE_EASING = "cubic-bezier(0.35, 0.1, 0.25, 1)";
/**the eraser sweeps the long stroke with an even accelerate and decelerate*/
const UNCHECK_LONG_STROKE_EASING = "cubic-bezier(0.45, 0, 0.55, 1)";
/**the short stroke is wiped away quickly at the end*/
const UNCHECK_SHORT_STROKE_EASING = "cubic-bezier(0.3, 0.9, 0.4, 1)";
/**two pen strokes plus a short pause at the corner need more time than a single sweep*/
const CHECK_DURATION = 420;
const CHECK_FIRST_STROKE_END = 0.36;
const CHECK_CORNER_PAUSE_END = 0.44;
const UNCHECK_DURATION = 140;
const UNCHECK_LONG_STROKE_END = 0.5;
const UNCHECK_CORNER_PAUSE_END = 0.58;
/**short press feedback that peaks as the tip lands, so the mark feels placed instead of only revealed*/
const CHECK_PRESS_DURATION = 300;
const CHECK_PRESS_LEAD = 120;
const CHECK_PRESS_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
/**reduced motion jumps straight to the end state*/
const INSTANT_DURATION = 1;

export class JBIconCheckWebComponent extends JBBaseComponent {
  readonly mark: SVGPathElement;
  #isChecked = true;
  #markAnimation: Animation | null = null;
  #pressAnimation: Animation | null = null;

  static get observedAttributes(): string[] {
    return ["unchecked"];
  }

  get isChecked(): boolean {
    return this.#isChecked;
  }

  set isChecked(value: boolean) {
    if (value === this.#isChecked) return;
    this.#updateCheckedState(value);
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
    this.mark = shadowRoot.querySelector(".check-mark")!;
    this.mark.style.setProperty("--icon-check-mark-length", `${CHECK_MARK_LENGTH}`);
    this.#initProps();
  }
  #initProps() {
    const uncheckedAttr = this.getAttribute("unchecked");
    if (uncheckedAttr !== null) {
      this.#isChecked = !parseBooleanAttribute(uncheckedAttr);
    }
  }
  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    switch(name){
      case "unchecked":
         const nextValue = parseBooleanAttribute(newValue);
         this.#updateCheckedState(!nextValue);
         break;
    }
   
  }

  /**
   * draws the mark the way a hand draws a check: a first stroke into the corner, a short pause while the pen changes direction, then the long stroke.
   * the mark always starts from nothing when it is idle, so the method also works as a replay.
   */
  #playCheckAnimation(): Animation {
    const startOffset = this.#resolveStartOffset(CHECK_MARK_LENGTH);
    const isReducedMotion = this.#prefersReducedMotion();
    this.#cancelAnimations();
    this.#markAnimation = this.mark.animate(this.#buildCheckKeyframes(startOffset), {
      id: "check",
      duration: isReducedMotion ? INSTANT_DURATION : CHECK_DURATION,
      fill: "forwards",
      iterations: 1,
    });
    if (!isReducedMotion) {
      this.#pressAnimation = this.mark.animate(
        [
          { transform: "scale(1)", offset: 0, easing: "ease-out" },
          { transform: "scale(1.05)", offset: 0.35, easing: CHECK_PRESS_EASING },
          { transform: "scale(1)", offset: 1 },
        ],
        {
          id: "check-press",
          duration: CHECK_PRESS_DURATION,
          delay: CHECK_DURATION - CHECK_PRESS_LEAD,
          fill: "forwards",
          iterations: 1,
        },
      );
    }
    return this.#markAnimation;
  }

  /**
   * erases the mark backwards along the path it was drawn with: the long stroke is wiped away first, then the short one.
   * the mark always starts from the fully drawn state when it is idle, so the method also works as a replay.
   */
  #playUncheckAnimation(): Animation {
    const startOffset = this.#resolveStartOffset(0);
    this.#cancelAnimations();
    this.#markAnimation = this.mark.animate(this.#buildUncheckKeyframes(startOffset), {
      id: "uncheck",
      duration: this.#prefersReducedMotion() ? INSTANT_DURATION : UNCHECK_DURATION,
      fill: "forwards",
      iterations: 1,
    });
    return this.#markAnimation;
  }

  /**keeps the isChecked property and its reflected checked attribute in sync*/
  #updateCheckedState(value: boolean): void {
    this.#isChecked = value;
    if(value) {
      this.removeAttribute("unchecked");
    }
    if (value) {
      this.#playCheckAnimation();
    } else {
      this.#playUncheckAnimation();
    }
  }

  /**two pen strokes with a pause at the corner, or a single stroke when the long leg is already on the screen*/
  #buildCheckKeyframes(startOffset: number): Keyframe[] {
    if (startOffset <= CHECK_CORNER_OFFSET) {
      //the long stroke is already partly drawn, so finish it in one stroke instead of moving backwards
      return [
        { strokeDashoffset: `${startOffset}`, offset: 0, easing: CHECK_SECOND_STROKE_EASING },
        { strokeDashoffset: "0", offset: 1 },
      ];
    }
    return [
      { strokeDashoffset: `${startOffset}`, offset: 0, easing: CHECK_FIRST_STROKE_EASING },
      { strokeDashoffset: `${CHECK_CORNER_OFFSET}`, offset: CHECK_FIRST_STROKE_END },
      { strokeDashoffset: `${CHECK_CORNER_OFFSET}`, offset: CHECK_CORNER_PAUSE_END, easing: CHECK_SECOND_STROKE_EASING },
      { strokeDashoffset: "0", offset: 1 },
    ];
  }

  /**the long stroke is wiped away first, then the short one, or a single sweep when only the short leg is on the screen*/
  #buildUncheckKeyframes(startOffset: number): Keyframe[] {
    if (startOffset >= CHECK_CORNER_OFFSET) {
      //only the short stroke is visible, so a single sweep erases it
      return [
        { strokeDashoffset: `${startOffset}`, offset: 0, easing: UNCHECK_SHORT_STROKE_EASING },
        { strokeDashoffset: `${CHECK_MARK_LENGTH}`, offset: 1 },
      ];
    }
    return [
      { strokeDashoffset: `${startOffset}`, offset: 0, easing: UNCHECK_LONG_STROKE_EASING },
      { strokeDashoffset: `${CHECK_CORNER_OFFSET}`, offset: UNCHECK_LONG_STROKE_END },
      { strokeDashoffset: `${CHECK_CORNER_OFFSET}`, offset: UNCHECK_CORNER_PAUSE_END, easing: UNCHECK_SHORT_STROKE_EASING },
      { strokeDashoffset: `${CHECK_MARK_LENGTH}`, offset: 1 },
    ];
  }

  /**continue an in-flight animation from its current position, otherwise start from the given offset*/
  #resolveStartOffset(idleOffset: number): number {
    const isAnimating = this.#markAnimation !== null && this.#markAnimation.playState === "running";
    return isAnimating ? this.#currentMarkOffset() : idleOffset;
  }

  #currentMarkOffset(): number {
    const offset = Number.parseFloat(getComputedStyle(this.mark).strokeDashoffset);
    return Number.isFinite(offset) ? offset : CHECK_MARK_LENGTH;
  }

  #cancelAnimations(): void {
    this.#markAnimation?.cancel();
    this.#pressAnimation?.cancel();
    this.#markAnimation = null;
    this.#pressAnimation = null;
  }

  #prefersReducedMotion(): boolean {
    if (typeof globalThis.matchMedia !== "function") return false;
    return globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}

defineWebComponent("jb-icon-check", JBIconCheckWebComponent);

declare global {
  interface HTMLElementTagNameMap {
    "jb-icon-check": JBIconCheckWebComponent;
  }
}
