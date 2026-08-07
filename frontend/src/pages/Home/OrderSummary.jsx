import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Reveal from "../Landing/Reveal";

const OrdersSummary = ({ pendingCount = 0, completedCount = 0 }) => {
  if (!pendingCount && !completedCount) return null;

  return (
    <Reveal className="pt-2">
      <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
        Your Orders
      </p>

      <div className="rounded-2xl border border-secondary bg-secondary flex divide-x divide-primary/15">
        <Link
          to="/orders?status=pending"
          className="flex-1 flex items-center gap-3 p-5 md:p-6 group"
        >
          <span className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
            <Clock size={18} />
          </span>
          <div className="flex-1">
            <p className="font-bold text-2xl text-primary leading-tight">
              {pendingCount}
            </p>
            <p className="text-xs text-primary/60">Pending</p>
          </div>
          <ChevronRight
            size={16}
            className="text-primary/30 group-hover:text-primary/60 transition-colors shrink-0"
          />
        </Link>

        <Link
          to="/orders?status=completed"
          className="flex-1 flex items-center gap-3 p-5 md:p-6 group"
        >
          <span className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} />
          </span>
          <div className="flex-1">
            <p className="font-bold text-2xl text-primary leading-tight">
              {completedCount}
            </p>
            <p className="text-xs text-primary/60">Completed</p>
          </div>
          <ChevronRight
            size={16}
            className="text-primary/30 group-hover:text-primary/60 transition-colors shrink-0"
          />
        </Link>
      </div>
    </Reveal>
  );
};

export default OrdersSummary;
