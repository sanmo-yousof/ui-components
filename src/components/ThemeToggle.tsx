"use client";
import React, { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { cn } from "@/lib/utils";
interface ThemeToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}
const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ value, onChange, disabled = false, className }, ref) => {
    const [internalValue, setInternalValue] = useState(value ?? false);
    const isDark = value !== undefined ? value : internalValue;
    const handleToggle = () => {
      if (disabled) return;
      const newValue = !isDark;
      setInternalValue(newValue);
      onChange?.(newValue);
    };
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isDark}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "relative flex h-9 w-[80px] items-center cursor-pointer",
          "rounded-full p-1",
          "bg-gray-200",
          "transition-colors duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isDark && "bg-gray-800",
          className,
        )}
      >
        {" "}
        {/* Sliding Circle */}{" "}
        <span
          className={cn(
            "absolute left-1 flex h-7 w-7 items-center justify-center",
            "rounded-full bg-white shadow-sm",
            "transition-transform duration-300 ease-in-out",
            isDark && "translate-x-[40px]",
          )}
        >
          {" "}
          {isDark ? (
            <FiMoon size={16} className="text-gray-800" />
          ) : (
            <FiSun size={16} className="text-gray-700" />
          )}{" "}
        </span>{" "}
        {/* Background Icons */}{" "}
        <span className="flex w-full items-center justify-between px-1.5">
          {" "}
          <FiSun
            size={15}
            className={cn(
              "transition-opacity duration-200",
              isDark ? "text-gray-400 opacity-100" : "text-gray-400 opacity-0",
            )}
          />{" "}
          <FiMoon
            size={15}
            className={cn(
              "transition-opacity duration-200",
              isDark ? "text-gray-500 opacity-0" : "text-gray-400 opacity-100",
            )}
          />
        </span>
      </button>
    );
  },
);
ThemeToggle.displayName = "ThemeToggle";
export default ThemeToggle;
