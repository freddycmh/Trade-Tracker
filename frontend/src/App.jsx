import React from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-full sm:w-4/5 mx-auto p-6">
      <Navbar />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => toast.success("Hello!")}
      >
        Button
      </button>
    </div>
  );
};

export default App;
