"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Label from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  outline?: boolean;
  border?: boolean;
  label?: string;
  error?: string;
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
      maxLength,
      onChange,
      error,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isNumber = type === "number";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const numberMaxLength = maxLength ?? 4;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isNumber && ["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }

      props.onKeyDown?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isNumber && numberMaxLength) {
        e.target.value = e.target.value.slice(0, numberMaxLength);
      }

      onChange?.(e);
    };

    return (
      <div className="w-full">
        <Label required={required}>{label}</Label>
        <div className="relative w-full">
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            maxLength={isNumber ? numberMaxLength : maxLength}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className={cn(
              "h-11 w-full text-input-text rounded-md bg-input-background px-3 text-sm",
              "placeholder:text-input-placeholder",
              "transition-all duration-200",
              isNumber &&
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              border &&
                "border border-input-border focus:border-input-active-border",
              !border && "border-none",
              outline &&
                "focus:outline-none focus:ring-2 focus:ring-input-active-ring",
              !outline && "focus:outline-none focus:ring-0",
              disabled &&
                "cursor-not-allowed bg-input-disabled-background opacity-60",
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
                "absolute cursor-pointer right-3 top-1/2 -translate-y-1/2",
                "text-input-icon text-lg transition-colors",
                "hover:text-input-hover-text",
                disabled && "pointer-events-none",
              )}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
