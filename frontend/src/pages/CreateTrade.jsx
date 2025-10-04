// src/pages/CreateTrade.jsx
import React, { useState } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTrade = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ticker: "",
    optionType: "Call",
    strike: "",
    expiration: "",
    entryPrice: "",
    exitPrice: "",
    quantity: "",
    tradeType: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert string values to numbers before sending
      const tradeData = {
        ...form,
        strike: Number(form.strike),
        entryPrice: Number(form.entryPrice),
        exitPrice: Number(form.exitPrice),
        quantity: Number(form.quantity),
      };

      const res = await api.post("/trades", tradeData);
      toast.success("Trade added successfully!");
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.errors
        ? err.response.data.errors.join(", ")
        : err.response?.data?.message || "Failed to add trade";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 bg-slate-800 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Add New Trade
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text text-white">Ticker</span>
            </label>
            <input
              name="ticker"
              placeholder="e.g., AAPL"
              className="input input-bordered w-full text-white bg-slate-900"
              value={form.ticker}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Option Type</span>
            </label>
            <select
              name="optionType"
              className="select select-bordered w-full text-white bg-slate-900"
              value={form.optionType}
              onChange={handleChange}
            >
              <option value="Call">Call</option>
              <option value="Put">Put</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Strike Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="strike"
              placeholder="150.00"
              className="input input-bordered w-full text-white bg-slate-900"
              value={form.strike}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Expiration Date</span>
            </label>
            <input
              type="date"
              name="expiration"
              className="input input-bordered w-full text-white bg-slate-900"
              value={form.expiration}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Entry Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="entryPrice"
              placeholder="2.50"
              className="input input-bordered w-full text-white bg-slate-900"
              value={form.entryPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Exit Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="exitPrice"
              placeholder="3.00"
              className="input input-bordered w-full text-white bg-slate-900"
              value={form.exitPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Quantity</span>
            </label>
            <input
              type="number"
              min="1"
              name="quantity"
              placeholder="10"
              className="input input-bordered w-full text-white bg-slate-900"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-white">Trade Type</span>
            </label>
            <select
              name="tradeType"
              className="select select-bordered w-full text-white bg-slate-900"
              value={form.tradeType}
              onChange={handleChange}
              required
            >
              <option value="">Select Trade Type</option>
              <option value="Day">Day</option>
              <option value="Swing">Swing</option>
              <option value="Scalp">Scalp</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text text-white">Notes (Optional)</span>
          </label>
          <textarea
            name="notes"
            placeholder="Add any notes about this trade..."
            className="textarea textarea-bordered w-full text-white bg-slate-900 min-h-[100px]"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-outline btn-secondary flex-1"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            Submit Trade
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrade;
