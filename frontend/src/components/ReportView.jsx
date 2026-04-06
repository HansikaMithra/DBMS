import React from 'react';
import { Info, FileText, Download, UserPlus, MoreHorizontal, Edit2 } from 'lucide-react';

const ReportTable = ({ data, columns, idKey, onEditClick }) => {
  const [activeDropdown, setActiveDropdown] = React.useState(null);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) setActiveDropdown(null);
    else setActiveDropdown(index);
  };

  if (!data || data.length === 0) {
    return (
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <Info size={48} style={{ opacity: 0.5, color: 'hsl(var(--primary))' }} />
        </div>
        <p className="font-semibold" style={{ fontSize: '1.125rem', color: 'hsl(var(--foreground))' }}>No records found</p>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Try selecting a different report category</p>
      </div>
    );
  }

  return (
    <div className="report-table-container animate-slide-up">
      <table className="report-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
            {idKey && <th style={{ width: '60px', textAlign: 'center' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col, cIdx) => (
                <td key={cIdx}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {idKey && (
                <td style={{ position: 'relative' }}>
                  <button onClick={() => toggleDropdown(idx)} className="btn-ghost" style={{ padding: '0.25rem' }}>
                    <MoreHorizontal size={18} />
                  </button>
                  {activeDropdown === idx && (
                    <div style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', padding: '0.5rem', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
                       <button onClick={() => { onEditClick(row); setActiveDropdown(null); }} className="btn-ghost" style={{ justifyContent: 'flex-start', padding: '0.5rem 1rem', width: '120px' }}>
                          <Edit2 size={14} /> Update
                       </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="glass-card glass-card-hover stat-card-inner">
    <div className="stat-icon">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-muted uppercase tracking-widest font-bold" style={{ fontSize: '0.65rem' }}>{label}</p>
      <h3 className="font-bold text-foreground" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{value}</h3>
    </div>
  </div>
);

const ReportView = ({ activeReport, reports, data, loading, getColumns, onAddStudent, idKey, onEditClick, onSearch }) => {
  const currentReport = reports.find(r => r.id === activeReport) || reports[0];
  const columns = getColumns();
  const [paramValue, setParamValue] = React.useState('');

  React.useEffect(() => {
    setParamValue('');
  }, [activeReport]);

  return (
    <div className="animate-fade">
      {/* Stat Cards Row */}
      <div className="stat-cards-grid">
         <StatCard label="Total Records" value={data.length} icon={FileText} />
         <StatCard label="Active Now" value="98%" icon={Info} />
         <StatCard label="Alerts" value="0" icon={Info} />
         <StatCard label="System Status" value="Healthy" icon={Info} />
      </div>

      <header className="report-header">
        <div>
          <h2 className="font-bold gradient-text" style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>
            {currentReport.label}
          </h2>
          <p className="text-muted font-medium" style={{ fontSize: '0.875rem' }}>
            Project / Reports / {currentReport.label}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
             <Download size={16} />
             <span>Export</span>
          </button>
          <button onClick={onAddStudent} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
             <UserPlus size={16} />
             <span>Add Student</span>
          </button>
        </div>
      </header>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="glass" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid hsla(var(--glass-border), 0.3)', borderTop: 'none', borderLeft: 'none', borderRight: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 className="font-bold uppercase tracking-widest text-foreground" style={{ fontSize: '0.75rem' }}>Data Integrity View</h4>
          <span className="text-muted uppercase font-bold tracking-widest" style={{ fontSize: '0.65rem' }}>Last Sync: Just now</span>
        </div>
        
        {currentReport.requiresParam && (
          <div style={{ padding: '1.5rem', borderBottom: '1px solid hsla(var(--glass-border), 0.3)', display: 'flex', gap: '1rem', alignItems: 'flex-end', background: 'hsla(var(--background), 0.5)' }}>
            <div style={{ flex: 1, maxWidth: '400px' }}>
              <label className="form-label" style={{ marginBottom: '0.5rem' }}>{currentReport.paramLabel} Required</label>
              <input 
                type={currentReport.paramType}
                value={paramValue}
                onChange={(e) => setParamValue(e.target.value)}
                className="glass-input" 
                placeholder={`Search by ${currentReport.paramLabel}...`} 
                style={{ background: 'hsl(var(--background))' }}
              />
            </div>
            <button 
              onClick={() => onSearch(paramValue)}
              className="btn-primary" 
              disabled={!paramValue}
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Search
            </button>
          </div>
        )}
        
        <div>
          {loading ? (
            <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0', gap: '1rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '3px solid hsla(var(--glow-primary), 0.1)', borderTopColor: 'hsl(var(--primary))', animation: 'spin 1s linear infinite' }}></div>
              <p className="text-muted uppercase font-bold tracking-widest" style={{ fontSize: '0.65rem' }}>Syncing Database...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <ReportTable data={data} columns={columns} idKey={idKey} onEditClick={onEditClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportView;
