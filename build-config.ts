import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-icon-close",
    path: "./close/lib/jb-icon-close.ts",
    outputPath: "./close/dist/jb-icon-close.js",
    tsConfigPath: "./close/tsconfig.json",
    umdName: "JBIconClose",
  },
  {
    name: "jb-icon-arrow",
    path: "./arrow/lib/jb-icon-arrow.ts",
    outputPath: "./arrow/dist/jb-icon-arrow.js",
    tsConfigPath: "./arrow/tsconfig.json",
    umdName: "JBIconArrow",
  },
  {
    name: "jb-icon-expand",
    path: "./expand/lib/jb-icon-expand.ts",
    outputPath: "./expand/dist/jb-icon-expand.js",
    tsConfigPath: "./expand/tsconfig.json",
    umdName: "JBIconExpand",
  },
  {
    name: "jb-icon-filter",
    path: "./filter/lib/jb-icon-filter.ts",
    outputPath: "./filter/dist/jb-icon-filter.js",
    tsConfigPath: "./filter/tsconfig.json",
    umdName: "JBIconFilter",
  },
  {
    name: "jb-icon-search",
    path: "./search/lib/jb-icon-search.ts",
    outputPath: "./search/dist/jb-icon-search.js",
    tsConfigPath: "./search/tsconfig.json",
    umdName: "JBIconSearch",
  },
  {
    name: "jb-icon-arrow-tailed",
    path: "./arrow-tailed/lib/jb-icon-arrow-tailed.ts",
    outputPath: "./arrow-tailed/dist/jb-icon-arrow-tailed.js",
    tsConfigPath: "./arrow-tailed/tsconfig.json",
    umdName: "JBIconArrowTailed",
  },
  {
    name: "jb-icon-triangle",
    path: "./triangle/lib/jb-icon-triangle.ts",
    outputPath: "./triangle/dist/jb-icon-triangle.js",
    tsConfigPath: "./triangle/tsconfig.json",
    umdName: "JBIconTriangle",
  },
  {
    name: "jb-icon-eye",
    path: "./eye/lib/jb-icon-eye.ts",
    outputPath: "./eye/dist/jb-icon-eye.js",
    tsConfigPath: "./eye/tsconfig.json",
    umdName: "JBIconEye",
  },
  {
    name: "jb-icon-refresh",
    path: "./refresh/lib/jb-icon-refresh.ts",
    outputPath: "./refresh/dist/jb-icon-refresh.js",
    tsConfigPath: "./refresh/tsconfig.json",
    umdName: "JBIconRefresh",
  },
  {
    name: "jb-icon-delete",
    path: "./delete/lib/jb-icon-delete.ts",
    outputPath: "./delete/dist/jb-icon-delete.js",
    tsConfigPath: "./delete/tsconfig.json",
    umdName: "JBIconDelete",
  },
  {
    name: "jb-icon-edit",
    path: "./edit/lib/jb-icon-edit.ts",
    outputPath: "./edit/dist/jb-icon-edit.js",
    tsConfigPath: "./edit/tsconfig.json",
    umdName: "JBIconEdit",
  },
];

export const reactComponentList: ReactComponentBuildConfig[] = [];
