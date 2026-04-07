import React from 'react';
import { Building2, LayoutDashboard, LogOut } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick, variant }) => (
  <button
    onClick={onClick}
    className={`sidebar-nav-item ${active ? 'active' : ''} ${variant === 'danger' ? 'text-danger' : ''}`}
    style={variant === 'danger' ? { 
      marginTop: 'auto', 
      color: '#ef4444', 
      border: 'none', 
      background: 'transparent',
      fontWeight: '800',
      letterSpacing: '0.1em'
    } : {}}
  >
    <div className="icon-wrapper" style={variant === 'danger' ? { background: '#fee2e2', color: '#ef4444' } : {}}>
      <Icon size={18} />
    </div>
    <span style={variant === 'danger' ? { textTransform: 'uppercase', fontSize: '0.75rem' } : {}}>{label}</span>
  </button>
);

const Sidebar = ({ reports, activeReport, setActiveReport, onLogout, user }) => {
  const categories = [...new Set(reports.map(r => r.category))];
  
  return (
    <aside className="app-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* User Profile Section */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
            <img src={`https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=0b0c10&color=00acb1&bold=true`} alt="Avatar" style={{ width: '100%', height: '100%' }} />
        </div>
        <h5 className="font-bold text-foreground" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
          {user ? `${user.first_name} ${user.last_name}` : 'Admin Controller'}
        </h5>
        <p className="text-muted tracking-widest uppercase font-bold" style={{ fontSize: '0.65rem' }}>
          {user?.position || 'Accommodation Office'}
        </p>
      </div>

      <div className="sidebar-nav-container" style={{ flex: 1, overflowY: 'auto' }}>
        {categories.map(category => (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <p className="text-muted tracking-widest uppercase font-bold" style={{ fontSize: '0.65rem', padding: '0 1.5rem', marginBottom: '0.5rem' }}>
              {category}
            </p>
            <div>
              {reports
                .filter(r => r.category === category)
                .map((report) => (
                  <SidebarItem
                    key={report.id}
                    icon={report.icon}
                    label={report.label}
                    active={activeReport === report.id}
                    onClick={() => setActiveReport(report.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ padding: '1rem', borderTop: '1px solid hsla(var(--glass-border), 0.3)' }}>
        <SidebarItem 
          icon={LogOut} 
          label="Log Out" 
          onClick={onLogout} 
          variant="danger"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
