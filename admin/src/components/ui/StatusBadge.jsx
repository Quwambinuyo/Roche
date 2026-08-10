import React from "react";

const StatusBadge = ({ status, styles, fallbackKey, formatLabel }) => {
  const style = styles[status] || styles[fallbackKey];
  const label = formatLabel ? formatLabel(status) : status?.replace("-", " ");

  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${style}`}
    >
      {label || fallbackKey}
    </span>
  );
};

export default StatusBadge;
