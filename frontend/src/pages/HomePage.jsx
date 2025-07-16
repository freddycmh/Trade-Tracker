import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import TradesNotFound from "../components/TradesNotFound";
import TradeCard from "../components/TradeCard";
import TradeSummary from "../components/TradeSummary";

const HomePage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/trades/${id}`);
      setTrades((prev) => prev.filter((trade) => trade._id !== id));
    } catch (error) {
      console.error("Failed to delete trade", error);
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await api.get("/trades");
        console.log(response.data);
        setTrades(response.data);
      } catch (error) {
        console.error("error in fetchTrades", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}
        <TradeSummary />
        {trades.length === 0 && !loading && <TradesNotFound />}
        {trades.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...trades]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((trade) => (
                <TradeCard
                  key={trade._id}
                  trade={trade}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
