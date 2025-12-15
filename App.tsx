import React, { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { ResultsSection } from './components/ResultsSection';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { checkProductAuthenticity } from './services/geminiService';
import { ResultData } from './types';

interface ProgressUpdate {
  stage: string;
  message: string;
  percentage: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showApp, setShowApp] = useState<boolean>(false);
  const [checkProgress, setCheckProgress] = useState<ProgressUpdate | null>(null);

  useEffect(() => {
    // For initial fade-in animation
    const timer = setTimeout(() => setShowApp(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    // Reset app state on logout
    setImageFile(null);
    setPreviewUrl(null);
    setResults(null);
    setError(null);
    setCheckProgress(null);
  }, []);

  const handleImageSelect = useCallback((file: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResults(null);
    setError(null);
    setCheckProgress(null);
  }, [previewUrl]);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
    setResults(null);
    setError(null);
    setCheckProgress(null);
  }, [previewUrl]);

  const handleCheckAuthenticity = useCallback(async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setResults(null);
    setError(null);
    setCheckProgress(null);

    try {
      const data = await checkProductAuthenticity(imageFile, (progress) => {
        setCheckProgress(progress);
      });
      setResults(data);
      setCheckProgress(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setCheckProgress(null);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className={`flex flex-col min-h-screen transition-opacity duration-700 ease-in-out ${showApp ? 'opacity-100' : 'opacity-0'}`}>
      {!isAuthenticated ? (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Navbar isLoggedIn={true} onLogout={handleLogout} />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col gap-8">
              <Hero />
              <UploadSection
                onImageUpload={handleImageSelect}
                onCheckAuthenticity={handleCheckAuthenticity}
                isChecking={isLoading}
                imagePreviewUrl={previewUrl}
                onRemoveImage={handleRemoveImage}
                checkProgress={checkProgress}
              />
              <ResultsSection isLoading={isLoading} results={results} error={error} />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}