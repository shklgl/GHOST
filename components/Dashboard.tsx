import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { TrendingUp, Users, Flame, Activity } from 'lucide-react';

const mockChartData = [
  { name: 'Q1', value: 4000, burn: 240 },
  { name: 'Q2', value: 3000, burn: 139 },
  { name: 'Q3', value: 2000, burn: 980 },
  { name: 'Q4', value: 2780, burn: 390 },
  { name: 'Q5', value: 1890, burn: 480 },
  { name: 'Q6', value: 2390, burn: 380 },
  { name: 'Q7', value: 3490, burn: 430 },
];

const mockHoldings = [
  { handle: '@neura_art', platform: 'X', share: '10%', revenue: '$12,450', status: 'ACTIVE' },
  { handle: '@code_witch', platform: 'GitHub', share: '10%', revenue: '$8,230', status: 'ACTIVE' },
  { handle: '@synth_pop', platform: 'Spotify', share: '10%', revenue: '$4,100', status: 'ACTIVE' },
  { handle: '@meta_kai', platform: 'YouTube', share: '10%', revenue: '$156,000', status: 'ACTIVE' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Treasury Value', value: '$4,231,090', icon: TrendingUp, color: 'text-green-400' },
          { label: 'Active Grants', value: '142', icon: Users, color: 'text-blue-400' },
          { label: 'Total Burned', value: '890,402 $GST', icon: Flame, color: 'text-orange-500' },
          { label: 'Network APY', value: '18.4%', icon: Activity, color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl backdrop-blur-sm hover:border-zinc-700 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-500 text-sm font-mono">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Treasury Growth Protocol
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{fill: '#666'}} />
                <YAxis stroke="#666" tick={{fill: '#666'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-6">Index Holdings</h3>
          <div className="space-y-4">
            {mockHoldings.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-xs">
                    {h.handle[1]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{h.handle}</div>
                    <div className="text-xs text-zinc-500">{h.platform}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-mono text-sm">+{h.revenue}</div>
                  <div className="text-xs text-zinc-600">LTV Split</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-zinc-700 rounded-lg text-sm text-zinc-400 hover:text-white hover:border-zinc-500 transition-all">
            View All 142 Assets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
