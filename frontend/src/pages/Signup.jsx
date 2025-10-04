import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl space-y-4 w-full max-w-sm shadow-lg"
      >
        <h2 className="text-xl font-bold text-white text-center">Sign Up</h2>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-slate-900 text-white"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full bg-slate-900 text-white"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-full" type="submit">
          Sign Up
        </button>
        <p className="text-sm text-white text-center">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
