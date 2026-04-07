import React from 'react';
import Sidebar from './Sidebar';
import { Search, Bell, Settings } from 'lucide-react';

const Layout = ({ children, reports, activeReport, setActiveReport, onLogout, user }) => {
  const currentReport = reports.find(r => r.id === activeReport) || reports[0];

  return (
    <div className="app-container">
      <Sidebar 
        reports={reports} 
        activeReport={activeReport} 
        setActiveReport={setActiveReport} 
        onLogout={onLogout}
        user={user}
      />
      
      <main className="app-main animate-fade">
        {/* Top Navbar */}
        <header className="top-navbar">
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', letterSpacing: '0.1em' }}>Dashboard</span>
              <span className="text-muted">/</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'hsl(var(--foreground))', letterSpacing: '0.1em' }}>{currentReport.category}</span>
              <span className="text-muted">/</span>
              <span className="gradient-text uppercase tracking-widest font-bold" style={{ fontSize: '0.75rem' }}>{currentReport.label}</span>
           </div>
           <div className="nav-actions">
              {user && (
                <div style={{ marginRight: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRight: '1px solid hsla(var(--glass-border), 0.3)', paddingRight: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0d2a4a' }}>{user.first_name} {user.last_name}</div>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>{user.position}</div>
                  </div>
                </div>
              )}
              <button className="nav-icon-btn"><Search size={18} /></button>
              <button className="nav-icon-btn">
                 <Bell size={18} />
                 <span className="badge"></span>
              </button>
              <button className="nav-icon-btn"><Settings size={18} /></button>
           </div>
        </header>

        <div className="main-content">
          {children}
          
          <footer className="animate-fade" style={{ paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid hsla(var(--glass-border), 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3rem' }}>
             <p>© 2026 University Accommodation DBMS · Confidential</p>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='hsl(var(--foreground))'} onMouseOut={e=>e.target.style.color=''}>Privacy Policy</span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='hsl(var(--foreground))'} onMouseOut={e=>e.target.style.color=''}>System Logs</span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
             </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Layout;
