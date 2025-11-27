import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './views/Dashboard';
import Insights from './views/Insights';
import Knowledge from './views/Knowledge';
import Partner from './views/Partner';
import { UserSettings } from './types';
import { Settings as SettingsIcon } from 'lucide-react';

const App: React.FC = () => {
  // Simple persistent state for demo purposes
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('innerRhythmSettings');
    return saved ? JSON.parse(saved) : {
      name: 'Elena',
      lastPeriodStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Started 5 days ago
      cycleLength: 28,
      periodLength: 5
    };
  });

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('innerRhythmSettings', JSON.stringify(settings));
  }, [settings]);

  // Log Component Placeholder (simplification for the XML constraint)
  const LogPlaceholder = () => (
    <div className="pb-24 px-6 pt-8 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-400">
            <SettingsIcon size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Log Your Flow</h2>
        <p className="text-gray-500 mt-2 mb-6">Track bleeding, symptoms, mood, and rituals to calibrate your inner rhythm.</p>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
            + Add Daily Log
        </button>
    </div>
  );

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#fdfbf7] text-gray-800 font-sans selection:bg-rose-100">
        
        {/* Simple Top Bar for Settings Toggle (would normally be in views) */}
        {showSettings && (
             <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                 <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                     <h2 className="text-xl font-bold mb-4">Cycle Settings</h2>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                     <input 
                        className="w-full bg-gray-50 border rounded-xl p-2 mb-4" 
                        value={settings.name} 
                        onChange={e => setSettings({...settings, name: e.target.value})}
                     />
                     <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Length (Days)</label>
                     <input 
                        type="number"
                        className="w-full bg-gray-50 border rounded-xl p-2 mb-4" 
                        value={settings.cycleLength} 
                        onChange={e => setSettings({...settings, cycleLength: Number(e.target.value)})}
                     />
                     <div className="flex gap-2 mt-2">
                        <button onClick={() => setShowSettings(false)} className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium">Save</button>
                     </div>
                 </div>
             </div>
        )}
        
        <div className="absolute top-4 right-4 z-40">
            <button onClick={() => setShowSettings(true)} className="p-2 bg-white/50 backdrop-blur rounded-full text-gray-400 hover:text-gray-800 transition-colors">
                <SettingsIcon size={20} />
            </button>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard settings={settings} />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/calendar" element={<LogPlaceholder />} />
          <Route path="/partner" element={<Partner settings={settings} />} />
          <Route path="/knowledge" element={<Knowledge />} />
        </Routes>
        
        <Navigation />
      </div>
    </HashRouter>
  );
};

export default App;
