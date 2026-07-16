# jb-icon
Icon component for the JB Design System.
jb-icon has no default export. it has some sub folder each contain one icon. to make it ssr friendly we create all jb-icons in declarative web-component.

## Size and variants

Every icon supports a `size` attribute and property. Sizes set only the icon height;
width remains automatic and follows the SVG's aspect ratio.

The shared size rules live in `style/variables.css` and are injected into every
icon component before its icon-specific styles. The resolved height is available
as the `--icon-size` custom property.

| Size | Default height | CSS custom property |
| --- | --- | --- |
| `xs` | 1rem (16px) | `--jb-icon-size-xs` |
| `sm` | 1.25rem (20px) | `--jb-icon-size-sm` |
| `md` | 1.5rem (24px) | `--jb-icon-size-md` |
| `lg` | 1.75rem (28px) | `--jb-icon-size-lg` |
| `xl` | 2.25rem (36px) | `--jb-icon-size-xl` |

`md` is the default when `size` is omitted. Its no-attribute size can be
customized with `--jb-icon-size`; an explicit `size="md"` uses
`--jb-icon-size-md`.

```html
<jb-icon-search></jb-icon-search>
<jb-icon-search size="sm"></jb-icon-search>
<jb-icon-search size="xl"></jb-icon-search>
```

Override one or more size tokens from an application stylesheet:

```css
:root {
  --jb-icon-size: 1.5rem;
  --jb-icon-size-xs: 0.875rem;
  --jb-icon-size-sm: 1.125rem;
  --jb-icon-size-md: 1.5rem;
  --jb-icon-size-lg: 2rem;
  --jb-icon-size-xl: 2.5rem;
}
```

`--icon-size` is internal to each icon and contains the resolved height. Prefer
the public `--jb-icon-size*` properties when customizing icons.

## Color

Icons inherit the surrounding text color by default through `currentColor`:

```html
<div style="color: rebeccapurple">
  <jb-icon-search></jb-icon-search>
</div>
```

Use the shared `--jb-icon-color` custom property to customize all JB icons in a
scope:

```css
:root {
  --jb-icon-color: #334155;
}
```

Icons also support these `color` attribute variants:

| Color | Theme fallback | CSS custom property |
| --- | --- | --- |
| `primary` | `--jb-primary` | `--jb-icon-color-primary` |
| `secondary` | `--jb-secondary` | `--jb-icon-color-secondary` |
| `positive` | `--jb-green` | `--jb-icon-color-positive` |
| `danger` | `--jb-red` | `--jb-icon-color-danger` |
| `warning` | `--jb-yellow` | `--jb-icon-color-warning` |
| `light` | `--jb-neutral-10` | `--jb-icon-color-light` |
| `dark` | `--jb-neutral` | `--jb-icon-color-dark` |

```html
<jb-icon-search color="primary"></jb-icon-search>
<jb-icon-search color="danger"></jb-icon-search>
```

Each variant first uses its `--jb-icon-color-*` property, then its corresponding
JB theme color, and finally `currentColor`. Without a `color` attribute, the
icon uses `--jb-icon-color` and falls back directly to `currentColor`.

## Icons

### Refresh icon

Import the refresh icon from its submodule:

```js
import "jb-icon/refresh";
```

```html
<jb-icon-refresh></jb-icon-refresh>
<jb-icon-refresh size="sm" color="primary"></jb-icon-refresh>
```

Set `isLoading` to `true` to start rotating the icon. Setting it back to
`false` does not interrupt the active rotation; the icon finishes that cycle
and then stops repeating:

```js
const refreshIcon = document.querySelector("jb-icon-refresh");
refreshIcon.isLoading = true;

// When refreshing finishes:
refreshIcon.isLoading = false;
```

### Search icon

Import the search icon from its submodule:

```js
import "jb-icon/search";
```

Use the shared `size` and `color` variants on `<jb-icon-search>`:

```html
<jb-icon-search></jb-icon-search>
<jb-icon-search size="sm" color="primary"></jb-icon-search>
```

Set the `isLoading` property to animate the search icon while a search is in
progress. Reset it to `false` to finish the animation and return to the search
shape:

```js
const searchIcon = document.querySelector("jb-icon-search");
searchIcon.isLoading = true;

// When the search finishes:
searchIcon.isLoading = false;
```

### Eye icon

Import the eye icon from its submodule and use the `open` attribute or property
to switch between hidden and visible states:

```js
import "jb-icon/eye";
```

```html
<jb-icon-eye></jb-icon-eye>
<jb-icon-eye open></jb-icon-eye>
```

```js
const eye = document.querySelector("jb-icon-eye");
eye.open = true;
```
