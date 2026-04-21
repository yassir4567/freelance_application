import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const trimText = (text) => {
  return text.trim();
};

export const emptyText = (text) => {
  return trimText(text) === "";
};

export const emptyArray = (array) => {
  return array.length === 0;
};

export function formatDate(date) {
  return dayjs(date).format('MMM DD , YYYY')
}

dayjs.extend(relativeTime);

// * get date like (4 days ago)
export function getRelativeTime(date) {
  return dayjs(date).fromNow();
}
