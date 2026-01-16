import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database file path (simple JSON storage)
const dbPath = path.join(dataDir, 'files.json');

const INITIAL_MOCK_FILES = [
  { id: 'mock-1', projectId: '#125875', name: 'Design Proposal.pdf', size: '120 mb', date: '20-05-2025', uploadDate: '2025-05-20T10:00:00Z', user: 'Adhithya Sharma', handle: 'adhithya@shama.01', type: 'pdf', extension: 'PDF', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', isMock: true },
  { id: 'mock-2', projectId: '#657483', name: 'Final draft.doc', size: '73.04 mb', date: '07-03-2025', uploadDate: '2025-03-07T10:00:00Z', user: 'Dhivya shree', handle: 'yashree.divi@18', type: 'doc', extension: 'DOC', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', isMock: true },
  { id: 'mock-3', projectId: '#103895', name: 'Collections.jpg', size: '3.2 gb', date: '23-03-2025', uploadDate: '2025-03-23T10:00:00Z', user: 'Pixie Dustin', handle: 'dustin.pix@08', type: 'img', extension: 'JPG', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', isMock: true },
  { id: 'mock-4', projectId: '#804857', name: 'Animation.mov', size: '4.9 gb', date: '12-03-2025', uploadDate: '2025-03-12T10:00:00Z', user: 'Hamsy Joe', handle: 'hamsy.joe@015', type: 'mov', extension: 'MOV', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', isMock: true },
  { id: 'mock-5', projectId: '#547648', name: 'Invoice.excl', size: '60.31 mb', date: '30-01-2025', uploadDate: '2025-01-30T10:00:00Z', user: 'Steve King', handle: 'steve.king@098', type: 'xls', extension: 'XLS', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', isMock: true },
  { id: 'mock-6', projectId: '#904321', name: 'Landing page.http', size: '158 kb', date: '04-01-2025', uploadDate: '2025-01-04T10:00:00Z', user: 'Joaseph', handle: 'joseph.phin@035', type: 'code', extension: 'HTML', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', isMock: true },
];

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath) || fs.readFileSync(dbPath, 'utf8').trim() === '' || JSON.parse(fs.readFileSync(dbPath, 'utf8')).files.length === 0) {
  fs.writeFileSync(dbPath, JSON.stringify({ files: INITIAL_MOCK_FILES }, null, 2));
}

// Helper function to read database
function readDB() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { files: [] };
  }
}

// Helper function to write database
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024 // 10GB max file size
  }
});

// Helper function to get file extension
function getFileExtension(filename) {
  return path.extname(filename).substring(1).toLowerCase();
}

// Helper function to determine file type category
function getFileType(filename) {
  const ext = getFileExtension(filename).toLowerCase();
  const typeMap = {
    pdf: 'pdf',
    doc: 'doc',
    docx: 'doc',
    jpg: 'img',
    jpeg: 'img',
    png: 'img',
    gif: 'img',
    mp4: 'mov',
    mov: 'mov',
    avi: 'mov',
    xls: 'xls',
    xlsx: 'xls',
    csv: 'xls',
    html: 'code',
    htm: 'code',
    css: 'code',
    js: 'code',
    json: 'code',
    psd: 'psd'
  };
  return typeMap[ext] || 'file';
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = (bytes / Math.pow(k, i)).toFixed(2);
  return `${size} ${sizes[i]}`.toLowerCase();
}

// Helper function to format date
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// API Routes

// GET /api/files - Get all uploaded files
app.get('/api/files', (req, res) => {
  try {
    const db = readDB();
    // Sort by upload date descending (newest first)
    const sortedFiles = [...db.files].sort((a, b) => 
      new Date(b.uploadDate) - new Date(a.uploadDate)
    );
    res.json({ success: true, files: sortedFiles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/files/:id - Get single file details
app.get('/api/files/:id', (req, res) => {
  try {
    const db = readDB();
    const file = db.files.find(f => f.id === req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/upload - Upload files with metadata
app.post('/api/upload', upload.array('files', 10), (req, res) => {
  try {
    const { title, description, category, visibility, tags } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const db = readDB();
    const uploadedFiles = [];

    req.files.forEach(file => {
      const fileData = {
        id: uuidv4(),
        projectId: `#${Math.floor(100000 + Math.random() * 900000)}`, // Persistent project ID
        name: title || file.originalname,
        originalName: file.originalname,
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        date: formatDate(new Date()),
        uploadDate: new Date().toISOString(),
        user: 'Current User', // Mock user for now
        handle: 'user@demo.01',
        type: getFileType(file.originalname),
        extension: getFileExtension(file.originalname).toUpperCase(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', // Default avatar
        path: file.path,
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        metadata: {
          title: title || file.originalname,
          description: description || '',
          category: category || '',
          visibility: visibility || 'Private',
          tags: tags ? tags.split(',').map(t => t.trim()) : []
        }
      };

      db.files.push(fileData);
      uploadedFiles.push(fileData);
    });

    writeDB(db);

    res.json({ 
      success: true, 
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/files/:id - Delete a file
app.delete('/api/files/:id', (req, res) => {
  try {
    const db = readDB();
    const fileIndex = db.files.findIndex(f => f.id === req.params.id);
    
    if (fileIndex === -1) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    const file = db.files[fileIndex];
    
    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Remove from database
    db.files.splice(fileIndex, 1);
    writeDB(db);

    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/external - Get files for external view
app.get('/api/external', (req, res) => {
  try {
    const db = readDB();
    // Sort by upload date descending
    const sortedFiles = [...db.files].sort((a, b) => 
      new Date(b.uploadDate) - new Date(a.uploadDate)
    );
    
    const externalFiles = sortedFiles.map(file => ({
      id: file.projectId || `#${Math.floor(100000 + Math.random() * 900000)}`,
      name: file.metadata?.title || file.name,
      date: file.date,
      dateColor: getDateColor(file.uploadDate),
      user: file.user,
      avatar: file.avatar,
      ext: file.extension,
      fileId: file.id
    }));
    
    res.json({ success: true, files: externalFiles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper function to determine date color based on age
function getDateColor(dateString) {
  const uploadDate = new Date(dateString);
  const now = new Date();
  const daysDiff = Math.floor((now - uploadDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 7) return 'green';
  if (daysDiff < 30) return 'orange';
  return 'red';
}

// GET /api/stats - Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const db = readDB();
    res.json({
      success: true,
      stats: {
        totalFiles: db.files.length,
        totalSize: db.files.reduce((acc, file) => acc + file.sizeBytes, 0),
        publicFiles: db.files.filter(f => f.metadata?.visibility === 'Public').length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nexus Hub Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload directory: ${uploadDir}`);
  console.log(`💾 Database file: ${dbPath}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  /api/health       - Health check`);
  console.log(`   GET  /api/files        - Get all files`);
  console.log(`   GET  /api/files/:id    - Get file by ID`);
  console.log(`   POST /api/upload       - Upload files with metadata`);
  console.log(`   DELETE /api/files/:id  - Delete file`);
  console.log(`   GET  /api/external     - Get external view data`);
  console.log(`   GET  /api/stats        - Get statistics`);
});
