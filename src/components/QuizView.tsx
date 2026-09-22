import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Terminal, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizAndExamData';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  onQuizScoreUpdated: (earnedXp: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onQuizScoreUpdated }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => 
    selectedLevel === 'all' ? true : q.levelId === selectedLevel
  );

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submitted[questionId]) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitAnswer = (q: QuizQuestion) => {
    if (answers[q.id] === undefined) return;
    setSubmitted(prev => ({ ...prev, [q.id]: true }));
    if (answers[q.id] === q.correctIndex) {
      onQuizScoreUpdated(25);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted({});
  };

  const totalAnswered = Object.keys(submitted).length;
  const totalCorrect = filteredQuestions.filter(q => submitted[q.id] && answers[q.id] === q.correctIndex).length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <HelpCircle className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">SQL Topic & Level Quizzes</h2>
          </div>
          <p className="text-xs text-slate-400">
            Verify your mastery across relational theory, query output tracing, debugging, and production scenarios. (+25 XP each)
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['all', 1, 2, 3, 4, 5] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : `Level ${lvl}`}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl border border-slate-700"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Score Bar */}
      {totalAnswered > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">Score Progress:</span>
            <span className="text-sm font-bold text-purple-400 font-mono">
              {totalCorrect} / {filteredQuestions.length} Correct ({Math.round((totalCorrect / filteredQuestions.length) * 100)}%)
            </span>
          </div>
          <span className="text-xs text-amber-400 font-bold font-mono">
            +{totalCorrect * 25} XP Earned
          </span>
        </div>
      )}

      {/* Question Cards */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isSubmitted = submitted[q.id];
          const selectedOpt = answers[q.id];
          const isCorrect = selectedOpt === q.correctIndex;

          return (
            <div 
              key={q.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 transition-all"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-slate-300 uppercase border border-slate-700">
                    Question {idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    {q.type} • Level {q.levelId}
                  </span>
                </div>

                {isSubmitted && (
                  <div className="flex items-center gap-1 text-xs font-bold">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" /> Correct (+25 XP)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400">
                        <XCircle className="h-4 w-4" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-white mb-3 leading-snug">
                {q.question}
              </h3>

              {/* Optional Code Snippet */}
              {q.codeSnippet && (
                <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800 overflow-x-auto mb-4 leading-relaxed">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Options Radio List */}
              <div className="space-y-2 mb-4">
                {q.options.map((opt, optIdx) => {
                  let optStyle = 'border-slate-800 hover:border-slate-700 bg-slate-950/60 text-slate-300';
                  
                  if (selectedOpt === optIdx && !isSubmitted) {
                    optStyle = 'border-purple-500 bg-purple-500/15 text-purple-200 font-medium';
                  }

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-200 font-medium';
                    } else if (selectedOpt === optIdx) {
                      optStyle = 'border-rose-500 bg-rose-500/15 text-rose-200';
                    } else {
                      optStyle = 'border-slate-800/50 bg-slate-950/30 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-3 transition-all ${optStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold font-mono">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit Button or Explanation */}
              {!isSubmitted ? (
                <button
                  onClick={() => handleSubmitAnswer(q)}
                  disabled={selectedOpt === undefined}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <strong className="text-slate-300 font-bold block">Relational Explanation:</strong>
                  <p className="text-slate-400 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
