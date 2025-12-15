# API Integration Examples

## 1. Frontend to Backend Communication

### Frontend (React)
The frontend service has been updated to communicate with the backend:

**File:** `services/geminiService.ts`

```typescript
export const checkProductAuthenticity = async (imageFile: File): Promise<ResultData> => {
  // Convert image to base64
  const base64String = await fileToBase64(imageFile);

  // Send to backend
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

  // Handle response
  const result = await response.json();
  return result.data;
};
```

### Backend (Express)
**File:** `backend/src/index.ts`

```typescript
app.post('/api/check-authenticity', async (req: Request, res: Response) => {
  try {
    const { imageBase64, fileName } = req.body;
    
    // Call Gemini AI service
    const result = await analyzeProductImage(imageBase64, fileName);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
```

## 2. Request/Response Examples

### Request
```bash
curl -X POST http://localhost:5000/api/check-authenticity \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "fileName": "sneaker.jpg"
  }'
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "originalLink": "https://official-nike.com/sneaker-pro",
    "similarityScore": 88,
    "otherLinks": [
      {
        "url": "https://stock-x.com/sneaker-pro-2024",
        "trustRating": "high"
      },
      {
        "url": "https://reseller-marketplace.com/item-12345",
        "trustRating": "medium"
      },
      {
        "url": "https://cheap-deals-warehouse.com/fake-sneaker",
        "trustRating": "low"
      }
    ],
    "explanation": "The shoe design matches authentic Nike Pro models from 2024. The stitching quality and material texture are consistent with genuine products. The sole pattern and logo placement match official specifications."
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "error": "Image is required"
}
```

```json
{
  "success": false,
  "error": "Gemini API key is not configured"
}
```

## 3. Data Flow Diagram

```
User Browser
     ↓ (Click "Check Authenticity")
React Component (UploadSection)
     ↓ (File to Base64)
Frontend Service (geminiService.ts)
     ↓ POST /api/check-authenticity
Express Server (backend/src/index.ts)
     ↓
Gemini Service (backend/src/geminiService.ts)
     ↓
Google Gemini API
     ↓ (AI Analysis)
Gemini Service (Process Response)
     ↓
Express Server (Format Response)
     ↓
Frontend Service (Parse JSON)
     ↓
React Component (Display Results)
     ↓
User Browser
```

## 4. TypeScript Interfaces

### Types (Shared between Frontend and Backend)

```typescript
// services/geminiService.ts (Frontend)
// backend/src/types.ts (Backend)

export interface OtherLink {
  url: string;
  trustRating: 'high' | 'medium' | 'low';
}

export interface ResultData {
  originalLink: string;
  similarityScore: number;
  otherLinks: OtherLink[];
  explanation: string;
}

export interface AnalysisRequest {
  imageBase64: string;
  fileName: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: ResultData;
  error?: string;
}
```

## 5. Environment Variables

### Frontend (.env.local)
```env
# API URL for backend communication
VITE_API_URL=http://localhost:5000

# In production, use:
# VITE_API_URL=https://api.prodcheck.com
```

### Backend (backend/.env)
```env
# Gemini API Key from Google
GEMINI_API_KEY=AIzaSy...

# Server port
PORT=5000

# Environment
NODE_ENV=development

# CORS origin - frontend URL
FRONTEND_URL=http://localhost:5173
```

## 6. CORS Configuration

The backend automatically configures CORS for the frontend:

```typescript
app.use(cors({ origin: FRONTEND_URL }));
```

In production, update `FRONTEND_URL` to your actual frontend domain.

## 7. Error Handling

### Frontend Error Handling
```typescript
try {
  const data = await checkProductAuthenticity(imageFile);
  setResults(data);
} catch (err) {
  if (err instanceof TypeError && err.message.includes('fetch')) {
    setError('Cannot connect to backend server');
  } else {
    setError(err.message);
  }
}
```

### Backend Error Handling
```typescript
// Validation errors (400)
if (!imageBase64) {
  res.status(400).json({ success: false, error: 'Image is required' });
}

// Configuration errors (500)
if (!process.env.GEMINI_API_KEY) {
  res.status(500).json({ success: false, error: 'API key not configured' });
}

// API errors (500)
try {
  const result = await analyzeProductImage(imageBase64, fileName);
} catch (error) {
  res.status(500).json({ success: false, error: error.message });
}
```

## 8. Testing Integration

### Using cURL
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test authenticity check (with real image base64)
curl -X POST http://localhost:5000/api/check-authenticity \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "YOUR_BASE64_IMAGE_HERE",
    "fileName": "test.jpg"
  }'
```

### Using Postman
1. Create a new POST request
2. URL: `http://localhost:5000/api/check-authenticity`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "fileName": "product.jpg"
}
```

## 9. Production Deployment

### Environment Variables (Production)
```env
# backend/.env (production)
GEMINI_API_KEY=AIzaSy...
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

```env
# .env.local (production)
VITE_API_URL=https://api.yourdomain.com
```

### Deployment Services
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Render, Railway, Heroku, AWS EC2

## 10. Monitoring & Logging

### Backend Logs
The backend logs important events:
```
🚀 Backend server running on http://localhost:5000
📡 CORS enabled for: http://localhost:5173
Analyzing product image: sneaker.jpg
Backend analysis received: { originalLink, similarityScore, ... }
Error in /api/check-authenticity: API key not configured
```

### Frontend Logs (Browser Console)
```
Starting authenticity check for: product.jpg
Sending image to backend for analysis...
Backend analysis received: { ... }
Error during authenticity check: Cannot connect to backend
```
