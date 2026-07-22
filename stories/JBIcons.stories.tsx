import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement, useRef, useState } from "react";
import "jb-icons/delete";
import "jb-icons/edit";
import "jb-icons/eye";
import "jb-icons/refresh";
import "jb-icons/search";
import "./styles.css";

const iconNames = ["delete", "edit", "eye", "refresh", "search"] as const;
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

function Icon({ icon, size = "md", color }: Partial<IconStoryArgs> & Pick<IconStoryArgs, "icon">) {
  return createElement(`jb-icon-${icon}`, { size, color, "aria-label": `${icon} icon` });
}

function AnimationExamples() {
  const examples = useRef<HTMLDivElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editActive, setEditActive] = useState(false);
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
      {iconNames.map(icon => (
        <div className="icon-gallery-item" key={icon}>
          <Icon icon={icon} size="xl" />
          <code>{`jb-icon-${icon}`}</code>
        </div>
      ))}
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
          <Icon icon={args.icon} size="xl" color={color} />
          <code>{color}</code>
        </div>
      ))}
    </div>
  ),
};

export const Animations: Story = {
  render: () => <AnimationExamples />,
};
