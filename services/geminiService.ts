import { ResultData } from '../types';

// Normalize API URL (ensure protocol present) and add debug logging
let API_URL = import.meta.env.VITE_API_URL || 'https://prodcheck-production.up.railway.app';
if (typeof API_URL === 'string' && API_URL.length > 0 && !API_URL.match(/^https?:\/\//i)) {
  API_URL = `https://${API_URL}`;
}

if (typeof window !== 'undefined') {
  // show configured API URL (helps troubleshoot missing protocol)
  // eslint-disable-next-line no-console
  console.log('🔌 API URL configured:', API_URL);
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Checks product authenticity with real-time data from Gemini AI
 * Supports optional progress callback for streaming updates
 */
export const checkProductAuthenticity = async (
  imageFile: File,
  onProgress?: (progress: { stage: string; message: string; percentage: number }) => void
): Promise<ResultData> => {
  console.log('🚀 Starting real-time authenticity check for:', imageFile.name);

  try {
    // Stage 1: Encode image
    if (onProgress) {
      onProgress({
        stage: 'encoding',
        message: 'Preparing image...',
        percentage: 10,
      });
    }
    const base64String = await fileToBase64(imageFile);

    // Stage 2: Send to backend
    if (onProgress) {
      onProgress({
        stage: 'sending',
        message: 'Sending to Gemini AI...',
        percentage: 25,
      });
    }
    console.log('Sending image to backend for real-time analysis...');

    const response = await fetch(`${API_URL}/api/check-authenticity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: base64String,
        fileName: imageFile.name,
      }),
    });

    // Stage 3: Processing
    if (onProgress) {
      onProgress({
        stage: 'processing',
        message: 'Analyzing product...',
        percentage: 50,
      });
    }

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text.slice(0, 200) || errorMessage;
        }
      } catch (e) {
        // If we can't parse the error, just use the status
      }
      throw new Error(`Backend error: ${errorMessage}`);
    }

    // Stage 4: Parsing results
    if (onProgress) {
      onProgress({
        stage: 'parsing',
        message: 'Processing results...',
        percentage: 75,
      });
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Analysis failed');
    }

    // Stage 5: Complete
    if (onProgress) {
      onProgress({
        stage: 'complete',
        message: 'Analysis complete!',
        percentage: 100,
      });
    }

    console.log('✅ Real-time analysis received:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error during authenticity check:', error);

    // Provide helpful error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to backend server at ${API_URL}. Make sure the backend is running:\n\ncd backend && npm run dev`
      );
    }

    throw error instanceof Error
      ? error
      : new Error(
          'AI analysis failed. The product image might be unclear or unsupported. Please try again.'
        );
  }
};
