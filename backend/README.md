# ProdCheck AI Backend

Node.js + Express API for product authenticity verification using Google's Gemini AI.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` from template:
```bash
cp .env.example .env
```

Update `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Run Development Server
```bash
npm run dev
```

Backend will start on `http://localhost:5000`

## 📝 Available Scripts

```bash
npm run dev      # Start with hot reload (uses tsx watch)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run preview  # Alternative to start
```

## 🏗️ Project Structure

```
src/
├── index.ts              # Express server & API endpoints
├── geminiService.ts      # Gemini AI integration logic
└── types.ts              # TypeScript interfaces
```

### Files Explained

**index.ts** - Express server
- Initializes Express app
- Configures CORS middleware
- Defines API routes
- Error handling

**geminiService.ts** - AI Integration
- Connects to Google Generative AI
- Processes image base64 encoding
- Sends requests to Gemini model
- Parses and validates responses

**types.ts** - Data Structures
- `AnalysisRequest` - Request payload
- `AnalysisResponse` - Response payload
- `ResultData` - Analysis results
- `OtherLink` - Related marketplace links

## 🔌 API Endpoints

### 1. Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### 2. Analyze Product
```
POST /api/check-authenticity
Content-Type: application/json
```

**Request Body:**
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "fileName": "product.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "originalLink": "https://official-store.com/product",
    "similarityScore": 92,
    "otherLinks": [
      {
        "url": "https://reseller.com/item",
        "trustRating": "high"
      },
      {
        "url": "https://marketplace.com/listing",
        "trustRating": "medium"
      },
      {
        "url": "https://cheap-fake-store.com/fake",
        "trustRating": "low"
      }
    ],
    "explanation": "The product appears authentic based on stitching quality, material composition, and logo placement..."
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Image is required"
}
```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSy...` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:5173` |

**Get your API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Create or use existing API key
3. Add to `backend/.env`

## 🧠 Gemini AI Integration

### How It Works

1. **Image Input**
   - Receives base64 encoded image
   - Supports JPEG, PNG, WEBP formats

2. **AI Prompt**
   - Sends image + detailed prompt to Gemini
   - Asks for JSON-formatted response
   - Requests: similarity score, official link, marketplace links, analysis

3. **Response Parsing**
   - Extracts JSON from AI response
   - Validates data structure
   - Returns structured results

4. **Error Handling**
   - Validates API key is set
   - Catches AI errors
   - Returns helpful error messages

### Example Usage
```typescript
import { analyzeProductImage } from './geminiService';

const base64Image = "data:image/jpeg;base64,...";
const result = await analyzeProductImage(base64Image, "product.jpg");

console.log(result);
// {
//   originalLink: "https://...",
//   similarityScore: 92,
//   otherLinks: [...],
//   explanation: "..."
// }
```

## 🚨 Error Handling

### Common Errors

**400 - Bad Request**
```json
{
  "success": false,
  "error": "Image is required"
}
```
→ Solution: Include `imageBase64` in request

**500 - Gemini API Key Missing**
```json
{
  "success": false,
  "error": "Gemini API key is not configured"
}
```
→ Solution: Set `GEMINI_API_KEY` in `.env`

**500 - Network Error**
```json
{
  "success": false,
  "error": "Cannot connect to Gemini API"
}
```
→ Solution: Check internet connection, verify API key is valid

**500 - Invalid Image**
```json
{
  "success": false,
  "error": "Failed to parse AI response"
}
```
→ Solution: Ensure image is valid, try different format

## 🔒 Security

### CORS Configuration
```typescript
app.use(cors({ origin: process.env.FRONTEND_URL }));
```
- Only allows requests from `FRONTEND_URL`
- Add to whitelist for production domains

### Request Size Limits
```typescript
app.use(express.json({ limit: '50mb' }));
```
- Images up to 50MB supported
- Adjust based on needs

### Best Practices
- ✅ Never expose API key in code
- ✅ Use environment variables
- ✅ Validate all inputs
- ✅ Limit request size
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Log errors securely

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `@google-cloud/generative-ai` | Gemini AI API client |
| `express` | Web framework |
| `cors` | CORS middleware |
| `dotenv` | Environment variables |
| `typescript` | Type safety |

## 🧪 Testing

### Using cURL
```bash
# Health check
curl http://localhost:5000/api/health

# Test analysis (need real base64 image)
curl -X POST http://localhost:5000/api/check-authenticity \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "data:image/jpeg;base64,YOUR_BASE64_HERE",
    "fileName": "test.jpg"
  }'
```

### Using Postman
1. Create new POST request
2. URL: `http://localhost:5000/api/check-authenticity`
3. Headers: `Content-Type: application/json`
4. Body:
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "fileName": "product.jpg"
}
```

## 📊 Performance

- **Image Processing**: 1-3 seconds
- **Gemini API Call**: 2-5 seconds
- **Total Response Time**: 3-8 seconds
- **Max Request Size**: 50MB

## 🐳 Docker

### Build Image
```bash
docker build -t prodcheck-ai-backend .
```

### Run Container
```bash
docker run -p 5000:5000 \
  -e GEMINI_API_KEY=your_key \
  -e NODE_ENV=production \
  prodcheck-ai-backend
```

## 🚀 Production Deployment

### Railway
1. Connect GitHub repo to Railway
2. Add environment variables
3. Set start command: `npm run build && npm start`
4. Deploy

### Render
1. Create new Web Service
2. Connect GitHub
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add environment variables

### Heroku
```bash
heroku create prodcheck-api
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

## 🔍 Logging

Backend logs important events:

```
🚀 Backend server running on http://localhost:5000
📡 CORS enabled for: http://localhost:5173
Analyzing product image: sneaker.jpg
Backend analysis received: { originalLink, similarityScore, ... }
Error in /api/check-authenticity: Invalid image format
```

## 📚 Additional Resources

- [Google Generative AI Docs](https://ai.google.dev/)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules
npm install
```

### "GEMINI_API_KEY is not configured"
- Check `.env` file exists
- Verify `GEMINI_API_KEY` is set
- Restart server after updating

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000
```

Or use different port:
```bash
PORT=5001 npm run dev
```

### "CORS error" from frontend
- Ensure `FRONTEND_URL` matches frontend origin
- Check frontend is running on configured port
- Verify browser is at correct URL

## 📋 Checklist for Production

- [ ] API key is secure (env variable only)
- [ ] CORS is configured for production domain
- [ ] Error logging is implemented
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced
- [ ] Health check endpoint is monitored
- [ ] Database connection is set up (if needed)
- [ ] Request validation is comprehensive
- [ ] Load testing has been performed
- [ ] Backup & disaster recovery plan

---

**Need help?** Check the main [QUICKSTART.md](../QUICKSTART.md) or [API_INTEGRATION.md](../API_INTEGRATION.md)
