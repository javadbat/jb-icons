export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <g class="door" part="door">
        <path d="M175 246H850"></path>
        <path d="M366 220A136 136 0 0 1 636 220"></path>
      </g>
      <path d="M238 326 280 783A132 132 0 0 0 412 915H613A132 132 0 0 0 745 783L787 326" part="body"></path>
      <path d="M429 420V658" part="line"></path>
      <path d="M604 524V762" part="line"></path>
    </svg>
  `;
}
