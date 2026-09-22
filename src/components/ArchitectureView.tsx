import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  FileCode, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  FolderTree, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ARCHITECTURE_FILES, ArchitectureFile } from '../data/backendArchitectureData';

export const ArchitectureView: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(ARCHITECTURE_FILES[0].path);
  const [copied, setCopied] = useState(false);

  const activeFile = ARCHITECTURE_FILES.find(f => f.path === selectedFilePath) || ARCHITECTURE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', activeFile.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Server className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Spring Boot 3 + MySQL Enterprise Backend Blueprints
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Production-ready Java Spring Boot microservice architecture, sandboxed query execution controllers, Spring Data JPA entities, and production MySQL 8.0 schema DDL for KK SQL Academy.
        </p>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Directory File Tree */}
        <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <FolderTree className="h-3.5 w-3.5 text-indigo-400" />
              Project File Explorer
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{ARCHITECTURE_FILES.length} Files</span>
          </div>

          <div className="space-y-1">
            {ARCHITECTURE_FILES.map(file => {
              const isCurrent = file.path === activeFile.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full flex items-center justify-between text-left p-2.5 rounded-xl text-xs font-mono transition-all ${
                    isCurrent
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {file.language === 'java' ? (
                      <FileCode className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    ) : file.language === 'sql' ? (
                      <Database className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0 ml-1">
                    {file.category}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1.5">
            <p><strong>Stack:</strong> Java 21, Spring Boot 3.3, MySQL 8.0, Spring Data JPA, Spring Security, Hibernate.</p>
            <p><strong>Database:</strong> Dedicated isolated tenant schema for query execution sandbox.</p>
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            {/* Viewer Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-indigo-300 font-bold block">{activeFile.path}</span>
                <span className="text-[10px] text-slate-500">Language: {activeFile.language.toUpperCase()} • Type: {activeFile.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950 overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
              <pre className="whitespace-pre">{activeFile.code}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
