export function renderHTML(): string {
  return /* html */ `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" part="svg">
      <path class="eye-line" stroke-linecap="round" part="line"></path>
      <circle cx="60" cy="60" r="20" part="pupil"></circle>
    </svg>
  `;
}
