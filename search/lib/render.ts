export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <circle cx="255" cy="255" r="170" part="circle"></circle>
      <g class="spin-line-group" part="spinner">
        <rect x="0" y="0" width="512" height="512"></rect>
        <path class="convertable-line" d="M400 400 L 450 450" part="handle"></path>
      </g>
    </svg>
  `;
}
