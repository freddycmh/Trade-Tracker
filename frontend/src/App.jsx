import React from "react";
import { toast } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HopIcon } from "lucide-react";

const App = () => {
  return (
    <div className="w-full sm:w-4/5 mx-auto p-6">
      <Navbar />
      <HomePage />
    </div>
  );
};

export default App;
