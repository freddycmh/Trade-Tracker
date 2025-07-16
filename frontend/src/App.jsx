import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateTrade from "./pages/CreateTrade";
import EditTrade from "./pages/EditTrade";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="w-full sm:w-4/5 mx-auto p-6">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={token ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={token ? <CreateTrade /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={token ? <EditTrade /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
