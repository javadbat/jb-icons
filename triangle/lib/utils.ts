type Point = {
  x: number;
  y: number;
};

export function getRoundedTriangle(radius = 20): string {
  const vertices: Point[] = [
    { x: 716.8, y: 204.8 },
    { x: 307.2, y: 512 },
    { x: 716.8, y: 819.2 },
  ];

  return getRoundedPolygonPath(vertices, radius);
}

function getRoundedPolygonPath(
  vertices: Point[],
  requestedRadius: number,
): string {
  if (vertices.length < 3) {
    throw new Error("A polygon requires at least three vertices.");
  }

  const radius = Math.max(0, requestedRadius);

  if (radius === 0) {
    return [
      `M ${vertices[0].x} ${vertices[0].y}`,
      ...vertices.slice(1).map(point => `L ${point.x} ${point.y}`),
      "Z",
    ].join(" ");
  }

  // In SVG coordinates, positive signed area means clockwise.
  const signedArea =
    vertices.reduce((sum, point, index) => {
      const next = vertices[(index + 1) % vertices.length];
      return sum + point.x * next.y - next.x * point.y;
    }, 0) / 2;

  const sweepFlag = signedArea > 0 ? 1 : 0;

  const corners = vertices.map((current, index) => {
    const previous =
      vertices[(index - 1 + vertices.length) % vertices.length];
    const next = vertices[(index + 1) % vertices.length];

    const previousVector = {
      x: previous.x - current.x,
      y: previous.y - current.y,
    };

    const nextVector = {
      x: next.x - current.x,
      y: next.y - current.y,
    };

    const previousLength = Math.hypot(
      previousVector.x,
      previousVector.y,
    );

    const nextLength = Math.hypot(
      nextVector.x,
      nextVector.y,
    );

    if (previousLength === 0 || nextLength === 0) {
      throw new Error("Polygon contains duplicate adjacent vertices.");
    }

    const previousUnit = {
      x: previousVector.x / previousLength,
      y: previousVector.y / previousLength,
    };

    const nextUnit = {
      x: nextVector.x / nextLength,
      y: nextVector.y / nextLength,
    };

    const dotProduct =
      previousUnit.x * nextUnit.x +
      previousUnit.y * nextUnit.y;

    const cornerAngle = Math.acos(
      Math.max(-1, Math.min(1, dotProduct)),
    );

    /*
     * For a circle tangent to both edges:
     *
     * tangentDistance = radius / tan(angle / 2)
     */
    const tangentFactor = Math.tan(cornerAngle / 2);
    const desiredDistance = radius / tangentFactor;

    // Prevent rounded corners from overlapping.
    const maximumDistance =
      Math.min(previousLength, nextLength) * 0.49;

    const tangentDistance = Math.min(
      desiredDistance,
      maximumDistance,
    );

    // Radius may be reduced when the requested radius is too large.
    const actualRadius = tangentDistance * tangentFactor;

    const start = {
      x: current.x + previousUnit.x * tangentDistance,
      y: current.y + previousUnit.y * tangentDistance,
    };

    const end = {
      x: current.x + nextUnit.x * tangentDistance,
      y: current.y + nextUnit.y * tangentDistance,
    };

    return {
      start,
      end,
      radius: actualRadius,
    };
  });

  const format = (value: number) =>
    Number(value.toFixed(2));

  const commands: string[] = [
    `M ${format(corners[0].start.x)} ${format(corners[0].start.y)}`,
  ];

  corners.forEach((corner, index) => {
    if (index > 0) {
      commands.push(
        `L ${format(corner.start.x)} ${format(corner.start.y)}`,
      );
    }

    commands.push(
      [
        `A ${format(corner.radius)} ${format(corner.radius)}`,
        `0 0 ${sweepFlag}`,
        `${format(corner.end.x)} ${format(corner.end.y)}`,
      ].join(" "),
    );
  });

  commands.push("Z");

  return commands.join(" ");
}