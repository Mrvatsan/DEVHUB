import { FileText, Image, Video, FileSpreadsheet, FileCode, Trash2, Edit2, Search, Filter, CheckCircle2 } from 'lucide-react';

export default function FileTable({ files = [], loading = false, onDelete }) {
    const totalFiles = files.length;
    return (
        <div style={{
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            padding: '24px'
        }}>
            {/* Table Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>Attached File</h2>
                        <span style={{
                            backgroundColor: '#EEF2FF',
                            color: '#6366F1',
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '2px 8px',
                            borderRadius: '12px'
                        }}>
                            {totalFiles} Total
                        </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '4px' }}>
                        {loading ? 'Loading...' : 'Here you can explore your uploaded files'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                width: '240px',
                                padding: '10px 12px 10px 40px',
                                borderRadius: '24px',
                                border: '1px solid #E5E7EB',
                                fontSize: '14px',
                                color: '#374151',
                                outline: 'none'
                            }}
                        />
                    </div>
                    {/* Filter Button */}
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#6366F1',
                        color: '#FFFFFF',
                        padding: '10px 20px',
                        borderRadius: '24px',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Table */}
            <div style={{ width: '100%' }}>
                {/* Header Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 2fr 1fr 1fr 1.5fr 1fr',
                    padding: '12px 0',
                    borderBottom: '1px solid #E5E7EB',
                    fontSize: '12px', // Slightly smaller for headers?? Design looks typical 13-14px.
                    fontWeight: '600',
                    color: '#111827'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CheckCircle2 size={20} color="#6366F1" fill="#EEF2FF" /> {/* Checkbox placeholder */}
                    </div>
                    <div>File name</div>
                    <div>File size</div>
                    <div>Last modified</div>
                    <div>Updated by</div>
                    <div style={{ textAlign: 'right' }}>Actions</div>
                </div>

                {/* Rows */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                        Loading files...
                    </div>
                ) : files.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                        No files uploaded yet. Upload your first file to get started!
                    </div>
                ) : (
                    files.map((file) => (
                        <FileRow key={file.id} file={file} onDelete={onDelete} />
                    ))
                )}
            </div>
        </div>
    );
}

function FileRow({ file, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${file.name}?`)) {
            try {
                const { api } = await import('../utils/api');
                const response = await api.deleteFile(file.id);
                if (response.success) {
                    onDelete(); // Refresh the file list
                } else {
                    alert('Failed to delete file');
                }
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Failed to delete file: ' + error.message);
            }
        }
    };

    // Helper for icons
    const getIcon = (type) => {
        const style = { padding: '8px', borderRadius: '50%', display: 'inline-flex' };
        switch (type) {
            case 'pdf': return <div style={{ ...style, backgroundColor: '#F3F4F6' }}><FileText size={20} color="#6B7280" /></div>; // Need to match design icons better
            case 'doc': return <div style={{ ...style, backgroundColor: '#FEF2F2' }}><FileText size={20} color="#EF4444" /></div>;
            case 'img': return <div style={{ ...style, backgroundColor: '#FFFBEB' }}><Image size={20} color="#F59E0B" /></div>;
            case 'mov': return <div style={{ ...style, backgroundColor: '#EEF2FF' }}><Video size={20} color="#6366F1" /></div>;
            case 'xls': return <div style={{ ...style, backgroundColor: '#ECFDF5' }}><FileSpreadsheet size={20} color="#10B981" /></div>;
            case 'code': return <div style={{ ...style, backgroundColor: '#ECFDF5' }}><FileCode size={20} color="#10B981" /></div>;
            default: return <FileText />;
        }
    };

    // Design icons have specific circle backgrounds. I am approximating the colors based on file type standard.
    // PDF: Gray, Doc: Red, JPG: Yellow, MOV: Blue, XLS: Green, HTML: Green.

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 2fr 1fr 1fr 1.5fr 1fr',
            padding: '16px 0',
            borderBottom: '1px solid #F3F4F6',
            alignItems: 'center',
            fontSize: '14px',
            color: '#374151'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #D1D5DB', // Inactive checkbox style
                    cursor: 'pointer'
                }}></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {getIcon(file.type)}
                <span style={{ fontWeight: '600', color: '#111827' }}>{file.name}</span>
            </div>

            <div style={{ color: '#6B7280' }}>{file.size}</div>

            <div style={{ color: '#6B7280' }}>{file.date}</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={file.avatar} alt={file.user} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{file.user}</span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{file.handle}</span>
                </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <button 
                    onClick={handleDelete}
                    style={{ color: '#EF4444', fontWeight: '600', fontSize: '14px' }}
                >
                    Delete
                </button>
                <button style={{ color: '#3B82F6', fontWeight: '600', fontSize: '14px' }}>Edit</button>
            </div>
        </div>
    )
}
