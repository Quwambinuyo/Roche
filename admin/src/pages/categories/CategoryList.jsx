import React, { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../../mock/product";
import { slugify } from "../../utils/slugify";
import CategoryTable from "./CategoryTable";
import CategoryFormModal from "./CategoryFormModal";
import SearchInput from "../../components/ui/SearchInput";
import AddButton from "../../components/ui/AddButton";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

const emptyCategory = { name: "", slug: "", image: "" };

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
      <div className="flex items-center mb-6">
        <AddButton label="Add Category" onClick={handleOpenCreate} />
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search categories..."
        className="mb-4 max-w-sm"
      />

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

      <ConfirmDeleteModal
        open={!!categoryToDelete}
        title="Delete category?"
        message={
          <>
            This will remove{" "}
            <span className="text-primary">{categoryToDelete?.name}</span> from
            the list. Products already assigned to it won't be deleted, but
            they'll no longer match a valid category.
          </>
        }
        onCancel={() => setCategoryToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CategoryList;
