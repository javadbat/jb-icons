export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <g class="arrow arrow-top-start" part="arrow">
        <path d="M448 448 160 160M160 384V160H384"></path>
      </g>
      <g class="arrow arrow-top-end" part="arrow">
        <path d="M576 448 864 160M640 160H864V384"></path>
      </g>
      <g class="arrow arrow-bottom-end" part="arrow">
        <path d="M576 576 864 864M864 640V864H640"></path>
      </g>
      <g class="arrow arrow-bottom-start" part="arrow">
        <path d="M448 576 160 864M384 864H160V640"></path>
      </g>
    </svg>
  `;
}
