@echo off
REM Colors and formatting
setlocal enabledelayedexpansion

echo.
echo 🚀 ProdCheck AI - Full Stack Setup
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js found: %NODE_VERSION%

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    cd ..
    exit /b 1
)
cd ..

echo.
echo ✓ All dependencies installed!

REM Create backend .env if it doesn't exist
if not exist backend\.env (
    echo.
    echo 📝 Creating backend\.env from template...
    copy backend\.env.example backend\.env
    echo ⚠️  Please update backend\.env with your GEMINI_API_KEY
)

REM Create frontend .env if needed
if not exist .env.local (
    echo.
    echo 📝 Creating .env.local...
    echo VITE_API_URL=http://localhost:5000 > .env.local
)

echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your Gemini API key
echo 2. Run in PowerShell 1: npm run dev (frontend)
echo 3. Run in PowerShell 2: cd backend; npm run dev (backend)
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo.
pause
