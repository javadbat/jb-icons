export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <g transform="translate(149 84)">
        <path class="door" d="M701 136H510A161 161 0 0 0 194 136H26a26 26 0 0 0 0 51H701a26 26 0 0 0 0-51ZM352 51A110 110 0 0 1 459 136H245A110 110 0 0 1 352 51Z" part="door"></path>
        <path d="M640 217A26 26 0 0 0 612 240L571 697a22 22 0 0 0 0 2 106 106 0 0 1-106 106H263a106 106 0 0 1-106-106 22 22 0 0 0 0-2L114 240a26 26 0 1 0-51 5l42 456a157 157 0 0 0 157 156H464a157 157 0 0 0 157-156L663 244A26 26 0 0 0 640 217Z" part="body"></path>
        <path d="M305 574V336a26 26 0 0 0-51 0V574a26 26 0 0 0 51 0Z" part="line"></path>
        <path d="M480 678V440a26 26 0 0 0-51 0V678a26 26 0 0 0 51 0Z" part="line"></path>
      </g>
    </svg>
  `;
}
