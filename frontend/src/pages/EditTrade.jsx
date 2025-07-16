import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const EditTrade = () => {
  const { id } = useParams();
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
    tradeDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing trade data
  useEffect(() => {
    const fetchTrade = async () => {
      try {
        const res = await api.get(`/trades/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to load trade.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrade();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/trades/${id}`, form);
      toast.success("Trade updated successfully!");
      navigate("/"); // redirect to home
    } catch (err) {
      toast.error("Failed to update trade.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-slate-800 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Edit Trade
        </h2>

        <input
          name="ticker"
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
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.entryPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="exitPrice"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.exitPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          className="input input-bordered w-full text-white bg-slate-900"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          name="tradeType"
          placeholder="Day, Swing, etc."
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
          Update Trade
        </button>
      </form>
    </div>
  );
};

export default EditTrade;
