import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getProductSalesData } from "../../mock/orderSales";

const TOP_N = 15;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const product = payload[0].payload;

  return (
    <div className="bg-secondary border border-primary/10 px-3 py-2">
      <p className="text-xs font-medium text-primary">{product.name}</p>
      <p className="text-xs text-primary/50">{product.unitsSold} sold</p>
    </div>
  );
};

const ProductTick = ({ x, y, payload, data }) => {
  const product = data.find((p) => p.name === payload.value);
  if (!product) return null;

  return (
    <foreignObject x={x - 148} y={y - 14} width={140} height={28}>
      <div className="flex items-center gap-2 h-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-7 h-7 object-cover flex-shrink-0"
        />
        <p className="text-xs font-medium text-primary truncate">
          {product.name}
        </p>
      </div>
    </foreignObject>
  );
};

const OrderSalesChart = () => {
  const allData = useMemo(() => getProductSalesData(), []);

  const { visibleData, remainingCount, remainingUnits } = useMemo(() => {
    const top = allData.slice(0, TOP_N);
    const rest = allData.slice(TOP_N);
    return {
      visibleData: top,
      remainingCount: rest.length,
      remainingUnits: rest.reduce((sum, p) => sum + p.unitsSold, 0),
    };
  }, [allData]);

  const chartHeight = Math.max(visibleData.length * 44, 120);

  return (
    <div className="bg-secondary/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-primary tracking-tight uppercase">
          Units Sold Per Product
        </h2>
        {remainingCount > 0 && (
          <span className="text-xs text-primary/40">
            Top {TOP_N} of {allData.length}
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={visibleData}
          layout="vertical"
          margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={160}
            tickLine={false}
            axisLine={false}
            tick={<ProductTick data={visibleData} />}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
          />
          <Bar dataKey="unitsSold" radius={[0, 2, 2, 0]} barSize={14}>
            {visibleData.map((entry) => (
              <Cell key={entry.slug} fill="var(--color-primary)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {remainingCount > 0 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/10">
          <p className="text-xs text-primary/50">
            +{remainingCount} more product{remainingCount === 1 ? "" : "s"} (
            {remainingUnits} units sold)
          </p>
          <a
            href="/products/sales"
            className="text-xs text-primary/50 hover:text-primary underline"
          >
            View all
          </a>
        </div>
      )}
    </div>
  );
};

export default OrderSalesChart;
