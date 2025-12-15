import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeProductImage } from './geminiService';
import { AnalysisRequest, AnalysisResponse } from './types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
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
          error: 'Image is required',
        } as AnalysisResponse);
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          success: false,
          error: 'Gemini API key is not configured',
        } as AnalysisResponse);
        return;
      }

      console.log(`Analyzing product image: ${fileName || 'unknown'}`);

      const result = await analyzeProductImage(imageBase64, fileName || 'uploaded-image');

      res.json({
        success: true,
        data: result,
      } as AnalysisResponse);
    } catch (error) {
      console.error('Error in /api/check-authenticity:', error);

      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An error occurred while analyzing the image',
      } as AnalysisResponse);
    }
  }
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for: ${FRONTEND_URL}`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  GET  /api/health`);
  console.log(`  POST /api/check-authenticity`);
  console.log('\n');
});
