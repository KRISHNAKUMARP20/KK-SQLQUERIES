import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Play, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  Layers, 
  Terminal, 
  ArrowRight, 
  ArrowLeft,
  BookMarked,
  Zap,
  BookOpen,
  Volume2,
  VolumeX,
  Lightbulb,
  AlertTriangle,
  Compass,
  FolderKanban,
  HelpCircle,
  Code2,
  ListChecks,
  Award,
  Lock
} from 'lucide-react';
import { MermaidViewer } from './MermaidViewer';
import { CourseLevelId, SQLTopicLesson, TopicBrief } from '../types';
import { COURSE_LEVELS, SQL_MODULES } from '../data/coursesData';
import { TOPIC_BRIEFS } from '../data/topicBriefData';
import { getFullTopicPedagogy } from '../data/pedagogyResolver';

interface TextbookViewProps {
  onRunInPlayground: (sql: string, db: string) => void;
  onAskAiTutor: (topic: SQLTopicLesson, explainBriefly?: boolean) => void;
  completedTopicIds: string[];
  onToggleTopicComplete: (topicId: string) => void;
}

export const TextbookView: React.FC<TextbookViewProps> = ({
  onRunInPlayground,
  onAskAiTutor,
  completedTopicIds,
  onToggleTopicComplete
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState<CourseLevelId>(1);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('mod-1-topic-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'brief' | 'comprehensive'>('brief');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Flatten all topics
  const allTopics: SQLTopicLesson[] = SQL_MODULES.flatMap(m => m.topics);

  // Filter topics by level and search
  const currentLevelModules = SQL_MODULES.filter(m => m.levelId === selectedLevelId);
  
  const filteredModules = currentLevelModules.map(m => ({
    ...m,
    topics: m.topics.filter(t => {
      const q = searchQuery.toLowerCase();
      const brief = TOPIC_BRIEFS[t.id];
      return (
        t.title.toLowerCase().includes(q) ||
        t.whatIsIt.toLowerCase().includes(q) ||
        t.shortSummary.toLowerCase().includes(q) ||
        (brief && (
          brief.mentalModel.toLowerCase().includes(q) ||
          brief.goldenRule.toLowerCase().includes(q) ||
          brief.whenToUse.toLowerCase().includes(q)
        ))
      );
    })
  })).filter(m => m.topics.length > 0 || searchQuery === '');

  // Current active topic
  const activeTopic = allTopics.find(t => t.id === selectedTopicId) || allTopics[0];
  const activeModule = SQL_MODULES.find(m => m.id === activeTopic?.moduleId);

  // Sequential navigation
  const currentIndex = allTopics.findIndex(t => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const isCompleted = completedTopicIds.includes(activeTopic.id);

  // Fetch or construct brief explanation
  const topicBrief: TopicBrief = activeTopic.brief || TOPIC_BRIEFS[activeTopic.id] || {
    mentalModel: activeTopic.shortSummary,
    goldenRule: 'Adhere to standard ANSI SQL syntax, keep filters SARGable, and index primary & foreign keys.',
    whenToUse: 'Whenever data requires structured storage, declarative querying, and relational integrity.',
    commonPitfall: 'Forgetting to handle edge cases with NULL values or unindexed search conditions.',
    minimalSyntax: activeTopic.syntax.split('\n')[0] || activeTopic.syntax,
    bulletPoints: activeTopic.howItWorks.slice(0, 3).map(s => s.replace(/^\d+\.\s*/, ''))
  };

  // Stop speech when changing topics
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setQuizSelection({});
    setShowChallengeSolution(false);
  }, [selectedTopicId]);

  // Comprehensive 12-section pedagogy resolution
  const pedagogy = getFullTopicPedagogy(activeTopic);
  const [quizSelection, setQuizSelection] = useState<Record<number, number>>({});
  const [showChallengeSolution, setShowChallengeSolution] = useState(false);

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narration = `${activeTopic.title}. In brief: ${topicBrief.mentalModel}. The golden rule: ${topicBrief.goldenRule}. When to use: ${topicBrief.whenToUse}. Common pitfall to avoid: ${topicBrief.commonPitfall}.`;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Level Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
        {COURSE_LEVELS.map((level, index) => {
          const isSelected = selectedLevelId === level.id;
          const levelModuleIds = level.moduleIds;
          const levelTopics = allTopics.filter(t => levelModuleIds.includes(t.moduleId));
          const completedInLevel = levelTopics.filter(t => completedTopicIds.includes(t.id)).length;
          const percent = levelTopics.length > 0 ? Math.round((completedInLevel / levelTopics.length) * 100) : 0;

          // Check if previous level is completed
          let isLocked = false;
          if (index > 0) {
            const prevLevel = COURSE_LEVELS[index - 1];
            const prevLevelTopics = allTopics.filter(t => prevLevel.moduleIds.includes(t.moduleId));
            const prevLevelCompleted = prevLevelTopics.filter(t => completedTopicIds.includes(t.id)).length;
            if (prevLevelCompleted < prevLevelTopics.length) {
              isLocked = true;
            }
          }

          return (
            <button
              key={level.id}
              onClick={() => {
                if (isLocked) return;
                setSelectedLevelId(level.id);
                const firstTopic = SQL_MODULES.find(m => m.levelId === level.id)?.topics[0];
                if (firstTopic) setSelectedTopicId(firstTopic.id);
              }}
              className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden ${
                isLocked
                  ? 'bg-slate-950/50 border-slate-800/50 opacity-60 cursor-not-allowed'
                  : isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  isLocked ? 'bg-slate-800/50 text-slate-500 border-slate-800' :
                  isSelected ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  Level {level.id}
                </span>
                {isLocked ? (
                  <Lock className="h-3 w-3 text-slate-500" />
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">{percent}%</span>
                )}
              </div>
              <h3 className={`font-bold text-sm truncate ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                {level.name.split('—')[1] || level.name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{level.tagline}</p>
              
              {/* Mini progress bar */}
              {!isLocked && (
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2.5 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Learning Workspace: Sidebar + Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topics Navigation Directory */}
        <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sticky top-20 max-h-[calc(100vh-6rem)] flex flex-col">
          {/* Search bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search topics, rules, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-semibold text-slate-400">
            <span>Modules in Level {selectedLevelId}</span>
            <span className="text-[11px] text-indigo-400">{currentLevelModules.length} Modules</span>
          </div>

          {/* Module & Topic Tree */}
          <div className="overflow-y-auto pr-1 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
            {filteredModules.map(moduleItem => (
              <div key={moduleItem.id} className="space-y-1">
                <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-slate-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-800 text-[10px] text-indigo-400 font-mono">
                    {moduleItem.moduleNumber}
                  </span>
                  <span className="truncate">{moduleItem.title}</span>
                </div>

                <div className="pl-2 space-y-1">
                  {moduleItem.topics.map(topic => {
                    const isCurrent = topic.id === activeTopic.id;
                    const topicDone = completedTopicIds.includes(topic.id);
                    const b = TOPIC_BRIEFS[topic.id];
                    
                    const topicIdx = allTopics.findIndex(t => t.id === topic.id);
                    const isLocked = topicIdx > 0 && !completedTopicIds.includes(allTopics[topicIdx - 1].id);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => {
                          if (!isLocked) setSelectedTopicId(topic.id);
                        }}
                        className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isLocked 
                            ? 'opacity-40 cursor-not-allowed' 
                            : isCurrent
                              ? 'bg-indigo-600/15 border border-indigo-500/40 text-indigo-300 font-semibold shadow-xs'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">{topic.topicNumber}</span>
                          <div className="truncate">
                            <span className="truncate block">{topic.title}</span>
                            {b && (
                              <span className="text-[10px] text-slate-500 font-normal truncate block">
                                {b.mentalModel}
                              </span>
                            )}
                          </div>
                        </div>
                        {isLocked ? (
                          <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-1" />
                        ) : topicDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 ml-1" />
                        ) : (
                          <div className="h-2 w-2 rounded-full border border-slate-700 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Dual Mode Reader (Brief Mode vs Deep Dive) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Topic Header Card with Mode Switcher */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                  Topic {activeTopic.topicNumber}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  Module {activeModule?.moduleNumber}: {activeModule?.title}
                </span>
              </div>

              {/* View Mode Toggle: Brief vs Comprehensive */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('brief')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'brief'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Brief Mode</span>
                </button>
                <button
                  onClick={() => setViewMode('comprehensive')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'comprehensive'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Deep Dive (12-Point)</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                  {activeTopic.title}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {activeTopic.shortSummary}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Text-to-Speech Read Aloud */}
                {'speechSynthesis' in window && (
                  <button
                    onClick={handleToggleSpeech}
                    title={isSpeaking ? 'Stop narration' : 'Listen to brief summary'}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      isSpeaking
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                  </button>
                )}

                {/* Explain Briefly with AI Tutor */}
                <button
                  onClick={() => onAskAiTutor(activeTopic, true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  <span>Explain Briefly (AI)</span>
                </button>

                {/* Mark Complete */}
                <button
                  onClick={() => onToggleTopicComplete(activeTopic.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isCompleted ? 'Done (+50 XP)' : 'Mark Done'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BRIEF REVISION MODE CONTENT                              */}
          {/* ======================================================== */}
          {viewMode === 'brief' ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Executive Brief Card */}
              <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-500/20">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm tracking-wide">
                    <Zap className="h-4 w-4 text-indigo-400 fill-indigo-400/20" />
                    <span>In Brief: 30-Second Mental Model</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    High-Yield Revision
                  </span>
                </div>

                {/* Core Mental Model */}
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 mb-4">
                  <p className="text-base font-medium text-white leading-relaxed">
                    "{topicBrief.mentalModel}"
                  </p>
                </div>

                {/* Architecture Diagram (if available) */}
                {activeTopic.visualArchitectureDiagram && (
                  <MermaidViewer chart={activeTopic.visualArchitectureDiagram} />
                )}

                {/* The Golden Rule */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs leading-relaxed flex items-start gap-3 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-300 text-xs font-bold uppercase tracking-wider mb-0.5">
                      The Golden Rule to Remember
                    </strong>
                    {topicBrief.goldenRule}
                  </div>
                </div>

                {/* Minimal 1-Line Syntax */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-sky-400 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" />
                      Minimal Syntax Template
                    </span>
                    <button
                      onClick={() => copyToClipboard(topicBrief.minimalSyntax, 'brief_syntax')}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800/80 px-2 py-0.5 rounded transition-colors"
                    >
                      {copiedSection === 'brief_syntax' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === 'brief_syntax' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800 overflow-x-auto">
                    {topicBrief.minimalSyntax}
                  </pre>
                </div>

                {/* Dual Grid: When to Use & Common Pitfall */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                      <Compass className="h-4 w-4 text-sky-400" />
                      <span>When to Use</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {topicBrief.whenToUse}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                      <AlertTriangle className="h-4 w-4 text-rose-400" />
                      <span>Watch Out (Common Pitfall)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {topicBrief.commonPitfall}
                    </p>
                  </div>
                </div>

                {/* 3 Core Bullet Points */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="block text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                    Key Bullet Takeaways
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                    {topicBrief.bulletPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Live Example & Output */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <Play className="h-4 w-4" />
                    <span>Quick Interactive Query & Output</span>
                  </div>
                  <button
                    onClick={() => onRunInPlayground(activeTopic.exampleQuery, activeTopic.sampleDatabase)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Run in SQL Playground</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto leading-relaxed">
                  {activeTopic.exampleQuery}
                </pre>

                {/* Result table preview */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                      <tr>
                        {activeTopic.expectedOutput.columns.map((col, idx) => (
                          <th key={idx} className="px-4 py-2 font-mono text-indigo-300">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                      {activeTopic.expectedOutput.rows.slice(0, 4).map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-900/40">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="px-4 py-1.5 whitespace-nowrap">
                              {cell === null ? <span className="italic text-slate-500">NULL</span> : String(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>Database Sandbox: <strong className="text-indigo-300 font-mono uppercase">{activeTopic.sampleDatabase}</strong></span>
                  <button
                    onClick={() => setViewMode('comprehensive')}
                    className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 text-xs"
                  >
                    <span>Read complete 7-step deep dive</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* COMPREHENSIVE 7-STEP PEDAGOGICAL VIEW                    */
            /* ======================================================== */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Executive In-Brief Summary Banner at top of deep dive */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-200 flex items-start gap-3">
                <Zap className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-300 block text-xs font-bold uppercase tracking-wider mb-0.5">
                    Executive Brief:
                  </strong>
                  {topicBrief.mentalModel}
                  <span className="block mt-1 text-amber-300">
                    <strong>Golden Rule:</strong> {topicBrief.goldenRule}
                  </span>
                </div>
              </div>

              {/* STEP 1: What is it? */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold text-sm uppercase tracking-wider">
                  <BookMarked className="h-4 w-4" />
                  <span>1. What is it?</span>
                </div>
                <div className="text-slate-200 text-sm leading-relaxed font-normal">
                  <ul className="list-disc pl-5 space-y-2">
                    {activeTopic.whatIsIt.split(/(?<=\.)\s+/).map((sentence, idx) => 
                      sentence.trim() ? <li key={idx}>{sentence}</li> : null
                    )}
                  </ul>
                  {/* Architecture Diagram (if available) */}
                  {activeTopic.visualArchitectureDiagram && (
                    <MermaidViewer chart={activeTopic.visualArchitectureDiagram} />
                  )}
                </div>
              </div>

              {/* STEP 2: Why do we need it? */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                  <Lightbulb className="h-4 w-4" />
                  <span>2. Why do we need it?</span>
                </div>
                <div className="text-slate-200 text-sm leading-relaxed font-normal">
                  <ul className="list-disc pl-5 space-y-2">
                    {(pedagogy.whyDoWeNeedIt || '').split(/(?<=\.)\s+/).map((sentence: string, idx: number) => 
                      sentence.trim() ? <li key={idx}>{sentence}</li> : null
                    )}
                  </ul>
                </div>
              </div>

              {/* STEP 3: Syntax */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
                    <Terminal className="h-4 w-4" />
                    <span>3. Syntax</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(activeTopic.syntax, 'syntax')}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 px-2 py-1 rounded-md transition-colors"
                  >
                    {copiedSection === 'syntax' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedSection === 'syntax' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800 overflow-x-auto leading-relaxed">
                  {activeTopic.syntax}
                </pre>
              </div>

              {/* STEP 4: Simple Example Query */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <Play className="h-4 w-4" />
                    <span>4. Simple Example</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRunInPlayground(activeTopic.exampleQuery, activeTopic.sampleDatabase)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Run in SQL Playground</span>
                    </button>
                  </div>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto leading-relaxed">
                  {activeTopic.exampleQuery}
                </pre>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Target Database Sandbox: <strong className="text-slate-200 uppercase font-mono">{activeTopic.sampleDatabase}</strong></span>
                  <span>Click "Run in SQL Playground" to execute live</span>
                </div>
              </div>

              {/* STEP 5: Example Output Grid */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Layers className="h-4 w-4" />
                  <span>5. Example Output</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                      <tr>
                        {activeTopic.expectedOutput.columns.map((col, idx) => (
                          <th key={idx} className="px-4 py-2.5 font-mono text-indigo-300">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                      {activeTopic.expectedOutput.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-900/40">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="px-4 py-2 whitespace-nowrap">
                              {cell === null ? (
                                <span className="italic text-slate-500">NULL</span>
                              ) : (
                                String(cell)
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* STEP 6: Line-by-Line Explanation */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-teal-400 font-bold text-sm uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>6. Line-by-Line Explanation</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  {pedagogy.lineByLineExplanation.map((explanation, idx) => (
                    <div key={idx} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                      <span className="text-teal-400 font-bold mr-2">#{idx + 1}</span>
                      <span>{explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 7: Real-World Example */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
                    <FolderKanban className="h-4 w-4" />
                    <span>7. Real-World Example</span>
                  </div>
                  <button
                    onClick={() => onRunInPlayground(activeTopic.realWorldExample.query, activeTopic.sampleDatabase)}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20"
                  >
                    Run Industry Query
                  </button>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    <strong className="text-white block mb-1">Scenario:</strong>
                    {activeTopic.realWorldExample.scenario}
                  </p>
                  <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-rose-300 border border-slate-800 overflow-x-auto">
                    {activeTopic.realWorldExample.query}
                  </pre>
                  <p className="text-xs text-slate-400 italic">
                    {activeTopic.realWorldExample.explanation}
                  </p>
                </div>
              </div>

              {/* STEP 8: Common Mistakes */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4" />
                  <span>8. Common Mistakes</span>
                </div>
                <div className="space-y-3">
                  {pedagogy.commonMistakes.map((m, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-rose-300 font-semibold text-xs flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                        <span>Mistake: {m.mistake}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Why it fails: </strong>{m.whyItFails}
                      </p>
                      <div className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 font-sans block text-[10px] uppercase font-bold tracking-wider mb-1">Correction:</span>
                        {m.correctedSql}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 9: Interview Questions */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold text-sm uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4" />
                  <span>9. Interview Questions</span>
                </div>
                <div className="space-y-3">
                  {pedagogy.interviewQuestions.map((q, idx) => (
                    <details key={idx} className="group bg-slate-950/70 rounded-xl border border-slate-800">
                      <summary className="flex items-center justify-between p-4 cursor-pointer select-none outline-none">
                        <span className="text-xs font-bold text-slate-200 group-open:text-purple-400 transition-colors">Q{idx + 1}: {q.question}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 ml-4 shrink-0">
                          {q.level}
                        </span>
                      </summary>
                      <div className="p-4 pt-0">
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/50 mt-1">
                          <strong className="text-purple-300 block mb-1.5">Model Answer:</strong>
                          {q.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* STEP 10: Practice Queries */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold text-sm uppercase tracking-wider">
                  <ListChecks className="h-4 w-4" />
                  <span>10. Practice Queries</span>
                </div>
                <div className="space-y-3">
                  {pedagogy.practiceQueries.map((pq, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">Task {idx + 1}: {pq.task}</span>
                        <button
                          onClick={() => onRunInPlayground(pq.solutionSql, activeTopic.sampleDatabase)}
                          className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20"
                        >
                          Run in Sandbox
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 italic">
                        <strong>Hint:</strong> {pq.hint}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 11: Quiz */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <Award className="h-4 w-4" />
                    <span>11. Knowledge Check Quiz</span>
                  </div>
                  {Object.keys(quizSelection).length > 0 && (
                    <button
                      onClick={() => setQuizSelection({})}
                      className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 transition-colors"
                    >
                      Retest Quiz
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {pedagogy.quiz.map((item, qIdx) => {
                    const selected = quizSelection[qIdx];
                    const isAnswered = selected !== undefined;
                    const isCorrect = selected === item.correctIndex;

                    return (
                      <div key={qIdx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="text-xs font-semibold text-slate-200">
                          {qIdx + 1}. {item.question}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.options.map((opt, optIdx) => {
                            let btnStyle = "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800";
                            if (isAnswered) {
                              if (optIdx === item.correctIndex) {
                                btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                              } else if (optIdx === selected) {
                                btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                              } else {
                                btnStyle = "bg-slate-900/40 text-slate-500 border-slate-800/40";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isAnswered}
                                onClick={() => setQuizSelection(prev => ({ ...prev, [qIdx]: optIdx }))}
                                className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${btnStyle}`}
                              >
                                <span className="font-mono text-[10px] mr-1.5 opacity-60">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {isAnswered && (
                          <div className={`p-2.5 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                            <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {item.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 12: Coding Challenge */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-sm uppercase tracking-wider">
                    <Code2 className="h-4 w-4" />
                    <span>12. Coding Challenge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowChallengeSolution(!showChallengeSolution)}
                      className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-800 border border-slate-700"
                    >
                      {showChallengeSolution ? 'Hide Solution' : 'Reveal Solution'}
                    </button>
                    <button
                      onClick={() => onRunInPlayground(pedagogy.codingChallenge.starterCode, pedagogy.codingChallenge.targetDatabase)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-sm transition-all"
                    >
                      Open in Playground
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-xs font-bold text-white">
                    {pedagogy.codingChallenge.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    {pedagogy.codingChallenge.description}
                  </p>
                  <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-fuchsia-300 border border-slate-800 overflow-x-auto">
                    {pedagogy.codingChallenge.starterCode}
                  </pre>
                  {showChallengeSolution && (
                    <div className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20 space-y-1.5">
                      <div className="text-xs font-bold text-fuchsia-300">Verified Solution:</div>
                      <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto">
                        {pedagogy.codingChallenge.solutionSql}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
              {/* STEP 13: Reference Materials & Books */}
              {activeTopic.referenceMaterials && (
                <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-orange-400 font-bold text-sm uppercase tracking-wider">
                    <BookOpen className="h-4 w-4" />
                    <span>13. Reference Materials & Books</span>
                  </div>
                  <div className="space-y-4 text-sm text-slate-300">
                    {activeTopic.referenceMaterials.books && activeTopic.referenceMaterials.books.length > 0 && (
                      <div className="space-y-2">
                        <strong className="text-orange-300 block text-xs tracking-wider uppercase">Books to Read:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          {activeTopic.referenceMaterials.books.map((book, idx) => (
                            <li key={idx} className="text-slate-300">{book}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeTopic.referenceMaterials.docs && activeTopic.referenceMaterials.docs.length > 0 && (
                      <div className="space-y-2">
                        <strong className="text-orange-300 block text-xs tracking-wider uppercase">Official Documentation:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          {activeTopic.referenceMaterials.docs.map((doc, idx) => (
                            <li key={idx} className="text-slate-300">{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeTopic.referenceMaterials.notes && (
                      <div className="space-y-2">
                        <strong className="text-orange-300 block text-xs tracking-wider uppercase">Instructor Notes:</strong>
                        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                          {activeTopic.referenceMaterials.notes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {prevTopic ? (
              <button
                onClick={() => setSelectedTopicId(prevTopic.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous: {prevTopic.title}</span>
              </button>
            ) : <div />}

            {nextTopic ? (
              <button
                onClick={() => {
                  if (!isCompleted) {
                    onToggleTopicComplete(activeTopic.id);
                  }
                  setSelectedTopicId(nextTopic.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isCompleted 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                }`}
              >
                <span>{isCompleted ? `Next: ${nextTopic.title}` : `Complete & Unlock Next`}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              !isCompleted && (
                <button
                  onClick={() => onToggleTopicComplete(activeTopic.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mark Course Complete</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
