export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <circle cx="510" cy="510" r="340" part="circle"></circle>
      <g class="spin-line-group" part="spinner">
        <rect x="0" y="0" width="1024" height="1024"></rect>
        <path class="convertable-line" d="M800 800 L900 900" part="handle"></path>
      </g>
    </svg>
  `;
}
