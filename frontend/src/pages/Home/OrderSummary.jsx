import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Reveal from "../Landing/Reveal";

const OrdersSummary = ({ pendingCount = 0, completedCount = 0 }) => {
  const total = pendingCount + completedCount;
  if (total === 0) return null;

  const data = [
    { name: "Pending", value: pendingCount },
    { name: "Completed", value: completedCount },
  ];

  return (
    <Reveal className="pt-2">
      <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-3">
        Your Orders
      </p>

      <div className=" p-5 md:p-6">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "var(--color-secondary)",
                  fillOpacity: 0.5,
                }}
              />
              <YAxis hide domain={[0, "dataMax + 2"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-primary)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-secondary) 10%, transparent)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--color-secondary)" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-secondary)"
                strokeWidth={2.5}
                dot={{ r: 5, fill: "var(--color-secondary)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex divide-x divide-secondary/10 mt-4 pt-4 border-t border-secondary/10">
          <Link
            to="/orders?status=pending"
            className="flex-1 flex items-center justify-between pr-4 group"
          >
            <span className="text-sm text-secondary/70">
              Pending ·{" "}
              <span className="font-semibold text-secondary">
                {pendingCount}
              </span>
            </span>
            <ChevronRight
              size={14}
              className="text-secondary group-hover:text-secondary/60 transition-colors"
            />
          </Link>

          <Link
            to="/orders?status=completed"
            className="flex-1 flex items-center justify-between pl-4 group"
          >
            <span className="text-sm text-secondary">
              Completed ·{" "}
              <span className="font-semibold text-secondary">
                {completedCount}
              </span>
            </span>
            <ChevronRight
              size={14}
              className="text-secondary/30 group-hover:text-secondary/60 transition-colors"
            />
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

export default OrdersSummary;
