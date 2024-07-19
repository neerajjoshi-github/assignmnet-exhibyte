import { fromUnixTime, isWithinInterval, startOfDay } from "date-fns";

export function isDateWithinRange(
  epoch: number,
  startDateString: Date,
  endDateString: Date
) {
  const date = startOfDay(fromUnixTime(epoch));

  const startDate = startOfDay(startDateString);
  const endDate = startOfDay(endDateString);

  return isWithinInterval(date, { start: startDate, end: endDate });
}
