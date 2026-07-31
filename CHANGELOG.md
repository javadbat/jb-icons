# Changelog

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
