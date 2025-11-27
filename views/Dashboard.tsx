import React, { useEffect, useState } from 'react';
import { calculatePhase, getPhaseGradient, getPhaseColor } from '../utils/cycleHelpers';
import { UserSettings, CyclePhase, DailyInsight } from '../types';
import { generateDailyInsight } from '../services/geminiService';
import { Droplet, Wind, Sun, Moon, Sparkles, Coffee, Briefcase, Dumbbell } from 'lucide-react';

interface Props {
  settings: UserSettings;
}

const Dashboard: React.FC<Props> = ({ settings }) => {
  const { phase, day, nextPeriodIn } = calculatePhase(settings);
  const [insight, setInsight] = useState<DailyInsight | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't today (simple cache mechanism could go here)
    const fetchInsight = async () => {
      setLoading(true);
      const data = await generateDailyInsight(phase, day);
      setInsight(data);
      setLoading(false);
    };
    fetchInsight();
  }, [phase, day]);

  const getPhaseIcon = () => {
    switch (phase) {
      case CyclePhase.Menstrual: return <Droplet className="text-white w-8 h-8" />;
      case CyclePhase.Follicular: return <Wind className="text-white w-8 h-8" />;
      case CyclePhase.Ovulatory: return <Sun className="text-white w-8 h-8" />;
      case CyclePhase.Luteal: return <Moon className="text-white w-8 h-8" />;
    }
  };

  const getPhaseDescription = () => {
    switch (phase) {
      case CyclePhase.Menstrual: return "Winter Phase: Release & Rest";
      case CyclePhase.Follicular: return "Spring Phase: Dream & Plan";
      case CyclePhase.Ovulatory: return "Summer Phase: Shine & Connect";
      case CyclePhase.Luteal: return "Autumn Phase: Reflect & Organize";
    }
  };

  return (
    <div className="pb-24 px-6 pt-8 animate-fade-in max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello, {settings.name}</h1>
          <p className="text-sm text-gray-500">Day {day} of Cycle</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${getPhaseGradient(phase)} shadow-lg`}>
          {getPhaseIcon()}
        </div>
      </div>

      {/* Hero Card */}
      <div className={`relative overflow-hidden rounded-3xl p-6 mb-6 bg-gradient-to-br ${getPhaseGradient(phase)} text-white shadow-xl transform transition-all hover:scale-[1.01]`}>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              {phase}
            </span>
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {nextPeriodIn} days to next cycle
            </span>
          </div>
          
          <h2 className="mt-4 text-3xl font-serif font-medium leading-tight opacity-95">
             {loading ? "Listening to your rhythm..." : `"${insight?.powerPhrase}"`}
          </h2>
          
          <p className="mt-4 text-white/90 font-medium">
            {getPhaseDescription()}
          </p>
        </div>
        
        {/* Decorative background circles */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-10"></div>
      </div>

      {/* Quick Actions / Suggestions */}
      <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Today's Rhythm</h3>
      
      {loading ? (
        <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
            
          <SuggestionCard 
            icon={<Briefcase size={20} />}
            title="Work & Flow"
            content={insight?.workFocus}
            color="bg-blue-50 text-blue-700"
          />
          
          <SuggestionCard 
            icon={<Coffee size={20} />}
            title="Nourishment"
            content={insight?.foodSuggestion}
            color="bg-green-50 text-green-700"
          />

          <SuggestionCard 
            icon={<Dumbbell size={20} />}
            title="Movement"
            content={insight?.exerciseSuggestion}
            color="bg-orange-50 text-orange-700"
          />

          <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 mt-2">
            <div className="flex items-center gap-2 mb-2 text-purple-800">
                <Sparkles size={18} />
                <h4 className="font-semibold text-sm uppercase tracking-wide">Daily Ritual</h4>
            </div>
            <p className="text-gray-700 italic text-sm leading-relaxed">
              {insight?.ritual}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

const SuggestionCard: React.FC<{ icon: React.ReactNode; title: string; content?: string; color: string }> = ({ icon, title, content, color }) => (
  <div className={`p-4 rounded-2xl flex items-start gap-4 ${color}`}>
    <div className="p-2 bg-white/60 rounded-xl backdrop-blur-sm">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-sm opacity-80 mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-sm font-medium leading-snug">{content || "Loading..."}</p>
    </div>
  </div>
);

export default Dashboard;
