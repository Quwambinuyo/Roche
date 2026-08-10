export const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/bundles": "Bundles",
  "/categories": "Categories",
  "/orders": "Orders",
  "/customers": "Customers",
  "/settings": "Settings",
};

export const getPageTitle = (pathname) => {
  const match = Object.keys(PAGE_TITLES).find((path) =>
    pathname.startsWith(path),
  );
  return match ? PAGE_TITLES[match] : "Dashboard";
};
