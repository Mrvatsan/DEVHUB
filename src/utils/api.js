// API configuration
const API_BASE_URL = 'http://localhost:3001/api';

// API utility functions
export const api = {
  // Get all files
  async getFiles() {
    try {
      const response = await fetch(`${API_BASE_URL}/files`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  },

  // Get single file by ID
  async getFile(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  },

  // Upload files with metadata and progress tracking
  async uploadFiles(files, metadata, onProgress) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      
      // Add files
      files.forEach(file => {
        formData.append('files', file);
      });
      
      // Add metadata
      if (metadata.title) formData.append('title', metadata.title);
      if (metadata.description) formData.append('description', metadata.description);
      if (metadata.category) formData.append('category', metadata.category);
      if (metadata.visibility) formData.append('visibility', metadata.visibility);
      if (metadata.tags) formData.append('tags', metadata.tags);

      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (error) {
            reject(new Error('Invalid response from server'));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'));
      });

      xhr.open('POST', `${API_BASE_URL}/upload`);
      xhr.send(formData);
    });
  },

  // Delete file
  async deleteFile(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },

  // Get external view data
  async getExternalFiles() {
    try {
      const response = await fetch(`${API_BASE_URL}/external`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching external files:', error);
      throw error;
    }
  },

  // Get statistics
  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
};

// Export API base URL for file access
export const UPLOADS_URL = 'http://localhost:3001/uploads';
