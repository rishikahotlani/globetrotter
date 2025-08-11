import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Travel Globetrotter Setup Verification');
console.log('==========================================');
console.log('');

// Check if we're in the right directory
const currentDir = process.cwd();
const hasBackend = fs.existsSync(path.join(currentDir, 'backend'));
const hasFrontend = fs.existsSync(path.join(currentDir, 'frontend'));

if (!hasBackend || !hasFrontend) {
  console.log('❌ Please run this script from the root travel_globetrotter directory');
  console.log('   Current directory:', currentDir);
  process.exit(1);
}

console.log('✅ Project structure verified');
console.log('');

// Check Node.js version
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion >= 18) {
    console.log(`✅ Node.js version: ${nodeVersion} (18+ required)`);
  } else {
    console.log(`❌ Node.js version: ${nodeVersion} (18+ required)`);
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Node.js not found');
  process.exit(1);
}

// Check npm
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.log('❌ npm not found');
  process.exit(1);
}

console.log('');

// Check backend setup
console.log('🔧 Checking Backend Setup...');
const backendDir = path.join(currentDir, 'backend');
const backendEnvPath = path.join(backendDir, '.env');

if (!fs.existsSync(backendEnvPath)) {
  console.log('❌ Backend .env file not found');
  console.log('   Please create backend/.env with your MongoDB Atlas credentials');
  console.log('   See backend/env-template.txt for the required format');
  process.exit(1);
}

console.log('✅ Backend .env file found');

// Check if backend dependencies are installed
const backendNodeModules = path.join(backendDir, 'node_modules');
if (!fs.existsSync(backendNodeModules)) {
  console.log('⚠️  Backend dependencies not installed');
  console.log('   Run: cd backend && npm install');
} else {
  console.log('✅ Backend dependencies installed');
}

console.log('');

// Check frontend setup
console.log('🔧 Checking Frontend Setup...');
const frontendDir = path.join(currentDir, 'frontend');
const frontendNodeModules = path.join(frontendDir, 'node_modules');

if (!fs.existsSync(frontendNodeModules)) {
  console.log('⚠️  Frontend dependencies not installed');
  console.log('   Run: cd frontend && npm install');
} else {
  console.log('✅ Frontend dependencies installed');
}

console.log('');

// Summary
console.log('📋 Setup Summary:');
console.log('==================');
console.log('✅ Project structure: Complete');
console.log('✅ Node.js: Version 18+');
console.log('✅ npm: Available');
console.log('✅ Backend .env: Configured');
console.log(`${fs.existsSync(backendNodeModules) ? '✅' : '⚠️ '} Backend dependencies: ${fs.existsSync(backendNodeModules) ? 'Installed' : 'Not installed'}`);
console.log(`${fs.existsSync(frontendNodeModules) ? '✅' : '⚠️ '} Frontend dependencies: ${fs.existsSync(frontendNodeModules) ? 'Installed' : 'Not installed'}`);

console.log('');

if (!fs.existsSync(backendNodeModules) || !fs.existsSync(frontendNodeModules)) {
  console.log('🚀 Next Steps:');
  console.log('   1. Install backend dependencies: cd backend && npm install');
  console.log('   2. Install frontend dependencies: cd frontend && npm install');
  console.log('   3. Test MongoDB connection: cd backend && npm run test:models');
  console.log('   4. Seed database: cd backend && npm run seed');
  console.log('   5. Start backend: cd backend && npm run dev');
  console.log('   6. Start frontend: cd frontend && npm run dev');
} else {
  console.log('🎉 Setup Complete!');
  console.log('');
  console.log('🚀 To start the application:');
  console.log('   1. Start backend: cd backend && npm run dev');
  console.log('   2. Start frontend: cd frontend && npm run dev');
  console.log('');
  console.log('🧪 To test everything:');
  console.log('   1. Test backend: cd backend && npm run test:api');
  console.log('   2. Visit frontend: http://localhost:3000');
  console.log('   3. Check backend: http://localhost:4000/api/health');
}

console.log('');
console.log('📚 For detailed setup instructions, see: setup-complete-app.md');
console.log('⚡ For quick start, use: quick-start.bat (Windows) or ./quick-start.sh (Mac/Linux)');
