export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <path class="eye-line" stroke-linecap="round" part="line"></path>
      <circle cx="512" cy="512" r="144" part="pupil"></circle>
    </svg>
  `;
}
