export type CourseLevelId = 1 | 2 | 3 | 4 | 5;

export interface CourseLevel {
  id: CourseLevelId;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  color: string;
  bgLight: string;
  moduleIds: number[];
}

export interface TopicBrief {
  mentalModel: string;
  goldenRule: string;
  whenToUse: string;
  commonPitfall: string;
  minimalSyntax: string;
  bulletPoints: string[];
}

export interface SQLTopicLesson {
  id: string;
  moduleId: number;
  levelId: CourseLevelId;
  topicNumber: string;
  title: string;
  shortSummary: string;
  brief?: TopicBrief;
  visualArchitectureDiagram?: string;
  // Comprehensive 12-section pedagogical structure
  whatIsIt: string;
  whyDoWeNeedIt?: string;
  syntax: string;
  exampleQuery: string;
  expectedOutput: {
    columns: string[];
    rows: (string | number | null)[][];
  };
  lineByLineExplanation?: string[];
  howItWorks: string[];
  realWorldExample: {
    scenario: string;
    query: string;
    explanation: string;
  };
  commonMistakes?: {
    mistake: string;
    whyItFails: string;
    correctedSql: string;
  }[];
  interviewQuestions?: {
    question: string;
    answer: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  practiceQueries?: {
    task: string;
    starterSql: string;
    solutionSql: string;
    hint: string;
  }[];
  referenceMaterials?: {
    books: string[];
    docs: string[];
    notes: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  codingChallenge?: {
    title: string;
    description: string;
    targetDatabase: 'college' | 'ecommerce' | 'hospital' | 'banking' | 'library';
    starterCode: string;
    expectedOutputColumns: string[];
    solutionSql: string;
  };
  sampleDatabase: 'college' | 'ecommerce' | 'hospital' | 'banking' | 'library';
  practiceQuestion?: {
    prompt: string;
    starterSql: string;
    solutionSql: string;
    hint: string;
  };
}

export interface SQLModule {
  id: number;
  levelId: CourseLevelId;
  moduleNumber: number;
  title: string;
  category: string;
  description: string;
  topics: SQLTopicLesson[];
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  levelId: CourseLevelId;
  category: string;
  description: string;
  database: 'college' | 'ecommerce' | 'hospital' | 'banking' | 'library';
  starterSql: string;
  solutionSql: string;
  hint: string;
  explanation: string;
}

export type QuestionType = 'theory' | 'output' | 'debugging' | 'writing' | 'scenario';

export interface QuizQuestion {
  id: string;
  levelId: CourseLevelId;
  moduleId?: number;
  type: QuestionType;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamSection {
  id: string;
  title: string;
  weight: number; // percentage e.g. 15
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  section: 'fundamentals' | 'basic' | 'intermediate' | 'advanced' | 'expert' | 'practical';
  type: 'mcq' | 'debugging' | 'coding';
  question: string;
  points: number;
  codeSnippet?: string;
  options?: string[]; // for mcq
  correctOptionIndex?: number;
  expectedKeywords?: string[]; // for coding / debugging verification
  testQuery?: string; // query to run against sample db to verify result
  targetDatabase?: 'college' | 'ecommerce' | 'hospital' | 'banking' | 'library';
  explanation: string;
}

export interface RealWorldProject {
  id: string;
  name: string;
  icon: string;
  databaseName: string;
  industry: string;
  description: string;
  tablesCount: number;
  tables: {
    name: string;
    description: string;
    columns: { name: string; type: string; key?: 'PK' | 'FK'; description: string }[];
  }[];
  sampleQueries: {
    title: string;
    objective: string;
    sql: string;
    businessImpact: string;
  }[];
}

export interface Certificate {
  certificateId: string;
  studentName: string;
  score: number;
  issuedAt: string;
  grade: string;
  verificationHash: string;
}

export interface UserProgress {
  userId?: string;
  studentName: string;
  currentLevelId?: number;
  completedTopics: string[];
  completedTopicIds: string[];
  solvedProblems: string[];
  solvedPracticeIds: string[];
  queriesExecuted: number;
  quizScores: Record<string, number>; // quizId -> percentage
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  examAttempt?: {
    date: string;
    score: number;
    passed: boolean;
    certificateId: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progressText: string;
}

export interface TableColumnMeta {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
}

export interface TableMetadata {
  name: string;
  columns: TableColumnMeta[];
  rowCount: number;
  sampleRows: Record<string, any>[];
}
