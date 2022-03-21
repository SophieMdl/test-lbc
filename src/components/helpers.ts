import { fromUnixTime, format } from "date-fns";

export const formatTimestamp = (timeStamp: number): string =>
  format(new Date(timeStamp * 1000), "MMMM dd");

export const getHour = (timeStamp: number): string =>
  format(fromUnixTime(timeStamp), "HH:mm");
