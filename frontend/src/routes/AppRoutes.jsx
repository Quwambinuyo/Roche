import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import {
  Landing,
  Home,
  Shop,
  NewArrival,
  RecentlyViewed,
  ForYou,
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
      <Route path="/" element={<Landing />} />

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

      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="new-arrivals" element={<NewArrival />} />
        <Route path="recently-viewed" element={<RecentlyViewed />} />
        <Route path="for-you" element={<ForYou />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="contact" element={<Contact />} />

        <Route path="checkout" element={<Checkout />} />
        <Route
          path="order-success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
        <Route path="orders" element={<OrderHistory />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
