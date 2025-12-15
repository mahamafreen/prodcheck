# ProdCheck AI - Full Stack Setup Guide

This is a complete full-stack application for product authenticity verification using AI.

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Gemini API Key** ([Get one](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Setup (One-time)

**On Windows:**
```bash
setup.bat
```

**On macOS/Linux:**
```bash
bash setup.sh
```

Or **manually**:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Create .env files
cp backend/.env.example backend/.env
echo "VITE_API_URL=http://localhost:5000" > .env.local
```

### 2. Configuration

**Step 1:** Update `backend/.env`
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
prodcheck-ai/
├── src/                          # Frontend source
│   ├── App.tsx
│   ├── index.tsx
│   └── types.ts
├── components/                   # React components
│   ├── AuthPage.tsx
│   ├── UploadSection.tsx
│   ├── ResultsSection.tsx
│   └── ...
├── services/
│   └── geminiService.ts         # Backend API client
├── backend/                      # Node.js Express API
│   ├── src/
│   │   ├── index.ts            # Express server
│   │   ├── geminiService.ts    # Gemini AI integration
│   │   └── types.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                     # Backend config (create from .env.example)
├── package.json                 # Frontend config
├── vite.config.ts
└── .env.local                   # Frontend config (VITE_API_URL)
```

## 🔌 API Documentation

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Check Product Authenticity
```bash
curl -X POST http://localhost:5000/api/check-authenticity \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "data:image/jpeg;base64,...",
    "fileName": "product.jpg"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "originalLink": "https://official-store.com/product",
    "similarityScore": 92,
    "otherLinks": [
      {"url": "https://...", "trustRating": "high"},
      {"url": "https://...", "trustRating": "medium"},
      {"url": "https://...", "trustRating": "low"}
    ],
    "explanation": "Analysis details..."
  }
}
```

## 🐳 Docker Support

Run the entire application with Docker:

```bash
# Build and start both frontend and backend
docker-compose up

# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

## 🔧 Development Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
npm run dev      # Start with hot reload
npm run build    # Build TypeScript
npm start        # Run built JS
```

## 🧪 Testing the Application

1. **Start both servers** (see Quick Start section)
2. **Open** http://localhost:5173
3. **Login** with credentials (if auth required)
4. **Upload** a product image (JPG, PNG, or WEBP)
5. **Click** "Check Authenticity"
6. **View** AI analysis results

## 🐛 Troubleshooting

### Backend Connection Error
```
❌ Error: Cannot connect to backend server
```
- Ensure backend is running: `cd backend && npm run dev`
- Check `VITE_API_URL` in `.env.local`
- Verify backend is on `http://localhost:5000`

### Gemini API Key Issues
```
❌ Error: Gemini API key is not configured
```
- Update `backend/.env` with your API key
- Get one at: https://makersuite.google.com/app/apikey
- Restart backend after updating

### Port Already in Use
```bash
# Use different port for backend
cd backend
PORT=5001 npm run dev

# Update frontend .env.local
echo "VITE_API_URL=http://localhost:5001" > .env.local
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Same for backend
cd backend
rm -rf node_modules
npm install
```

## 📚 Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- TypeScript
- Google Generative AI (Gemini)

## 🔐 Security Notes

- Never commit `.env` or `.env.local` files
- Keep your Gemini API key private
- Use environment variables for sensitive data
- Enable CORS only for trusted origins in production

## 📝 License

This project is part of the AI Studio ecosystem.

## 💬 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify environment variables are set correctly
3. Check console logs in both frontend and backend
4. Ensure backend is running before using frontend

---

**Happy coding! 🚀**
