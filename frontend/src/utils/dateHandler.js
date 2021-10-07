import { DateTime } from "luxon";

export const dateHandler = (isoString) => {
  const dt = DateTime.fromISO(isoString);

  return `${dt.toRelativeCalendar()} at ${dt.toLocaleString(
    DateTime.TIME_SIMPLE
  )}`;
};
