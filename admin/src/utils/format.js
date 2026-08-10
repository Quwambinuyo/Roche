export const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

export const parseNaira = (str) => Number(str.replace(/[₦,]/g, "")) || 0;

export const formatDate = (iso, options) =>
  new Date(iso).toLocaleDateString(
    "en-NG",
    options || { day: "2-digit", month: "short", year: "numeric" },
  );

export const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  const datePart = date.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart}, ${timePart}`;
};
