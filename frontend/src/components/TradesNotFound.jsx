import React from "react";
import { Link } from "react-router-dom";

const TradesNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl text-white">No Trades Found</h2>
          <p className="text-white text-sm opacity-80">
            Looks like you haven't added any trades yet.
          </p>
          <div className="card-actions mt-4">
            <Link to="/create" className="btn btn-ghost">
              Add New Trade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesNotFound;
