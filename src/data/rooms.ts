export interface Room { id: string; name: string; floor: string; block: string; }

export const rooms: Room[] = [
  { id: "main-entrance", name: "Main Entrance Hall", floor: "G", block: "A" },
  { id: "ncc", name: "NCC Room", floor: "G", block: "A" },
  { id: "conf-hall", name: "Conference Hall", floor: "G", block: "A" },
  { id: "bm-lab", name: "BM Lab", floor: "G", block: "A" },
  { id: "computer-lab", name: "Computer Lab", floor: "G", block: "B" },
  { id: "library", name: "Library", floor: "G", block: "B" },
  { id: "exam-room", name: "Examination Room", floor: "G", block: "B" },
  { id: "hod", name: "HOD Room", floor: "G", block: "A" },
  { id: "ec-lab", name: "EC Lab", floor: "1", block: "A" },
  { id: "computer-lab-2", name: "Computer Lab 2", floor: "1", block: "B" },
  { id: "3d-print", name: "3D Printing Lab", floor: "1", block: "B" },
  { id: "vis-lab", name: "VIS Lab", floor: "1", block: "B" },
  { id: "bme-lab-2", name: "BME Lab 2", floor: "1", block: "B" },
  { id: "seminar", name: "Seminar Hall", floor: "1", block: "B" },
];

export interface Step { instruction: string; sub: string; floor: string; arrow: "up" | "right" | "left"; }
export const navSteps: Step[] = [
  { instruction: "Enter through Main Entrance Hall", sub: "Walk 20m straight ahead", floor: "G", arrow: "up" },
  { instruction: "Walk straight for 40 meters", sub: "Pass the Library Entrance", floor: "1", arrow: "up" },
  { instruction: "Turn right at the corridor", sub: "Head towards Block A", floor: "1", arrow: "right" },
  { instruction: "Computer Lab is on your right", sub: "You have arrived", floor: "1", arrow: "right" },
];
