export type Category = "Lab" | "Classroom" | "Facility" | "Admin";
export type Floor = "G" | "1";

export interface Room {
  id: string;
  name: string;
  floor: Floor;
  category: Category;
}

export const rooms: Room[] = [
  // Ground Floor
  { id: "main-entrance", name: "Main Entrance Hall", floor: "G", category: "Facility" },
  { id: "ncc", name: "NCC Room", floor: "G", category: "Admin" },
  { id: "classroom-gf", name: "Classroom (GF)", floor: "G", category: "Classroom" },
  { id: "conf-hall", name: "Conference Hall", floor: "G", category: "Facility" },
  { id: "bm-lab", name: "BM Lab", floor: "G", category: "Lab" },
  { id: "girls-room-gf", name: "Girls Room", floor: "G", category: "Facility" },
  { id: "staff-room-1", name: "Staff Room 1", floor: "G", category: "Admin" },
  { id: "staff-room-2", name: "Staff Room 2", floor: "G", category: "Admin" },
  { id: "bme-lab", name: "BME Lab", floor: "G", category: "Lab" },
  { id: "computer-lab", name: "Computer Lab", floor: "G", category: "Lab" },
  { id: "exam-room", name: "Examination Room", floor: "G", category: "Facility" },
  { id: "library", name: "Library", floor: "G", category: "Facility" },
  { id: "boys-room-gf", name: "Boys Room", floor: "G", category: "Facility" },
  { id: "office", name: "Office", floor: "G", category: "Admin" },
  { id: "hod", name: "HOD Room", floor: "G", category: "Admin" },

  // First Floor
  { id: "ec-lab", name: "EC Lab", floor: "1", category: "Lab" },
  { id: "computer-lab-2", name: "Computer Lab 2", floor: "1", category: "Lab" },
  { id: "3d-print", name: "3D Printing Lab", floor: "1", category: "Lab" },
  { id: "vis-lab", name: "VIS Lab", floor: "1", category: "Lab" },
  { id: "bme-lab-2", name: "BME Lab 2", floor: "1", category: "Lab" },
  { id: "seminar", name: "Seminar Hall", floor: "1", category: "Facility" },
  { id: "classroom-a", name: "Classroom A", floor: "1", category: "Classroom" },
  { id: "classroom-b", name: "Classroom B", floor: "1", category: "Classroom" },
  { id: "classroom-c", name: "Classroom C", floor: "1", category: "Classroom" },
  { id: "classroom-d", name: "Classroom D", floor: "1", category: "Classroom" },
  { id: "boys-room-f1", name: "Boys Room (F1)", floor: "1", category: "Facility" },
  { id: "girls-room-f1", name: "Girls Room (F1)", floor: "1", category: "Facility" },
  { id: "staff-room-f1", name: "Staff Room (F1)", floor: "1", category: "Admin" },
];

// Legacy step shape used by /navigate screen
export interface Step { instruction: string; sub: string; floor: string; arrow: "up" | "right" | "left"; }
export const navSteps: Step[] = [
  { instruction: "Enter through Main Entrance Hall", sub: "Walk 10m straight ahead", floor: "G", arrow: "up" },
  { instruction: "Walk straight north along corridor", sub: "Pass Garden on your left", floor: "G", arrow: "up" },
  { instruction: "Turn right at top corridor", sub: "Head towards destination", floor: "G", arrow: "right" },
  { instruction: "Destination is on your right", sub: "You have arrived", floor: "G", arrow: "right" },
];
