import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeProductImage } from './geminiService';
import { AnalysisRequest, AnalysisResponse } from './types';

dotenv.config();

const app = express();
// Railway provides the PORT environment variable automatically
const PORT = Number(process.env.PORT) || 5000;

// 1. Production-Ready CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000',
  'https://prodcheck-ai.vercel.app',
  /\.vercel\.app$/ // This allows all Vercel deployment and preview URLs
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 2. Increase JSON limit for Base64 image transfers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint (Railway uses this to see if the app is alive)
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    geminiKeyConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Product authenticity analysis endpoint
app.post(
  '/api/check-authenticity',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageBase64, fileName } = req.body as AnalysisRequest;

      if (!imageBase64) {
        res.status(400).json({
          success: false,
          error: 'Image data is required',
        } as AnalysisResponse);
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          success: false,
          error: 'Gemini API key is missing on server',
        } as AnalysisResponse);
        return;
      }

      console.log(`Analyzing image: ${fileName || 'unnamed'}`);
      const result = await analyzeProductImage(imageBase64, fileName || 'uploaded-image');

      res.json({
        success: true,
        data: result,
      } as AnalysisResponse);
    } catch (error) {
      console.error('Analysis Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Analysis failed',
      } as AnalysisResponse);
    }
  }
);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start server - Explicitly bind to 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Backend server running on port ${PORT}`);
  console.log(`📡 CORS active for Vercel and local dev`);
});