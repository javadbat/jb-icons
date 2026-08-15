# Changelog

## [2.3.0] - 2026 - 08-15

### Changed

- Updated component color defaults to use the shared semantic content and surface tokens.
- Migrated every icon to the shared SSR-safe `JBBaseComponent` and guarded custom-element registration so icon modules can be imported without browser globals.
- Updated the minimum `jb-core` dependency to `0.34.0` and externalized its runtime entry points from icon bundles.

### Added

- Added `jb-icon-plus` and `jb-icon-minus` for number input controls.

## [2.2.0] - 2026-07-31

### Added

- Add `round` property to `jb-icon-triangle`

## [2.1.0] - 2026-07-30

### Added

- Added the opt-in `jb-icons/react` entry with React JSX declarations for all
  exported icons, including shared attributes, icon-specific properties, and
  element-specific ref types.
- Added an interactive Storybook Spin example for arrow, arrow-tailed, and
  triangle icons with direction, slider, and angle preset controls.
- Added Storybook Overview, Readme, and Changes documentation pages.

### Changed

- Changed `spin` on arrow, arrow-tailed, and triangle icons to be an absolute
  rotation from the configured original direction. Setting `spin` to `0`
  restores that direction regardless of previous values.
