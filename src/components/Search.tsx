"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoSearchOutline } from "react-icons/io5";
import Label from "./Label";
import Button from "./Button";
interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange"
> {
  outline?: boolean;
  border?: boolean;
  label?: string;
  showButton?: boolean;
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
   buttonText?: string;
   loading?: boolean;
}
const Search = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      outline = true,
      border = true,
      label = "",
      disabled = false,
      showButton = false,
      onSearch,
      value,
      onChange,
      buttonText = "Search",
      loading = false,
      placeholder = "Search...",
      ...props
    },
    ref,
  ) => {
    const [searchValue, setSearchValue] = useState(value ?? "");
     useEffect(() => {
      if (value !== undefined) {
        setSearchValue(value);
      }
    }, [value]);
     const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const newValue = e.target.value;
      setSearchValue(newValue);
      onChange?.(newValue);
    };
    const handleSearch = () => {
      onSearch?.(searchValue);
    };
    const handleKeyUp = (
      e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      props.onKeyUp?.(e);
      if (!showButton) {
        onSearch?.(searchValue);
      }
     if (
        showButton &&
        e.key === "Enter"
      ) {
        handleSearch();
      }
    };
    return (
      <div className="max-w-md">
        {label && <Label > {label} </Label>}
        <div className="flex w-full items-center gap-2">
          
          {/* Search Input */}
          <div
            className={cn(
              "relative flex h-11 w-full items-center",
              "rounded-md",
              border && "border border-border-input focus-within:border-primary",
              !border && "border-none",
              outline &&
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/30",
              !outline && "focus-within:outline-none focus-within:ring-0",
              disabled && "cursor-not-allowed bg-background-secondary opacity-60",
            )}
          >
            
            {/* Search Icon */}
            <IoSearchOutline
              size={20}
              className="ml-3 shrink-0 text-foreground-secondary"
            />
            <input
              ref={ref}
              type="text"
              value={searchValue}
              disabled={disabled}
              placeholder={placeholder}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              className={cn(
                "h-full w-full bg-transparent px-3 text-sm ",
                "placeholder:text-foreground-secondary",
                "outline-none",
                "disabled:cursor-not-allowed",
                className,
              )}
              {...props}
            />
          </div>
          {/* Search Button */}
          {showButton && (
            <Button
              type="button"
              onClick={handleSearch}
              disabled={disabled || loading}
              loading={loading}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  },
);
Search.displayName = "SearchInput";
export default Search;
