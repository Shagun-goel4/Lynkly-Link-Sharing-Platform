#!/bin/bash
cd /Users/ShagunGoel/Desktop/Project

echo "Setting up backend..."
mkdir -p backend
cd backend
npm init -y
npm install express cors dotenv pg bcrypt jsonwebtoken
npm install -D nodemon prisma
npx prisma init
cd ..

echo "Setting up frontend..."
npx -y create-vite frontend --no-interactive --template react
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "Committing and pushing..."
cd ..
git add .
git commit -m "Phase 1: Project Initialization"
git push -u origin main
