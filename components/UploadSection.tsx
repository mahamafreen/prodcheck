import React, { useState, useCallback } from 'react';
import { UploadCloudIcon, Trash2Icon } from './Icons';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  onCheckAuthenticity: () => void;
  isChecking: boolean;
  imagePreviewUrl: string | null;
  onRemoveImage: () => void;
  checkProgress?: { stage: string; message: string; percentage: number } | null;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onImageUpload,
  onCheckAuthenticity,
  isChecking,
  imagePreviewUrl,
  onRemoveImage,
  checkProgress,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEvent = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvent(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleDragEvent, onImageUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg shadow-pink-200/30">
      <div
        onDragEnter={(e) => handleDragEvent(e, true)}
        onDragLeave={(e) => handleDragEvent(e, false)}
        onDragOver={(e) => handleDragEvent(e, true)}
        onDrop={handleDrop}
        className={`relative w-full p-4 border-2 border-dotted rounded-2xl transition-all duration-300 ${
          isDragging ? 'border-pink-400 bg-pink-100/50' : 'border-slate-300 hover:border-pink-300'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/*"
          disabled={isChecking}
        />
        {imagePreviewUrl ? (
          <div className="relative group">
            <img src={imagePreviewUrl} alt="Product Preview" className="w-full h-auto max-h-80 object-contain rounded-lg" />
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Remove image"
              disabled={isChecking}
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 md:py-16 text-slate-500">
            <UploadCloudIcon className="w-12 h-12 mb-4 text-slate-400" />
            <p className="font-semibold text-slate-800">
              <span className="text-pink-500 font-bold">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>

      {/* Real-time Progress Bar */}
      {isChecking && checkProgress && (
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-700">
              {checkProgress.stage === 'encoding' && '🖼️  Encoding image...'}
              {checkProgress.stage === 'sending' && '📤 Sending to AI...'}
              {checkProgress.stage === 'processing' && '🔍 Analyzing...'}
              {checkProgress.stage === 'parsing' && '📊 Processing results...'}
              {checkProgress.stage === 'complete' && '✅ Complete!'}
            </span>
            <span className="text-pink-600 font-bold">{checkProgress.percentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-sky-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${checkProgress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 italic">{checkProgress.message}</p>
        </div>
      )}

      <button
        onClick={onCheckAuthenticity}
        disabled={!imagePreviewUrl || isChecking}
        className="w-full max-w-xs px-6 py-3 font-bold text-white bg-gradient-to-r from-pink-500 to-sky-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-pink-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isChecking ? `Checking... (${checkProgress?.percentage || 0}%)` : 'Check Authenticity'}
      </button>
    </div>
  );
};