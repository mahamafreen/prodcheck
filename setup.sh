#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 ProdCheck AI - Full Stack Setup${NC}\n"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Install frontend dependencies
echo -e "\n${BLUE}📦 Installing frontend dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "\n${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

echo -e "\n${GREEN}✓ All dependencies installed!${NC}"

# Create backend .env if it doesn't exist
if [ ! -f backend/.env ]; then
    echo -e "\n${BLUE}📝 Creating backend/.env from template...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${BLUE}⚠️  Please update backend/.env with your GEMINI_API_KEY${NC}"
fi

# Create frontend .env if needed
if [ ! -f .env.local ]; then
    echo -e "\n${BLUE}📝 Creating .env.local...${NC}"
    echo "VITE_API_URL=http://localhost:5000" > .env.local
fi

echo -e "\n${GREEN}✓ Setup complete!${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo "1. Update backend/.env with your Gemini API key"
echo "2. Run in Terminal 1: npm run dev (frontend)"
echo "3. Run in Terminal 2: cd backend && npm run dev (backend)"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
