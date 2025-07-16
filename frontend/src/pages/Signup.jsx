import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useEffect } from "react";
import { isLoggedIn } from "../lib/auth";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl space-y-4 w-full max-w-sm shadow-lg"
      >
        <h2 className="text-xl font-bold text-white text-center">Sign Up</h2>
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
          <a className="link" href="/login">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
