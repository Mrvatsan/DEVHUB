import { Upload } from 'lucide-react';

export default function UploadSection({ onUploadClick }) {
    return (
        <div style={{
            border: '2px dashed #818CF8', // Indigo-400
            borderRadius: '12px',
            backgroundColor: '#EEF2FF', // Indigo-50
            padding: '48px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '40px' // Space before table
        }}>
            {/* Upload Icon Circle */}
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

            {/* Main Text */}
            <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1F2937', // Gray-800
                marginBottom: '8px'
            }}>
                Drag & drop files or click to upload
            </h3>

            {/* Subtext */}
            <p style={{
                fontSize: '14px',
                color: '#6B7280', // Gray-500
                marginBottom: '24px'
            }}>
                Supported formats: JPG, PNG, GIF, MP4, PDF, PSD, Sheets, Docs, Ai,...
            </p>

            {/* Button */}
            <button
                onClick={onUploadClick}
                style={{
                    backgroundColor: '#6366F1', // Indigo-500
                    color: '#FFFFFF',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                Choose Files
            </button>
        </div>
    );
}
