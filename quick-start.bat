@echo off
echo 🚀 Travel Globetrotter Quick Start Script
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version:
npm --version
echo.

REM Backend setup
echo 🔧 Setting up Backend...
cd backend

REM Check if .env exists
if not exist .env (
    echo ⚠️  .env file not found. Please create it with your MongoDB Atlas credentials.
    echo    See env-template.txt for the required format.
    echo.
    echo    Required content:
    echo    PORT=4000
    echo    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel_globetrotter?retryWrites=true^&w=majority
    echo    NODE_ENV=development
    echo.
    echo    After creating .env, run this script again.
    pause
    exit /b 1
)

echo ✅ .env file found

REM Install backend dependencies
echo 📦 Installing backend dependencies...
call npm install

REM Test MongoDB connection
echo 🔍 Testing MongoDB connection...
call npm run test:models

REM Seed database
echo 🌱 Seeding database...
call npm run seed

REM Start backend in background
echo 🚀 Starting backend server...
start "Backend Server" cmd /k "npm run dev"

REM Wait for backend to start
echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

REM Test backend health
echo 🔍 Testing backend health...
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:4000/api/health' -UseBasicParsing | Out-Null; Write-Host '✅ Backend is running on http://localhost:4000' } catch { Write-Host '❌ Backend failed to start' }"

echo.

REM Frontend setup
echo 🔧 Setting up Frontend...
cd ..\frontend

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Start frontend in background
echo 🚀 Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

REM Wait for frontend to start
echo ⏳ Waiting for frontend to start...
timeout /t 5 /nobreak >nul

REM Test frontend
echo 🔍 Testing frontend...
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing | Out-Null; Write-Host '✅ Frontend is running on http://localhost:3000' } catch { Write-Host '❌ Frontend failed to start' }"

echo.
echo 🎉 Travel Globetrotter is now running!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:4000
echo 📊 MongoDB:  Check your MongoDB Atlas dashboard
echo.
echo Both servers are now running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
