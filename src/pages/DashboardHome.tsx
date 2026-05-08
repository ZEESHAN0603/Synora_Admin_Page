import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserSquare2, 
  Calendar, 
  DollarSign, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { GlassCard, Badge } from '../components/Common';
import { formatCurrency, cn } from '../lib/utils';

const data = [
  { name: 'Jan', value: 80 },
  { name: 'Feb', value: 120 },
  { name: 'Mar', value: 150 },
  { name: 'Apr', value: 210 },
  { name: 'May', value: 280 },
  { name: 'Jun', value: 340 },
  { name: 'Jul', value: 410 },
];

const categoryData = [
  { name: 'Mandapams', value: 12, color: '#5B4CF0' },
  { name: 'Natures Decor', value: 15, color: '#F4A622' },
  { name: 'South Catering', value: 8, color: '#3EA0FF' },
  { name: 'Traditionals', value: 5, color: '#C56CE6' },
];

const StatCard = ({ icon: Icon, label, value, trend, trendValue, iconColor, iconBg, delay = 0 }: any) => (
  <GlassCard delay={delay} className="flex flex-row items-center gap-5 p-5 min-w-[260px]">
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", iconBg)}>
      <Icon size={24} className={iconColor} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest truncate">{label}</p>
        <div className={cn(
          "flex items-center gap-0.5 text-[10px] font-black",
          trend === 'up' ? "text-emerald-500" : "text-rose-500"
        )}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </div>
      </div>
      <h3 className="text-2xl font-black tracking-tight text-text-heading truncate">{value}</h3>
    </div>
  </GlassCard>
);

const QuickAction = ({ icon: Icon, label, path, color, iconColor = "text-white", delay = 0 }: any) => {
  const navigate = useNavigate();
  return (
    <motion.button 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="flex flex-col items-center gap-4 p-6 glass rounded-3xl border-none transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary transition-all" />
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-transform group-hover:rotate-6",
        color,
        iconColor
      )}>
        <Icon size={28} />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-text-heading group-hover:text-primary transition-colors">{label}</span>
    </motion.button>
  );
};

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-10 pb-20">
      {/* Premium Header */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text-heading leading-none">
            Synora <span className="text-primary">Tamil Nadu</span>
          </h1>
          <p className="mt-3 text-text-subtitle font-bold uppercase tracking-[0.3em] text-xs">
            TN Ecosystem Intelligence • 2026
          </p>
        </div>
      </div>

      {/* Responsive Horizontal Stats */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
        <div className="snap-center"><StatCard icon={Users} label="Total Vendors" value="48" trend="up" trendValue="+5" iconColor="text-acc-blue" iconBg="bg-acc-blue-soft" delay={0.1} /></div>
        <div className="snap-center"><StatCard icon={UserSquare2} label="TN Organizers" value="12" trend="up" trendValue="+2" iconColor="text-acc-pink" iconBg="bg-acc-pink-soft" delay={0.2} /></div>
        <div className="snap-center"><StatCard icon={Calendar} label="Active Events" value="8" trend="up" trendValue="+3" iconColor="text-acc-orange" iconBg="bg-acc-orange-soft" delay={0.3} /></div>
        <div className="snap-center"><StatCard icon={DollarSign} label="State Volume" value={formatCurrency(48500)} trend="up" trendValue="+12%" iconColor="text-primary" iconBg="bg-primary-soft" delay={0.4} /></div>
        <div className="snap-center"><StatCard icon={Clock} label="Pending Approvals" value="4" trend="down" trendValue="-2" iconColor="text-acc-orange" iconBg="bg-acc-orange-soft" delay={0.5} /></div>
      </div>

      {/* Refined Quick Actions */}
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-text-secondary/40 px-2 flex items-center gap-3">
          Core Operations <div className="h-px flex-1 bg-divider" />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <QuickAction icon={Users} label="Vendors" path="/vendors" color="bg-primary" delay={0.1} />
          <QuickAction icon={UserSquare2} label="Organizers" path="/organizers" color="bg-acc-orange" delay={0.2} />
          <QuickAction icon={Calendar} label="Events" path="/events" color="bg-acc-blue" delay={0.3} />
          <QuickAction icon={TrendingUp} label="Growth" path="/analytics" color="bg-acc-pink" delay={0.4} />
          <QuickAction icon={Settings} label="System" path="/settings" color="bg-slate-700" delay={0.5} />
          <QuickAction icon={BarChart3} label="Insights" path="/analytics" color="bg-amber-700" delay={0.6} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard delay={0.7} className="lg:col-span-2 !p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-text-heading">Tamil Nadu Market Growth</h2>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">State-wide Expansion Rate</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="success" className="px-4 py-1.5 rounded-full">Chennai Live</Badge>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B4CF0" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5B4CF0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '24px', 
                    border: '1px solid #D9D9D9', 
                    color: '#111111',
                    padding: '16px'
                  }} 
                  itemStyle={{ color: '#5B4CF0', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#5B4CF0" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delay={0.8} className="!bg-primary shadow-2xl shadow-primary/30 border-none !p-8 flex flex-col justify-between text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative">
            <h2 className="text-2xl font-black tracking-tight mb-2">Premium Status</h2>
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Global Platform Metrics</p>
          </div>
          <div className="relative mt-12 mb-8">
            <div className="text-6xl font-black tracking-tighter">98.4%</div>
            <p className="text-sm font-bold text-white/80">Operational Uptime</p>
          </div>
          <button className="relative w-full py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/90 transition-colors">
            Security Audit
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
