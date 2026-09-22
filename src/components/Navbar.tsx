import React from 'react';
import { 
  Database, 
  BookOpen, 
  Terminal, 
  CheckSquare, 
  HelpCircle, 
  Award, 
  FolderKanban, 
  LayoutDashboard, 
  Server,
  Flame,
  Zap,
  Sparkles
} from 'lucide-react';
import { UserProgress } from '../types';

export type NavTab = 
  | 'textbook' 
  | 'playground' 
  | 'practice' 
  | 'quiz' 
  | 'exam' 
  | 'projects' 
  | 'dashboard' 
  | 'architecture';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  progress: UserProgress;
  onOpenAiTutor: () => void;
  userRole: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  setUserRole: (role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenAiTutor,
  userRole,
  setUserRole
}) => {
  const navItems = [
    { id: 'textbook' as NavTab, label: 'Course & Textbook', icon: BookOpen },
    { id: 'playground' as NavTab, label: 'SQL Playground', icon: Terminal },
    { id: 'practice' as NavTab, label: 'Practice Arena', icon: CheckSquare },
    { id: 'quiz' as NavTab, label: 'Quiz Center', icon: HelpCircle },
    { id: 'exam' as NavTab, label: 'Final Exam', icon: Award },
    { id: 'projects' as NavTab, label: 'Real-World DBs', icon: FolderKanban },
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'architecture' as NavTab, label: 'Backend Architecture', icon: Server },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('textbook')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  KK SQL Academy
                </span>
                <span className="rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Fundamentals → Expert Course</p>
            </div>
          </button>
        </div>

        {/* Navigation Bar Pills */}
        <nav className="hidden xl:flex flex-1 mx-4 justify-center items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 overflow-x-auto scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* AI Mentor Button */}
          <button
            onClick={onOpenAiTutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-semibold shadow-sm transition-all"
            title="Ask KK AI SQL Mentor"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Gamification Stats */}
          <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-medium">
            <div className="flex items-center gap-1 text-amber-400" title="SQL XP Points">
              <Zap className="h-3.5 w-3.5 fill-amber-400/20" />
              <span>{progress.xp.toLocaleString()} XP</span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-1 text-orange-400" title="Learning Streak">
              <Flame className="h-3.5 w-3.5 fill-orange-400/20" />
              <span>{progress.streakDays}d</span>
            </div>
          </div>

          {/* Role selector dropdown */}
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav Scroll */}
      <div className="flex xl:hidden overflow-x-auto px-4 py-2 border-t border-slate-900 bg-slate-950 scrollbar-none gap-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
