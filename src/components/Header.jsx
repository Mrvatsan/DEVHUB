import { Share, Upload, Folder, Monitor } from 'lucide-react';

/**
 * Header component for project navigation.
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ('uploads' | 'external')
 * @param {function} props.onTabChange - Callback for tab change
 */
export default function Header({ activeTab, onTabChange }) {
    return (
        <header style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF'
        }}>

            <div style={{ display: 'flex', gap: '32px', marginLeft: '40px' }}>
                <HeaderTab icon={<Folder size={18} />} label="Projects" />
                <HeaderTab
                    icon={<Upload size={18} />}
                    label="Uploads"
                    active={activeTab === 'uploads'}
                    onClick={() => onTabChange && onTabChange('uploads')}
                />
                <HeaderTab
                    icon={<Monitor size={18} />}
                    label="External view"
                    active={activeTab === 'external'}
                    onClick={() => onTabChange && onTabChange('external')}
                />
            </div>

            {/* Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Suriya Sharma</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>suriyasharma6234@gmail.com</div>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
            </div>
        </header>
    );
}

function HeaderTab({ icon, label, active = false, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '80px', // Full height to accommodate border bottom
                borderBottom: active ? '2px solid #4F46E5' : '2px solid transparent',
                color: active ? '#111827' : '#6B7280',
                cursor: 'pointer',
                fontWeight: active ? '600' : '500',
                marginTop: '1px' // adjust for border
            }}>
            {/* Icon color check: Active seems dark, inactive gray */}
            <span style={{ color: active ? '#4F46E5' : '#9CA3AF' }}>{icon}</span>
            <span style={{ fontSize: '14px' }}>{label}</span>
        </div>
    )
}
