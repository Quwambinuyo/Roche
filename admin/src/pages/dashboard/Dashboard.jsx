import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiAlertTriangle,
} from "react-icons/fi";
import { PRODUCTS } from "../../mock/product";
import { ORDERS } from "../../mock/orders";
import { CUSTOMERS } from "../../mock/customers";
import { totalStock } from "../../utils/stock";
import { parseNaira, formatNaira, formatDate } from "../../utils/format";
import RevealImage from "../../components/ui/RevealImage";
import StatusBadge from "../../components/ui/StatusBadge";

const ORDER_STATUS_STYLES = {
  pending: "bg-primary/10 text-primary/60",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

const StatCard = ({ icon: Icon, label, value, sub }) => (
  <div className="border border-primary/10 bg-secondary/40 p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-primary/50">{label}</span>
      <Icon size={16} className="text-primary/40" />
    </div>
    <p className="text-2xl font-bold text-primary">{value}</p>
    {sub && <p className="text-xs text-primary/40 mt-1">{sub}</p>}
  </div>
);

const Dashboard = () => {
  const stats = useMemo(() => {
    const revenue = ORDERS.filter((o) => o.paymentStatus === "paid").reduce(
      (sum, o) => sum + parseNaira(o.total),
      0,
    );
    const pendingOrders = ORDERS.filter(
      (o) => o.status === "pending" || o.status === "processing",
    ).length;

    return {
      revenue,
      totalOrders: ORDERS.length,
      pendingOrders,
      totalCustomers: CUSTOMERS.length,
    };
  }, []);

  const lowStockProducts = useMemo(
    () =>
      PRODUCTS.filter((p) => totalStock(p) <= 5 && totalStock(p) > 0).sort(
        (a, b) => totalStock(a) - totalStock(b),
      ),
    [],
  );

  const outOfStockProducts = useMemo(
    () => PRODUCTS.filter((p) => totalStock(p) === 0),
    [],
  );

  const recentOrders = useMemo(() => ORDERS.slice(0, 5), []);

  const statusCounts = useMemo(() => {
    return ORDERS.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={FiDollarSign}
          label="Revenue"
          value={formatNaira(stats.revenue)}
          sub="From paid orders"
        />
        <StatCard
          icon={FiShoppingBag}
          label="Total Orders"
          value={stats.totalOrders}
          sub={`${stats.pendingOrders} pending`}
        />
        <StatCard
          icon={FiUsers}
          label="Customers"
          value={stats.totalCustomers}
        />
        <StatCard
          icon={FiAlertTriangle}
          label="Low Stock Items"
          value={lowStockProducts.length + outOfStockProducts.length}
          sub={`${outOfStockProducts.length} out of stock`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-primary/10 bg-secondary/40">
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="text-sm font-semibold text-primary">
              Recent Orders
            </h2>
            <Link
              to="/orders"
              className="text-xs text-primary/50 hover:text-primary"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-primary/10 mt-4">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-primary/5"
              >
                <div>
                  <p className="text-sm font-medium text-primary">{order.id}</p>
                  <p className="text-xs text-primary/40">
                    {order.customer.name} · {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-primary">{order.total}</span>
                  <StatusBadge
                    status={order.status}
                    styles={ORDER_STATUS_STYLES}
                    fallbackKey="pending"
                  />
                </div>
              </Link>
            ))}

            {recentOrders.length === 0 && (
              <p className="px-5 py-10 text-center text-primary/40 text-sm">
                No orders yet.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-primary/10 bg-secondary/40 p-5">
            <h2 className="text-sm font-semibold text-primary mb-4">
              Orders by Status
            </h2>
            <div className="space-y-2.5">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <StatusBadge
                    status={status}
                    styles={ORDER_STATUS_STYLES}
                    fallbackKey="pending"
                  />
                  <span className="text-sm text-primary">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-primary">
                Stock Alerts
              </h2>
              <Link
                to="/products"
                className="text-xs text-primary/50 hover:text-primary"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {[...outOfStockProducts, ...lowStockProducts]
                .slice(0, 4)
                .map((product) => (
                  <div key={product.slug} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex-shrink-0 overflow-hidden bg-primary/5">
                      <RevealImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-primary truncate">
                        {product.name}
                      </p>
                      <p
                        className={`text-xs ${
                          totalStock(product) === 0
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {totalStock(product) === 0
                          ? "Out of stock"
                          : `${totalStock(product)} left`}
                      </p>
                    </div>
                  </div>
                ))}

              {lowStockProducts.length === 0 &&
                outOfStockProducts.length === 0 && (
                  <p className="text-sm text-primary/40">
                    All products well stocked.
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
