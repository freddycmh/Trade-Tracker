// src/components/TradeSummary.jsx
import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TradeSummary = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("all");

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await api.get("/trades");
        const trades = res.data;

        let totalPnL = 0;
        let winCount = 0;
        let lossCount = 0;
        let winPercentTotal = 0;
        let lossPercentTotal = 0;
        let cumulativePnL = 0;

        const today = new Date();
        const filteredTrades = trades
          .filter((trade) => {
            const tradeDate = new Date(trade.tradeDate);
            if (range === "1d") {
              return tradeDate.toDateString() === today.toDateString();
            } else if (range === "1w") {
              const oneWeekAgo = new Date(today);
              oneWeekAgo.setDate(today.getDate() - 7);
              return tradeDate >= oneWeekAgo && tradeDate <= today;
            }
            return true;
          })
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        const chart = [];
        filteredTrades.forEach((trade, index) => {
          const entry = parseFloat(trade.entryPrice);
          const exit = parseFloat(trade.exitPrice);
          const qty = parseInt(trade.quantity);
          const pnl = (exit - entry) * 100 * qty;
          const percent = ((exit - entry) / entry) * 100;

          cumulativePnL += pnl;
          chart.push({
            name: `#${index + 1}`,
            pnl: Number(cumulativePnL.toFixed(2)),
          });

          totalPnL += pnl;

          if (pnl >= 0) {
            winCount++;
            winPercentTotal += percent;
          } else {
            lossCount++;
            lossPercentTotal += percent;
          }
        });

        const totalTrades = filteredTrades.length;
        const avgWin = winCount ? winPercentTotal / winCount : 0;
        const avgLoss = lossCount ? lossPercentTotal / lossCount : 0;

        setSummary({
          totalPnL: totalPnL.toFixed(2),
          totalTrades,
          winCount,
          lossCount,
          avgWin: avgWin.toFixed(2),
          avgLoss: avgLoss.toFixed(2),
        });

        setChartData(chart);
      } catch (err) {
        console.error("Error fetching trade summary", err);
      }
    };

    fetchTrades();
  }, [range]);

  if (!summary) return null;

  return (
    <div className="card shadow bg-slate-800 text-white mb-6">
      <div className="card-body flex flex-col gap-6">
        <div>
          <h2 className="card-title text-white">Trade Summary</h2>
          <p className="text-sm opacity-70">Performance Overview</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          {["1D", "1W", "All"].map((label) => (
            <button
              key={label}
              onClick={() => setRange(label.toLowerCase())}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                range === label.toLowerCase()
                  ? "bg-green-500 text-black"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-between gap-6 text-sm">
          <div>
            <p className="font-bold text-lg">Total P&L:</p>
            <p
              className={
                summary.totalPnL >= 0 ? "text-green-400" : "text-red-400"
              }
            >
              ${Number(summary.totalPnL).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="font-bold text-lg">Total Trades:</p>
            <p>{summary.totalTrades}</p>
          </div>
          <div>
            <p className="font-bold text-lg">Wins:</p>
            <p className="text-green-400">{summary.winCount}</p>
          </div>
          <div>
            <p className="font-bold text-lg">Losses:</p>
            <p className="text-red-400">{summary.lossCount}</p>
          </div>
          <div>
            <p className="font-bold text-lg">Avg % Win:</p>
            <p className="text-green-400">
              {Number(summary.avgWin).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="font-bold text-lg">Avg % Loss:</p>
            <p className="text-red-400">
              {Number(summary.avgLoss).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Line Chart */}
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#aaa"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#aaa"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                labelStyle={{ color: "#fff" }}
                formatter={(value) => [`$${value.toFixed(2)}`, "P&L"]}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#34D399"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TradeSummary;
