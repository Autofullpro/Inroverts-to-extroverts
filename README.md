# Inroverts to Extroverts — Websus Learning

A frontend-first monorepo for "Websus Learning" — a modern chat app to help introverts practice speaking with AI.

Structure:
- frontend/  — React + Vite + Tailwind + Framer Motion
- backend/   — Express backend proxy for AI (Gemini, DeepSeek, HuggingFace)

Important: do NOT commit real API keys. Use backend/.env (local) and backend/.env.example as a template.

Quick start (local):

1) Backend
   cd backend
   npm install
   cp .env.example .env
   # fill .env locally with your API keys
   npm run dev

2) Frontend
   cd frontend
   npm install
   npm run dev

Open http://localhost:5173 (frontend) and ensure backend runs on http://localhost:4000 (vite proxy configured).
