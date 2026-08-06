import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import {
  Landing,
  Home,
  Shop,
  ProductDetails,
  Cart,
  Checkout,
  OrderSuccess,
  OrderHistory,
  Profile,
  Login,
  Register,
  Contact,
  NotFound,
  Wishlist,
  Categories,
} from "../pages/index";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing sits outside MainLayout entirely — its own full page,
          no shared Navbar/Sidebar/MobileNavbar/MobileSidebar. */}
      <Route path="/" element={<Landing />} />

      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        {/* Categories reuses Shop with a category filter until a dedicated page exists */}
        <Route path="categories" element={<Categories />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="contact" element={<Contact />} />

        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="order-success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="orders"
          element={
            // <PrivateRoute>
            //   <OrderHistory />
            // </PrivateRoute>
            <OrderHistory />
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
