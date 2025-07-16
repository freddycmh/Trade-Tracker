// src/pages/CreateTrade.jsx
import React, { useState } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../lib/auth";

const CreateTrade = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  const [form, setForm] = useState({
    ticker: "",
    optionType: "Call",
    strike: "",
    expiration: "",
    entryPrice: "",
    exitPrice: "",
    quantity: "",
    tradeType: "",
    tradeDate: "",
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
      const res = await api.post("/trades", form);
      toast.success("Trade added successfully!");
      setForm({
        ticker: "",
        optionType: "Call",
        strike: "",
        expiration: "",
        entryPrice: "",
        exitPrice: "",
        quantity: "",
        tradeType: "",
        tradeDate: "",
        notes: "",
      });
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
      toast.error(" Failed to add trade");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Add New Trade
        </h2>

        <input
          name="ticker"
          placeholder="Ticker"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.ticker}
          onChange={handleChange}
          required
        />

        <select
          name="optionType"
          className="select select-bordered w-full text-white bg-slate-900"
          value={form.optionType}
          onChange={handleChange}
        >
          <option value="Call">Call</option>
          <option value="Put">Put</option>
        </select>

        <input
          type="number"
          name="strike"
          placeholder="Strike Price"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.strike}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="expiration"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.expiration}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="entryPrice"
          placeholder="Entry Price"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.entryPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="exitPrice"
          placeholder="Exit Price"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.exitPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          name="tradeType"
          placeholder="Trade Type (Day, Swing, etc.)"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.tradeType}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="tradeDate"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.tradeDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          className="textarea textarea-bordered w-full text-white bg-slate-900"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary w-full">
          Submit Trade
        </button>
      </form>
    </div>
  );
};

export default CreateTrade;
