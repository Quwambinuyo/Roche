import { ORDERS } from "./orders";

const parseNaira = (str) => Number(str.replace(/[₦,]/g, "")) || 0;

export const CUSTOMERS = (() => {
  const map = new Map();

  ORDERS.forEach((order) => {
    const key = order.customer.email;
    const existing = map.get(key);
    const orderTotal = parseNaira(order.total);

    if (existing) {
      existing.orderCount += 1;
      existing.totalSpent += orderTotal;
      if (new Date(order.createdAt) > new Date(existing.lastOrderAt)) {
        existing.lastOrderAt = order.createdAt;
      }
      existing.orderIds.push(order.id);
    } else {
      map.set(key, {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        orderCount: 1,
        totalSpent: orderTotal,
        lastOrderAt: order.createdAt,
        orderIds: [order.id],
      });
    }
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastOrderAt) - new Date(a.lastOrderAt),
  );
})();

export const getCustomerByEmail = (email) =>
  CUSTOMERS.find((c) => c.email === email);
