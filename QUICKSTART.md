# Nexus Hub - Quick Start Guide

## 🚀 Starting the Application

### Option 1: Using Batch File (Windows)
Simply double-click `start-backend.bat` to start the backend server.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd d:\DEVHUB\nexus-hub\server
node server.js
```
✅ Backend runs on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd d:\DEVHUB\nexus-hub
npm run dev
```
✅ Frontend runs on: http://localhost:5173

## 📋 Quick Test

1. Open http://localhost:5173 in your browser
2. Click "Upload" button
3. Select files and fill metadata
4. Click "Upload" and watch progress
5. Files appear automatically in the Content Library

## 🔍 Verify Backend is Running

Visit: http://localhost:3001/api/health

You should see:
```json
{
  "status": "ok",
  "timestamp": "2026-01-16T..."
}
```

## 📚 Full Documentation

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete details.

## ⚠️ Important

- Both backend (3001) and frontend (5173) must be running
- Backend must start before using upload features
- Files are stored in `server/uploads/`
- Metadata is in `server/data/files.json`

---

**Current Status:**
- ✅ Backend: Running on http://localhost:3001
- ✅ Frontend: Running on http://localhost:5173
- ✅ Integration: Complete and tested
