# Nexus Hub Backend Server

Backend API server for Nexus Hub file management system.

## Features

- ✅ File upload with progress tracking
- ✅ Metadata handling (title, description, category, visibility, tags)
- ✅ JSON-based data persistence
- ✅ External view API
- ✅ File listing and retrieval
- ✅ File deletion
- ✅ Statistics endpoint

## Tech Stack

- **Node.js** with Express
- **Multer** for file uploads
- **UUID** for unique IDs
- **CORS** enabled for frontend integration
- **JSON file storage** (simple, no database required)

## Installation

```bash
cd server
npm install
```

## Running the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

Server runs on **http://localhost:3001**

## API Endpoints

### Health Check
```
GET /api/health
```

### File Operations

**Get all files**
```
GET /api/files
Response: { success: true, files: [...] }
```

**Get file by ID**
```
GET /api/files/:id
Response: { success: true, file: {...} }
```

**Upload files with metadata**
```
POST /api/upload
Content-Type: multipart/form-data

Body:
- files: File[] (multiple files)
- title: string
- description: string
- category: string
- visibility: string
- tags: string (comma-separated)

Response: { success: true, files: [...] }
```

**Delete file**
```
DELETE /api/files/:id
Response: { success: true, message: "File deleted successfully" }
```

**Get external view data**
```
GET /api/external
Response: { success: true, files: [...] }
```

**Get statistics**
```
GET /api/stats
Response: { 
  success: true, 
  stats: { totalFiles, totalSize, publicFiles } 
}
```

## Data Storage

- **Files**: Stored in `/server/uploads/` directory
- **Metadata**: Stored in `/server/data/files.json`

## File Structure

```
server/
├── server.js          # Main server file
├── package.json       # Dependencies
├── uploads/           # Uploaded files (auto-created)
├── data/              # JSON database (auto-created)
│   └── files.json     # File metadata
└── README.md          # This file
```

## Integration with Frontend

The backend is designed to work seamlessly with the existing Nexus Hub frontend without any UI changes.

### CORS Configuration
CORS is enabled for all origins. In production, configure it to allow only your frontend domain.

### Upload Progress
The backend uses standard multipart/form-data uploads. Upload progress tracking should be implemented on the frontend using XMLHttpRequest or axios progress events.

## Environment Variables

None required. The server uses default configurations:
- Port: 3001
- Upload directory: ./uploads
- Database: ./data/files.json

## File Size Limits

- Maximum file size: 10GB per file
- Maximum files per upload: 10 files

## Mock Data

The backend automatically generates:
- Unique file IDs (UUID)
- Project IDs for external view
- Default user avatar
- File type categorization
- Date formatting
- Size formatting

## Next Steps

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Update frontend to connect to `http://localhost:3001`
4. Test file uploads and synchronization

## Security Notes

⚠️ This is a development server. For production:
- Add authentication & authorization
- Implement file validation
- Add rate limiting
- Configure CORS properly
- Use environment variables
- Add input sanitization
- Implement proper error handling
- Add logging system
