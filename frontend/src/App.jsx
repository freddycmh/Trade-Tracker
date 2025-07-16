import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateTrade from "./pages/CreateTrade";
import EditTrade from "./pages/EditTrade";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full sm:w-4/5 mx-auto p-6">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTrade />} />
          <Route path="/edit/:id" element={<EditTrade />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
