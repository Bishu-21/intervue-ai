"use client";

import { useState, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResumeUploadProps {
  onUploadSuccessAction: (url: string) => void;
}

export default function ResumeUpload({ onUploadSuccessAction }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successFile, setSuccessFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      void processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      void processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    setSuccessFile(null);

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    // Validate type
    const validTypes = [
      "application/pdf", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file format. Only PDF and DOCX are allowed.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      
      setSuccessFile(file.name);
      onUploadSuccessAction(data.url);
    } catch (err: any) {
      console.error(err);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="bg-white/5 backdrop-blur-[12px] border border-white/10 p-6 rounded-xl">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">upload_file</span> Resume
      </h2>
      
      <div 
        className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group",
            isDragging ? "border-primary bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]",
            (isUploading || successFile) && "pointer-events-none"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && !successFile && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        />
        
        {isUploading ? (
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-primary animate-pulse">Uploading securely to Azure Blob Storage...</p>
            </div>
        ) : successFile ? (
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-green-500">Resume uploaded successfully!</p>
                    <p className="text-xs text-slate-400 mt-1">{successFile}</p>
                </div>
            </div>
        ) : (
            <>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary">cloud_upload</span>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium">Drag &amp; drop your CV</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
                </div>
            </>
        )}
        
        {error && (
            <p className="text-xs text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded mt-2">{error}</p>
        )}
      </div>
    </section>
  );
}
