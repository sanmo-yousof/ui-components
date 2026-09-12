"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import Label from "./Label";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const OTPInput = forwardRef<HTMLInputElement[], OTPInputProps>(
  (
    {
      length = 6,
      value = "",
      onChange,
      label = "OTP",
      required = false,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [otp, setOtp] = useState<string[]>(
      Array.from({ length }, (_, index) => value[index] || ""),
    );

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useImperativeHandle(ref, () => inputRefs.current as HTMLInputElement[]);

    useEffect(() => {
      const newOtp = Array.from(
        { length },
        (_, index) => value[index] || "",
      );

      setOtp(newOtp);
    }, [value, length]);

    const updateOtp = (newOtp: string[]) => {
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const digit = e.target.value.replace(/\D/g, "").slice(-1);

      const newOtp = [...otp];
      newOtp[index] = digit;

      updateOtp(newOtp);

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === "Backspace") {
        if (otp[index]) {
          const newOtp = [...otp];
          newOtp[index] = "";

          updateOtp(newOtp);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }

        return;
      }

      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (
        !/^\d$/.test(e.key) &&
        !["Tab", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    const handlePaste = (
      e: React.ClipboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      e.preventDefault();

      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

      if (!pastedData) return;

      const newOtp = [...otp];

      pastedData.split("").forEach((digit, pasteIndex) => {
        const targetIndex = index + pasteIndex;

        if (targetIndex < length) {
          newOtp[targetIndex] = digit;
        }
      });

      updateOtp(newOtp);

      const nextIndex = Math.min(index + pastedData.length, length - 1);

      inputRefs.current[nextIndex]?.focus();
    };

    return (
      <div className="w-full max-w-md">
        {label && <Label required={required}>{label}</Label>}

        <div className={cn("flex items-center gap-2", className)}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={disabled}
              required={required}
              placeholder="0"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              className={cn(
                "h-11 w-11 rounded-md px-2 text-center text-base",
                "font-medium",
                "placeholder:text-foreground-secondary",
                "transition-all duration-200",
                "border border-border-input",
                "focus:border-primary",
                "focus:outline-none",
                "focus:ring-2 focus:ring-primary/30",
                disabled && "cursor-not-allowed bg-background-secondary opacity-60",
              )}
            />
          ))}
        </div>
      </div>
    );
  },
);



export default OTPInput;

