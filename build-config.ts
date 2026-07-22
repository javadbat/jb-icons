import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-icon-search",
    path: "./search/lib/jb-icon-search.ts",
    outputPath: "./search/dist/jb-icon-search.js",
    tsConfigPath: "./search/tsconfig.json",
    umdName: "JBIconSearch",
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
