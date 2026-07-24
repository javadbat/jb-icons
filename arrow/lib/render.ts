export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <g class="spin-icon" part="icon">
        <path class="arrow" d="M352 160 704 512 352 864" part="arrow"></path>
        <path class="end-line" d="M768 160V864" part="end-line"></path>
      </g>
    </svg>
  `;
}
