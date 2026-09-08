"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import Label from "./Label";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "defaultValue" | "onChange"
> {
  outline?: boolean;
  border?: boolean;
  label?: string;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      outline = true,
      border = true,
      label = "",
      required = false,
      disabled = false,
      options = [],
      placeholder = "Select an option",
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(value ?? "");

    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    // Sync controlled value
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Close when clicking outside
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

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;

      setSelectedValue(option.value);
      setOpen(false);

      onChange?.(option.value);
    };

    return (
      <div className="max-w-md">
        {label && <Label required={required}>{label}</Label>}

        <div ref={wrapperRef} className="relative w-full">
          {/* Hidden native select */}
          <select
            ref={ref}
            value={selectedValue}
            onChange={(e) => {
              const newValue = e.target.value;

              setSelectedValue(newValue);
              onChange?.(newValue);
            }}
            required={required}
            disabled={disabled}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Select Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "flex h-11 w-full min-w-[200px] items-center justify-between",
              "rounded-md bg-white px-3 text-left text-sm",
              "transition-all duration-200",

              border && "border border-gray-400",
              !border && "border-none",

              outline && open && "outline-none ring-2 ring-primary/30",

              !outline && "outline-none ring-0",

              disabled && "cursor-not-allowed bg-gray-100 opacity-60",

              className,
            )}
          >
            {/* Selected item / Placeholder */}
            <span
              className={cn(selectedOption ? "text-gray-900" : "text-gray-400")}
            >
              {selectedOption?.label || placeholder}
            </span>

            <FiChevronDown
              size={18}
              className={cn(
                "shrink-0 text-gray-500 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>

          {/* Dropdown */}
          {open && !disabled && (
            <div
              className={cn(
                "absolute left-0 top-full z-50 mt-1 w-full",
                "overflow-hidden rounded-md",
                "border border-gray-200 bg-white",
                "shadow-lg",
              )}
            >
              <div className="max-h-60 overflow-y-auto p-1">
                {options.map((option) => {
                  const isSelected = selectedValue === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "flex min-h-10 w-full items-center",
                        "justify-between rounded-md px-3",
                        "text-left text-sm",
                        "transition-colors",

                        option.disabled
                          ? "cursor-not-allowed text-gray-300"
                          : "cursor-pointer text-gray-700 hover:bg-gray-50",

                        isSelected && "bg-primary/5 text-primary",
                      )}
                    >
                      <span>{option.label}</span>

                      {/* Check mark */}
                      {isSelected && (
                        <FiCheck size={18} className="shrink-0 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
