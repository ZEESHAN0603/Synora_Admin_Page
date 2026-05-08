import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/Common';
import { FileText, Download, PieChart, FileSpreadsheet, ChevronRight, FileJson } from 'lucide-react';

const REPORT_TYPES = [
  { id: '1', name: 'Vendor Growth Report', type: 'Performance', format: 'PDF', icon: FileText, color: '#5B4CF0' },
  { id: '2', name: 'Annual Revenue Summary', type: 'Financial', format: 'CSV', icon: FileSpreadsheet, color: '#3EA0FF' },
  { id: '3', name: 'Organizer Activity Analytics', type: 'Engagement', format: 'JSON', icon: FileJson, color: '#F4A622' },
  { id: '4', name: 'Event Success Metrics', type: 'Operational', format: 'PDF', icon: PieChart, color: '#C56CE6' },
];

export const ReportsPage: React.FC = () => {
  const [exportEntity, setExportEntity] = useState('Vendors');
  const [exportRange, setExportRange] = useState('Last 30 Days');
  const [exportFormat, setExportFormat] = useState('CSV');

  const handleDownload = (name: string) => {
    alert(`Downloading ${name}...`);
  };

  const handleExport = () => {
    alert(`Generating ${exportFormat} export for ${exportEntity} (${exportRange})...`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-heading">Reports Console</h1>
          <p className="text-text-subtitle font-medium">Export system data and generate comprehensive performance summaries for TN.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold px-1 text-text-heading">Available Reports</h2>
          <div className="space-y-4">
            {REPORT_TYPES.map((report) => (
              <GlassCard 
                key={report.id} 
                className="flex items-center justify-between p-5 hover:bg-primary/5 transition-all group cursor-pointer border-l-4" 
                style={{ borderLeftColor: report.color }}
                onClick={() => handleDownload(report.name)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-bg-main flex items-center justify-center" style={{ color: report.color }}>
                    <report.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-heading">{report.name}</h4>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{report.type} • {report.format}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(report.name);
                  }}
                  className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
                >
                  <Download size={20} />
                </button>
              </GlassCard>
            ))}
          </div>
        </div>

        <GlassCard className="flex flex-col h-full bg-primary text-white border-none shadow-xl shadow-primary/20">
          <div className="p-2 mb-6">
            <h2 className="text-2xl font-bold text-white">Quick Summary</h2>
            <p className="text-white/70 font-medium">Platform snapshots as of today</p>
          </div>
          
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              {[
                { label: 'Platform Payouts', val: '₹42,300', perc: 45 },
                { label: 'Server Load', val: '5%', perc: 5 },
                { label: 'Uptime', val: '100%', perc: 100 },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-white/80">{stat.label}</span>
                    <span className="text-xl font-black">{stat.val}</span>
                  </div>
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.perc}%` }}
                      className="h-full bg-white rounded-full shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <FileText size={18} />
                Recent Generation
              </h4>
              <p className="text-sm text-white/70">Automatic daily backup generated 4 hours ago.</p>
              <button 
                onClick={() => alert('Viewing report history...')}
                className="mt-4 text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-white/20 hover:text-white transition-colors"
              >
                View History
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-xl font-bold mb-6 text-text-heading">Custom Data Export</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-text-secondary ml-1">Entity</label>
            <select 
              className="input-field py-2 text-sm text-text-heading"
              value={exportEntity}
              onChange={(e) => setExportEntity(e.target.value)}
            >
              <option>Vendors</option>
              <option>Organizers</option>
              <option>Events</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-text-secondary ml-1">Date Range</label>
            <select 
              className="input-field py-2 text-sm text-text-heading"
              value={exportRange}
              onChange={(e) => setExportRange(e.target.value)}
            >
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-text-secondary ml-1">Format</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setExportFormat('CSV')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${exportFormat === 'CSV' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-bg-main text-text-heading hover:bg-divider'}`}
              >
                CSV
              </button>
              <button 
                onClick={() => setExportFormat('PDF')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${exportFormat === 'PDF' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-bg-main text-text-heading hover:bg-divider'}`}
              >
                PDF
              </button>
            </div>
          </div>
          <div className="flex items-end">
            <button 
              className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={handleExport}
            >
              <Download size={18} />
              Export Now
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
