"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import Label from "./Label";
interface FilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}
interface FilterSelectProps {
  label?: string;
  options?: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  border?: boolean;
  outline?: boolean;
  disabled?: boolean;
  className?: string;
}
const FilterSelect = React.forwardRef<HTMLDivElement, FilterSelectProps>(
  (
    {
      label = "",
      options = [],
      value,
      onChange,
      placeholder = "All",
      border = true,
      outline = true,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(value ?? "all");
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
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
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );
    const handleSelect = (option: FilterOption) => {
      if (option.disabled) return;
      setSelectedValue(option.value);
      setOpen(false);
      onChange?.(option.value);
    };
    return (
      <div ref={ref} className="max-w-md">
        {label && <Label > {label} </Label>}
        <div ref={wrapperRef} className="relative w-full">
          {/* Filter Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "flex h-11 w-full bg-background-secondary min-w-[180px] cursor-pointer items-center justify-between",
              "rounded-md  px-3 text-left text-sm",
              "transition-all duration-200",
              border && "border border-border-input focus:border-primary",
              !border && "border-none",
              outline && open && "outline-none ring-2 ring-primary/30",
              !outline && "outline-none ring-0",
              disabled && "cursor-not-allowed bg-background-secondary opacity-60",
              className,
            )}
          >
            <span
              className={cn(selectedOption ? "" : "text-foreground-secondary")}
            >
              {selectedOption?.label ?? placeholder}{" "}
            </span>{" "}
            <FiChevronDown
              size={18}
              className={cn(
                "shrink-0 text-foreground-secondary transition-transform duration-200",
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
                "border border-border-input/20 ",
                "shadow bg-dropdown",
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
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:bg-background-custom",
                        isSelected && "bg-primary/10 hover:bg-primary/10 text-primary",
                      )}
                    >
                      <span>{option.label}</span>
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
FilterSelect.displayName = "FilterSelect";
export default FilterSelect;
