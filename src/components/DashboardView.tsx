import React from 'react';
import { 
  Zap, 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Play, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Target,
  ArrowRight
} from 'lucide-react';
import { UserProgress, Certificate } from '../types';
import { COURSE_LEVELS, SQL_MODULES } from '../data/coursesData';

interface DashboardViewProps {
  progress: UserProgress;
  certificates: Certificate[];
  onNavigateToTextbook: () => void;
  onNavigateToPlayground: () => void;
  onNavigateToExam: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  certificates,
  onNavigateToTextbook,
  onNavigateToPlayground,
  onNavigateToExam
}) => {
  const allTopicsCount = SQL_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopicsCount = progress.completedTopics.length;
  const overallPercentage = Math.round((completedTopicsCount / allTopicsCount) * 100);

  const badges = [
    { title: 'Relational Novice', desc: 'Mastered Level 1 SQL Foundations', unlocked: true, icon: '🔰' },
    { title: 'Projection Pro', desc: 'Solved 10+ SELECT and Filtering Queries', unlocked: progress.queriesExecuted >= 5, icon: '⚡' },
    { title: 'Join Master', desc: 'Combined multi-table relations seamlessly', unlocked: progress.solvedProblems.length >= 2, icon: '🔗' },
    { title: 'Window Wizard', desc: 'Mastered Analytical PARTITION BY functions', unlocked: progress.solvedProblems.length >= 4, icon: '🪟' },
    { title: 'ACID Guardian', desc: 'Enforced Concurrency and Durability rules', unlocked: progress.completedTopics.length >= 20, icon: '🛡️' },
    { title: 'Certified Architect', desc: 'Passed the 100-pt KK SQL Final Exam', unlocked: certificates.length > 0, icon: '🏆' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Student Profile & Highlights Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/50 border border-slate-800 p-6 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
              KK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">Krishna Kumar (KK)</h1>
                <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold px-2 py-0.5 rounded-md">
                  Active Learner
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enrolled in KK SQL Academy: Complete Fundamentals → Expert Curriculum
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToTextbook}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span>Continue Learning</span>
            </button>
            <button
              onClick={onNavigateToExam}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all"
            >
              <Award className="h-4 w-4 text-amber-400" />
              <span>Final Exam</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">Course Completion Rate</span>
            <span className="text-xs font-mono font-bold text-indigo-400">
              {completedTopicsCount} / {allTopicsCount} Topics ({overallPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-all duration-700"
              style={{ width: `${Math.max(5, overallPercentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total SQL XP</span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{progress.xp.toLocaleString()}</div>
          <span className="text-[11px] text-amber-400/90 mt-1 block">+50 XP per lesson, +100 XP per challenge</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Streak</span>
            <Flame className="h-4 w-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{progress.streakDays} Days</div>
          <span className="text-[11px] text-orange-400/90 mt-1 block">Daily consistency multiplier active</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Queries Executed</span>
            <Play className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{progress.queriesExecuted}</div>
          <span className="text-[11px] text-emerald-400/90 mt-1 block">Tested in live sandbox environment</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Arena Solves</span>
            <Target className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{progress.solvedProblems.length}</div>
          <span className="text-[11px] text-sky-400/90 mt-1 block">Challenges correctly verified</span>
        </div>
      </div>

      {/* Levels Progress Breakdown & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 5 Course Levels Tracker */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>Curriculum Level Mastery</span>
          </h3>

          <div className="space-y-3">
            {COURSE_LEVELS.map(level => {
              const levelModules = SQL_MODULES.filter(m => m.levelId === level.id);
              const levelTopics = levelModules.flatMap(m => m.topics);
              const doneCount = levelTopics.filter(t => progress.completedTopics.includes(t.id)).length;
              const pct = levelTopics.length > 0 ? Math.round((doneCount / levelTopics.length) * 100) : 0;

              return (
                <div key={level.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">{level.name}</span>
                      <p className="text-[11px] text-slate-400">{level.tagline}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300">{pct}%</span>
                  </div>

                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Badges & Certificate Status */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Skill Badges & Honors</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {badges.map((badge, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    badge.unlocked 
                      ? 'bg-slate-950 border-amber-500/30' 
                      : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <h4 className="text-xs font-bold text-white truncate">{badge.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{badge.desc}</p>
                  <span className={`text-[9px] font-bold mt-1.5 inline-block uppercase px-1.5 py-0.5 rounded ${
                    badge.unlocked ? 'text-amber-400 bg-amber-500/10' : 'text-slate-600 bg-slate-900'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Card */}
          {certificates.length > 0 && (
            <div className="bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Certified SQL Master</h4>
                  <p className="text-[11px] text-slate-400">Score: {certificates[0].score}/100 • {certificates[0].grade}</p>
                </div>
              </div>
              <button
                onClick={onNavigateToExam}
                className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline"
              >
                View Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
