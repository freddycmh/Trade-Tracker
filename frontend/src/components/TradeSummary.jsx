import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TradeSummary = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);

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

        const chart = [];

        trades
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .forEach((trade, index) => {
            const entry = parseFloat(trade.entryPrice);
            const exit = parseFloat(trade.exitPrice);
            const qty = parseInt(trade.quantity);
            const pnl = (exit - entry) * 100 * qty; // per contract = 100 shares
            const percent = ((exit - entry) / entry) * 100;

            cumulativePnL += pnl;
            chart.push({
              name: `#${index + 1}`,
              pnl: cumulativePnL,
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

        const totalTrades = trades.length;
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
  }, []);

  if (!summary) return null;

  return (
    <div className="card shadow bg-slate-800 text-white mb-6">
      <div className="card-body flex flex-col gap-6">
        <div>
          <h2 className="card-title text-white">Trade Summary</h2>
          <p className="text-sm opacity-70">Performance Overview</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8 text-sm">
          <div>
            <p className="font-semibold">Total P&L:</p>
            <p
              className={
                summary.totalPnL >= 0 ? "text-green-400" : "text-red-400"
              }
            >
              ${summary.totalPnL}
            </p>
          </div>
          <div>
            <p className="font-semibold">Total Trades:</p>
            <p>{summary.totalTrades}</p>
          </div>
          <div>
            <p className="font-semibold">Wins:</p>
            <p className="text-green-400">{summary.winCount}</p>
          </div>
          <div>
            <p className="font-semibold">Losses:</p>
            <p className="text-red-400">{summary.lossCount}</p>
          </div>
          <div>
            <p className="font-semibold">Avg % Win:</p>
            <p className="text-green-400">{summary.avgWin}%</p>
          </div>
          <div>
            <p className="font-semibold">Avg % Loss:</p>
            <p className="text-red-400">{summary.avgLoss}%</p>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#34D399"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TradeSummary;
