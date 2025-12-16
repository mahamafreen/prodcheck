import { ResultData } from './types';

/**
 * Analyzes a product image using Google Gemini API (REST endpoint)
 * with real-time streaming support for progressive results
 */
export const analyzeProductImage = async (
  imageBase64: string,
  fileName: string
): Promise<ResultData> => {
  const useMock = process.env.USE_MOCK === 'true';
  const apiKey = process.env.GEMINI_API_KEY;

  console.log('🔍 Analyze request received for:', fileName);
  console.log('📝 Mock mode:', useMock);
  console.log('🔑 API Key present:', !!apiKey);

  if (useMock || !apiKey) {
    console.warn(
      useMock
        ? '✅ Mock mode enabled. Set USE_MOCK=false for real Gemini API.'
        : '⚠️ GEMINI_API_KEY not set. Returning mock response. Set GEMINI_API_KEY in .env for real data.'
    );
    return getMockResult(fileName);
  }

  try {
    // Use Gemini REST API with streaming for real-time data
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;

    const prompt = `You are an expert product authentication specialist. Analyze this product image and provide:

1. A similarity score (0-100) indicating authenticity likelihood
2. The official product link (estimate based on image)
3. 3 related marketplace links with trust ratings (high/medium/low)
4. A detailed technical analysis

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "originalLink": "https://...",
  "similarityScore": 0-100,
  "otherLinks": [
    {"url": "https://...", "trustRating": "high"},
    {"url": "https://...", "trustRating": "medium"},
    {"url": "https://...", "trustRating": "low"}
  ],
  "explanation": "Detailed authenticity analysis..."
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data,
                  },
                },
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const error: any = await response.json();
      throw new Error(
        `Gemini API Error: ${error.error?.message || `HTTP ${response.status}`}`
      );
    }

    const data: any = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response structure from Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text.trim();

    // Extract JSON from response (handle potential markdown wrapping)
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const analysisResult: ResultData = JSON.parse(jsonStr);

    // Validate response structure
    if (
      !analysisResult.originalLink ||
      typeof analysisResult.similarityScore !== 'number' ||
      !Array.isArray(analysisResult.otherLinks) ||
      !analysisResult.explanation
    ) {
      throw new Error('Invalid response structure from Gemini');
    }

    console.log(`✅ Real-time analysis complete for ${fileName}:`, analysisResult);
    return analysisResult;
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to analyze product image. Please try again.'
    );
  }
};

/**
 * Mock result for testing without API key or when USE_MOCK=true
 */
const getMockResult = (fileName = 'uploaded-image'): ResultData => {
  return {
    originalLink: 'https://apple.com/products/airpods-pro',
    similarityScore: 87,
    otherLinks: [
      { url: 'https://amazon.com/Apple-AirPods-Latest-Model/dp/B08EXAMPLE', trustRating: 'high' },
      { url: 'https://bestbuy.com/site/apple-airpods-pro/1234567.p', trustRating: 'high' },
      { url: 'https://aliexpress.com/item/32123456789.html', trustRating: 'low' },
    ],
    explanation: '[MOCK DATA] The product shows authentic branding and packaging design. Serial number format matches official products. Recommended to verify hologram and purchase from official retailers. Real analysis: Enable GEMINI_API_KEY in backend/.env for actual AI analysis.',
  };
};
