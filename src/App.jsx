import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import FileTable from './components/FileTable';
import UploadModal from './components/UploadModal';
import ShareModal from './components/ShareModal';
import ExternalView from './components/ExternalView';
import { useState, useEffect } from 'react';
import { api } from './utils/api';

// Creating placeholder components for now to allow imports to work
// We will implement them in the next steps.

function App() {
  const [modalView, setModalView] = useState(null); // 'upload' | 'share' | null
  const [currentView, setCurrentView] = useState('uploads'); // 'uploads' | 'external'
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch files from backend
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await api.getFiles();
      if (response.success) {
        setFiles(response.files);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load files on mount
  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle successful upload
  const handleUploadSuccess = () => {
    fetchFiles(); // Refresh file list
    setModalView('share'); // Show share modal
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#FFFFFF' }}>
      {modalView === 'upload' && (
        <UploadModal
          onClose={() => setModalView(null)}
          onNext={handleUploadSuccess}
        />
      )}
      {modalView === 'share' && (
        <ShareModal
          onClose={() => setModalView(null)}
        />
      )}
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header activeTab={currentView} onTabChange={setCurrentView} />
        <main style={{ flex: 1, padding: '32px', overflow: 'auto', backgroundColor: '#FFFFFF' }}>
          {currentView === 'uploads' ? (
            <>
              <UploadSection onUploadClick={() => setModalView('upload')} />
              <div style={{ height: '32px' }}></div> {/* Spacing */}
              <FileTable files={files} loading={loading} onDelete={fetchFiles} />
            </>
          ) : (
            <ExternalView />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
