
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
    // Show all pages when there are 5 or fewer
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    // Near the beginning
    // 1 2 3 4 5 ... last
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // Near the end
    // 1 ... last-4 last-3 last-2 last-1 last
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

    // Middle
    // 1 ... current-1 current current+1 ... last
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
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
        "flex flex-col items-center justify-center gap-3 md:gap-1.5",
        className
      )}
    >
      {/* Desktop Pagination */}
      <div className="flex items-center justify-center gap-1.5">
        {/* Previous */}
        <Button
          type="button"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="hidden md:flex h-9"
        >
          <FiChevronLeft size={17} />
        </Button>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-foreground-secondary"
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
                "flex h-7 w-7 md:h-9 md:w-9 border-input-border items-center cursor-pointer justify-center rounded-md border text-xs md:text-sm font-medium transition-none",
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-background-secondary"
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
          className="hidden md:flex h-9"
        >
          <FiChevronRight size={17} />
        </Button>
      </div>

      {/* Mobile Previous / Next */}
      <div className="flex w-full gap-2 md:hidden">
        <Button
          type="button"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex-1 h-9"
        >
          <FiChevronLeft size={17} />
          <span>Previous</span>
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex-1 h-9"
        >
          <span>Next</span>
          <FiChevronRight size={17} />
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;

