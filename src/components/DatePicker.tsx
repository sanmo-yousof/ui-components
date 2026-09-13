"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Label from "./Label";

interface DateSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  selectPreviousDate?: boolean;
  className?: string;
  placeholder?: string;
}

const DatePicker = ({
  value,
  onChange,
  label = "",
  required = false,
  disabled = false,
  selectPreviousDate = false,
  className,
  placeholder = "Select date",
}: DateSelectProps) => {
  const today = new Date();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(value ?? "");

  const [currentDate, setCurrentDate] = useState(
    value ? new Date(value) : today,
  );

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);

      if (value) {
        setCurrentDate(new Date(value));
      }
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);

    setSelectedDate(formattedDate);
    onChange?.(formattedDate);
    setOpen(false);
  };

  const changeMonth = (amount: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + amount, 1),
    );
  };

  const isPreviousDate = (date: Date) => {
    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return date < current;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: firstDay + daysInMonth }, (_, index) => {
    if (index < firstDay) return null;

    return new Date(year, month, index - firstDay + 1);
  });

  const displayDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="max-w-md">
      {label && <Label required={required}>{label}</Label>}

      <div ref={wrapperRef} className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "flex h-11 w-full cursor-pointer bg-background-secondary min-w-[200px] items-center justify-between",
            "rounded-md px-3 text-left text-sm",
            "transition-all duration-200",
            "border border-border-input focus:border-primary",
            open && "outline-none ring-2 ring-primary/30",
            disabled && "cursor-not-allowed bg-background-secondary opacity-60",
            className,
          )}
        >
          <span
            className={cn(
              selectedDate ? "text-foreground" : "text-foreground-secondary",
            )}
          >
            {displayDate || placeholder}
          </span>

          <FiCalendar
            size={18}
            className="shrink-0 text-foreground-secondary"
          />
        </button>

        {open && !disabled && (
          <div
            className={cn(
              "absolute left-0 top-full z-50 mt-2 w-full min-w-[300px]",
              "rounded-lg border border-border-input/20",
              "bg-dropdown p-4 shadow",
            )}
          >
            {/* Month Header */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="rounded-md cursor-pointer p-2 transition-colors hover:bg-background-secondary"
              >
                <FiChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                  })}
                </span>

                <select
                  value={year}
                  onChange={(e) =>
                    setCurrentDate(new Date(Number(e.target.value), month, 1))
                  }
                  className="cursor-pointer rounded-md bg-background-custom px-1 py-1 outline-none"
                >
                  {Array.from(
                    { length: 21 },
                    (_, index) => today.getFullYear() - 10 + index,
                  ).map((itemYear) => (
                    <option key={itemYear} value={itemYear}>
                      {itemYear}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="rounded-md  cursor-pointer p-2 transition-colors hover:bg-background-secondary"
              >
                <FiChevronRight size={18} />
              </button>
            </div>

            {/* Weekdays */}
            <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-foreground-secondary">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} />;
                }

                const dateValue = formatDate(date);
                const isSelected = selectedDate === dateValue;
                const isDisabled = selectPreviousDate && isPreviousDate(date);

                return (
                  <button
                    key={dateValue}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(date)}
                    className={cn(
                      "flex h-9 w-full items-center justify-center rounded-md text-sm",
                      "transition-colors",
                      isDisabled
                        ? "cursor-not-allowed text-foreground-secondary/40"
                        : "cursor-pointer hover:bg-primary/10 hover:text-primary",
                      isSelected &&
                        "bg-primary text-white hover:bg-primary hover:text-white",
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
