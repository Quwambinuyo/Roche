import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import RevealImage from "../../components/ui/RevealImage";

const CategoryTable = ({ categories, liveCount, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto border border-primary/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-primary/10 text-left text-primary/50">
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Slug</th>
            <th className="px-4 py-3 font-medium">Products</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category.slug}
              className="border-b border-primary/10 last:border-b-0 text-primary hover:bg-primary/5"
            >
              <td className="px-4 py-3">
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
              </td>
              <td className="px-4 py-3 text-primary/70">{category.slug}</td>
              <td className="px-4 py-3">{liveCount(category.slug)}</td>
              <td className="px-4 py-3">
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
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-primary/40"
              >
                No categories match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
