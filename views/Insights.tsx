import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { UserSettings } from '../types';

// Mock data to simulate logging history
const mockData = [
  { day: 1, energy: 3, mood: 4 },
  { day: 5, energy: 5, mood: 6 },
  { day: 10, energy: 8, mood: 9 },
  { day: 14, energy: 10, mood: 10 },
  { day: 18, energy: 7, mood: 8 },
  { day: 24, energy: 4, mood: 5 },
  { day: 28, energy: 3, mood: 4 },
];

const Insights: React.FC = () => {
  return (
    <div className="pb-24 px-6 pt-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Body Wisdom</h1>
      <p className="text-gray-500 mb-8 text-sm">Observe the patterns of your unique rhythm.</p>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Energy Flow</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke="#f59e0b" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEnergy)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs text-center text-gray-400">
          Your energy typically peaks around Day 14 (Ovulation).
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Emotional Landscape</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
               <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 10]} />
              <Tooltip 
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMood)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
         <p className="mt-4 text-xs text-center text-gray-400">
          Emotions tend to be expansive mid-cycle and reflective pre-menses.
        </p>
      </div>
    </div>
  );
};

export default Insights;
