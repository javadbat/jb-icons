export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <g transform="translate(149 84)">
        <g class="door" part="door">
          <path d="M26 162H701"></path>
          <path d="M217 136A136 136 0 0 1 487 136"></path>
        </g>
        <path d="M89 242 131 699A132 132 0 0 0 263 831H464A132 132 0 0 0 596 699L638 242" part="body"></path>
        <path d="M280 336V574" part="line"></path>
        <path d="M455 440V678" part="line"></path>
      </g>
    </svg>
  `;
}
