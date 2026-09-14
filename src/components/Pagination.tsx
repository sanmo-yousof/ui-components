
"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPages = (): (number | "...")[] => {
    // Show every page when there are only a few pages
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    // --------------------------------
    // Near the beginning
    // --------------------------------
    if (currentPage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "...",
        totalPages,
      ];
    }

    // --------------------------------
    // Near the end
    // --------------------------------
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // --------------------------------
    // Middle
    // --------------------------------
    return [
      1,
      "...",
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex items-center justify-center gap-1.5",
        className
      )}
    >
      {/* Previous */}
      <Button
        type="button"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        // className={cn(
        //   "flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
         
        // )}
      >
        <FiChevronLeft size={17} />
      </Button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            aria-current={
              currentPage === page ? "page" : undefined
            }
            className={cn(
              "flex h-9 min-w-9 items-center cursor-pointer justify-center rounded-md border px-2 text-sm font-medium transition-colors",
              currentPage === page
                ? "border-border-input bg-primary text-white"
                : "border-gray-200  bg-white  hover:bg-gray-100"
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <Button
        type="button"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        // className={cn(
        //   "flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
        //   currentPage === totalPages
        //     ? "cursor-not-allowed opacity-40"
        //     : "hover:bg-gray-100"
        // )}
      >
        <FiChevronRight size={17} />
      </Button>
    </nav>
  );
};

export default Pagination;

