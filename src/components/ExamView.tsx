import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  BookOpen, 
  AlertCircle, 
  RefreshCcw, 
  Download, 
  CheckCircle, 
  XCircle, 
  QrCode,
  Clock,
  AlertTriangle,
  RotateCcw,
  Check,
  Sparkles,
  Printer,
  Play
} from 'lucide-react';
import { FINAL_EXAM_QUESTIONS } from '../data/quizAndExamData';
import { ExamQuestion, Certificate } from '../types';

interface ExamViewProps {
  studentName?: string;
  onCertificateIssued: (cert: Certificate) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  studentName = 'Krishna Kumar (KK)',
  onCertificateIssued
}) => {
  const [candidateName, setCandidateName] = useState(studentName);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [earnedScore, setEarnedScore] = useState(0);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  // Anti-Cheat State
  const [isExamActive, setIsExamActive] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [disqualified, setDisqualified] = useState(false);

  const totalPoints = FINAL_EXAM_QUESTIONS.reduce((acc, q) => acc + q.points, 0);

  // Anti-cheat Listeners
  useEffect(() => {
    if (!isExamActive || disqualified || examSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleMalpractice();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleMalpractice();
      }
    };

    const handleMalpractice = () => {
      setWarnings(prev => {
        const newWarnings = prev + 1;
        if (newWarnings >= 2) {
          setDisqualified(true);
          setExamSubmitted(true);
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
          }
        }
        return newWarnings;
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isExamActive, disqualified, examSubmitted]);

  const handleShowSampleCertificate = () => {
    setCertificate({
      studentName: candidateName || 'John Doe',
      score: 95,
      grade: 'Summa Cum Laude',
      issuedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      certificateId: 'KK-SQL-SMPL-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      verificationHash: '0x' + Math.random().toString(16).substr(2, 40)
    });
    setExamSubmitted(true);
  };

  const startSecureExam = async () => {
    if (!candidateName.trim()) {
      alert("Please enter your name for the certificate before starting.");
      return;
    }
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      }
      setIsExamActive(true);
      setWarnings(0);
      setDisqualified(false);
    } catch (err) {
      alert("Full screen mode is required to take this exam. Please allow full screen permissions.");
    }
  };

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (examSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleFinishExam = () => {
    let score = 0;
    FINAL_EXAM_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctOptionIndex) {
        score += q.points;
      }
    });

    setEarnedScore(score);
    setExamSubmitted(true);
    setIsExamActive(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }

    if (score >= 90) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      const newCert: Certificate = {
        certificateId: `KK-SQL-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        studentName: candidateName.trim() || 'Krishna Kumar',
        score,
        issuedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        grade: score >= 90 ? 'A+ (Distinction)' : score >= 80 ? 'A (Merit)' : 'B (Pass)',
        verificationHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      };
      setCertificate(newCert);
      onCertificateIssued(newCert);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setExamSubmitted(false);
    setEarnedScore(0);
    setCertificate(null);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Exam Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="h-5 w-5" />
              </span>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                KK SQL Academy — 100-Point Final Certification Exam
              </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl mt-1 leading-relaxed">
              Standardized evaluation covering Relational Database Theory, Complex Joins, Aggregates, CTEs, Window Functions, Performance Optimization, and Security. Passing score: <strong>90/100 points</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-right font-mono">
              <div className="text-[10px] text-slate-400">Total Marks</div>
              <div className="text-lg font-bold text-amber-400">100 Pts</div>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-right font-mono">
              <div className="text-[10px] text-slate-400">Passing Bar</div>
              <div className="text-lg font-bold text-emerald-400">90 Pts</div>
            </div>
          </div>
        </div>

        {/* Candidate input */}
        {!examSubmitted && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
            <label className="text-xs font-semibold text-slate-300">Candidate Name for Certificate:</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter your full name"
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-500 ml-auto">
              Progress: {answeredCount} of {FINAL_EXAM_QUESTIONS.length} Questions Answered
            </span>
          </div>
        )}
      </div>

      {/* Official Certificate Card if Passed */}
      {certificate && (
        <div className="bg-slate-950 p-2 rounded-3xl shadow-2xl relative max-w-4xl mx-auto my-8 print:shadow-none print:m-0 print:p-0">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border-4 border-amber-500/40 rounded-2xl p-2 relative overflow-hidden text-center h-full">
            {/* Inner decorative border */}
            <div className="border border-amber-500/20 rounded-xl p-8 relative h-full flex flex-col justify-between">
              
              {/* Subtle Guilloché decorative watermarks */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-xl border border-amber-200">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 tracking-wider font-serif">KK SQL</div>
                    <div className="text-xs text-amber-700 uppercase tracking-[0.2em] font-medium">Academy</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-500">ISSUE DATE</div>
                  <div className="text-sm font-mono text-slate-800 font-bold">{certificate.issuedAt}</div>
                </div>
              </div>

              <div className="space-y-6 flex-grow flex flex-col justify-center text-center">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-widest uppercase mb-2">
                    Certificate of Completion
                  </h2>
                  <p className="text-sm text-amber-700 uppercase tracking-[0.3em] font-bold">
                    Official Certification
                  </p>
                </div>

                <div className="space-y-4 my-8">
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">
                    This is to proudly certify that
                  </p>
                  
                  <div className="text-4xl sm:text-5xl font-bold font-serif text-slate-900 py-2 border-b border-slate-300 max-w-lg mx-auto inline-block pb-4">
                    {certificate.studentName}
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto italic">
                    has successfully completed the comprehensive curriculum and rigorous examinations of the <strong className="text-slate-900 not-italic">KK SQL Academy Masterclass</strong> with a passing score of <strong className="text-slate-900 not-italic">{certificate.score}%</strong>, demonstrating exceptional proficiency in Relational Database Design, Advanced Querying, Data Modeling, and Database Optimization.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-8 py-4">
                  <div className="text-center px-6 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-slate-400 block text-[10px] tracking-widest mb-1 font-bold">FINAL SCORE</span>
                    <span className="font-bold text-slate-800 text-2xl font-mono">{certificate.score}<span className="text-sm text-slate-400">/100</span></span>
                  </div>
                  <div className="text-center px-6 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-slate-400 block text-[10px] tracking-widest mb-1 font-bold">HONORS GRADE</span>
                    <span className="font-bold text-amber-600 text-2xl font-serif">{certificate.grade}</span>
                  </div>
                </div>
              </div>

              {/* Footer / Signatures / Verification */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end relative">
                
                {/* Gold Seal Image */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-4">
                  <img src="/certificate-seal.jpg" alt="Gold Seal" className="w-40 h-40 object-contain drop-shadow-xl mix-blend-multiply" />
                </div>

                {/* QR Code */}
                <div className="flex items-center gap-3 text-left">
                  <div className="bg-white p-1.5 rounded border border-slate-200 flex items-center justify-center">
                    <QrCode className="h-10 w-10 text-slate-900" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Scan to Verify</div>
                    <div className="text-[10px] font-mono text-slate-600 mt-0.5 max-w-[120px] truncate">{certificate.verificationHash}</div>
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex gap-16 relative z-10">
                  <div className="text-center">
                    <div className="font-['Brush_Script_MT',_cursive,serif] italic text-3xl text-slate-700 -mb-2 transform -rotate-2">
                      Krishna Kumar
                    </div>
                    <div className="w-40 border-t border-slate-400 mt-4 mb-1 mx-auto"></div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead Instructor</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="pt-6 flex justify-center gap-4 print:hidden">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-sm font-bold transition-all shadow-md"
            >
              <Download className="h-4 w-4" />
              Download / Print Certificate
            </button>
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all border border-slate-700"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Exam
            </button>
          </div>
        </div>
      )}

      {/* Failed Banner */}
      {examSubmitted && !disqualified && earnedScore < 90 && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-2xl text-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-rose-200">Exam Not Passed: {earnedScore} / 100 Points</h3>
          <p className="text-xs text-rose-300 max-w-md mx-auto">
            You scored {earnedScore} marks. A minimum of 90 marks is required to receive the official KK SQL Academy Certificate. Review your incorrect answers below and try again!
          </p>
          <button
            onClick={handleRetake}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all"
          >
            Retake Exam
          </button>
        </div>
      )}

      {/* Disqualified Banner */}
      {disqualified && (
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center space-y-4">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Disqualified due to Malpractice</h2>
          <p className="text-slate-300 max-w-lg mx-auto">
            You exited full screen mode or switched tabs multiple times during the exam. Strict anti-cheat rules enforce immediate termination of your exam attempt.
          </p>
          <button
            onClick={handleRetake}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-bold transition-all"
          >
            Acknowledge & Try Again
          </button>
        </div>
      )}

      {/* Warning Overlay */}
      {isExamActive && warnings === 1 && !disqualified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-orange-500/50 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
            <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Warning: Tab Switch Detected</h3>
            <p className="text-slate-300 text-sm mb-6">
              You have navigated away from the exam screen or exited full screen. This violates our strict anti-cheat policy. <br /><br />
              <strong className="text-orange-400">If you do this 1 more time, you will be disqualified.</strong>
            </p>
            <button
              onClick={async () => {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                  await elem.requestFullscreen().catch(() => {});
                }
              }}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl"
            >
              Resume Exam in Full Screen
            </button>
          </div>
        </div>
      )}

      {/* Start Exam Splash Screen */}
      {!isExamActive && !examSubmitted && !disqualified && (
        <div className="bg-slate-900 border border-slate-800 p-8 text-center rounded-2xl space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <Lock className="h-8 w-8 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Strict Proctored Exam</h2>
            <p className="text-slate-400 max-w-md mx-auto mt-2">
              This exam requires full-screen mode. If you switch tabs, minimize the window, or exit full-screen mode, you will receive a warning. A second violation will lead to immediate disqualification.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={startSecureExam}
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
            >
              <Play className="h-5 w-5" />
              Start Secure Exam
            </button>
            <button
              onClick={handleShowSampleCertificate}
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-all"
            >
              <Award className="h-5 w-5 text-amber-400" />
              View Sample Certificate
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      {(isExamActive || examSubmitted) && !disqualified && (
        <div className="space-y-4">
        {FINAL_EXAM_QUESTIONS.map((q, idx) => {
          const selectedOpt = answers[q.id];
          const isCorrect = selectedOpt === q.correctOptionIndex;

          return (
            <div 
              key={q.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-slate-300 uppercase border border-slate-700">
                    Question {idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-400 uppercase">
                    {q.section} Section
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {q.points} Points
                  </span>
                  {examSubmitted && (
                    <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isCorrect ? `+${q.points} Pts` : '0 Pts'}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-3">
                {q.question}
              </h3>

              {q.codeSnippet && (
                <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800 overflow-x-auto mb-4 leading-relaxed">
                  {q.codeSnippet}
                </pre>
              )}

              <div className="space-y-2 mb-3">
                {(q.options || []).map((opt, optIdx) => {
                  let style = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';

                  if (selectedOpt === optIdx && !examSubmitted) {
                    style = 'border-indigo-500 bg-indigo-500/15 text-indigo-200 font-medium';
                  }

                  if (examSubmitted) {
                    if (optIdx === q.correctOptionIndex) {
                      style = 'border-emerald-500 bg-emerald-500/15 text-emerald-200 font-medium';
                    } else if (selectedOpt === optIdx) {
                      style = 'border-rose-500 bg-rose-500/15 text-rose-200';
                    } else {
                      style = 'border-slate-800/40 bg-slate-950/20 text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={examSubmitted}
                      onClick={() => handleSelectAnswer(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-3 transition-all ${style}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold font-mono">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {examSubmitted && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <strong className="text-slate-300 font-bold block mb-1">Official Solution Rationale:</strong>
                  <p className="text-slate-400">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
        </div>
      )}

      {/* Finish & Submit Action Bar */}
      {isExamActive && !examSubmitted && !disqualified && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between sticky bottom-4 shadow-xl">
          <span className="text-xs text-slate-300">
            {answeredCount === FINAL_EXAM_QUESTIONS.length ? (
              <span className="text-emerald-400 font-medium">All questions answered. Ready to submit!</span>
            ) : (
              <span>{FINAL_EXAM_QUESTIONS.length - answeredCount} unanswered questions remaining</span>
            )}
          </span>

          <button
            onClick={handleFinishExam}
            disabled={answeredCount === 0}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            SUBMIT FINAL EXAM (100 PTS)
          </button>
        </div>
      )}
    </div>
  );
};
