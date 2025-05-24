"use client";

import React from "react";

export default function SailingCard({ sailing, index }) {
  // Converts numeric month strings to short month names
  let monthConversion = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  // Shortens location name by removing text after '(' or ',' if present
  function convertLocation(location) {
    let length = 0;
    if (location.indexOf("(") >= 0) {
      length = location.indexOf("(");
    } else if (location.indexOf(",") >= 0) {
      length = location.indexOf(",");
    } else {
      length = location.length;
    }
    return location.substring(0, length);
  }

  // Formats departure and return dates into a readable string
  function convertDates(departureDate, returnDate) {
    let convertedDate;
    let departureDateArr = departureDate.split("-");
    let returnDateArr = returnDate.split("-");

    // Case: same month and same year
    if (
      departureDateArr[0] === returnDateArr[0] &&
      departureDateArr[1] === returnDateArr[1]
    ) {
      convertedDate =
        monthConversion[departureDateArr[1]] +
        " " +
        departureDateArr[2].replace(/^0+/, "") +
        "-" +
        returnDateArr[2].replace(/^0+/, "") +
        ", " +
        returnDateArr[0];
    }
    // Case: different months, same year
    else if (
      departureDateArr[0] === returnDateArr[0] &&
      departureDateArr[1] !== returnDateArr[1]
    ) {
      convertedDate =
        monthConversion[departureDateArr[1]] +
        " " +
        departureDateArr[2].replace(/^0+/, "") +
        " - " +
        monthConversion[returnDateArr[1]] +
        " " +
        returnDateArr[2].replace(/^0+/, "") +
        ", " +
        returnDateArr[0];
    }
    // Case: different year
    else {
      convertedDate =
        monthConversion[departureDateArr[1]] +
        " " +
        departureDateArr[2].replace(/^0+/, "") +
        "," +
        departureDateArr[0] +
        " - " +
        monthConversion[returnDateArr[1]] +
        " " +
        returnDateArr[2].replace(/^0+/, "") +
        ", " +
        returnDateArr[0];
    }
    return convertedDate;
  }

  return (
    <div
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl"
      key={index}
    >
      <div className="md:flex">
        {/* Left Column: Ship image with overlaid date */}
        <div className="relative md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={
              sailing.ship.image === null
                ? "/cruisebound.png"
                : sailing.ship.image
            }
          />
          {/* Overlay: formatted date label */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 p-1 rounded shadow-md text-white text-xs">
            {convertDates(sailing.departureDate, sailing.returnDate)}
          </div>
        </div>

        {/* Right Column: Contains name, meta info, itinerary, logo, and CTA */}
        <div className="flex flex-col justify-between flex-1">
          {/* Top Section: Two-column layout inside right column */}
          <div className="grid grid-cols-[3fr_1fr] gap-2">
            {/* Left Column: Textual information */}
            <div className="m-2 space-y-4">
              {/* Cruise name */}
              <div className="tracking-wide text-lg text-black font-semibold">
                {sailing.name}
              </div>

              {/* Region, duration, rating and reviews */}
              <div className="text-gray-600 flex items-center flex-start gap-x-5">
                <span>{sailing.region}</span>
                <span>{sailing.duration} nights</span>
                <div className="flex items-center gap-x-1">
                  <img src="/star.png" alt="star" className="h-4" />
                  <span className="font-bold">{sailing.ship.rating}</span>
                  <span className="text-xs font-light text-gray-400">
                    {sailing.ship.reviews} reviews
                  </span>
                </div>
              </div>

              {/* Itinerary route (converted + arrows between) */}
              <div className="bg-white">
                <div className="flex flex-wrap gap-x-1 gap-y-2">
                  {sailing.itinerary.map((location, index) => (
                    <React.Fragment key={index}>
                      <span className="text-xs font-bold">
                        {convertLocation(location)}
                      </span>
                      {index < sailing.itinerary.length - 1 && (
                        <img src="/arrow.svg" alt="arrow" className="h-4" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Cruise line logo or name, and ship name */}
            <div className="m-2 flex flex-col items-end text-right">
              {sailing.ship.line.logo === null ? (
                <p>{sailing.ship.line.name}</p>
              ) : (
                <div className="h-18 w-24 overflow-hidden">
                  <img
                    src={sailing.ship.line.logo}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-gray-600">{sailing.ship.name}</p>
            </div>
          </div>

          {/* Bottom Section: Price and Info button */}
          <div className="bg-gray-100 flex flex-row-reverse">
            <div className="m-4 flex gap-x-4">
              {/* Price info */}
              <div className="flex flex-col justify-between flex-1">
                <p className="text-xs text-gray-600">Interior from</p>
                <div className="flex items-center justify-end">
                  <span className="text-sm font-bold">$</span>
                  <span className="font-bold text-xl">{sailing.price}</span>
                </div>
              </div>

              {/* Info button */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                See Sailings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
