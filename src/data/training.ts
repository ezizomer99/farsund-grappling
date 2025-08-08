// Training program information
export interface TrainingClass {
  id: number;
  title: string;
  schedule: string[];
  type: 'submission-wrestling' | 'open-mat';
  description: string;
  recommended: string;
}

// Schedule types for calendar view
export type ClassType = 'submission-wrestling' | 'open-mat';

export interface ClassInfo {
  name: string;
  color: string;
}

export interface WeeklySchedule {
  [day: string]: {
    [timeSlot: string]: ClassType;
  };
}

export const trainingPrograms: TrainingClass[] = [
  {
    id: 1,
    title: "Submission Wrestling",
    schedule: ["Mandag 18:00-19:30", "Tirsdag 18:00-19:30", "Torsdag 18:00-19:30"],
    type: "submission-wrestling",
    description: "Våre Submission Wrestling-klasser er åpne for alle ferdighetsnivåer. Nybegynnere lærer grunnleggende teknikker, mens mer erfarne utøvere kan jobbe med avanserte bevegelser. Fokus på takedowns, posisjoner, frigjøringsteknikker og submissions i et inkluderende miljø.",
    recommended: "For alle medlemmer, uavhengig av erfaring eller ferdighetsnivå.",
  },
  {
    id: 2,
    title: "Åpen Matte",
    schedule: ["Lørdag 12:00-14:00"],
    type: "open-mat",
    description: "En åpen treningsøkt hvor medlemmer kan trene fritt, sparre og få hjelp med spesifikke teknikker. Her kan du jobbe med det du vil fokusere på og få verdifull treningstid.",
    recommended: "For alle medlemmer som ønsker ekstra treningstid og ønsker å utvikle sine ferdigheter.",
  },
];

// Training class types info for display
export const classTypes: Record<ClassType, ClassInfo> = {
  'submission-wrestling': { name: 'Submission Wrestling', color: 'bg-blue-700' },
  'open-mat': { name: 'Åpen Matte', color: 'bg-gray-800' },
};

// Days of the week for schedule display
export const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];

// Time slots for schedule display
export const timeSlots = [
  '10:00 - 11:30',
  '12:00 - 13:30',
  '18:00 - 19:30',
  '18:00 - 20:00',
];

// Weekly schedule data
export const weeklySchedule: WeeklySchedule = {
  'Mandag': {
    '18:00 - 19:30': 'submission-wrestling',
  },
  'Tirsdag': {
    '18:00 - 19:30': 'submission-wrestling',
  },
  'Onsdag': {
    '18:00 - 19:30': 'submission-wrestling',
  },
  'Torsdag': {
    '18:00 - 19:30': 'submission-wrestling',
  },
  'Fredag': {
    '18:00 - 20:00': 'open-mat',
  },
  'Lørdag': {
    '10:00 - 11:30': 'submission-wrestling',
    '12:00 - 14:00': 'open-mat',
  },
  'Søndag': {
    '10:00 - 11:30': 'open-mat',
  },
};
