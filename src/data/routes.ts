import { rooms, STAIR, type Floor, type Room } from "./rooms";

export type Direction = "straight" | "left" | "right" | "stairs";

export interface RouteStep {
  step: number;
  instruction: string;
  landmark?: string;
  direction: Direction;
  floor: Floor;
  distance: number; // meters
}

export interface PathPoint { x: number; y: number; floor: Floor; }

// Corridor rectangle around the central garden / void
const CORR = { left: 22, right: 78, top: 22, bottom: 80 };

// Project a room point onto the nearest corridor edge
function projectToCorridor(p: { x: number; y: number }) {
  const dTop    = Math.abs(p.y - CORR.top);
  const dBottom = Math.abs(p.y - CORR.bottom);
  const dLeft   = Math.abs(p.x - CORR.left);
  const dRight  = Math.abs(p.x - CORR.right);
  const min = Math.min(dTop, dBottom, dLeft, dRight);
  if (min === dTop)    return { x: clamp(p.x, CORR.left, CORR.right), y: CORR.top,    edge: "top" as const };
  if (min === dBottom) return { x: clamp(p.x, CORR.left, CORR.right), y: CORR.bottom, edge: "bottom" as const };
  if (min === dLeft)   return { x: CORR.left,  y: clamp(p.y, CORR.top, CORR.bottom), edge: "left" as const };
  return                      { x: CORR.right, y: clamp(p.y, CORR.top, CORR.bottom), edge: "right" as const };
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

// Corridor corners in clockwise order starting top-left
const CORNERS = [
  { x: CORR.left,  y: CORR.top },    // 0 TL
  { x: CORR.right, y: CORR.top },    // 1 TR
  { x: CORR.right, y: CORR.bottom }, // 2 BR
  { x: CORR.left,  y: CORR.bottom }, // 3 BL
];

// Perimeter distance walking clockwise from CORNER 0
function perimAt(p: { x: number; y: number; edge: "top"|"bottom"|"left"|"right" }) {
  const w = CORR.right - CORR.left;
  const h = CORR.bottom - CORR.top;
  switch (p.edge) {
    case "top":    return p.x - CORR.left;
    case "right":  return w + (p.y - CORR.top);
    case "bottom": return w + h + (CORR.right - p.x);
    case "left":   return 2*w + h + (CORR.bottom - p.y);
  }
}
function perimTotal() { return 2 * ((CORR.right - CORR.left) + (CORR.bottom - CORR.top)); }

// Walk along the corridor between two projected points, choosing the shorter direction.
// Returns intermediate corner waypoints (excluding endpoints).
function corridorWalk(a: ReturnType<typeof projectToCorridor>, b: ReturnType<typeof projectToCorridor>) {
  const total = perimTotal();
  const pa = perimAt(a);
  const pb = perimAt(b);
  let cw = (pb - pa + total) % total;
  let ccw = total - cw;
  const clockwise = cw <= ccw;

  const out: { x: number; y: number }[] = [];
  // Walk through corners between pa and pb in chosen direction
  for (let i = 0; i < CORNERS.length * 2; i++) {
    const idx = clockwise ? i % 4 : (4 - i % 4) % 4;
    const cp = perimAt({ ...CORNERS[idx], edge: cornerEdge(idx, clockwise) });
    const between = clockwise
      ? (cp - pa + total) % total < cw && (cp - pa + total) % total > 0.0001
      : (pa - cp + total) % total < ccw && (pa - cp + total) % total > 0.0001;
    if (between) out.push(CORNERS[idx]);
    if (out.length >= 4) break;
  }
  return out;
}

function cornerEdge(idx: number, clockwise: boolean): "top"|"right"|"bottom"|"left" {
  // Treat each corner as the start of the next edge in the chosen walking direction
  if (clockwise) return (["top","right","bottom","left"] as const)[idx];
  return (["left","top","right","bottom"] as const)[idx];
}

/** Build a polyline of points (in viewBox coords) from start room to destination room. */
export function buildPath(start: Room, dest: Room): PathPoint[] {
  const points: PathPoint[] = [];

  if (start.floor === dest.floor) {
    const a = projectToCorridor(start);
    const b = projectToCorridor(dest);
    points.push({ x: start.x, y: start.y, floor: start.floor });
    points.push({ x: a.x, y: a.y, floor: start.floor });
    for (const c of corridorWalk(a, b)) points.push({ x: c.x, y: c.y, floor: start.floor });
    points.push({ x: b.x, y: b.y, floor: dest.floor });
    points.push({ x: dest.x, y: dest.y, floor: dest.floor });
    return dedupe(points);
  }

  // Different floors: route start -> stairs (on start floor) -> stairs (on dest floor) -> dest
  const stairProj = projectToCorridor(STAIR);
  const a = projectToCorridor(start);
  const b = projectToCorridor(dest);

  points.push({ x: start.x, y: start.y, floor: start.floor });
  points.push({ x: a.x, y: a.y, floor: start.floor });
  for (const c of corridorWalk(a, stairProj)) points.push({ x: c.x, y: c.y, floor: start.floor });
  points.push({ x: stairProj.x, y: stairProj.y, floor: start.floor });
  points.push({ x: STAIR.x, y: STAIR.y, floor: start.floor });
  // jump floors
  points.push({ x: STAIR.x, y: STAIR.y, floor: dest.floor });
  points.push({ x: stairProj.x, y: stairProj.y, floor: dest.floor });
  for (const c of corridorWalk(stairProj, b)) points.push({ x: c.x, y: c.y, floor: dest.floor });
  points.push({ x: b.x, y: b.y, floor: dest.floor });
  points.push({ x: dest.x, y: dest.y, floor: dest.floor });
  return dedupe(points);
}

function dedupe(pts: PathPoint[]): PathPoint[] {
  return pts.filter((p, i) => {
    const prev = pts[i-1];
    return !prev || prev.x !== p.x || prev.y !== p.y || prev.floor !== p.floor;
  });
}

// Convert raw points into human turn-by-turn steps
export function buildSteps(start: Room, dest: Room): RouteStep[] {
  const path = buildPath(start, dest);
  const steps: RouteStep[] = [];
  let n = 1;

  steps.push({
    step: n++, instruction: `Start at ${start.name}`, direction: "straight",
    floor: start.floor, distance: 0,
  });

  for (let i = 1; i < path.length; i++) {
    const prev = path[i-1];
    const cur  = path[i];
    if (prev.floor !== cur.floor) {
      steps.push({
        step: n++, instruction: `Take the stairs to ${cur.floor === "1" ? "First" : "Ground"} Floor`,
        direction: "stairs", floor: cur.floor, distance: 0,
      });
      continue;
    }
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    const dist = Math.round(Math.hypot(dx, dy) * 0.6); // viewBox -> approx meters
    if (dist < 1) continue;

    let dir: Direction = "straight";
    let instr = "";
    if (Math.abs(dx) > Math.abs(dy)) {
      dir = "straight";
      instr = dx > 0 ? `Walk east along corridor (${dist}m)` : `Walk west along corridor (${dist}m)`;
    } else {
      dir = "straight";
      instr = dy > 0 ? `Walk south along corridor (${dist}m)` : `Walk north along corridor (${dist}m)`;
    }
    // Last segment toward destination
    if (i === path.length - 1) instr = `${dest.name} is ahead (${dist}m)`;

    // Detect a turn vs the previous segment direction
    if (steps.length > 1 && i >= 2) {
      const last = steps[steps.length - 1];
      if (last.direction === "straight") {
        const prevDx = prev.x - path[i-2].x;
        const prevDy = prev.y - path[i-2].y;
        const cross = prevDx * dy - prevDy * dx;
        if (Math.abs(cross) > 0.5) dir = cross > 0 ? "right" : "left";
      }
    }

    steps.push({ step: n++, instruction: instr, direction: dir, floor: cur.floor, distance: dist });
  }

  steps.push({
    step: n++, instruction: `You have arrived at ${dest.name}`,
    direction: "straight", floor: dest.floor, distance: 0,
  });

  return steps;
}

export function totalDistance(steps: RouteStep[]): number {
  return steps.reduce((s, x) => s + x.distance, 0);
}
export function walkMinutes(steps: RouteStep[]): number {
  return Math.max(1, Math.ceil(totalDistance(steps) / 80));
}

// Public API used by routes
export function getRoute(roomId: string, _f: Floor, _name: string, startId = "main-entrance"): RouteStep[] {
  const start = rooms.find(r => r.id === startId) ?? rooms[0];
  const dest  = rooms.find(r => r.id === roomId)  ?? rooms[0];
  return buildSteps(start, dest);
}
