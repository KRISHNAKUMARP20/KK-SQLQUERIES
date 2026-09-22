import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { TextbookView } from './components/TextbookView';
import { SqlPlayground } from './components/SqlPlayground';
import { PracticeView } from './components/PracticeView';
import { QuizView } from './components/QuizView';
import { ExamView } from './components/ExamView';
import { ProjectsView } from './components/ProjectsView';
import { DashboardView } from './components/DashboardView';
import { ArchitectureView } from './components/ArchitectureView';
import { AITutorModal } from './components/AITutorModal';
import { AuthView } from './components/AuthView';
import { UserProgress, Certificate, SQLTopicLesson, PracticeProblem } from './types';
import { DatabaseKey, QueryResult } from './services/sqlEngine';

const STORAGE_KEY_PROGRESS = 'kk_sql_academy_progress';
const STORAGE_KEY_CERTS = 'kk_sql_academy_certs';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('textbook');
  const [userRole, setUserRole] = useState<'STUDENT' | 'INSTRUCTOR' | 'ADMIN'>('STUDENT');

  // Playground pre-fill state when navigated from other tabs
  const [playgroundSql, setPlaygroundSql] = useState<string>(
    'SELECT d.department_name, COUNT(s.id) AS student_count, AVG(s.marks) AS avg_marks\nFROM departments d\nLEFT JOIN students s ON d.id = s.department_id\nGROUP BY d.department_name\nORDER BY avg_marks DESC;'
  );
  const [playgroundDb, setPlaygroundDb] = useState<DatabaseKey>('college');

  // AI Tutor Modal state
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [aiTutorContext, setAiTutorContext] = useState<{
    topicTitle?: string;
    query?: string;
    error?: string;
    explainBriefly?: boolean;
    briefSummary?: string;
  } | undefined>(undefined);

  // User Progress and Gamification
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      userId: 'user-kk',
      currentLevelId: 1,
      completedTopics: ['mod-1-topic-1'],
      solvedProblems: [],
      xp: 350,
      streakDays: 7,
      queriesExecuted: 12,
      lastActiveDate: new Date().toISOString()
    };
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Persist progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(certificates));
    } catch (e) {
      console.error(e);
    }
  }, [certificates]);

  // Handlers
  const handleRunInPlayground = (sql: string, db: string) => {
    setPlaygroundSql(sql);
    setPlaygroundDb(db as DatabaseKey);
    setActiveTab('playground');
  };

  const handleOpenAiTutorForTopic = (topic: SQLTopicLesson, explainBriefly?: boolean) => {
    setAiTutorContext({
      topicTitle: topic.title,
      query: topic.exampleQuery,
      explainBriefly: explainBriefly || false,
      briefSummary: topic.shortSummary
    });
    setIsAiTutorOpen(true);
  };

  const handleOpenAiTutorForProblem = (problem: PracticeProblem, userSql: string) => {
    setAiTutorContext({
      topicTitle: `Practice Challenge: ${problem.title}`,
      query: userSql
    });
    setIsAiTutorOpen(true);
  };

  const handleOpenAiTutorForQuery = (query: string, result?: QueryResult) => {
    setAiTutorContext({
      query,
      error: result && !result.success ? result.error : undefined
    });
    setIsAiTutorOpen(true);
  };

  const handleToggleTopicComplete = (topicId: string) => {
    setProgress(prev => {
      const exists = prev.completedTopics.includes(topicId);
      const updatedTopics = exists
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      
      return {
        ...prev,
        completedTopics: updatedTopics,
        xp: exists ? Math.max(0, prev.xp - 50) : prev.xp + 50
      };
    });
  };

  const handleProblemSolved = (problemId: string) => {
    setProgress(prev => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      return {
        ...prev,
        solvedProblems: [...prev.solvedProblems, problemId],
        xp: prev.xp + 100
      };
    });
  };

  const handleQueryExecuted = () => {
    setProgress(prev => ({
      ...prev,
      queriesExecuted: prev.queriesExecuted + 1
    }));
  };

  const handleQuizScoreUpdated = (earnedXp: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + earnedXp
    }));
  };

  const handleCertificateIssued = (cert: Certificate) => {
    setCertificates(prev => [cert, ...prev.filter(c => c.certificateId !== cert.certificateId)]);
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + 500
    }));
  };

  if (!isAuthenticated) {
    return <AuthView onLogin={(user) => {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onOpenAiTutor={() => {
          setAiTutorContext(undefined);
          setIsAiTutorOpen(true);
        }}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Tab Views */}
      <main className="flex-1">
        {activeTab === 'textbook' && (
          <TextbookView
            onRunInPlayground={handleRunInPlayground}
            onAskAiTutor={handleOpenAiTutorForTopic}
            completedTopicIds={progress.completedTopics}
            onToggleTopicComplete={handleToggleTopicComplete}
          />
        )}

        {activeTab === 'playground' && (
          <SqlPlayground
            initialSql={playgroundSql}
            initialDb={playgroundDb}
            onAskAiTutorForQuery={handleOpenAiTutorForQuery}
            onQueryExecuted={handleQueryExecuted}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            solvedProblemIds={progress.solvedProblems}
            onProblemSolved={handleProblemSolved}
            onAskAiTutor={handleOpenAiTutorForProblem}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onQuizScoreUpdated={handleQuizScoreUpdated}
          />
        )}

        {activeTab === 'exam' && (
          <ExamView
            studentName="Krishna Kumar (KK)"
            onCertificateIssued={handleCertificateIssued}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            onRunInPlayground={handleRunInPlayground}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            progress={progress}
            certificates={certificates}
            onNavigateToTextbook={() => setActiveTab('textbook')}
            onNavigateToPlayground={() => setActiveTab('playground')}
            onNavigateToExam={() => setActiveTab('exam')}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView />
        )}
      </main>

      {/* AI Tutor Assistant Modal */}
      <AITutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialContext={aiTutorContext}
      />

      {/* Global Compact Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-2">
          <span>KK SQL Academy © {new Date().getFullYear()} — Built for Krishna Kumar (KK)</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>5 Levels</span>
            <span>•</span>
            <span>42 Modules</span>
            <span>•</span>
            <span>7 Real-World Projects</span>
            <span>•</span>
            <span>100-Pt Final Exam</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
