import React, { useState } from 'react';
import { 
  FolderKanban, 
  Table, 
  Key, 
  Play, 
  Sparkles, 
  GraduationCap, 
  ShoppingCart, 
  Activity, 
  Building2, 
  BookOpen, 
  Car, 
  Plane,
  ChevronRight
} from 'lucide-react';
import { REAL_WORLD_PROJECTS } from '../data/projectsData';
import { RealWorldProject } from '../types';

interface ProjectsViewProps {
  onRunInPlayground: (sql: string, db: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onRunInPlayground }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(REAL_WORLD_PROJECTS[0].id);
  const [selectedTableIdx, setSelectedTableIdx] = useState<number>(0);

  const activeProject = REAL_WORLD_PROJECTS.find(p => p.id === selectedProjectId) || REAL_WORLD_PROJECTS[0];
  const activeTable = activeProject.tables[selectedTableIdx] || activeProject.tables[0];

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="h-5 w-5" />;
      case 'ShoppingCart': return <ShoppingCart className="h-5 w-5" />;
      case 'Activity': return <Activity className="h-5 w-5" />;
      case 'Building2': return <Building2 className="h-5 w-5" />;
      case 'BookOpen': return <BookOpen className="h-5 w-5" />;
      case 'Car': return <Car className="h-5 w-5" />;
      case 'Plane': return <Plane className="h-5 w-5" />;
      default: return <FolderKanban className="h-5 w-5" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FolderKanban className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            7 Production-Grade Real-World Database Architectures
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Explore complete production schema designs, normalized entity relationships, primary/foreign key hierarchies, and enterprise SQL queries used in multi-billion dollar systems.
        </p>
      </div>

      {/* Projects Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {REAL_WORLD_PROJECTS.map(proj => {
          const isSelected = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjectId(proj.id);
                setSelectedTableIdx(0);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-sky-600/15 border-sky-500 text-sky-300 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg w-fit mb-2 ${isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-900 text-slate-400'}`}>
                {getProjectIcon(proj.icon)}
              </div>
              <h4 className="text-xs font-bold truncate text-white">{proj.name.split(' ')[0]}</h4>
              <p className="text-[10px] text-slate-500 truncate">{proj.industry}</p>
            </button>
          );
        })}
      </div>

      {/* Active Project Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Schema Architecture */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 uppercase font-mono">
                {activeProject.databaseName}
              </span>
              <span className="text-xs text-slate-400">{activeProject.tables.length} Normalized Tables</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{activeProject.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{activeProject.description}</p>

            {/* Table Selection Tabs */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-800">
              {activeProject.tables.map((tbl, idx) => (
                <button
                  key={tbl.name}
                  onClick={() => setSelectedTableIdx(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedTableIdx === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {tbl.name}
                </button>
              ))}
            </div>

            {/* Selected Table Columns Schema */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Table: <strong className="text-white font-mono">{activeTable.name}</strong></span>
                <span className="text-[11px] text-slate-500">{activeTable.description}</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-3 py-2 text-indigo-300">Column</th>
                      <th className="px-3 py-2 text-slate-400">Type</th>
                      <th className="px-3 py-2 text-amber-400">Key</th>
                      <th className="px-3 py-2 text-slate-400">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {activeTable.columns.map(col => (
                      <tr key={col.name} className="hover:bg-slate-900/40">
                        <td className="px-3 py-2 font-bold text-slate-200">{col.name}</td>
                        <td className="px-3 py-2 text-sky-400 text-[11px]">{col.type}</td>
                        <td className="px-3 py-2">
                          {col.key ? (
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              col.key === 'PK' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}>
                              {col.key}
                            </span>
                          ) : '-'}
                        </td>
                        <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Production SQL Queries & Business Impact */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-base font-bold text-white mb-1">Production SQL Queries & Analytics</h4>
            <p className="text-xs text-slate-400 mb-4">
              Real business queries run against this schema to power reporting, customer loyalty, and operational workflows.
            </p>

            <div className="space-y-4">
              {activeProject.sampleQueries.map((sq, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-200">{sq.title}</span>
                    <button
                      onClick={() => onRunInPlayground(sq.sql, activeProject.databaseName.includes('college') ? 'college' : activeProject.databaseName.includes('ecommerce') ? 'ecommerce' : 'hospital')}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20"
                    >
                      <Play className="h-3 w-3 fill-indigo-400" />
                      <span>Run in Playground</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-300">Objective:</strong> {sq.objective}
                  </p>

                  <pre className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-sky-300 border border-slate-800 overflow-x-auto">
                    {sq.sql}
                  </pre>

                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                    <strong>Enterprise Business Impact:</strong> {sq.businessImpact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
