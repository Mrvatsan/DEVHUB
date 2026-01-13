import { X, Search, ChevronDown, Copy, Globe, Check } from 'lucide-react';

/**
 * Mock data for people list
 * @type {Array<Object>}
 */
const mockPeople = [
    { id: 1, name: 'Pixie Dustin', email: 'pixi@dustin.013.com', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
    { id: 2, name: 'Adhithya Sharma', email: 'adhi@sharma.01.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
    { id: 3, name: 'Divya Shree', email: 'yashree@dv.01.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 4, name: 'John Meck', email: 'Mech@john.01.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100', badge: 'Not on this team' },
];

export default function ShareModal({ onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(17, 24, 39, 0.4)', // Dim dark overlay
            backdropFilter: 'blur(4px)', // Same blur
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                width: '600px',
                maxWidth: '90vw',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
            }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                            Share this project ID: <span style={{ color: '#3B82F6' }}>#125875</span>
                        </h2>
                        <p style={{ fontSize: '14px', color: '#6B7280' }}>
                            Invite your team to review collaborate on this project
                        </p>
                    </div>
                    <button onClick={onClose} style={{ padding: '0px', marginTop: '-4px' }}>
                        <X size={20} color="#374151" />
                    </button>
                </div>

                {/* Search Input */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                    <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Add team member"
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 42px',
                            borderRadius: '24px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px',
                            color: '#374151',
                            outline: 'none'
                        }}
                    />
                    <ChevronDown size={18} color="#9CA3AF" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* People List Header */}
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>People with access</h3>

                {/* People List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                    {mockPeople.map(person => (
                        <div key={person.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={person.avatar} alt={person.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{person.name}</span>
                                        {person.badge && (
                                            <span style={{
                                                backgroundColor: '#4B5563', // Dark gray
                                                color: '#FFFFFF',
                                                fontSize: '10px',
                                                fontWeight: '500',
                                                padding: '2px 8px',
                                                borderRadius: '12px'
                                            }}>
                                                {person.badge}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                        {person.email}
                                    </div>
                                </div>
                            </div>

                            {/* Role Dropdown */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#374151',
                                cursor: 'pointer'
                            }}>
                                <span>{person.role}</span>
                                <ChevronDown size={14} color="#6B7280" />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', margin: '0 -32px', marginBottom: '24px' }}></div> {/* Divider */}

                {/* General Access */}
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>General access</h3>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#F3F4F6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Globe size={20} color="#4B5563" />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>Anyone with the link</span>
                                    <ChevronDown size={16} color="#111827" />
                                </div>
                                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                    The project link is publicly viewable
                                </div>
                            </div>
                        </div>

                        {/* Viewer Role */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            <span>Can view</span>
                            <ChevronDown size={14} color="#6B7280" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid #9CA3AF',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827' // Dark text
                    }}>
                        <Copy size={16} />
                        Copy link
                    </button>

                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: '#1D4ED8', // Darker blue than typical link? Design looks like a solid primary blue
                            borderRadius: '8px',
                            padding: '10px 32px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#FFFFFF'
                        }}>
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
}
