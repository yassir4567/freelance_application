import { formatDate } from "../../../utils/helpers";

export const CONTRACT_STATUS_CLASS = {
  pending: "status-warning",
  active: "status-success",
  completed: "status-purple",
  cancelled: "status-danger",
  rejected: "status-danger",
};

export const DELIVERABLE_STATUS_CLASS = {
  pending: "status-accent",
  submitted: "status-info",
  accepted: "status-success",
  unlocked: "status-purple",
  revision_request: "status-warning",
  cancelled: "status-danger",
};

export const PAYMENT_STATUS_CLASS = {
  released: "status-success",
  escrow: "status-info",
  pending: "status-warning",
  refunded: "status-danger",
};

export const DELIVERABLE_STATUS_LABEL = {
  pending: "Pending",
  submitted: "Submitted",
  accepted: "Accepted",
  unlocked: "Unlocked",
  revision_request: "Revision request",
  cancelled: "Cancelled",
};

export function getStatusClass(statusMap, status, fallback = "status-warning") {
  return statusMap[status] ?? fallback;
}

export function formatStatusLabel(status, fallback = "") {
  if (!status) return fallback;

  return status
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatCurrency(value, fallback = "$0.00") {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return fallback;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDisplayDate(date, fallback = "Not available") {
  if (!date) return fallback;

  return formatDate(date);
}

export function valueOrFallback(value, fallback = "Not available") {
  if (value === null || value === undefined || value === "") return fallback;

  return value;
}

export function calculatePercent(value, total) {
  const safeValue = Number(value) || 0;
  const safeTotal = Number(total) || 0;

  if (safeTotal <= 0) return 0;

  return Math.min(100, Math.round((safeValue / safeTotal) * 100));
}
