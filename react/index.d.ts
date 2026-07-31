import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { JBIconArrowWebComponent } from "jb-icons/arrow";
import type { JBIconArrowTailedWebComponent } from "jb-icons/arrow-tailed";
import type { JBIconCloseWebComponent } from "jb-icons/close";
import type { JBIconDeleteWebComponent } from "jb-icons/delete";
import type { JBIconEditWebComponent } from "jb-icons/edit";
import type { JBIconExpandWebComponent } from "jb-icons/expand";
import type { JBIconEyeWebComponent } from "jb-icons/eye";
import type { JBIconFilterWebComponent } from "jb-icons/filter";
import type { JBIconLorgnetteWebComponent } from "jb-icons/lorgnette";
import type { JBIconRefreshWebComponent } from "jb-icons/refresh";
import type { JBIconSearchWebComponent } from "jb-icons/search";
import type { JBIconTriangleWebComponent } from "jb-icons/triangle";

export type JBIconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type JBIconColor = "primary" | "secondary" | "positive" | "danger" | "warning" | "light" | "dark";
export type JBIconDirection = "up" | "right" | "down" | "left" | "inline-start" | "inline-end";

export type JBIconAttributes<T extends HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  class?: string;
  size?: JBIconSize;
  color?: JBIconColor;
};

export type JBIconArrowAttributes = JBIconAttributes<JBIconArrowWebComponent> & {
  direction?: JBIconDirection;
  spin?: number;
  "end-line"?: boolean;
};

export type JBIconArrowTailedAttributes = JBIconAttributes<JBIconArrowTailedWebComponent> & {
  direction?: JBIconDirection;
  spin?: number;
  long?: boolean;
};

export type JBIconTriangleAttributes = JBIconAttributes<JBIconTriangleWebComponent> & {
  direction?: JBIconDirection;
  round?:number;
  spin?: number;
};

export type JBIconDeleteAttributes = JBIconAttributes<JBIconDeleteWebComponent> & {
  isOpen?: boolean;
};

export type JBIconEditAttributes = JBIconAttributes<JBIconEditWebComponent> & {
  isActive?: boolean;
  active?: boolean;
};

export type JBIconExpandAttributes = JBIconAttributes<JBIconExpandWebComponent> & {
  isExpanded?: boolean;
  expanded?: boolean;
};

export type JBIconEyeAttributes = JBIconAttributes<JBIconEyeWebComponent> & {
  open?: boolean;
};

export type JBIconRefreshAttributes = JBIconAttributes<JBIconRefreshWebComponent> & {
  isLoading?: boolean;
};

export type JBIconSearchAttributes = JBIconAttributes<JBIconSearchWebComponent> & {
  isLoading?: boolean;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "jb-icon-arrow": JBIconArrowAttributes;
      "jb-icon-arrow-tailed": JBIconArrowTailedAttributes;
      "jb-icon-close": JBIconAttributes<JBIconCloseWebComponent>;
      "jb-icon-delete": JBIconDeleteAttributes;
      "jb-icon-edit": JBIconEditAttributes;
      "jb-icon-expand": JBIconExpandAttributes;
      "jb-icon-eye": JBIconEyeAttributes;
      "jb-icon-filter": JBIconAttributes<JBIconFilterWebComponent>;
      "jb-icon-lorgnette": JBIconAttributes<JBIconLorgnetteWebComponent>;
      "jb-icon-refresh": JBIconRefreshAttributes;
      "jb-icon-search": JBIconSearchAttributes;
      "jb-icon-triangle": JBIconTriangleAttributes;
    }
  }
}
