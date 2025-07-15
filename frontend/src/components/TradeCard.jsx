import React from "react";
import { Trash2, PenSquareIcon } from "lucide-react";

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TradeCard = ({ trade, handleDelete }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        <span className="badge badge-xs badge-accent uppercase">
          {trade.tradeType}
        </span>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{trade.ticker}</h2>
          <span className="text-sm font-semibold text-success">
            {trade.optionType} ${trade.strike}
          </span>
        </div>

        <ul className="mt-4 flex flex-col gap-1 text-xs">
          <li>
            📅 Exp:{" "}
            <span className="font-medium">
              {new Date(trade.expiration).toLocaleDateString()}
            </span>
          </li>
          <li>
            💰 Entry: ${trade.entryPrice} | Exit: ${trade.exitPrice}
          </li>
          <li>
            🧮 P/L:{" "}
            <span
              className={
                trade.profitLoss >= 0 ? "text-green-500" : "text-red-500"
              }
            >
              ${trade.profitLoss?.toFixed(2)}
            </span>
          </li>
          <li className="opacity-70">✍️ {trade.notes || "No notes"}</li>
        </ul>

        <div className="mt-6 flex justify-between items-center text-xs text-base-content/60">
          <span>Added: {formatDate(new Date(trade.createdAt))}</span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 cursor-pointer" />
            <button
              onClick={(e) => handleDelete(e, trade._id)}
              className="btn btn-xs btn-outline btn-error"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeCard;
