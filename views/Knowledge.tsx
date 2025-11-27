import React, { useState } from 'react';
import { Search, ChevronRight, Book } from 'lucide-react';
import { getKnowledgeAnswer } from '../services/geminiService';

const Knowledge: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const result = await getKnowledgeAnswer(query);
    setAnswer(result);
    setLoading(false);
  };

  return (
    <div className="pb-24 px-6 pt-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Cycle Wisdom</h1>
      <p className="text-gray-500 mb-8 text-sm">Science, psychology, and feminine philosophy.</p>

      {/* AI Search */}
      <div className="bg-white p-5 rounded-3xl shadow-md border border-gray-100 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Ask the Guide</h3>
        <form onSubmit={handleAsk} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Why do I crave chocolate before period?"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 p-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={16} />}
          </button>
        </form>

        {answer && (
          <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-100 animate-fade-in">
            <p className="text-gray-700 text-sm leading-relaxed">{answer}</p>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800 px-1">Deep Dives</h3>
        
        <ArticleCard 
          title="The Four Inner Seasons"
          description="Understanding the archetypes of your cycle."
          readTime="3 min"
        />
        <ArticleCard 
          title="Hormones 101"
          description="Estrogen, Progesterone, and what they actually do."
          readTime="5 min"
        />
        <ArticleCard 
          title="Seed Cycling Guide"
          description="Natural nutritional support for hormonal balance."
          readTime="4 min"
        />
        <ArticleCard 
          title="The Power of Rest"
          description="Why productivity culture hurts female biology."
          readTime="6 min"
        />
      </div>
    </div>
  );
};

const ArticleCard: React.FC<{ title: string; description: string; readTime: string }> = ({ title, description, readTime }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group cursor-pointer hover:shadow-md transition-all">
    <div className="flex items-start gap-4">
      <div className="bg-gray-50 p-3 rounded-xl text-gray-400">
        <Book size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        <span className="text-[10px] font-bold text-rose-500 mt-2 block uppercase tracking-wide">{readTime} read</span>
      </div>
    </div>
    <ChevronRight className="text-gray-300 group-hover:text-rose-400 transition-colors" size={20} />
  </div>
);

export default Knowledge;
