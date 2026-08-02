import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement, useEffect, useRef, useState, type CSSProperties } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import "jb-icons/react";
import "jb-icons/arrow";
import "jb-icons/close";
import "jb-icons/delete";
import "jb-icons/edit";
import "jb-icons/expand";
import "jb-icons/eye";
import "jb-icons/filter";
import "jb-icons/lorgnette";
import "jb-icons/refresh";
import "jb-icons/search";
import "jb-icons/arrow-tailed";
import "jb-icons/triangle";
import "./styles.css";

const iconNames = ["arrow", "arrow-tailed", "close", "delete", "edit", "expand", "eye", "filter", "lorgnette", "refresh", "search", "triangle"] as const;
const iconSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const iconColors = ["primary", "secondary", "positive", "danger", "warning", "light", "dark"] as const;
const spinIconNames = ["arrow", "arrow-tailed", "triangle"] as const;
const spinDirections = ["up", "right", "down", "left", "inline-start", "inline-end"] as const;
const spinAngles = [-180, -90, 0, 90, 180, 360] as const;

type IconName = (typeof iconNames)[number];
type IconSize = (typeof iconSizes)[number];
type IconColor = (typeof iconColors)[number];
type SpinDirection = (typeof spinDirections)[number];

interface IconStoryArgs {
  icon: IconName;
  size: IconSize;
  color: IconColor;
  long: boolean;
}

type AnimatedIconElement = HTMLElement & {
  isOpen: boolean;
  isActive: boolean;
  isExpanded: boolean;
  open: boolean;
  isLoading: boolean;
  spin: number;
};

function Icon({ icon, size = "md", color, long }: Partial<IconStoryArgs> & Pick<IconStoryArgs, "icon">) {
  return createElement(`jb-icon-${icon}`, { size, color, long, "aria-label": `${icon} icon` });
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

function SpinExamples() {
  const examples = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<SpinDirection>("up");
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    examples.current?.querySelectorAll<AnimatedIconElement>("[data-spin-icon]").forEach(icon => {
      icon.spin = spin;
    });
  }, [spin]);

  return (
    <div className="spin-demo" ref={examples}>
      <header className="spin-demo-header">
        <div>
          <h3>Absolute spin</h3>
          <p>Each angle is measured from the selected original direction. Set the angle to 0° to restore it.</p>
        </div>
        <label>
          Original direction
          <select value={direction} onChange={event => setDirection(event.target.value as SpinDirection)}>
            {spinDirections.map(value => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="spin-angle-control">
        <label htmlFor="spin-angle">
          Spin angle
          <output>{spin}°</output>
        </label>
        <input id="spin-angle" type="range" min="-360" max="360" step="15" value={spin} onChange={event => setSpin(event.target.valueAsNumber)} />
        <fieldset className="spin-presets">
          <legend>Spin angle presets</legend>
          <div>
            {spinAngles.map(angle => (
              <button type="button" aria-label={`Set spin to ${angle} degrees`} aria-pressed={spin === angle} onClick={() => setSpin(angle)} key={angle}>
                {angle}°
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="spin-icon-grid">
        {spinIconNames.map(icon =>
          createElement(
            "section",
            { className: "spin-icon-card", key: icon },
            createElement(`jb-icon-${icon}`, {
              direction,
              size: "xl",
              color: "primary",
              "data-spin-icon": "",
              "data-testid": `spin-${icon}`,
              "aria-label": `${direction} ${icon} with ${spin} degree spin`,
            }),
            createElement("strong", null, icon),
            createElement("code", null, `${direction} + ${spin}°`),
          ),
        )}
      </div>
    </div>
  );
}

const meta: Meta<IconStoryArgs> = {
  title: "Components/JBIcons",
  args: {
    icon: "edit",
    size: "xl",
    color: "primary",
    long: false,
  },
  argTypes: {
    icon: { control: "select", options: iconNames },
    size: { control: "select", options: iconSizes },
    color: { control: "select", options: iconColors },
    long: { control: "boolean", if: { arg: "icon", eq: "arrow-tailed" } },
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

export const ReactJsx: Story = {
  render: () => (
    <div className="icon-row">
      <jb-icon-arrow direction="inline-end" size="lg" color="primary" aria-label="React JSX arrow" />
      <jb-icon-triangle direction="down" size="lg" color="secondary" round={60} aria-label="React JSX triangle" />
      <jb-icon-eye open size="lg" color="positive" aria-label="React JSX eye" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByLabelText("React JSX arrow")).toBeTruthy();
    expect(canvas.getByLabelText("React JSX triangle")).toBeTruthy();
    expect(canvas.getByLabelText("React JSX eye")).toBeTruthy();
  },
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
          {createElement("jb-icon-arrow-tailed", { direction: "up", size: "xl", long: true, "aria-label": "long up tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "right", size: "xl", long: true, "aria-label": "long right tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "down", size: "xl", long: true, "aria-label": "long down tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "left", size: "xl", long: true, "aria-label": "long left tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "inline-start", size: "xl", long: true, "aria-label": "long inline-start tailed arrow" })}
          {createElement("jb-icon-arrow-tailed", { direction: "inline-end", size: "xl", long: true, "aria-label": "long inline-end tailed arrow" })}
        </div>
        <code>jb-icon-arrow-tailed</code>
        <code>long</code>
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
        <Icon icon="lorgnette" size="xl" />
        <code>jb-icon-lorgnette</code>
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

export const StrokeWidths: Story = {
  render: () => (
    <div className="icon-row">
      {[
        { label: "Thin", value: 48 },
        { label: "Standard", value: 64 },
        { label: "Thick", value: 96 },
      ].map(({ label, value }) => (
        <div className="icon-variant" key={label}>
          <jb-icon-arrow direction="right" size="xl" color="primary" style={{ "--icon-stroke-width": value } as CSSProperties} aria-label={`${label} stroke`} />
          <code>
            {label} ({value})
          </code>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const label of ["Thin", "Standard", "Thick"]) {
      expect(canvas.getByLabelText(`${label} stroke`)).toBeTruthy();
    }
  },
};

export const Animations: Story = {
  render: () => <AnimationExamples />,
};

export const Spin: Story = {
  render: () => <SpinExamples />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = spinIconNames.map(icon => canvas.getByTestId(`spin-${icon}`) as AnimatedIconElement);

    await userEvent.click(canvas.getByRole("button", { name: "Set spin to 180 degrees" }));
    await waitFor(() => {
      icons.forEach(icon => {
        expect(icon.spin).toBe(180);
        const animation = icon.shadowRoot?.querySelector(".spin-icon")?.getAnimations().at(-1);
        const finalKeyframe = (animation?.effect as KeyframeEffect | null)?.getKeyframes().at(-1);
        expect(finalKeyframe?.transform).toBe("rotate(180deg)");
      });
    });

    await userEvent.click(canvas.getByRole("button", { name: "Set spin to 0 degrees" }));
    await waitFor(() => {
      icons.forEach(icon => {
        expect(icon.spin).toBe(0);
        const animation = icon.shadowRoot?.querySelector(".spin-icon")?.getAnimations().at(-1);
        const finalKeyframe = (animation?.effect as KeyframeEffect | null)?.getKeyframes().at(-1);
        expect(finalKeyframe?.transform).toBe("rotate(0deg)");
      });
    });
  },
};
