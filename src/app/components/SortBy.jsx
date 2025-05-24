import React from "react";

export default function SortBy({ sortOption, setSortOption }) {
  return (
    <div className="">
        <div className="m-4 flex justify-end items-center space-x-4">
        <p className="font-bold">Sort By: </p>
        <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none bg-white text-sm text-gray-800 border
            border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 
            transition duration-150"
        >
            <option value="">No Filters</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="duration-asc">Duration (Short to Long)</option>
            <option value="duration-desc">Duration (Long to Short)</option>
            <option value="date-asc">Departure Date (Soonest)</option>
            <option value="date-desc">Departure Date (Latest)</option>
        </select>
        </div>
    </div>
  );
}

