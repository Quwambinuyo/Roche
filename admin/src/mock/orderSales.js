import { ORDERS } from "../mock/orders";
import { PRODUCTS } from "../mock/product";
import { parseNaira } from "../utils/format";

export const getProductSalesData = () => {
  const totals = {};

  ORDERS.forEach((order) => {
    order.items.forEach((item) => {
      if (!item.product) return;
      const slug = item.product.slug;
      const revenue = parseNaira(item.price) * item.quantity;

      if (!totals[slug]) {
        totals[slug] = { unitsSold: 0, revenue: 0, orderCount: 0 };
      }

      totals[slug].unitsSold += item.quantity;
      totals[slug].revenue += revenue;
      totals[slug].orderCount += 1;
    });
  });

  const totalUnitsSold = Object.values(totals).reduce(
    (sum, t) => sum + t.unitsSold,
    0,
  );

  return PRODUCTS.map((product) => {
    const stats = totals[product.slug] || {
      unitsSold: 0,
      revenue: 0,
      orderCount: 0,
    };

    return {
      slug: product.slug,
      name: product.name,
      image: product.image,
      category: product.category,
      unitsSold: stats.unitsSold,
      revenue: stats.revenue,
      orderCount: stats.orderCount,
      shareOfSales: totalUnitsSold
        ? Math.round((stats.unitsSold / totalUnitsSold) * 100)
        : 0,
    };
  }).sort((a, b) => b.unitsSold - a.unitsSold);
};
