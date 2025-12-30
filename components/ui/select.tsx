"use client";

import { forwardRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onValueChange, placeholder = "Sélectionner...", label, error, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(option => option.value === value);

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className={cn("relative", isOpen && "z-50")}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
          >
            <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {isOpen && (
            <div className="absolute z-50 mt-1 max-h-60 min-w-32 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onValueChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };