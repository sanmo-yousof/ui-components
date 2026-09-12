"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Label from "./Label";

interface RangeInputProps {
  min?: number;
  max?: number;
  step?: number;
  start?: number;
  end?: number;
  label?: string;
  onChange?: (range: { start: number; end: number }) => void;
  className?: string;
  disabled?: boolean;
}

export default function RangeInput({
  min = 0,
  max = 100,
  step = 1,
  start,
  end,
  label = "Price Range",
  onChange,
  className,
  disabled = false,
}: RangeInputProps) {
  const [startValue, setStartValue] = useState(start ?? min);
  const [endValue, setEndValue] = useState(end ?? max);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (start !== undefined) {
      setStartValue(start);
    }
  }, [start]);

  useEffect(() => {
    if (end !== undefined) {
      setEndValue(end);
    }
  }, [end]);

  const startPercent = ((startValue - min) / (max - min)) * 100;

  const endPercent = ((endValue - min) / (max - min)) * 100;

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), endValue - step);

    setStartValue(newValue);

    onChange?.({
      start: newValue,
      end: endValue,
    });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), startValue + step);

    setEndValue(newValue);

    onChange?.({
      start: startValue,
      end: newValue,
    });
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();

    const percentage = (e.clientX - rect.left) / rect.width;

    const rawValue = min + percentage * (max - min);

    const value = Math.round(rawValue / step) * step;

    const clampedValue = Math.max(min, Math.min(max, value));

    const distanceToStart = Math.abs(clampedValue - startValue);

    const distanceToEnd = Math.abs(clampedValue - endValue);

    if (distanceToStart <= distanceToEnd) {
      const newStart = Math.min(clampedValue, endValue - step);

      setStartValue(newStart);

      onChange?.({
        start: newStart,
        end: endValue,
      });
    } else {
      const newEnd = Math.max(clampedValue, startValue + step);

      setEndValue(newEnd);

      onChange?.({
        start: startValue,
        end: newEnd,
      });
    }
  };

  return (
    <div className={cn("w-full max-w-[300px]", className)}>
      {/* Label + Values */}
      <div className="mb-2 flex items-center justify-between">
        <Label className="mb-0">{label}</Label>

        <span className="text-sm font-medium">
          {startValue} - {endValue}
        </span>
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="relative h-6 w-full">
        {/* Background Track */}
        <div
          onMouseDown={handleTrackClick}
          className="absolute top-1/2 h-1.5 w-full cursor-pointer -translate-y-1/2 rounded-full bg-primary/20"
        />

        {/* Active Track */}
        <div
          onMouseDown={handleTrackClick}
          className="absolute top-1/2 h-1.5 cursor-pointer -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${startPercent}%`,
            right: `${100 - endPercent}%`,
          }}
        />

        {/* Start */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={startValue}
          disabled={disabled}
          onChange={handleStartChange}
          className={cn(
            "pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent",
            "[&::-webkit-slider-thumb]:pointer-events-auto",
            "[&::-webkit-slider-thumb]:h-5",
            "[&::-webkit-slider-thumb]:w-5",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:ease-out",
            "[&::-moz-range-thumb]:pointer-events-auto",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:bg-primary",
          )}
        />

        {/* End */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={endValue}
          disabled={disabled}
          onChange={handleEndChange}
          className={cn(
            "pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent",
            "[&::-webkit-slider-thumb]:pointer-events-auto",
            "[&::-webkit-slider-thumb]:h-5",
            "[&::-webkit-slider-thumb]:w-5",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:ease-out",
            "[&::-moz-range-thumb]:pointer-events-auto",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:bg-primary",
          )}
        />
      </div>

      {/* Min / Max */}
      <div className="mt-1 flex justify-between text-xs text-foreground-secondary">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
