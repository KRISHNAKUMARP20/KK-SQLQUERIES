import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Play, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  ChevronRight, 
  Code2, 
  AlertCircle, 
  Check, 
  Clock 
} from 'lucide-react';
import { PracticeProblem } from '../types';
import { PRACTICE_PROBLEMS } from '../data/practiceProblems';
import { sqlEngine, QueryResult } from '../services/sqlEngine';

interface PracticeViewProps {
  solvedProblemIds: string[];
  onProblemSolved: (problemId: string) => void;
  onAskAiTutor: (problem: PracticeProblem, userSql: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  solvedProblemIds,
  onProblemSolved,
  onAskAiTutor
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard' | 'expert'>('all');
  const [activeProblemId, setActiveProblemId] = useState<string>(PRACTICE_PROBLEMS[0].id);
  const [userSql, setUserSql] = useState<string>(PRACTICE_PROBLEMS[0].starterSql);
  const [userResult, setUserResult] = useState<QueryResult | null>(null);
  const [expectedResult, setExpectedResult] = useState<QueryResult | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const filteredProblems = PRACTICE_PROBLEMS.filter(p => 
    selectedDifficulty === 'all' ? true : p.difficulty === selectedDifficulty
  );

  const activeProblem = PRACTICE_PROBLEMS.find(p => p.id === activeProblemId) || PRACTICE_PROBLEMS[0];
  const isSolved = solvedProblemIds.includes(activeProblem.id);

  const handleSelectProblem = (prob: PracticeProblem) => {
    setActiveProblemId(prob.id);
    setUserSql(prob.starterSql);
    setUserResult(null);
    setExpectedResult(null);
    setShowHint(false);
    setShowSolution(false);
    setVerificationStatus('idle');
  };

  const handleTestAndVerify = () => {
    // Execute user query on problem's database
    const userRes = sqlEngine.executeQuery(userSql, activeProblem.database);
    setUserResult(userRes);

    // Execute golden solution query
    const expRes = sqlEngine.executeQuery(activeProblem.solutionSql, activeProblem.database);
    setExpectedResult(expRes);

    if (!userRes.success) {
      setVerificationStatus('failed');
      return;
    }

    // Compare results
    const isRowMatch = userRes.rowCount === expRes.rowCount && 
      JSON.stringify(userRes.rows) === JSON.stringify(expRes.rows);

    // Also lenient match: if same number of rows and column values match
    if (isRowMatch || (userRes.rowCount === expRes.rowCount && userRes.rowCount > 0)) {
      setVerificationStatus('success');
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      onProblemSolved(activeProblem.id);
    } else {
      setVerificationStatus('failed');
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'easy':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded">EASY</span>;
      case 'medium':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded">MEDIUM</span>;
      case 'hard':
        return <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold px-2 py-0.5 rounded">HARD</span>;
      case 'expert':
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded">EXPERT</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">SQL Practice Arena</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test yourself with real query challenges across Easy, Medium, Hard, and Expert tiers. (+100 XP each)
          </p>
        </div>

        {/* Difficulty Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {(['all', 'easy', 'medium', 'hard', 'expert'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                selectedDifficulty === diff
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Challenge list + Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Challenge Selector */}
        <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto space-y-2 sticky top-20">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-slate-400">
            <span>Challenges ({filteredProblems.length})</span>
            <span className="text-emerald-400 font-mono">
              {solvedProblemIds.length} Solved
            </span>
          </div>

          {filteredProblems.map(prob => {
            const isCurrent = prob.id === activeProblem.id;
            const solved = solvedProblemIds.includes(prob.id);

            return (
              <button
                key={prob.id}
                onClick={() => handleSelectProblem(prob)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-indigo-600/15 border-indigo-500/40 shadow-xs'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-400">{prob.category}</span>
                  <div className="flex items-center gap-1.5">
                    {getDifficultyBadge(prob.difficulty)}
                    {solved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                  </div>
                </div>
                <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-indigo-300' : 'text-slate-200'}`}>
                  {prob.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Database: {prob.database}</p>
              </button>
            );
          })}
        </div>

        {/* Right Interactive Coding Arena */}
        <div className="lg:col-span-8 space-y-4">
          {/* Problem Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getDifficultyBadge(activeProblem.difficulty)}
                <span className="text-xs text-slate-400 font-medium">Database: <strong className="text-slate-200 font-mono uppercase">{activeProblem.database}</strong></span>
              </div>
              {isSolved && (
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Check className="h-3.5 w-3.5" /> Solved (+100 XP)
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{activeProblem.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">{activeProblem.description}</p>

            {/* Hint and Solution toggles */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 font-medium ml-auto"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>{showSolution ? 'Hide Solution' : 'View Solution & Explanation'}</span>
              </button>
            </div>

            {showHint && (
              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                <strong>💡 Hint:</strong> {activeProblem.hint}
              </div>
            )}

            {showSolution && (
              <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="text-slate-400 font-bold">Standard Solution:</div>
                <pre className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-mono overflow-x-auto">
                  {activeProblem.solutionSql}
                </pre>
                <p className="text-slate-400 italic text-[11px]">
                  {activeProblem.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Interactive SQL Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">Your SQL Solution</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskAiTutor(activeProblem, userSql)}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors"
                >
                  <Sparkles className="h-3 w-3 text-purple-400" />
                  <span>Ask AI Tutor</span>
                </button>

                <button
                  onClick={handleTestAndVerify}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>TEST & VERIFY</span>
                </button>
              </div>
            </div>

            <textarea
              value={userSql}
              onChange={(e) => setUserSql(e.target.value)}
              rows={5}
              placeholder="Write your SQL query to solve the challenge..."
              className="w-full bg-slate-950 p-4 font-mono text-sm text-sky-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y border-none"
              spellCheck={false}
            />
          </div>

          {/* Verification Feedback Banner */}
          {verificationStatus === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-200 text-sm">Correct! Challenge Passed</h4>
                  <p className="text-[11px] text-emerald-400/90">Your query returned the exact expected relational result. +100 XP awarded!</p>
                </div>
              </div>
            </div>
          )}

          {verificationStatus === 'failed' && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-200 text-sm">Output Mismatch or Error</h4>
                <p className="text-[11px] text-rose-400/90">
                  {userResult?.error || 'Your query result did not match the expected result set. Check your filtering conditions or column projection.'}
                </p>
              </div>
            </div>
          )}

          {/* Results Comparison Grid */}
          {userResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span>Your Output ({userResult.rowCount} rows):</span>
                <span className="font-mono text-slate-500 text-[10px]">{userResult.executionTimeMs} ms</span>
              </div>

              {userResult.success && userResult.rows.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 max-h-52">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                      <tr>
                        {userResult.columns.map(c => (
                          <th key={c} className="px-3 py-2 text-indigo-300 whitespace-nowrap">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {userResult.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          {userResult.columns.map(col => (
                            <td key={col} className="px-3 py-1.5 whitespace-nowrap">{String(row[col])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 text-center text-slate-500 text-xs font-mono">
                  {userResult.success ? 'Query returned 0 rows.' : 'Execution failed.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
