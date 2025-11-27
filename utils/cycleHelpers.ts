import { CyclePhase, UserSettings } from "../types";

export const calculatePhase = (settings: UserSettings): { phase: CyclePhase; day: number; nextPeriodIn: number } => {
  const lastStart = new Date(settings.lastPeriodStart);
  const today = new Date();
  
  // Normalize dates to ignore time
  lastStart.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today.getTime() - lastStart.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate current cycle day (1-based)
  // If diffDays > cycleLength, we are technically "late" or in a new cycle not logged yet. 
  // For simplicity, we wrap around modulo logic but ideal app would prompt to log new period.
  let currentDay = (diffDays % settings.cycleLength);
  if (currentDay === 0 && diffDays > 0) currentDay = settings.cycleLength;
  if (currentDay === 0 && diffDays === 0) currentDay = 1;

  let phase = CyclePhase.Follicular;
  
  // Rough Scientific phases based on standard 28 day cycle, scaled proportionally
  const scale = settings.cycleLength / 28;

  if (currentDay <= settings.periodLength) {
    phase = CyclePhase.Menstrual;
  } else if (currentDay <= 12 * scale) {
    phase = CyclePhase.Follicular;
  } else if (currentDay <= 16 * scale) {
    phase = CyclePhase.Ovulatory;
  } else {
    phase = CyclePhase.Luteal;
  }

  const daysUntilNext = settings.cycleLength - currentDay;

  return { phase, day: currentDay, nextPeriodIn: daysUntilNext };
};

export const getPhaseColor = (phase: CyclePhase) => {
  switch (phase) {
    case CyclePhase.Menstrual: return "text-rose-600 bg-rose-50 border-rose-200";
    case CyclePhase.Follicular: return "text-teal-600 bg-teal-50 border-teal-200";
    case CyclePhase.Ovulatory: return "text-amber-600 bg-amber-50 border-amber-200";
    case CyclePhase.Luteal: return "text-indigo-600 bg-indigo-50 border-indigo-200";
  }
};

export const getPhaseGradient = (phase: CyclePhase) => {
    switch (phase) {
      case CyclePhase.Menstrual: return "from-rose-400 to-pink-600";
      case CyclePhase.Follicular: return "from-teal-300 to-emerald-500";
      case CyclePhase.Ovulatory: return "from-amber-300 to-orange-500";
      case CyclePhase.Luteal: return "from-indigo-300 to-purple-600";
    }
  };
