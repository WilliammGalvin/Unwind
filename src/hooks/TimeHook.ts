export enum TimeOfDay {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
}

export default function useTime() {
  const getTimeOfDay = (): TimeOfDay => {
    const currentTime = new Date().getHours();

    if (currentTime <= 12 && currentTime >= 4) return TimeOfDay.MORNING;
    else if (currentTime > 12 && currentTime <= 20) return TimeOfDay.AFTERNOON;
    return TimeOfDay.EVENING;
  };

  return { getTimeOfDay };
}
