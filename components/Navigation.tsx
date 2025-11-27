import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, BookOpen, Activity } from 'lucide-react';

const Navigation: React.FC = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
      isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-lg pb-safe">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto px-2">
        <NavLink to="/" className={navClass}>
          <Home size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-medium tracking-wide">Today</span>
        </NavLink>
        <NavLink to="/insights" className={navClass}>
          <Activity size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-medium tracking-wide">Insights</span>
        </NavLink>
        <NavLink to="/calendar" className={navClass}>
          <Calendar size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-medium tracking-wide">Log</span>
        </NavLink>
        <NavLink to="/partner" className={navClass}>
          <Users size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-medium tracking-wide">Partner</span>
        </NavLink>
        <NavLink to="/knowledge" className={navClass}>
          <BookOpen size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-medium tracking-wide">Wisdom</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
