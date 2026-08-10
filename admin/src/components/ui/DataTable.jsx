import React from "react";

const DataTable = ({
  columns,
  data,
  rowKey,
  emptyMessage = "No results found.",
}) => {
  return (
    <div className="overflow-x-auto border border-primary/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-primary/10 text-left text-primary/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-medium ${col.headerClassName || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={rowKey(row)}
              className="border-b border-primary/10 text-primary hover:bg-primary/5"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 ${col.cellClassName || ""}`}
                >
                  {col.render(row, index)}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-primary/40"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
