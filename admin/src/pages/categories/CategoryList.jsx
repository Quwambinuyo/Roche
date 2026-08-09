import React, { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { CATEGORIES, PRODUCTS } from "../../mock/product";
import CategoryTable from "./CategoryTable";
import CategoryFormModal from "./CategoryFormModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const emptyCategory = { name: "", slug: "", image: "" };

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const CategoryList = () => {
  const [categories, setCategories] = useState(CATEGORIES);
  const [search, setSearch] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState(emptyCategory);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const liveCount = (slug) =>
    slug === "bundles"
      ? categories.find((c) => c.slug === "bundles")?.count || 0
      : PRODUCTS.filter((p) => p.category === slug).length;

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [categories, search]);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setForm(emptyCategory);
    setError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      slug: category.slug,
      image: category.image,
    });
    setError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCategory(null);
    setForm(emptyCategory);
    setError("");
    setModalOpen(false);
  };

  const handleNameChange = (val) => {
    setForm((prev) => ({
      ...prev,
      name: val,
      slug: editingCategory ? prev.slug : slugify(val),
    }));
  };

  const handleSlugChange = (val) => {
    setForm((prev) => ({ ...prev, slug: slugify(val) }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: url }));
  };

  const handleSave = () => {
    setError("");

    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.");
      return;
    }

    const slugTaken = categories.some(
      (c) => c.slug === form.slug && c.slug !== editingCategory?.slug,
    );
    if (slugTaken) {
      setError("A category with this slug already exists.");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.slug === editingCategory.slug
            ? {
                ...c,
                name: form.name.trim(),
                slug: form.slug,
                image: form.image,
              }
            : c,
        ),
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          name: form.name.trim(),
          slug: form.slug,
          count: 0,
          image: form.image,
        },
      ]);
    }

    handleCloseModal();
  };

  const confirmDelete = () => {
    setCategories((prev) =>
      prev.filter((c) => c.slug !== categoryToDelete.slug),
    );
    setCategoryToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-primary">Categories</h1>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-secondary font-medium text-sm"
        >
          <FiPlus size={16} />
          Add Category
        </button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
        />
      </div>

      <CategoryTable
        categories={filtered}
        liveCount={liveCount}
        onEdit={handleOpenEdit}
        onDelete={setCategoryToDelete}
      />

      <CategoryFormModal
        open={modalOpen}
        editingCategory={editingCategory}
        form={form}
        error={error}
        onNameChange={handleNameChange}
        onSlugChange={handleSlugChange}
        onImageChange={handleImageChange}
        onSave={handleSave}
        onClose={handleCloseModal}
      />

      <DeleteCategoryModal
        category={categoryToDelete}
        onCancel={() => setCategoryToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CategoryList;
