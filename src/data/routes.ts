export type Direction = "straight" | "left" | "right" | "stairs";
export type Floor = "G" | "1";

export interface RouteStep {
  step: number;
  instruction: string;
  landmark?: string;
  direction: Direction;
  floor: Floor;
  distance: number; // meters
}

// Routes from Main Entrance Hall to destination by room id
export const routes: Record<string, RouteStep[]> = {
  "computer-lab": [
    { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
    { step: 2, instruction: "Walk straight north along corridor", landmark: "Pass Garden on left", direction: "straight", floor: "G", distance: 40 },
    { step: 3, instruction: "Turn right at top corridor", direction: "right", floor: "G", distance: 15 },
    { step: 4, instruction: "Computer Lab is on your right", direction: "straight", floor: "G", distance: 5 },
  ],
  "library": [
    { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
    { step: 2, instruction: "Turn right and walk east corridor", direction: "right", floor: "G", distance: 30 },
    { step: 3, instruction: "Library is on your right", direction: "straight", floor: "G", distance: 10 },
  ],
  "ec-lab": [
    { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
    { step: 2, instruction: "Walk to central staircase", landmark: "Pass through Garden corridor", direction: "straight", floor: "G", distance: 25 },
    { step: 3, instruction: "Climb stairs to First Floor", direction: "stairs", floor: "G", distance: 0 },
    { step: 4, instruction: "Walk north along top corridor", direction: "straight", floor: "1", distance: 40 },
    { step: 5, instruction: "EC Lab is on your left", direction: "left", floor: "1", distance: 5 },
  ],
  "seminar": [
    { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
    { step: 2, instruction: "Walk to central staircase", direction: "straight", floor: "G", distance: 25 },
    { step: 3, instruction: "Climb stairs to First Floor", direction: "stairs", floor: "G", distance: 0 },
    { step: 4, instruction: "Turn right at the landing", direction: "right", floor: "1", distance: 20 },
    { step: 5, instruction: "Seminar Hall is on your right", direction: "straight", floor: "1", distance: 10 },
  ],
  "conf-hall": [
    { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
    { step: 2, instruction: "Turn left and walk west corridor", direction: "left", floor: "G", distance: 30 },
    { step: 3, instruction: "Conference Hall is on your left", direction: "straight", floor: "G", distance: 10 },
  ],
};

// Generate a logical fallback route for any room not explicitly defined
export function getRoute(roomId: string, roomFloor: Floor, roomName: string): RouteStep[] {
  if (routes[roomId]) return routes[roomId];

  if (roomFloor === "G") {
    return [
      { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
      { step: 2, instruction: "Walk along central corridor", landmark: "Pass the Garden", direction: "straight", floor: "G", distance: 25 },
      { step: 3, instruction: "Follow signs around the corridor", direction: "straight", floor: "G", distance: 15 },
      { step: 4, instruction: `${roomName} is ahead`, direction: "straight", floor: "G", distance: 5 },
    ];
  }
  return [
    { step: 1, instruction: "Enter through Main Entrance Hall", direction: "straight", floor: "G", distance: 10 },
    { step: 2, instruction: "Walk to central staircase", direction: "straight", floor: "G", distance: 25 },
    { step: 3, instruction: "Climb stairs to First Floor", direction: "stairs", floor: "G", distance: 0 },
    { step: 4, instruction: "Walk along the corridor around central void", direction: "straight", floor: "1", distance: 25 },
    { step: 5, instruction: `${roomName} is ahead`, direction: "straight", floor: "1", distance: 5 },
  ];
}

export function totalDistance(steps: RouteStep[]): number {
  return steps.reduce((s, x) => s + x.distance, 0);
}

export function walkMinutes(steps: RouteStep[]): number {
  return Math.max(1, Math.ceil(totalDistance(steps) / 80));
}
