import { Search, Filter, ArrowUpRight, FileText, RefreshCw, RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
// RefreshCw for the reload icon (approx)
// ArrowUpRight for the card arrow

const mockProjects = [
    { id: '#125875', name: 'Design Proposal', date: '25-05-2025', dateColor: 'green', user: 'Adhithya Sharma', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', ext: 'PDF' },
    { id: '#657483', name: 'Final Draft', date: '07-03-2025', dateColor: 'orange', user: 'Pixie Dustin', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', ext: 'DOC' },
    { id: '#103895', name: 'Collection', date: '23-03-2025', dateColor: 'orange', user: 'Divya Shree', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', ext: 'JPG' },
    { id: '#547648', name: 'Invoice', date: '30-01-2025', dateColor: 'red', user: 'Steve Harington', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', ext: 'XLS' }, // Approx avatar
    { id: '#804857', name: 'Landing Page', date: '04-01-2025', dateColor: 'green', user: 'Hamsy Joe', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', ext: 'HTML' },
];

export default function ExternalView() {
    useEffect(() => {
        console.log('ExternalView mounted');
    }, []);

    return (
        <div>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{
                        backgroundColor: '#E5E7EB',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827'
                    }}>
                        ID Document : 05
                    </div>
                    <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                        Previous Policy : 13
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Search - Reused strict style */}
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
                                outline: 'none',
                                backgroundColor: '#FFFFFF'
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

            {/* Grid Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px'
            }}>
                {mockProjects.map(proj => (
                    <ProjectCard key={proj.id} project={proj} />
                ))}
            </div>
        </div>
    )
}

function ProjectCard({ project }) {
    const getDateStyle = (color) => {
        const base = {
            padding: '4px 12px',
            borderRadius: '4px', // Squared off pill as per design image? Actually looks rounded-sq 4px or 6px.
            fontSize: '12px',
            fontWeight: '600'
        };
        switch (color) {
            case 'green': return { ...base, backgroundColor: '#DCFCE7', color: '#16A34A' };
            case 'orange': return { ...base, backgroundColor: '#FFEDD5', color: '#EA580C' };
            case 'red': return { ...base, backgroundColor: '#FEE2E2', color: '#EF4444' };
            default: return base;
        }
    };

    return (
        <div style={{
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '24px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>ID: {project.id}</span>
                <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#E5E7EB', // Gray square bg
                    borderRadius: '6px', // Slight radius
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ArrowUpRight size={18} color="#374151" />
                </div>
            </div>

            {/* Details Table-like Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#9CA3AF' }}>Name:</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{project.name}</span>
                </div>

                {/* Due date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#9CA3AF' }}>Due date:</span>
                    <span style={getDateStyle(project.dateColor)}>{project.date}</span>
                </div>

                {/* Assignee */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#9CA3AF' }}>Assignee:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={project.avatar} alt="avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{project.user}</span>
                    </div>
                </div>
            </div>

            {/* Attachments Section */}
            <div style={{ marginTop: 'auto' }}>
                <span style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px', display: 'block' }}>Attachments</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: '#E5E7EB',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FileText size={18} color="#4B5563" />
                        </div>
                        <span style={{ fontSize: '13px', color: '#4B5563', fontWeight: '500' }}>120 MB</span>
                    </div>

                    <div style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px', // Slightly rounded square like design
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                        {/* Refresh icon - used check circle in previous thought but design is refresh */}
                        <RefreshCcw size={16} color="#374151" />
                    </div>
                </div>
            </div>
        </div>
    )
}
