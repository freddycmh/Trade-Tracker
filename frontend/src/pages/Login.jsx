import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import { useEffect } from "react";
import { isLoggedIn } from "../lib/auth";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const [form, setForm] = useState({ email: "", password: "" });

  // Update form values when user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login
      const res = await api.post("/auth/login", form);

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      // Navigate to homepage
      navigate("/");
    } catch (err) {
      alert("Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl space-y-4 w-full max-w-sm shadow-lg"
      >
        <h2 className="text-xl font-bold text-white text-center">Log In</h2>

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
          Log In
        </button>

        <p className="text-sm text-white text-center">
          Don’t have an account?{" "}
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
