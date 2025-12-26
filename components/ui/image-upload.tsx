"use client";

import { forwardRef, useState, useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | string;
  onChange?: (file: File | undefined) => void;
  label?: string;
  error?: string;
  accept?: string;
  className?: string;
  preview?: boolean;
  placeholder?: string;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ value, onChange, label, error, accept = "image/*,.pdf,video/*", className, preview = true, placeholder }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(
      typeof value === 'string' ? value : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || undefined;
      onChange?.(file);

      if (file && preview) {
        // Check if file is an image for preview
        if (file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        } else {
          // For non-image files, show file info instead of preview
          setPreviewUrl(`file:${file.name}`);
        }
      } else if (!file) {
        setPreviewUrl(null);
      }
    };

    const handleRemove = () => {
      onChange?.(undefined);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="space-y-2">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

          {previewUrl ? (
            <div className="relative">
              {previewUrl.startsWith('file:') ? (
                // File info for non-image files
                <div className="w-full h-32 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">{previewUrl.replace('file:', '')}</p>
                    <p className="text-xs text-gray-400">Fichier sélectionné</p>
                  </div>
                </div>
              ) : (
                // Image preview
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={400}
                  height={128}
                  className="w-full h-32 object-cover rounded-md border border-gray-300"
                />
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className={cn(
                "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer",
                error && "border-red-500 hover:border-red-500 hover:bg-red-50",
                className
              )}
            >
              <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">{placeholder || "Cliquez pour sélectionner un fichier"}</span>
              <span className="text-xs text-gray-400 mt-1">Images, PDF, vidéos jusqu&apos;à 10MB</span>
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };