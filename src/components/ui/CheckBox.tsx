"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { BiCheck } from "react-icons/bi";

interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Checkbox({
  label,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-2">
      <span className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          {...props}
        />

        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded border border-input-border",
            "transition-colors",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
            className
          )}
        >
          <BiCheck
            size={16}
            className="text-white opacity-0 transition-opacity group-has-checked:opacity-100"
          />
        </span>
      </span>

      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}