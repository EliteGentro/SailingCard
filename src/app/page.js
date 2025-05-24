'use client'

import React, { useEffect, useState } from "react";
import jsonData from './api/sailings/testcall.json' assert { type: "json" };
import SailingCard from './components/SailingCard.jsx';
import Pagination from './components/Pagination.jsx';
import SortBy from './components/SortBy.jsx';


export default function Home() {
  const [sailings, setSailings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 10;

  const sortedSailings = [...(sailings || [])].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "duration-asc":
        return a.duration - b.duration;
      case "duration-desc":
        return b.duration - a.duration;
      case "date-asc":
        return new Date(a.departureDate) - new Date(b.departureDate);
      case "date-desc":
        return new Date(b.departureDate) - new Date(a.departureDate);
      default:
        return 0;
    }
  });
  const currentSailings = sortedSailings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sailings.length / itemsPerPage);


  const loadSailingData = async () => {
    /*
    try {
      const response = await fetch("https://sandbox.cruisebound-qa.com/sailings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    })
    
      //const data = await response.json();
      //setSailings(data.results || []);
      
    } catch (error) {
      console.error("Error loading sailing data:", error);
    }
      */
     setSailings(jsonData.results);
  };

  useEffect(() => {
    loadSailingData();
  }, []);

  return (

    <div className="m-4">
      <SortBy
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="space-y-6">
        <div className="max-w-md mx-auto md:max-w-3xl flex justify-between items-center space-x-4">
          <p className="text-lg font-bold">{sailings.length} trips found</p>
          <button
            onClick={() => setSortOption("")} // replace with your actual reset logic
            className="text-sm text-black border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Reset Filters
          </button>
        </div>
        {
          currentSailings.map((sailing, index) => (
            <React.Fragment key={index}>
              <SailingCard sailing={sailing} index={index} />
            </React.Fragment>
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}

