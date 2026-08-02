# jb-icons React JSX types

React type declarations for the `jb-icons` web-component family. The runtime
remains framework-neutral: import each icon submodule you use, then opt into
the JSX declarations with `jb-icons/react`.

## Demo

See the [React JSX demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--react-jsx) and the [icon gallery](https://javadbat.github.io/design-system/?path=/story/components-jbicons--gallery).

## Installation

```sh
npm i jb-icons
```

```tsx
import "jb-icons/react";
import "jb-icons/triangle";
```

The `jb-icons/react` entry is type-only and does not register an icon. Import
each icon separately so only the components used by your application are
registered and bundled.

## JSX usage

Use the declared custom elements directly in JSX. The [React JSX demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--react-jsx) shows shared and icon-specific properties together.

```tsx
import "jb-icons/react";
import "jb-icons/triangle";

export function DisclosureIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <jb-icon-triangle
      direction="inline-end"
      spin={isOpen ? 90 : 0}
      round={60}
      size="xs"
      aria-label="Toggle details"
    />
  );
}
```

Do not keep application-local declarations for the same `jb-icon-*` elements
after importing this module; duplicate declarations with different types can
conflict.

## Shared props

Every icon accepts standard HTML, ARIA, `children`, `class`, `ref`, `size`, and
`color` props. The shared size and color behavior is documented in the [web-component README](../README.md#size-and-variants) and demonstrated by the [sizes demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--sizes) and [colors demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--colors).

| Prop | Values | Description |
| --- | --- | --- |
| `size` | `xs \| sm \| md \| lg \| xl` | Sets the icon height while preserving its SVG aspect ratio. |
| `color` | `primary \| secondary \| positive \| danger \| warning \| light \| dark` | Selects a theme color fallback. |
| `class` | `string` | Applies a class to the custom element. |
| `ref` | React ref | Accesses the underlying icon element. |

## Icon-specific props

| Icon | Props | Example |
| --- | --- | --- |
| `jb-icon-arrow` | `direction`, `spin`, `end-line` | [Gallery demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--gallery) |
| `jb-icon-arrow-tailed` | `direction`, `spin`, `long` | [Gallery demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--gallery) |
| `jb-icon-triangle` | `direction`, `spin`, `round` | [React JSX demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--react-jsx) |
| `jb-icon-delete` | `isOpen` | [Animation demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--animations) |
| `jb-icon-edit` | `isActive`, `active` | [Animation demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--animations) |
| `jb-icon-expand` | `isExpanded`, `expanded` | [Animation demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--animations) |
| `jb-icon-eye` | `open` | [Animation demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--animations) |
| `jb-icon-refresh`, `jb-icon-search` | `isLoading` | [Animation demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--animations) |

## Direction and rotation

Arrow and triangle icons support logical and physical directions. Their numeric
`spin` property applies an absolute angle to the selected direction; use
`spin={0}` to restore the original orientation. Try the interactive [spin demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--spin).

## Animated states

Set the icon-specific state prop from React state to drive the built-in
animations. For example, `isOpen` controls the delete lid, `isActive` controls
the edit underline, `isExpanded` controls expand/collapse, `open` controls the
eye, and `isLoading` controls refresh/search loading. See the [animation demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--animations).

## Styling

Icons inherit `currentColor` by default. Use the shared `--jb-icon-color*` and
`--jb-icon-size*` custom properties for application-level theming. The
web-component README covers the complete [color](../README.md#color), [size](../README.md#size-and-variants), and [stroke-width](../README.md#stroke-width) guidance; the [stroke-width demo](https://javadbat.github.io/design-system/?path=/story/components-jbicons--stroke-widths) visualizes the available weights.

## Shared documentation

For icon-specific imports, SVG behavior, CSS variables, and the complete icon
catalog, see the [web-component README](../README.md) or its [component documentation](https://javadbat.github.io/design-system/?path=/story/components-jbicons-readme--docs).
