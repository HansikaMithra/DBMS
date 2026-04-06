import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart3, 
  Users, 
  Home, 
  FileText, 
  ClipboardCheck, 
  AlertCircle, 
  UserPlus, 
  DollarSign, 
  Calendar,
  Building2,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-indigo-600/20 text-indigo-400 border-l-4 border-indigo-500' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
    style={{ borderTopLeftRadius: active ? '0' : '0.5rem', borderBottomLeftRadius: active ? '0' : '0.5rem' }}
  >
    <Icon size={18} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const ReportTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Info size={48} className="mb-4 opacity-20" />
        <p>No records found for this report.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              {columns.map((col, cIdx) => (
                <td key={cIdx}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [activeReport, setActiveReport] = useState('hall-managers');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});

  const reports = [
    { id: 'hall-managers', label: 'Hall Managers', icon: Building2, endpoint: '/api/reports/hall-managers', title: 'Residence Hall Managers & Contacts' },
    { id: 'student-leases', label: 'Student Leases', icon: FileText, endpoint: '/api/reports/student-leases', title: 'Student Lease Agreements' },
    { id: 'summer-leases', label: 'Summer Leases', icon: Calendar, endpoint: '/api/reports/summer-leases', title: 'Leases overlapping Summer Semester' },
    { id: 'waiting-list', label: 'Waiting List', icon: UserPlus, endpoint: '/api/reports/waiting-list', title: 'Students on Waiting List' },
    { id: 'unsatisfactory-inspections', label: 'Failed Inspections', icon: AlertCircle, endpoint: '/api/reports/unsatisfactory-inspections', title: 'Unsatisfactory Property Inspections' },
    { id: 'student-categories', label: 'Student Tally', icon: BarChart3, endpoint: '/api/reports/student-categories', title: 'Student Counts by category' },
    { id: 'missing-next-of-kin', label: 'Missing Kin Info', icon: Users, endpoint: '/api/reports/missing-next-of-kin', title: 'Students without Next-of-Kin details' },
    { id: 'rent-stats', label: 'Rent Statistics', icon: TrendingDown, endpoint: '/api/reports/rent-stats', title: 'Market Rent overview (Halls)' },
    { id: 'hall-places', label: 'Hall Capacity', icon: Home, endpoint: '/api/reports/hall-places', title: 'Available places per Residence Hall' },
    { id: 'senior-staff', label: 'Senior Staff', icon: Users, endpoint: '/api/reports/senior-staff', title: 'Residence Staff over 60 years old' }
  ];

  const fetchReportData = async (reportId) => {
    setLoading(true);
    try {
      const report = reports.find(r => r.id === reportId);
      const res = await axios.get(report.endpoint);
      setData(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData(activeReport);
  }, [activeReport]);

  const getColumns = () => {
    switch (activeReport) {
      case 'hall-managers':
        return [
          { header: 'Hall Name', key: 'hall_name' },
          { header: 'Manager', key: 'name', render: (_, row) => `${row.first_name} ${row.last_name}` },
          { header: 'Telephone', key: 'telephone' }
        ];
      case 'student-leases':
        return [
          { header: 'Banner #', key: 'banner_number' },
          { header: 'Student', key: 'name', render: (_, row) => `${row.first_name} ${row.last_name}` },
          { header: 'Lease #', key: 'lease_number' },
          { header: 'Start Date', key: 'enter_date' },
          { header: 'End Date', key: 'leave_date' },
          { header: 'Semesters', key: 'duration_semesters' }
        ];
      case 'student-categories':
        return [
          { header: 'Category', key: 'category' },
          { header: 'Count', key: 'student_count' }
        ];
      case 'waiting-list':
        return [
          { header: 'Banner #', key: 'banner_number' },
          { header: 'Name', key: 'name', render: (_, row) => `${row.first_name} ${row.last_name}` },
          { header: 'Category', key: 'category' },
          { header: 'Major', key: 'major' },
          { header: 'Email', key: 'email' }
        ];
      case 'rent-stats':
        return [
          { header: 'Metric', key: 'metric' },
          { header: 'Value', key: 'value', render: (val) => `$${parseFloat(val).toFixed(2)}` }
        ];
      case 'hall-places':
        return [
          { header: 'Hall Name', key: 'hall_name' },
          { header: 'Total Places', key: 'total_places' }
        ];
      case 'senior-staff':
        return [
          { header: 'Staff #', key: 'staff_number' },
          { header: 'Name', key: 'name', render: (_, row) => `${row.first_name} ${row.last_name}` },
          { header: 'Age', key: 'age' },
          { header: 'Location', key: 'location' }
        ];
      case 'missing-next-of-kin':
        return [
          { header: 'Banner #', key: 'banner_number' },
          { header: 'Name', key: 'name', render: (_, row) => `${row.first_name} ${row.last_name}` }
        ];
      default:
        if (data.length > 0) {
          return Object.keys(data[0]).map(key => ({ header: key.replace(/_/g, ' ').toUpperCase(), key }));
        }
        return [];
    }
  };

  const processedRentStats = activeReport === 'rent-stats' && data.length > 0 && !Array.isArray(data[0]) 
    ? [
        { metric: 'Minimum Rent', value: data[0].min_rent },
        { metric: 'Maximum Rent', value: data[0].max_rent },
        { metric: 'Average Rent', value: data[0].avg_rent }
      ] 
    : data;

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1e293b] border-r border-white/10 flex flex-col fixed h-full z-10">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Building2 className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">UniHome <span className="text-indigo-400">DBMS</span></h1>
          </div>
          
          <nav className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">REPORTS & ANALYTICS</p>
            {reports.map((report) => (
              <SidebarItem
                key={report.id}
                icon={report.icon}
                label={report.label}
                active={activeReport === report.id}
                onClick={() => setActiveReport(report.id)}
              />
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-white/5">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
            <p className="text-xs text-slate-400 mb-1">Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-sm font-semibold text-emerald-400">Database Connected</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10 bg-[#0f172a]">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">University Accommodation</h2>
            <div className="flex items-center text-slate-400 text-sm">
              <Home size={14} className="mr-2" />
              <span>Admin Dashboard</span>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-indigo-400 font-medium">{reports.find(r => r.id === activeReport)?.label}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg shadow-indigo-500/20 transition-all">
                Export PDF
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Dynamic Report Content */}
          <div className="glass-card min-h-[500px]">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  {React.createElement(reports.find(r => r.id === activeReport)?.icon || FileText, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {reports.find(r => r.id === activeReport)?.title}
                </h3>
              </div>
              <div className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {processedRentStats.length} Records found
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <ReportTable 
                data={processedRentStats} 
                columns={getColumns()} 
              />
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease forwards;
        }
      `}} />
    </div>
  );
};

export default App;
