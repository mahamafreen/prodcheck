# Backend Integration Setup

## Overview
This project consists of:
- **Frontend**: React + TypeScript (Vite)
- **Backend**: Node.js + Express + TypeScript

## Project Structure
```
prodcheck-ai/
├── frontend files (App.tsx, components/, services/, etc.)
├── package.json (frontend)
├── vite.config.ts
└── backend/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── index.ts (Express server)
        ├── geminiService.ts (Gemini API integration)
        └── types.ts
```

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Environment Configuration

#### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
```

#### Backend (backend/.env)
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Running Both Services

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### Check Product Authenticity
```
POST /api/check-authenticity
Content-Type: application/json

{
  "imageBase64": "data:image/jpeg;base64,...",
  "fileName": "product.jpg"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "originalLink": "https://...",
    "similarityScore": 92,
    "otherLinks": [
      { "url": "https://...", "trustRating": "high" },
      { "url": "https://...", "trustRating": "medium" },
      { "url": "https://...", "trustRating": "low" }
    ],
    "explanation": "Detailed analysis..."
  }
}
```

## Features

✅ Real Gemini AI integration for product authenticity analysis
✅ Image upload and processing
✅ CORS support for frontend-backend communication
✅ Error handling and validation
✅ TypeScript throughout the stack
✅ Environment-based configuration

## Troubleshooting

### Backend Connection Error
- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` in frontend `.env.local`
- Verify CORS is configured correctly

### Gemini API Errors
- Ensure `GEMINI_API_KEY` is set in `backend/.env`
- Check API key is valid and has necessary permissions

### Port Already in Use
- Backend: `npm run dev -- --port 5001`
- Frontend: `npm run dev -- --port 5174`

## Development Notes

- The frontend now sends base64-encoded images to the backend
- The backend uses Gemini 2.0 Flash model for analysis
- All API communication is JSON-based
- CORS is enabled for local development
