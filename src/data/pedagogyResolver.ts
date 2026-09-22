import { SQLTopicLesson } from '../types';
import { TopicPedagogyExtension, TOPIC_EXTENSIONS } from './topicPedagogyData';
import { TOPIC_BRIEFS } from './topicBriefData';

/**
 * Resolves full 12-section pedagogical content for any topic in the curriculum.
 * If specific handcrafted extension exists, it uses it; otherwise it generates
 * mathematically sound, contextually accurate line-by-line breakdown, interview questions,
 * mistakes, practice queries, quizzes, and coding challenges from the topic's schema and domain.
 */
export function getFullTopicPedagogy(topic: SQLTopicLesson): TopicPedagogyExtension {
  if (TOPIC_EXTENSIONS[topic.id]) {
    return TOPIC_EXTENSIONS[topic.id];
  }

  const brief = TOPIC_BRIEFS[topic.id];
  const queryLines = topic.exampleQuery.split('\n').filter(l => l.trim().length > 0);
  
  // Synthesize line-by-line explanation from example query
  const lineByLine: string[] = queryLines.map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.toUpperCase().startsWith('SELECT')) {
      return `Line ${idx + 1}: "${trimmed}" — Projects the specified columns/expressions from memory or storage pages into the client result pipeline.`;
    } else if (trimmed.toUpperCase().startsWith('FROM')) {
      return `Line ${idx + 1}: "${trimmed}" — Identifies the underlying relational table or view source within the target sandbox schema.`;
    } else if (trimmed.toUpperCase().startsWith('WHERE')) {
      return `Line ${idx + 1}: "${trimmed}" — Applies row-level boolean filtering; only tuples where this predicate evaluates to TRUE continue down the execution tree.`;
    } else if (trimmed.toUpperCase().startsWith('GROUP BY')) {
      return `Line ${idx + 1}: "${trimmed}" — Groups identical rows into aggregation buckets, computing statistical accumulators per group.`;
    } else if (trimmed.toUpperCase().startsWith('HAVING')) {
      return `Line ${idx + 1}: "${trimmed}" — Filters the aggregated group buckets after GROUP BY evaluation.`;
    } else if (trimmed.toUpperCase().startsWith('ORDER BY')) {
      return `Line ${idx + 1}: "${trimmed}" — Enforces deterministic ordering on the output dataset using indexed or in-memory sorting.`;
    } else if (trimmed.toUpperCase().startsWith('LIMIT') || trimmed.toUpperCase().startsWith('OFFSET')) {
      return `Line ${idx + 1}: "${trimmed}" — Restricts output cardinality or skips rows for deterministic pagination windows.`;
    } else if (trimmed.toUpperCase().startsWith('JOIN') || trimmed.toUpperCase().includes('JOIN')) {
      return `Line ${idx + 1}: "${trimmed}" — Performs relational set combination across two tables based on foreign-key or equality join predicates.`;
    }
    return `Line ${idx + 1}: "${trimmed}" — Evaluates expression according to SQL standard execution semantics.`;
  });

  return {
    whyDoWeNeedIt: topic.shortSummary + ' In enterprise systems, ' + (brief ? brief.whenToUse : 'this SQL feature guarantees transactional consistency, predictable performance, and prevents data corruption across high-concurrency workloads.'),
    lineByLineExplanation: lineByLine.length > 0 ? lineByLine : [
      `1. Parses SQL tokens into an Abstract Syntax Tree (AST).`,
      `2. Optimizes access paths using indexes and relational statistics.`,
      `3. Streams matching tuples to the client application.`
    ],
    commonMistakes: [
      {
        mistake: brief ? brief.commonPitfall : 'Incorrect clause execution order or unindexed column scans.',
        whyItFails: 'SQL evaluates FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT, which differs from textual reading order.',
        correctedSql: topic.exampleQuery
      },
      {
        mistake: 'Assuming NULL compares equal to NULL with the "=" operator.',
        whyItFails: 'In SQL 3-valued logic, NULL represents unknown data; comparing anything with "=" and NULL yields UNKNOWN (falsy).',
        correctedSql: 'SELECT * FROM table_name WHERE column_name IS NOT NULL;'
      }
    ],
    interviewQuestions: [
      {
        question: `How does the database engine optimize and execute ${topic.title}?`,
        answer: `The query optimizer checks table statistics, assesses candidate B-tree indexes, and evaluates whether a full table scan, index range scan, or hash lookup provides the lowest estimated I/O cost.`,
        level: 'Intermediate'
      },
      {
        question: `What is the Golden Rule or best practice when using this SQL capability?`,
        answer: brief ? brief.goldenRule : 'Always declare explicit column projections rather than wildcard scans to reduce memory overhead and ensure predictable schema evolution.',
        level: 'Beginner'
      }
    ],
    practiceQueries: [
      {
        task: `Execute and inspect the core query for ${topic.title}.`,
        starterSql: topic.exampleQuery,
        solutionSql: topic.exampleQuery,
        hint: `Run the query in the SQL Playground using the ${topic.sampleDatabase} database sandbox.`
      },
      {
        task: `Query ${topic.realWorldExample.scenario.slice(0, 80)}...`,
        starterSql: topic.realWorldExample.query,
        solutionSql: topic.realWorldExample.query,
        hint: 'Use the real-world industry query provided in Step 7.'
      }
    ],
    quiz: [
      {
        question: `Which statement accurately describes the function of "${topic.title}"?`,
        options: [
          topic.shortSummary,
          'It deletes the active database catalog without prompt.',
          'It converts all relational tables into unindexed flat CSV files.',
          'It bypasses all primary key constraints unconditionally.'
        ],
        correctIndex: 0,
        explanation: `${topic.title}: ${topic.shortSummary}`
      },
      {
        question: 'What is the logical processing order for standard SQL SELECT queries?',
        options: [
          'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT',
          'SELECT → FROM → WHERE → ORDER BY → GROUP BY',
          'ORDER BY → LIMIT → WHERE → FROM → SELECT',
          'FROM → SELECT → WHERE → HAVING → GROUP BY'
        ],
        correctIndex: 0,
        explanation: 'SQL executes logically starting at the FROM/JOIN phase, filters with WHERE, groups with GROUP BY, tests HAVING aggregates, projects SELECT columns, sorts ORDER BY, and finally slices LIMIT.'
      }
    ],
    codingChallenge: {
      title: `${topic.title} Verification Challenge`,
      description: `Write and run a verified query on the ${topic.sampleDatabase.toUpperCase()} database schema to solve: ${topic.realWorldExample.scenario}`,
      targetDatabase: topic.sampleDatabase,
      starterCode: topic.realWorldExample.query,
      expectedOutputColumns: topic.expectedOutput.columns,
      solutionSql: topic.realWorldExample.query
    }
  };
}
