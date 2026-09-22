"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FiCamera } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";
import Button from "./Button";
import { BiEdit } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

interface ProfileImageUploadProps {
  image?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onChange?: (file: File | null) => void;
}

const ProfileImageUpload = ({
  image,
  required = false,
  disabled = false,
  loading = false,
  className,
  onChange,
}: ProfileImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(image || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled || loading) return;

    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
    onChange?.(file);
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={disabled || loading}
        required={required && !preview}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div
          onClick={handleClick}
          className={cn(
            "group relative h-24 w-24 shrink-0 overflow-hidden rounded-full",
            "cursor-pointer border border-input-border",
            "bg-background-secondary",
            "transition-all duration-200 hover:border-primary",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <FiCamera className="text-2xl text-foreground-secondary" />
              <span className="mt-1 text-[10px] text-foreground-secondary">
                Add Photo
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          {!loading && !disabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <FiCamera className="text-xl text-white" />
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <LuLoaderCircle className="animate-spin text-xl text-white" />
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={handleClick}
          disabled={disabled || loading}
          loading={loading}
        > 
        <MdEdit />
          Change Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;