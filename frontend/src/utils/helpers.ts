import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const trimText = (text: string) => {
  return text.trim();
};

export const emptyText = (text: string) => {
  return trimText(text) === "";
};

export const emptyArray = (array: any[]) => {
  return array.length === 0;
};

export function formatDate(date: string) {
  return dayjs(date).format("MMM DD , YYYY");
}

dayjs.extend(relativeTime);

// * get date like (4 days ago)
export function getRelativeTime(date: string) {
  return dayjs(date).fromNow();
}

export function formatMoney(value: string) {
  return value == null ? "__" : `$${Number(value).toFixed(3)}`;
}

export function formatSnakeCase(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
