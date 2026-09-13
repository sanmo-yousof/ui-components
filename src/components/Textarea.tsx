"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Label from "./Label";
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  outline?: boolean;
  border?: boolean;
  label?: string;
  required?: boolean;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      outline = true,
      border = true,
      label = "",
      disabled = false,
      required = false,
      placeholder = "Description",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="max-w-md w-full">
        {label && <Label required={required}>{label}</Label>}
        <textarea
          ref={ref}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={cn(
            "min-h-28 w-full bg-background-secondary resize-y rounded-md px-3 py-2.5",
            "text-sm",
            "placeholder:text-foreground-secondary",
            "transition-all duration-200",
            border && "border border-border-input focus:border-primary",
            !border && "border-none",
            outline && "focus:outline-none focus:ring-2 focus:ring-primary/30",
            !outline && "focus:outline-none focus:ring-0",
            disabled && "cursor-not-allowed bg-background-secondary opacity-60",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
export default Textarea;
