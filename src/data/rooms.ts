export type Category = "Lab" | "Classroom" | "Facility" | "Admin";
export type Floor = "G" | "1";

export interface Room {
  id: string;
  name: string;
  floor: Floor;
  category: Category;
  /** Position on the floor plan in 0..100 viewBox coords */
  x: number;
  y: number;
}

// Coordinates derived from the floor plan images (viewBox 0..100).
// Ground floor: rooms positioned around the central Garden.
export const rooms: Room[] = [
  // Ground Floor — top row
  { id: "ncc",          name: "NCC Room",         floor: "G", category: "Admin",    x: 16, y: 16 },
  { id: "classroom-gf", name: "Classroom (GF)",   floor: "G", category: "Classroom",x: 32, y: 16 },
  { id: "staff-room-2", name: "Staff Room 2",     floor: "G", category: "Admin",    x: 44, y: 16 },
  { id: "bme-lab",      name: "BME Lab",          floor: "G", category: "Lab",      x: 58, y: 16 },
  { id: "computer-lab", name: "Computer Lab",     floor: "G", category: "Lab",      x: 82, y: 16 },

  // Ground Floor — left side
  { id: "conf-hall",    name: "Conference Hall",  floor: "G", category: "Facility", x: 14, y: 32 },
  { id: "bm-lab",       name: "BM Lab",           floor: "G", category: "Lab",      x: 14, y: 48 },
  { id: "girls-room-gf",name: "Girls Room",       floor: "G", category: "Facility", x: 14, y: 68 },

  // Ground Floor — right side
  { id: "exam-room",    name: "Examination Room", floor: "G", category: "Facility", x: 84, y: 32 },
  { id: "library",      name: "Library",          floor: "G", category: "Facility", x: 84, y: 50 },
  { id: "boys-room-gf", name: "Boys Room",        floor: "G", category: "Facility", x: 84, y: 68 },

  // Ground Floor — bottom row
  { id: "main-entrance",name: "Main Entrance Hall",floor: "G",category: "Facility", x: 50, y: 88 },
  { id: "office",       name: "Office",           floor: "G", category: "Admin",    x: 60, y: 92 },
  { id: "hod",          name: "HOD Room",         floor: "G", category: "Admin",    x: 72, y: 92 },
  { id: "staff-room-1", name: "Staff Room 1",     floor: "G", category: "Admin",    x: 36, y: 92 },

  // First Floor — top row
  { id: "ec-lab",       name: "EC Lab",           floor: "1", category: "Lab",      x: 12, y: 12 },
  { id: "computer-lab-2",name:"Computer Lab 2",   floor: "1", category: "Lab",      x: 30, y: 12 },
  { id: "3d-print",     name: "3D Printing Lab",  floor: "1", category: "Lab",      x: 44, y: 12 },
  { id: "vis-lab",      name: "VIS Lab",          floor: "1", category: "Lab",      x: 58, y: 12 },
  { id: "bme-lab-2",    name: "BME Lab 2",        floor: "1", category: "Lab",      x: 82, y: 12 },

  // First Floor — sides
  { id: "classroom-a",  name: "Classroom A",      floor: "1", category: "Classroom",x: 12, y: 28 },
  { id: "classroom-b",  name: "Classroom B",      floor: "1", category: "Classroom",x: 12, y: 44 },
  { id: "boys-room-f1", name: "Boys Room (F1)",   floor: "1", category: "Facility", x: 12, y: 64 },
  { id: "seminar",      name: "Seminar Hall",     floor: "1", category: "Facility", x: 86, y: 30 },
  { id: "girls-room-f1",name: "Girls Room (F1)",  floor: "1", category: "Facility", x: 86, y: 64 },

  // First Floor — bottom row
  { id: "classroom-c",  name: "Classroom C",      floor: "1", category: "Classroom",x: 30, y: 90 },
  { id: "staff-room-f1",name: "Staff Room (F1)",  floor: "1", category: "Admin",    x: 50, y: 90 },
  { id: "classroom-d",  name: "Classroom D",      floor: "1", category: "Classroom",x: 78, y: 90 },
];

// Stair / vertical-link point shared between floors (central staircase, south of garden)
export const STAIR = { x: 50, y: 76 };

// Legacy type kept for compatibility (no longer used by /navigate)
export interface Step { instruction: string; sub: string; floor: string; arrow: "up" | "right" | "left"; }
export const navSteps: Step[] = [];
