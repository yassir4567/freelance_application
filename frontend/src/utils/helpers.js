

export const trimText = (text) => {
    return text.trim()
}

export const emptyText = (text) => {
    return trimText(text) === '' ;
}

export const emptyArray = (array) => {
    return array.length === 0
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

