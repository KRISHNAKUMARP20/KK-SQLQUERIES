import { QuizQuestion, ExamQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    levelId: 1,
    moduleId: 2,
    type: 'theory',
    question: 'What is the fundamental purpose of a PRIMARY KEY in a relational table?',
    options: [
      'To allow duplicate values and accelerate data writing',
      'To uniquely identify each row in a table while forbidding NULL values',
      'To link two tables together without enforcing uniqueness',
      'To encrypt private column attributes on disk'
    ],
    correctIndex: 1,
    explanation: 'A PRIMARY KEY uniquely identifies each individual record in a table. By relational definition, it cannot contain duplicate values and cannot contain NULLs.'
  },
  {
    id: 'quiz-2',
    levelId: 2,
    moduleId: 8,
    type: 'output',
    question: 'Given a students table with 8 rows, what will the following query return?',
    codeSnippet: 'SELECT DISTINCT department_id FROM students;',
    options: [
      '8 rows containing every student\'s department_id',
      'Only the unique department_id values, eliminating duplicate department numbers',
      'A single count of total departments',
      'A syntax error because DISTINCT requires column aliases'
    ],
    correctIndex: 1,
    explanation: 'The DISTINCT keyword eliminates repeating duplicates, projecting only distinct department IDs present in the students table.'
  },
  {
    id: 'quiz-3',
    levelId: 2,
    moduleId: 10,
    type: 'debugging',
    question: 'Identify the bug in this query intended to find unreturned books:',
    codeSnippet: 'SELECT * FROM borrow_records WHERE return_date = NULL;',
    options: [
      'The WHERE clause should use return_date IS NULL because NULL comparisons with = yield UNKNOWN',
      'The column name return_date must be wrapped in quotes',
      'SELECT * is not permitted when filtering for NULL values',
      'NULL must be written in lowercase as null'
    ],
    correctIndex: 0,
    explanation: 'In SQL three-valued logic, NULL represents missing or unknown data. Comparing col = NULL evaluates to UNKNOWN (which fails the WHERE filter). The correct standard syntax is IS NULL.'
  },
  {
    id: 'quiz-4',
    levelId: 3,
    moduleId: 18,
    type: 'theory',
    question: 'What is the architectural difference between WHERE and HAVING?',
    options: [
      'WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY',
      'WHERE is used only with numeric data; HAVING is used only with text data',
      'HAVING can only be used in subqueries, whereas WHERE is used in parent queries',
      'There is no functional difference; they are interchangeable synonyms'
    ],
    correctIndex: 0,
    explanation: 'The WHERE clause operates on individual candidate rows before grouping occurs. The HAVING clause operates on synthesized groups created by GROUP BY.'
  },
  {
    id: 'quiz-5',
    levelId: 3,
    moduleId: 22,
    type: 'output',
    question: 'What happens when you execute a LEFT JOIN if a row in the left table has no matching row in the right table?',
    codeSnippet: 'SELECT s.name, d.department_name \nFROM students s \nLEFT JOIN departments d ON s.department_id = d.id;',
    options: [
      'The unmatched student row is omitted from the result set',
      'The query terminates with a referential integrity violation error',
      'The student row appears in the output with NULL populated for department_name',
      'The student row is assigned the first department row in the table'
    ],
    correctIndex: 2,
    explanation: 'LEFT JOIN preserves all rows from the left table. When no corresponding match exists in the right table, NULL is injected for all right table columns.'
  },
  {
    id: 'quiz-6',
    levelId: 4,
    moduleId: 28,
    type: 'theory',
    question: 'Which ACID property guarantees that once a transaction commits, its changes survive system crashes or power failures?',
    options: [
      'Atomicity',
      'Consistency',
      'Isolation',
      'Durability'
    ],
    correctIndex: 3,
    explanation: 'Durability guarantees that committed data modifications are permanently recorded to non-volatile storage (via write-ahead logging) and persist through system crashes.'
  },
  {
    id: 'quiz-7',
    levelId: 4,
    moduleId: 30,
    type: 'scenario',
    question: 'A financial company wants to find the top 3 highest-earning employees in every department. Which SQL approach is standard and most optimal?',
    options: [
      'Write a separate single-row subquery with LIMIT 3 for each employee',
      'Use a Window Function like DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) inside a CTE, filtering rank <= 3',
      'Use GROUP BY department_id with MAX(salary)',
      'Use a CROSS JOIN between employees and departments with ORDER BY salary'
    ],
    correctIndex: 1,
    explanation: 'Analytical window functions with PARTITION BY department_id and ORDER BY salary DESC allow ranking within each department partition cleanly, filtering top N rows in an outer CTE.'
  },
  {
    id: 'quiz-8',
    levelId: 5,
    moduleId: 38,
    type: 'debugging',
    question: 'Why does the following query cause an unexpected full-table scan on an indexed created_at column?',
    codeSnippet: 'SELECT * FROM orders WHERE YEAR(created_at) = 2026;',
    options: [
      'The table does not support temporal date filtering',
      'Wrapping an indexed column inside a function (YEAR) makes the predicate non-sargable, preventing direct B-tree range seek',
      'YEAR() is a deprecated SQL keyword',
      'The optimizer requires SELECT created_at rather than SELECT *'
    ],
    correctIndex: 1,
    explanation: 'Applying functions to indexed columns suppresses index usage because the B-tree keys store raw timestamps, not calculated YEAR outputs. The sargable alternative is: WHERE created_at >= "2026-01-01" AND created_at < "2027-01-01".'
  }
];

export const FINAL_EXAM_QUESTIONS: ExamQuestion[] = [
  // Fundamentals (10 points)
  {
    id: 'exam-1',
    section: 'fundamentals',
    type: 'mcq',
    points: 10,
    question: 'Which database normal form eliminates transitive functional dependencies, ensuring all non-key attributes depend solely on the primary key?',
    options: [
      'First Normal Form (1NF)',
      'Second Normal Form (2NF)',
      'Third Normal Form (3NF)',
      'Fifth Normal Form (5NF)'
    ],
    correctOptionIndex: 2,
    explanation: '3NF requires that a relation is in 2NF and has no transitive dependencies (no non-key attribute depends on another non-key attribute).'
  },

  // Basic SQL (15 points)
  {
    id: 'exam-2',
    section: 'basic',
    type: 'mcq',
    points: 15,
    question: 'What is the exact execution order of clauses in an SQL SELECT query?',
    options: [
      'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
      'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT',
      'FROM → SELECT → WHERE → ORDER BY → GROUP BY',
      'WHERE → FROM → SELECT → HAVING → ORDER BY'
    ],
    correctOptionIndex: 1,
    explanation: 'The logical query processing order starts with FROM (and JOINs), evaluates WHERE filters, groups rows with GROUP BY, applies HAVING group filters, projects SELECT columns, sorts with ORDER BY, and finally slices with LIMIT.'
  },

  // Intermediate SQL (20 points)
  {
    id: 'exam-3',
    section: 'intermediate',
    type: 'mcq',
    points: 10,
    question: 'What is the key functional difference between UNION and UNION ALL?',
    options: [
      'UNION can combine different numbers of columns; UNION ALL cannot',
      'UNION removes duplicate records via a sorting/hashing pass, while UNION ALL retains all rows and is significantly faster',
      'UNION ALL only works on numeric data types',
      'UNION is asynchronous while UNION ALL is synchronous'
    ],
    correctOptionIndex: 1,
    explanation: 'UNION performs deduplication, requiring additional memory and sort time, whereas UNION ALL simply concatenates result sets.'
  },
  {
    id: 'exam-4',
    section: 'intermediate',
    type: 'debugging',
    points: 10,
    question: 'Fix the SQL query below to find departments with more than 1 student:',
    codeSnippet: 'SELECT department_id, COUNT(*) \nFROM students \nWHERE COUNT(*) > 1 \nGROUP BY department_id;',
    options: [
      'Replace WHERE COUNT(*) > 1 with HAVING COUNT(*) > 1 after GROUP BY',
      'Remove GROUP BY and use ORDER BY department_id',
      'Change COUNT(*) to SUM(marks)',
      'Add DISTINCT to the SELECT list'
    ],
    correctOptionIndex: 0,
    explanation: 'Aggregate functions cannot be evaluated in the WHERE clause because individual rows have not yet been grouped. Filtering on aggregates must be done with HAVING.'
  },

  // Advanced SQL (25 points)
  {
    id: 'exam-5',
    section: 'advanced',
    type: 'mcq',
    points: 12,
    question: 'In PostgreSQL and MySQL, what does the ROW_NUMBER() window function produce when two rows have identical values in the ORDER BY clause?',
    options: [
      'Both rows receive the identical rank number, creating a tie',
      'An error is thrown indicating non-deterministic tie',
      'Unique consecutive sequential numbers are assigned arbitrarily or deterministically to both rows without duplicates or ties',
      'Both rows receive a NULL rank value'
    ],
    correctOptionIndex: 2,
    explanation: 'Unlike RANK() and DENSE_RANK() which produce shared ranks on ties, ROW_NUMBER() always assigns strictly sequential integers (1, 2, 3...) to every row.'
  },
  {
    id: 'exam-6',
    section: 'advanced',
    type: 'mcq',
    points: 13,
    question: 'In concurrency control, what is a "Dirty Read"?',
    options: [
      'Reading data from a corrupted storage sector',
      'A transaction reading data modified by another concurrent transaction that has NOT yet committed',
      'A query reading records after an un-indexed table scan',
      'Reading cached records that differ from disk blocks'
    ],
    correctOptionIndex: 1,
    explanation: 'A dirty read occurs when Transaction A modifies a row, and Transaction B reads that uncommitted modification before Transaction A potentially issues a ROLLBACK.'
  },

  // Expert SQL (20 points)
  {
    id: 'exam-7',
    section: 'expert',
    type: 'mcq',
    points: 10,
    question: 'Under what scenario does a Composite B-tree index on columns (A, B, C) FAIL to be used by the query optimizer?',
    options: [
      'When the query filters solely on column A: WHERE A = 5',
      'When the query filters on A and B: WHERE A = 5 AND B = 10',
      'When the query filters solely on columns B and C: WHERE B = 10 AND C = 20',
      'When the query filters on all three columns: WHERE A = 5 AND B = 10 AND C = 20'
    ],
    correctOptionIndex: 2,
    explanation: 'According to the Leftmost Prefix rule of composite B-trees, the index cannot be traversed without specifying the leading column A.'
  },
  {
    id: 'exam-8',
    section: 'expert',
    type: 'mcq',
    points: 10,
    question: 'How do Parameterized Queries (Prepared Statements) completely eliminate SQL Injection attacks?',
    options: [
      'By encrypting user input with AES-256 before transmission',
      'By separating code from data: SQL statements are pre-compiled into an execution plan before untrusted user parameters are bound strictly as data literals',
      'By stripping out all quotation marks and spaces automatically',
      'By limiting database queries to read-only SELECT operations'
    ],
    correctOptionIndex: 1,
    explanation: 'Prepared statements compile the query structure first. When parameters are injected, the engine treats them exclusively as literal values, rendering SQL injection syntax harmless.'
  },

  // Practical SQL (10 points)
  {
    id: 'exam-9',
    section: 'practical',
    type: 'mcq',
    points: 10,
    question: 'Which query correctly finds the highest scoring student in the college database without using LIMIT?',
    codeSnippet: 'SELECT name, marks FROM students WHERE marks = (SELECT MAX(marks) FROM students);',
    options: [
      'The query is completely valid and correctly uses a scalar subquery to find all students tied for the highest score',
      'The query will throw a runtime error because subqueries cannot contain MAX()',
      'The query must use JOIN instead of subquery',
      'The query returns only the student ID rather than their name'
    ],
    correctOptionIndex: 0,
    explanation: 'The scalar subquery (SELECT MAX(marks) FROM students) returns the single maximum numeric score (94.0), which the outer query matches against, handling ties gracefully.'
  }
];
