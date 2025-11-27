import React, { useState } from 'react';
import { UserSettings, CyclePhase } from '../types';
import { calculatePhase } from '../utils/cycleHelpers';
import { Share2, Heart, Shield, Bell } from 'lucide-react';

interface Props {
  settings: UserSettings;
}

const Partner: React.FC<Props> = ({ settings }) => {
  const { phase, day } = calculatePhase(settings);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [isInvited, setIsInvited] = useState(false);

  const getPartnerMessage = () => {
    switch (phase) {
      case CyclePhase.Menstrual:
        return "She is in her Winter phase. Energy is low and inward. Best support: Warm tea, heating pads, gentle presence, and taking over household chores.";
      case CyclePhase.Follicular:
        return "She is in her Spring phase. Energy is rising and fresh. Best support: Encourage her new ideas, plan fun activities together.";
      case CyclePhase.Ovulatory:
        return "She is in her Summer phase. Confident, communicative, and magnetic. Best support: Socialize together, go on dates, deep conversations.";
      case CyclePhase.Luteal:
        return "She is in her Autumn phase. Sensitive to details and turning inward. Best support: Respect her boundaries, listen without fixing, offer reassurance.";
    }
  };

  return (
    <div className="pb-24 px-6 pt-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Circle of Care</h1>
      <p className="text-gray-500 mb-8 text-sm">Invite loved ones to understand your rhythm.</p>

      {/* Partner Card Preview */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl mb-8">
        <div className="flex justify-between items-start mb-6">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <Heart size={18} className="text-rose-400" fill="currentColor" />
                Partner View
            </h3>
            <span className="bg-slate-700 text-xs px-2 py-1 rounded">Preview</span>
        </div>

        <div className="text-center mb-6">
            <h2 className="text-3xl font-serif">{settings.name}</h2>
            <p className="text-slate-400 uppercase tracking-widest text-xs mt-1">is in Day {day}</p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl backdrop-blur-md border border-slate-700">
            <p className="text-slate-200 text-sm leading-relaxed italic">
                "{getPartnerMessage()}"
            </p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
             <button className="flex items-center gap-2 text-xs font-semibold bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-full transition-colors">
                <Shield size={14} /> I've got her back
             </button>
             <button className="flex items-center gap-2 text-xs font-semibold bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full transition-colors">
                <Bell size={14} /> Remind me
             </button>
        </div>
      </div>

      {/* Invite Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Sync with a partner</h3>
        
        {!isInvited ? (
            <div className="space-y-4">
                <p className="text-sm text-gray-500">
                    Your partner will receive a simplified view of your cycle with tailored tips on how to support you emotionally and physically.
                </p>
                <div className="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="partner@email.com"
                        value={partnerEmail}
                        onChange={(e) => setPartnerEmail(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                    <button 
                        onClick={() => setIsInvited(true)}
                        className="bg-gray-900 text-white p-3 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        ) : (
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Heart size={16} fill="currentColor" />
                </div>
                <div>
                    <h4 className="font-semibold text-green-800 text-sm">Invitation Sent!</h4>
                    <p className="text-green-700 text-xs">Waiting for them to connect.</p>
                </div>
                <button onClick={() => setIsInvited(false)} className="ml-auto text-xs text-green-700 underline">Undo</button>
            </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
            You control what is shared. Data is private and secure.
        </p>
      </div>

    </div>
  );
};

export default Partner;
