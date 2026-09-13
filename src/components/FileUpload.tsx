"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FiFile, FiUploadCloud, FiX } from "react-icons/fi";
import Label from "./Label";

interface FileUploadProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  required?: boolean;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      label = "",
      required = false,
      disabled,
      accept,
      multiple = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setInputRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const syncInputFiles = (selectedFiles: File[]) => {
      if (!inputRef.current) return;

      const dataTransfer = new DataTransfer();

      selectedFiles.forEach((file) => {
        dataTransfer.items.add(file);
      });

      inputRef.current.files = dataTransfer.files;

      onChange?.({
        target: inputRef.current,
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return;

      const selectedFiles = Array.from(fileList);

      const updatedFiles = multiple
        ? [...files, ...selectedFiles]
        : [selectedFiles[0]];

      setFiles(updatedFiles);
      syncInputFiles(updatedFiles);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(event.target.files);
    };

    const handleRemove = (index: number) => {
      const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);

      setFiles(updatedFiles);
      syncInputFiles(updatedFiles);
    };

    const handleUploadClick = () => {
      if (disabled) return;

      inputRef.current?.click();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (disabled || multiple) return;

      handleFiles(event.dataTransfer.files);
    };

    const getFilePreview = (file: File) => {
      if (!file.type.startsWith("image/")) {
        return null;
      }

      return URL.createObjectURL(file);
    };

    if (multiple) {
      return (
        <div className="max-w-md w-full">
          <Label required={required}>{label}</Label>

          <input
            ref={setInputRef}
            type="file"
            accept={accept}
            multiple
            disabled={disabled}
            required={required && files.length === 0}
            onChange={handleChange}
            className="hidden"
            {...props}
          />

          <div
            className={cn(
              "flex flex-wrap items-center gap-3",
              "w-full rounded-md border border-border-input",
              "bg-background-secondary p-3",
              disabled && "cursor-not-allowed opacity-60",
              className,
            )}
          >
            {files.map((file, index) => {
              const preview = getFilePreview(file);

              return (
                <div
                  key={`${file.name}-${index}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border-input"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-background-secondary p-2">
                      <FiFile className="text-xl" />

                      <span className="mt-1 w-full truncate text-center text-[10px]">
                        {file.name}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className={cn(
                      "absolute right-1 top-1",
                      "flex h-5 w-5 items-center justify-center",
                      "rounded-full bg-black/60 text-white",
                      "cursor-pointer",
                      "transition-colors hover:bg-red-500",
                    )}
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              );
            })}

            {/* Add Image Button */}
            <button
              type="button"
              disabled={disabled}
              onClick={handleUploadClick}
              className={cn(
                "flex h-24 w-24 shrink-0 flex-col",
                "items-center justify-center",
                "rounded-md border border-dashed",
                "border-border-input",
                "text-foreground-secondary",
                "cursor-pointer",
                "transition-all duration-200",
                "hover:border-primary hover:bg-primary/5",
                disabled &&
                  "cursor-not-allowed opacity-60",
              )}
            >
              <FiUploadCloud className="mb-1 text-2xl" />

              <span className="text-xs font-medium">Add Image</span>
            </button>
            {files.length === 0 && (
              <div className="flex flex-col ">
                
                <p className="text-sm font-medium">Multiple files upload</p>

                <p className="mt-1 text-xs text-foreground-secondary">
                  {accept ? `Accepted: ${accept}` : "Select multiple files"}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    const file = files[0];
    const preview = file ? getFilePreview(file) : null;

    return (
      <div className="max-w-md w-full">
        <Label required={required}>{label}</Label>

        <input
          ref={setInputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          required={required && !file}
          onChange={handleChange}
          className="hidden"
          {...props}
        />

        <div
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "relative flex w-full bg-background-secondary",
            "cursor-pointer flex-col items-center justify-center",
            "rounded-md border border-dashed",
            "border-border-input",
            "p-4",
            "transition-all duration-200",
            "hover:border-primary hover:bg-primary/5",
            disabled && "cursor-not-allowed opacity-60",
            className,
          )}
        >
          {!file ? (
            <div className="flex flex-col items-center">
              <FiUploadCloud className="mb-3 text-3xl text-foreground-secondary" />

              <p className="text-sm font-medium">
                Click to upload or drag & drop
              </p>

              <p className="mt-1 text-xs text-foreground-secondary">
                {accept ? `Accepted: ${accept}` : "Select a file"}
              </p>
            </div>
          ) : (
            <div
              className="relative"
              onClick={(event) => event.stopPropagation()}
            >
              {preview ? (
                <div className="relative h-20 w-30 overflow-hidden rounded-md border border-border-input">
                  <img
                    src={preview}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemove(0)}
                    className={cn(
                      "absolute right-1 top-1",
                      "flex h-6 w-6 items-center justify-center",
                      "rounded-full bg-black/60 text-white",
                      "cursor-pointer",
                      "transition-colors hover:bg-red-500",
                    )}
                  >
                    <FiX className="text-sm" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-md border border-border-input bg-background-secondary p-3">
                  <FiFile className="shrink-0 text-xl" />

                  <span className="max-w-52 truncate text-sm">{file.name}</span>

                  <button
                    type="button"
                    onClick={() => handleRemove(0)}
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center",
                      "rounded-full text-foreground-secondary",
                      "cursor-pointer",
                      "hover:bg-red-500 hover:text-white",
                    )}
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
