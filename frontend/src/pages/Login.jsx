import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
      console.error(err);
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
          <a className="link" href="/signup">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
