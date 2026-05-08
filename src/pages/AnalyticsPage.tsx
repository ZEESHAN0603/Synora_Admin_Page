import React from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  BarChart, Bar
} from 'recharts';
import { GlassCard } from '../components/Common';
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const growthData = [
  { month: 'Jan', vendors: 10, organizers: 2, revenue: 5000 },
  { month: 'Feb', vendors: 15, organizers: 4, revenue: 8000 },
  { month: 'Mar', vendors: 22, organizers: 6, revenue: 15000 },
  { month: 'Apr', vendors: 31, organizers: 8, revenue: 28000 },
  { month: 'May', vendors: 42, organizers: 10, revenue: 42000 },
  { month: 'Jun', vendors: 48, organizers: 12, revenue: 68500 },
];

const categoryStats = [
  { name: 'Traditional Weddings', value: 45, color: '#5B4CF0' },
  { name: 'Temple Festivals', value: 30, color: '#3EA0FF' },
  { name: 'Corporate Meets', value: 15, color: '#F4A622' },
  { name: 'Classical Events', value: 10, color: '#C56CE6' },
];

const MetricCard = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
  <GlassCard className="flex items-center gap-6">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${colorClass}`}>
      <Icon size={28} />
    </div>
    <div>
      <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">{label}</p>
      <h3 className="text-3xl font-black mt-1 leading-none text-text-heading">{value}</h3>
      <p className="text-xs font-bold text-emerald-500 mt-2 flex items-center gap-1">
        <ArrowUpRight size={14} />
        {subtext}
      </p>
    </div>
  </GlassCard>
);

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-heading">TN Analytics</h1>
        <p className="text-text-subtitle font-medium">Deep insights into Tamil Nadu's event ecosystem performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Monthly Growth" value="+12%" subtext="Recent Launch" icon={TrendingUp} colorClass="bg-primary" />
        <MetricCard label="Active Users" value="86" subtext="Early Adopters" icon={Users} colorClass="bg-acc-blue" />
        <MetricCard label="Event Volume" value="14" subtext="6 in planning" icon={Calendar} colorClass="bg-acc-orange" />
        <MetricCard label="Net Revenue" value={formatCurrency(12500)} subtext="Initial Revenue" icon={DollarSign} colorClass="bg-black" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-text-heading">User & Vendor Growth</h2>
            <p className="text-sm text-text-secondary">Comparing registration trends over the last 6 months</p>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9D9D9" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#8A8A8A' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#8A8A8A' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #D9D9D9', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }} 
                />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="vendors" stroke="#5B4CF0" fill="#5B4CF0" fillOpacity={0.1} strokeWidth={3} />
                <Area type="monotone" dataKey="organizers" stroke="#3EA0FF" fill="#3EA0FF" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-text-heading">Revenue streams</h2>
            <p className="text-sm text-text-secondary">Financial performance distribution across platform</p>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9D9D9" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8A8A8A' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8A8A' }} />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #D9D9D9', 
                    borderRadius: '12px'
                  }}
                />
                <Line type="step" dataKey="revenue" stroke="#5B4CF0" strokeWidth={4} dot={{ fill: '#5B4CF0', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-8 text-text-heading">Event Categories</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-4">
            {categoryStats.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-semibold text-text-subtitle">{item.name}</span>
                </div>
                <span className="text-sm font-black text-text-heading">{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-8 text-text-heading">Top Performing Vendors</h2>
          <div className="space-y-6">
            {[
              { name: 'Saravana Mandapam', sales: 145, revenue: 812500, score: 98 },
              { name: 'Kovai Decorators', sales: 92, revenue: 445000, score: 95 },
              { name: 'Annapoorna Catering', sales: 268, revenue: 128400, score: 92 },
              { name: 'Trichy Lights', sales: 84, revenue: 55600, score: 88 },
            ].map((v, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-text-heading">{v.name}</h4>
                    <p className="text-xs text-text-secondary font-bold uppercase">{v.sales} Bookings • {formatCurrency(v.revenue)}</p>
                  </div>
                  <span className="text-lg font-black text-primary">{v.score}%</span>
                </div>
                <div className="h-2 w-full bg-bg-main rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${v.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
