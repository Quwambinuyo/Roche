import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import AdminLayout from "../components/layouts/AdminLayout";
import AuthLayout from "../components/layouts/AuthLayout";

import {
  Login,
  Dashboard,
  ProductList,
  ProductCreate,
  ProductEdit,
  BundleList,
  BundleCreate,
  BundleEdit,
  CategoryList,
  OrderList,
  OrderDetail,
  CustomerList,
  Settings,
} from "../pages/index";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />

          <Route path="/bundles" element={<BundleList />} />
          <Route path="/bundles/create" element={<BundleCreate />} />
          <Route path="/bundles/:id/edit" element={<BundleEdit />} />

          <Route path="/categories" element={<CategoryList />} />

          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />

          <Route path="/customers" element={<CustomerList />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
