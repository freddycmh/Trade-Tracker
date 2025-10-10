import React from "react";
import { Trash2, PenSquareIcon, Calendar, Hash, DollarSign, Calculator, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TradeCard = ({ trade, handleDelete }) => {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/edit/${trade._id}`);
  };

  // Calculate % gain/loss
  const calculatePercentage = () => {
    if (!trade.entryPrice || !trade.exitPrice) return null;
    const percent =
      ((trade.exitPrice - trade.entryPrice) / trade.entryPrice) * 100;
    return percent.toFixed(2);
  };

  // Determine card border/background color based on P/L
  const getCardColorClasses = () => {
    const pnl = trade.profitLoss ?? 0;
    console.log(`Trade ${trade.ticker}: P/L = ${pnl}`);
    if (pnl > 0) {
      return "bg-green-500/5 border-2 border-green-500 hover:ring-green-500 hover:bg-green-500/10";
    } else if (pnl < 0) {
      return "bg-red-500/5 border-2 border-red-500 hover:ring-red-500 hover:bg-red-500/10";
    }
    return "bg-base-100 border border-slate-700 hover:ring-primary";
  };

  return (
    <div className={`card shadow-md border hover:ring-1 transition duration-200 ${getCardColorClasses()}`}>
      <div className="card-body">
        <span className="badge badge-sm badge-accent uppercase">
          {trade.tradeType}
        </span>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{trade.ticker}</h2>
          <span className="text-sm font-semibold text-success">
            {trade.optionType} ${trade.strike}
          </span>
        </div>

        <ul className="mt-4 flex flex-col gap-1 text-xs">
          <li className="flex items-center gap-2">
            <Calendar className="size-3" />
            <span>Exp: <span className="font-medium">
              {new Date(trade.expiration).toLocaleDateString('en-CA')}
            </span></span>
          </li>
          <li className="flex items-center gap-2">
            <Hash className="size-3" />
            <span>Quantity: <span className="font-medium">{trade.quantity || 1}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <DollarSign className="size-3" />
            <span>Entry: ${trade.entryPrice} | Exit: ${trade.exitPrice}</span>
          </li>
          <li className="flex items-center gap-2">
            <Calculator className="size-3" />
            <span>P/L:{" "}
            <span
              className={
                trade.profitLoss >= 0 ? "text-green-500" : "text-red-500"
              }
            >
              ${trade.profitLoss?.toFixed(2)}{" "}
              {calculatePercentage() && `(${calculatePercentage()}%)`}
            </span></span>
          </li>
          <li className="flex items-center gap-2 opacity-70">
            <FileText className="size-3" />
            <span>{trade.notes || "No notes"}</span>
          </li>
        </ul>

        <div className="mt-6 flex justify-between items-center text-xs text-base-content/60">
          <span>Added: {formatDate(new Date(trade.createdAt))}</span>
          <div className="flex items-center gap-2">
            <PenSquareIcon
              className="size-4 cursor-pointer hover:text-primary"
              onClick={goToEdit}
              title="Edit Trade"
            />
            <button
              onClick={(e) => handleDelete(e, trade._id)}
              className="btn btn-xs btn-outline btn-error"
              title="Delete Trade"
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
