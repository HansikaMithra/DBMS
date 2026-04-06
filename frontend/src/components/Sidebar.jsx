import React from 'react';
import { Building2, LayoutDashboard } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`sidebar-nav-item ${active ? 'active' : ''}`}
  >
    <div className="icon-wrapper">
      <Icon size={18} />
    </div>
    <span>{label}</span>
  </button>
);

const Sidebar = ({ reports, activeReport, setActiveReport }) => {
  const categories = [...new Set(reports.map(r => r.category))];
  
  return (
    <aside className="app-sidebar">
      {/* User Profile Section */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
            <img src="https://ui-avatars.com/api/?name=Admin+Controller&background=0b0c10&color=9b51e0" alt="Avatar" style={{ width: '100%', height: '100%' }} />
        </div>
        <h5 className="font-bold text-foreground" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Admin Controller</h5>
        <p className="text-muted tracking-widest uppercase font-bold" style={{ fontSize: '0.65rem' }}>Accommodation Office</p>
      </div>

      <div className="sidebar-nav-container">
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
      
      <div className="glass" style={{ padding: '1rem', borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
           <span className="text-muted uppercase font-bold tracking-widest" style={{ fontSize: '0.65rem' }}>System Load</span>
           <span className="text-primary font-bold uppercase" style={{ fontSize: '0.65rem' }}>Optimal</span>
        </div>
        <div style={{ width: '100%', background: 'hsla(var(--glass-border), 0.3)', borderRadius: '9999px', height: '4px' }}>
           <div className="gradient-bg" style={{ height: '4px', borderRadius: '9999px', width: '35%', boxShadow: '0 0 10px hsla(var(--glow-primary), 0.5)' }}></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
