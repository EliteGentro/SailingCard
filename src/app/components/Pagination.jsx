import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPageButtons = () => {
    const buttons = [];
    let startPage = 1;
    let endPage = totalPages;
    // Always show the current page, and one before/after if possible
    //If it is in start or end it will show 1 more to one side
    if (currentPage === startPage) {
      endPage = currentPage + 2;
    } else if (currentPage === endPage) {
      startPage = currentPage - 2;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    //If the first page is not in the range, add the first page and ellipsis
    if (startPage !== 1) {
      buttons.push(1);
      buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    // If the last page isn't in the range, add ellipsis and the last page
    if (!buttons.includes(totalPages)) {
      if (buttons[buttons.length - 1] < totalPages - 1) {
        buttons.push("...");
      }
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Arrow */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 "
      >
        &lt;
      </button>

      {/* Page buttons */}
      <div className="bg-gray-200 ">
        {getPageButtons().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 py-1">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
