"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Label from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  outline?: boolean;
  border?: boolean;
  label?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      outline = true,
      border = true,
      label = "",
      disabled,
      required = false,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isNumber = type === "number";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isNumber && ["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }

      props.onKeyDown?.(e);
    };

    return (
      <div className="max-w-md">
        <Label required={required}>{label}</Label>
        <div className="relative w-full">
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            required={required}
            onKeyDown={handleKeyDown}
            className={cn(
              "h-11 w-full rounded-md  px-3 text-sm text-gray-900",
              "placeholder:text-gray-400",
              "transition-all duration-200",
              isNumber &&
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              border && "border border-gray-400 focus:border-primary",
              !border && "border-none",
              outline &&
                "focus:outline-none focus:ring-2 focus:ring-primary/30",
              !outline && "focus:outline-none focus:ring-0",
              disabled && "cursor-not-allowed bg-gray-100 opacity-60",
              isPassword && "pr-10",
              className,
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              onClick={() => setShowPassword((prev) => !prev)}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "text-gray-500 transition-colors",
                "hover:text-gray-700",
                disabled && "pointer-events-none",
              )}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
