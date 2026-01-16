import { LayoutDashboard, FolderKanban, Library, Users, FileCode, Settings, HelpCircle, Search, Zap } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside style={{
            width: '280px',
            height: '100%',
            padding: '24px',
            borderRight: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent', // Transparent since image might have its own bg or fit better
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    <img src="/src/assets/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#111827', letterSpacing: '-0.5px' }}>DEVHUB</span>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '28px' }}>
                <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search..."
                    style={{
                        width: '100%',
                        padding: '10px 12px 10px 42px',
                        borderRadius: '20px', // More rounded
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#374151',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                    }}
                />
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <NavItem icon={<LayoutDashboard size={20} />} label="Home" />
                <NavItem icon={<FolderKanban size={20} />} label="Task" />
                <NavItem icon={<Library size={20} />} label="Content library" active />
                <NavItem icon={<Users size={20} />} label="Users" />
                <NavItem icon={<FileCode size={20} />} label="APIs" />
            </nav>

            {/* Bottom Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <NavItem icon={<Settings size={20} />} label="Settings" />
                <NavItem icon={<HelpCircle size={20} />} label="Help" />
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: active ? '#6366F1' : 'transparent', // Adjusted purple to match standard Indigo-500 likely used
            color: active ? '#FFFFFF' : '#4B5563',
            fontWeight: active ? '500' : '500', // Medium weight for all
            transition: 'background-color 0.2s'
        }}
            onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            {icon}
            <span style={{ fontSize: '15px' }}>{label}</span>
        </div>
    );
}
