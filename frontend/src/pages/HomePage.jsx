import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";
import TradeCard from "../components/TradeCard";
import TradeSummary from "../components/TradeSummary";
import TradesNotFound from "../components/TradesNotFound";

const HomePage = () => {
  const navigate = useNavigate();

  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch trades
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await api.get("/trades");
        setTrades(res.data);
      } catch (error) {
        console.error("error in fetchTrades", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  // Handle delete
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/trades/${id}`);
      setTrades((prev) => prev.filter((trade) => trade._id !== id));
    } catch (error) {
      console.error("Failed to delete trade", error);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}

        {!loading && trades.length === 0 && <TradesNotFound />}

        {!loading && trades.length > 0 && (
          <>
            <TradeSummary />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
