import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import RevealImage from "../../components/ui/RevealImage";
import DataTable from "../../components/ui/DataTable";

const CategoryTable = ({ categories, liveCount, onEdit, onDelete }) => {
  const columns = [
    {
      key: "category",
      header: "Category",
      render: (category, index) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 overflow-hidden bg-primary/5">
            <RevealImage
              src={category.image}
              alt={category.name}
              className="w-full h-full"
              delay={index * 40}
            />
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      cellClassName: "text-primary/70",
      render: (category) => category.slug,
    },
    {
      key: "products",
      header: "Products",
      render: (category) => liveCount(category.slug),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      render: (category) => (
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="text-primary/50 hover:text-primary"
            aria-label={`Edit ${category.name}`}
          >
            <FiEdit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(category)}
            className="text-primary/50 hover:text-red-500"
            aria-label={`Delete ${category.name}`}
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={categories}
      rowKey={(category) => category.slug}
      emptyMessage="No categories match your search."
    />
  );
};

export default CategoryTable;
