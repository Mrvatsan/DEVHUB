import { Upload, X, FileText, Check, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { api } from '../utils/api';

export default function UploadModal({ onClose, onNext }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        category: '',
        visibility: 'Private',
        tags: ''
    });
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newFiles = files.map(file => ({
                file,
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: formatFileSize(file.size),
                progress: 0,
                status: 'pending' // 'pending', 'uploading', 'completed', 'error'
            }));
            setSelectedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
    };

    const handleRemoveFile = (id) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select files to upload');
            return;
        }

        setUploading(true);
        
        try {
            const files = selectedFiles.map(f => f.file);
            
            // Set all files to uploading status immediately
            setSelectedFiles(prev => prev.map(f => ({ ...f, status: 'uploading', progress: 0 })));

            // Force a smooth animation even for fast local uploads
            const uploadPromise = api.uploadFiles(files, metadata, () => {});
            
            // Simulating progress smoothly over 2 seconds
            const startTime = Date.now();
            const animationDuration = 2000; 

            await new Promise(resolve => {
                const updateProgress = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(Math.floor((elapsed / animationDuration) * 100), 99);
                    
                    setSelectedFiles(prev => prev.map(f => {
                        if (f.status === 'uploading') {
                            return { ...f, progress };
                        }
                        return f;
                    }));

                    if (elapsed < animationDuration) {
                        requestAnimationFrame(updateProgress);
                    } else {
                        resolve();
                    }
                };
                requestAnimationFrame(updateProgress);
            });

            const response = await uploadPromise;

            if (response.success) {
                // Mark all files as completed
                setSelectedFiles(prev => prev.map(f => ({ ...f, status: 'completed', progress: 100 })));
                
                // Wait a moment to show completion, then proceed
                setTimeout(() => {
                    onNext();
                }, 1000);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed: ' + error.message);
            setSelectedFiles(prev => prev.map(f => ({ ...f, status: 'error' })));
        } finally {
            setUploading(false);
        }
    };
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(17, 24, 39, 0.4)', // Dim dark overlay
            backdropFilter: 'blur(4px)', // Slight blur
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px', // Looks quite round, 24px estimated
                width: '600px', // Estimated width
                maxWidth: '90vw',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // Deep shadow
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                {/* Header Section (Replicating Upload Section style but compacted) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#6366F1', // Indigo-500
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        color: '#FFFFFF'
                    }}>
                        <Upload size={24} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Drag & drop files or click to upload
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '16px', textAlign: 'center' }}>
                        Supported formats: JPG, PNG, GIF, MP4, PDF, PSD, Sheets, Docs, Do...
                    </p>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        multiple 
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            backgroundColor: '#6366F1',
                            color: '#FFFFFF',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                        Choose Files
                    </button>
                </div>

                {/* File List */}
                {selectedFiles.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                        {selectedFiles.map(file => (
                            <FileUploadRow 
                                key={file.id} 
                                file={file} 
                                onRemove={() => handleRemoveFile(file.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Content Details Form */}
                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Content Details</h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Title */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Title *</label>
                            <input 
                                type="text" 
                                placeholder="Enter content title" 
                                style={inputStyle}
                                value={metadata.title}
                                onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </div>

                        {/* Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Description</label>
                            <textarea 
                                placeholder="Add a brief description" 
                                style={{ ...inputStyle, height: '80px', resize: 'none', fontFamily: 'inherit' }}
                                value={metadata.description}
                                onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>

                        {/* Grid Row: Category & Visibility */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Category</label>
                                <div style={{ position: 'relative' }}>
                                    <select 
                                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                                        value={metadata.category}
                                        onChange={(e) => setMetadata(prev => ({ ...prev, category: e.target.value }))}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="Designer">Designer</option>
                                        <option value="Developer">Developer</option>
                                    </select>
                                    <ChevronDown size={16} color="#6B7280" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Visibility</label>
                                <div style={{ position: 'relative' }}>
                                    <select 
                                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                                        value={metadata.visibility}
                                        onChange={(e) => setMetadata(prev => ({ ...prev, visibility: e.target.value }))}
                                    >
                                        <option value="Private">Private</option>
                                        <option value="Public">Public</option>
                                    </select>
                                    <ChevronDown size={16} color="#6B7280" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Tags</label>
                            <input 
                                type="text" 
                                placeholder="Add tags" 
                                style={inputStyle}
                                value={metadata.tags}
                                onChange={(e) => setMetadata(prev => ({ ...prev, tags: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        onClick={onClose}
                        style={{ fontSize: '14px', fontWeight: '600', color: '#111827', padding: '10px 12px' }}
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151'
                        }}
                        disabled={uploading}
                        >
                            Save draft
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={uploading || selectedFiles.length === 0}
                            style={{
                                backgroundColor: uploading ? '#9CA3AF' : '#3B82F6',
                                borderRadius: '8px',
                                padding: '10px 24px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#FFFFFF',
                                cursor: uploading || selectedFiles.length === 0 ? 'not-allowed' : 'pointer'
                            }}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

// File Upload Row Component
function FileUploadRow({ file, onRemove }) {
    const isCompleted = file.status === 'completed';
    const isUploading = file.status === 'uploading';
    const isError = file.status === 'error';

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            border: '1px solid #E5E7EB',
            borderRadius: '16px', // Slightly rounder like the image
            backgroundColor: isCompleted ? '#F9FAFB' : '#FFFFFF',
            gap: '16px',
            position: 'relative'
        }}>
            {/* File Icon */}
            <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                backgroundColor: isCompleted ? '#ECFDF5' : '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
            }}>
                <FileText size={22} color={isCompleted ? '#10B981' : '#6B7280'} />
            </div>

            {/* Name and Size */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {file.name}
                </div>
                <div style={{ fontSize: '13px', color: '#9CA3AF' }}>{file.size}</div>
            </div>

            {/* Status Section (Progress or Completed) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '220px' }}>
                {isCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', color: '#111827', fontWeight: '600', fontSize: '14px' }}>
                        <div style={{ 
                            backgroundColor: '#16A34A', 
                            borderRadius: '50%', 
                            width: '20px', 
                            height: '20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            <Check size={14} color="#FFFFFF" strokeWidth={3} />
                        </div>
                        <span>Completed</span>
                    </div>
                ) : isUploading ? (
                    <div style={{ width: '100%' }}>
                        <div style={{ 
                            width: '100%', 
                            height: '6px', 
                            backgroundColor: '#F3F4F6', 
                            borderRadius: '3px', 
                            overflow: 'hidden', 
                            marginBottom: '6px'
                        }}>
                            <div style={{
                                width: `${file.progress}%`,
                                height: '100%',
                                backgroundColor: '#10B981', // Green Line as requested
                                borderRadius: '3px',
                                transition: 'width 0.2s linear'
                            }}></div>
                        </div>
                        <div style={{ 
                            fontSize: '12px', 
                            fontWeight: '500', 
                            color: '#6B7280' 
                        }}>
                            Uploading... {file.progress}%
                        </div>
                    </div>
                ) : isError ? (
                    <div style={{ textAlign: 'right', fontSize: '14px', color: '#EF4444', fontWeight: '600' }}>Failed</div>
                ) : null}
            </div>

            {/* Remove Button */}
            <div style={{ marginLeft: '12px' }}>
                <FolderXBtn onClick={onRemove} />
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    '::placeholder': { color: '#9CA3AF' }
};

function FolderXBtn({ onClick }) {
    return (
        <button 
            onClick={onClick}
            style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
            }}
        >
            <X size={14} color="#6B7280" />
        </button>
    );
}
