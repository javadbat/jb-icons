import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement, useRef, useState } from "react";
import "jb-icons/arrow";
import "jb-icons/close";
import "jb-icons/delete";
import "jb-icons/edit";
import "jb-icons/expand";
import "jb-icons/eye";
import "jb-icons/filter";
import "jb-icons/refresh";
import "jb-icons/search";
import "jb-icons/arrow-tailed";
import "jb-icons/triangle";
import "./styles.css";

const iconNames = ["arrow", "arrow-tailed", "close", "delete", "edit", "expand", "eye", "filter", "refresh", "search", "triangle"] as const;
const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;

type IconName = (typeof iconNames)[number];
type IconSize = (typeof iconSizes)[number];
type IconColor = (typeof iconColors)[number];

interface IconStoryArgs {
  icon: IconName;
  size: IconSize;
  color: IconColor;
}

type AnimatedIconElement = HTMLElement & {
  isOpen: boolean;
  isActive: boolean;
  isExpanded: boolean;
  open: boolean;
  isLoading: boolean;
  spin: number;
};

function Icon({ icon, size = "md", color }: Partial<IconStoryArgs> & Pick<IconStoryArgs, "icon">) {
  return createElement(`jb-icon-${icon}`, { size, color, "aria-label": `${icon} icon` });
}

function HoverAnimatedIcon({ icon, size = "md", color }: Partial<IconStoryArgs> & Pick<IconStoryArgs, "icon">) {
  const iconRef = useRef<AnimatedIconElement>(null);

  const setAnimationState = (isActive: boolean) => {
    const element = iconRef.current;
    if (!element) return;

    switch (icon) {
      case "delete":
        element.isOpen = isActive;
        break;
      case "edit":
        element.isActive = isActive;
        break;
      case "expand":
        element.isExpanded = isActive;
        break;
      case "eye":
        element.open = isActive;
        break;
      case "refresh":
      case "search":
        element.isLoading = isActive;
        break;
    }
  };

  return createElement(`jb-icon-${icon}`, {
    ref: iconRef,
    size,
    color,
    "aria-label": `${icon} icon`,
    onMouseEnter: () => setAnimationState(true),
    onMouseLeave: () => setAnimationState(false),
  });
}

function AnimationExamples() {
  const examples = useRef<HTMLDivElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [expandActive, setExpandActive] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const toggleEye = () => {
    const nextValue = !eyeOpen;
    setEyeOpen(nextValue);
    const icon = examples.current?.querySelector<HTMLElement & { open: boolean }>("jb-icon-eye");
    if (icon) icon.open = nextValue;
  };

  const toggleDelete = () => {
    const nextValue = !deleteOpen;
    setDeleteOpen(nextValue);
    const icon = examples.current?.querySelector<HTMLElement & { isOpen: boolean }>("jb-icon-delete");
    if (icon) icon.isOpen = nextValue;
  };

  const toggleEdit = () => {
    const nextValue = !editActive;
    setEditActive(nextValue);
    const icon = examples.current?.querySelector<HTMLElement & { isActive: boolean }>("jb-icon-edit");
    if (icon) icon.isActive = nextValue;
  };

  const toggleExpand = () => {
    const nextValue = !expandActive;
    setExpandActive(nextValue);
    const icon = examples.current?.querySelector<HTMLElement & { isExpanded: boolean }>("jb-icon-expand");
    if (icon) icon.isExpanded = nextValue;
  };

  const toggleRefresh = () => {
    const nextValue = !refreshLoading;
    setRefreshLoading(nextValue);
    const icon = examples.current?.querySelector<HTMLElement & { isLoading: boolean }>("jb-icon-refresh");
    if (icon) icon.isLoading = nextValue;
  };

  const toggleSearch = () => {
    const nextValue = !searchLoading;
    setSearchLoading(nextValue);
    const icon = examples.current?.querySelector<HTMLElement & { isLoading: boolean }>("jb-icon-search");
    if (icon) icon.isLoading = nextValue;
  };

  const spinIcon = (selector: "jb-icon-arrow" | "jb-icon-arrow-tailed" | "jb-icon-triangle") => {
    const icon = examples.current?.querySelector<AnimatedIconElement>(selector);
    if (icon) icon.spin = 180;
  };

  return (
    <div className="icon-actions" ref={examples}>
      <section className="icon-action-card">
        <Icon icon="delete" size="xl" color="danger" />
        <strong>Delete</strong>
        <button type="button" onClick={toggleDelete}>
          {deleteOpen ? "Close" : "Open"}
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="edit" size="xl" color="primary" />
        <strong>Edit</strong>
        <button type="button" onClick={toggleEdit}>
          {editActive ? "Deactivate" : "Activate"}
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="expand" size="xl" color="primary" />
        <strong>Expand</strong>
        <button type="button" onClick={toggleExpand}>
          {expandActive ? "Collapse" : "Expand"}
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="eye" size="xl" color="dark" />
        <strong>Eye</strong>
        <button type="button" onClick={toggleEye}>
          {eyeOpen ? "Close" : "Open"}
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="refresh" size="xl" color="positive" />
        <strong>Refresh</strong>
        <button type="button" onClick={toggleRefresh}>
          {refreshLoading ? "Stop" : "Start"}
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="search" size="xl" color="secondary" />
        <strong>Search</strong>
        <button type="button" onClick={toggleSearch}>
          {searchLoading ? "Stop" : "Start"}
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="arrow" size="xl" color="primary" />
        <strong>Arrow</strong>
        <button type="button" onClick={() => spinIcon("jb-icon-arrow")}>
          Spin 180°
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="arrow-tailed" size="xl" color="primary" />
        <strong>Arrow Tailed</strong>
        <button type="button" onClick={() => spinIcon("jb-icon-arrow-tailed")}>
          Spin 180°
        </button>
      </section>

      <section className="icon-action-card">
        <Icon icon="triangle" size="xl" color="primary" />
        <strong>Triangle</strong>
        <button type="button" onClick={() => spinIcon("jb-icon-triangle")}>
          Spin 180°
        </button>
      </section>
    </div>
  );
}

const meta: Meta<IconStoryArgs> = {
  title: "Components/JBIcons",
  args: {
    icon: "edit",
    size: "xl",
    color: "primary",
  },
  argTypes: {
    icon: { control: "select", options: iconNames },
    size: { control: "select", options: iconSizes },
    color: { control: "select", options: iconColors },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<IconStoryArgs>;

export const Playground: Story = {
  render: args => (
    <div className={`icon-preview ${args.color === "light" ? "icon-preview--dark" : ""}`}>
      <Icon {...args} />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="icon-gallery">
      <div className="icon-gallery-item">
        <div className="arrow-directions">
          {createElement("jb-icon-arrow", { direction: "up", size: "xl", "aria-label": "up arrow" })}
          {createElement("jb-icon-arrow", { direction: "right", size: "xl", "aria-label": "right arrow" })}
          {createElement("jb-icon-arrow", { direction: "down", size: "xl", "aria-label": "down arrow" })}
          {createElement("jb-icon-arrow", { direction: "left", size: "xl", "aria-label": "left arrow" })}
          {createElement("jb-icon-arrow", { direction: "inline-start", size: "xl", "aria-label": "inline-start arrow" })}
          {createElement("jb-icon-arrow", { direction: "inline-end", size: "xl", "aria-label": "inline-end arrow" })}
        </div>
        <code>jb-icon-arrow</code>
      </div>
      <div className="icon-gallery-item">
        <div className="arrow-directions">
          {createElement("jb-icon-arrow", { direction: "up", size: "xl", "end-line": "", "aria-label": "up arrow with end line" })}
          {createElement("jb-icon-arrow", { direction: "right", size: "xl", "end-line": "", "aria-label": "right arrow with end line" })}
          {createElement("jb-icon-arrow", { direction: "down", size: "xl", "end-line": "", "aria-label": "down arrow with end line" })}
          {createElement("jb-icon-arrow", { direction: "left", size: "xl", "end-line": "", "aria-label": "left arrow with end line" })}
          {createElement("jb-icon-arrow", { direction: "inline-start", size: "xl", "end-line": "", "aria-label": "inline-start arrow with end line" })}
          {createElement("jb-icon-arrow", { direction: "inline-end", size: "xl", "end-line": "", "aria-label": "inline-end arrow with end line" })}
        </div>
        <code>jb-icon-arrow</code>
        <code>end-line</code>
      </div>
      <div className="icon-gallery-item">
        <div className="arrow-directions">
          {createElement("jb-icon-arrow-tailed", { direction: "up", size: "xl", "aria-label": "up tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "right", size: "xl", "aria-label": "right tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "down", size: "xl", "aria-label": "down tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "left", size: "xl", "aria-label": "left tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "inline-start", size: "xl", "aria-label": "inline-start tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "inline-end", size: "xl", "aria-label": "inline-end tailed arrow" })}
        </div>
        <code>jb-icon-arrow-tailed</code>
      </div>
      <div className="icon-gallery-item">
        <div className="arrow-directions">
          {createElement("jb-icon-triangle", { direction: "up", size: "xl", "aria-label": "up triangle" })}
          {createElement("jb-icon-triangle", { direction: "right", size: "xl", "aria-label": "right triangle" })}
          {createElement("jb-icon-triangle", { direction: "down", size: "xl", "aria-label": "down triangle" })}
          {createElement("jb-icon-triangle", { direction: "left", size: "xl", "aria-label": "left triangle" })}
          {createElement("jb-icon-triangle", { direction: "inline-start", size: "xl", "aria-label": "inline-start triangle" })}
          {createElement("jb-icon-triangle", { direction: "inline-end", size: "xl", "aria-label": "inline-end triangle" })}
        </div>
        <code>jb-icon-triangle</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="close" size="xl" />
        <code>jb-icon-close</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="delete" size="xl" />
        <code>jb-icon-delete</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="edit" size="xl" />
        <code>jb-icon-edit</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="expand" size="xl" />
        <code>jb-icon-expand</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="eye" size="xl" />
        <code>jb-icon-eye</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="filter" size="xl" />
        <code>jb-icon-filter</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="refresh" size="xl" />
        <code>jb-icon-refresh</code>
      </div>
      <div className="icon-gallery-item">
        <HoverAnimatedIcon icon="search" size="xl" />
        <code>jb-icon-search</code>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: args => (
    <div className="icon-row">
      {iconSizes.map(size => (
        <div className="icon-variant" key={size}>
          <Icon icon={args.icon} size={size} color={args.color} />
          <code>{size}</code>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: args => (
    <div className="icon-color-grid">
      {iconColors.map(color => (
        <div className={`icon-variant ${color === "light" ? "icon-variant--dark" : ""}`} key={color}>
          <HoverAnimatedIcon icon={args.icon} size="xl" color={color} />
          <code>{color}</code>
        </div>
      ))}
    </div>
  ),
};

export const Animations: Story = {
  render: () => <AnimationExamples />,
};
