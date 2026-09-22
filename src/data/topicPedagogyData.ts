import { SQLTopicLesson } from '../types';

export interface TopicPedagogyExtension {
  whyDoWeNeedIt: string;
  lineByLineExplanation: string[];
  commonMistakes: {
    mistake: string;
    whyItFails: string;
    correctedSql: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  practiceQueries: {
    task: string;
    starterSql: string;
    solutionSql: string;
    hint: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  codingChallenge: {
    title: string;
    description: string;
    targetDatabase: 'college' | 'ecommerce' | 'hospital' | 'banking' | 'library';
    starterCode: string;
    expectedOutputColumns: string[];
    solutionSql: string;
  };
}

export const TOPIC_EXTENSIONS: Record<string, TopicPedagogyExtension> = {
  // 1.1 Database Fundamentals
  'mod-1-topic-1': {
    whyDoWeNeedIt: 'Without a database, organization records are scattered across ad-hoc text files or spreadsheets with zero concurrency protection, leading to race conditions, lost updates, and corrupted data. A DBMS provides ACID compliance, fast indexed lookups, role-based access security, automated backups, and multi-user transactional consistency.',
    lineByLineExplanation: [
      'SELECT department_name, building, head — Specifies the exact column attributes we wish to project into the output table, ignoring unrequested attributes.',
      'FROM departments — Instructs the database storage engine to read from the "departments" table located in the active catalog/schema.',
      '; — The SQL statement terminator signaling the parser that the query definition is complete and ready for execution planning.'
    ],
    commonMistakes: [
      {
        mistake: 'Using flat spreadsheets for multi-user transactional enterprise applications.',
        whyItFails: 'Spreadsheets do not provide row-level locking, ACID transactions, foreign key constraints, or cryptographic role-based security.',
        correctedSql: 'CREATE TABLE departments (id INT PRIMARY KEY, name VARCHAR(100) NOT NULL);'
      },
      {
        mistake: 'Treating a Database and a DBMS as the exact same concept.',
        whyItFails: 'A database is the passive electronic collection of structured records, while a DBMS is the active software program (e.g. PostgreSQL, MySQL) that manages and serves that data.',
        correctedSql: '-- Concept clarification: PostgreSQL is the DBMS; college_db is the Database.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the fundamental difference between a File System and a DBMS?',
        answer: 'A file system has no built-in concurrency control, no declarative querying (SQL), no relational constraint enforcement, no automated rollback during partial failures, and high data redundancy. A DBMS guarantees ACID transactions, crash recovery via WAL logs, data independence, and index-optimized access paths.',
        level: 'Beginner'
      },
      {
        question: 'What constitutes the Relational Model introduced by E.F. Codd?',
        answer: 'The Relational Model represents all data mathematically as relations (tables), tuples (rows), and attributes (columns). It utilizes mathematical set theory, first-order predicate logic, and key constraints (Primary, Foreign) to ensure domain and referential integrity.',
        level: 'Intermediate'
      }
    ],
    practiceQueries: [
      {
        task: 'Retrieve all department names and their respective campus buildings.',
        starterSql: 'SELECT department_name, building FROM departments;',
        solutionSql: 'SELECT department_name, building FROM departments;',
        hint: 'Use SELECT followed by the two column names separated by a comma from table departments.'
      },
      {
        task: 'Find the department led by "Dr. Alan".',
        starterSql: 'SELECT * FROM departments WHERE head = ...;',
        solutionSql: "SELECT * FROM departments WHERE head = 'Dr. Alan';",
        hint: "Filter the head column with a single-quoted string literal 'Dr. Alan'."
      }
    ],
    quiz: [
      {
        question: 'Which of the following is software rather than a passive data repository?',
        options: ['Database', 'DBMS (e.g., PostgreSQL)', 'Table', 'Row / Record'],
        correctIndex: 1,
        explanation: 'DBMS (Database Management System) is the software engine that creates, manages, and executes operations on databases.'
      },
      {
        question: 'In the relational model, what is the formal mathematical term for a row in a table?',
        options: ['Relation', 'Attribute', 'Tuple', 'Domain'],
        correctIndex: 2,
        explanation: 'A row in relational theory is formally called a Tuple. A column is an Attribute, and the table itself is a Relation.'
      }
    ],
    codingChallenge: {
      title: 'Inspect Department Infrastructure',
      description: 'Write a query to list the department name and building for all departments located in buildings containing the word "Block" or "Hall".',
      targetDatabase: 'college',
      starterCode: 'SELECT department_name, building FROM departments WHERE ...;',
      expectedOutputColumns: ['department_name', 'building'],
      solutionSql: "SELECT department_name, building FROM departments WHERE building LIKE '%Block%' OR building LIKE '%Hall%';"
    }
  },

  // 1.2 SQL vs NoSQL
  'mod-1-topic-2': {
    whyDoWeNeedIt: 'Understanding architectural trade-offs between SQL and NoSQL prevents catastrophic engineering choices. SQL provides strict ACID compliance and zero redundancy for financial ledgers, whereas NoSQL allows horizontal distributed scaling and flexible schemas for high-velocity streaming data.',
    lineByLineExplanation: [
      'SELECT name, age, marks, email — Project specific student profile attributes from the relation.',
      'FROM students — Reads from the relational students table where schemas and column types are enforced.',
      'LIMIT 4 — Restricts the output to the first four records returned by the engine.'
    ],
    commonMistakes: [
      {
        mistake: 'Choosing NoSQL for core banking or e-commerce financial ledgers.',
        whyItFails: 'NoSQL defaults to eventual consistency (BASE), which can permit double-spending or balance calculation anomalies across distributed shards.',
        correctedSql: 'CREATE TABLE accounts (id INT PRIMARY KEY, balance DECIMAL(12,2) NOT NULL CHECK(balance >= 0));'
      },
      {
        mistake: 'Assuming SQL databases cannot store JSON data.',
        whyItFails: 'Modern relational engines like PostgreSQL (JSONB) and MySQL natively support indexed JSON documents with specialized operators.',
        correctedSql: 'SELECT id, metadata->>"$.tier" FROM customers;'
      }
    ],
    interviewQuestions: [
      {
        question: 'Compare ACID vs BASE architectures.',
        answer: 'ACID (Atomicity, Consistency, Isolation, Durability) governs relational databases ensuring absolute state reliability. BASE (Basically Available, Soft-state, Eventual consistency) governs distributed NoSQL systems prioritizing availability and horizontal partition tolerance (CAP theorem).',
        level: 'Intermediate'
      },
      {
        question: 'When is vertical scaling preferred over horizontal scaling?',
        answer: 'Vertical scaling (adding CPU, RAM, NVMe storage to a single node) is simpler, avoids network latency across distributed joins, and maintains strict serializable transactions without two-phase commit overhead.',
        level: 'Advanced'
      }
    ],
    practiceQueries: [
      {
        task: 'Select name and email of students who have scored more than 85 marks.',
        starterSql: 'SELECT name, email FROM students WHERE marks > 85;',
        solutionSql: 'SELECT name, email FROM students WHERE marks > 85;',
        hint: 'Filter with WHERE marks > 85.'
      }
    ],
    quiz: [
      {
        question: 'Which database type is optimal when multi-table transactions and strict referential integrity are mandatory?',
        options: ['Key-Value Store', 'Document Store', 'Relational RDBMS (SQL)', 'Graph Store without ACID'],
        correctIndex: 2,
        explanation: 'Relational RDBMS provides foreign key constraints, normalized tables, and full ACID transaction guarantees.'
      }
    ],
    codingChallenge: {
      title: 'Analyze Student Contact Directory',
      description: 'Query student names, age, and academic marks for students aged 21 or older, ordered by marks descending.',
      targetDatabase: 'college',
      starterCode: 'SELECT name, age, marks FROM students WHERE ... ORDER BY ...;',
      expectedOutputColumns: ['name', 'age', 'marks'],
      solutionSql: 'SELECT name, age, marks FROM students WHERE age >= 21 ORDER BY marks DESC;'
    }
  },

  // 2.1 Tables, Rows, Columns
  'mod-2-topic-1': {
    whyDoWeNeedIt: 'Tabular decomposition transforms messy real-world entities into 2D relations with predictable byte offsets, enabling indexes (B-Trees) to locate any record in sub-millisecond O(log N) time rather than scanning millions of bytes sequentially.',
    lineByLineExplanation: [
      'SELECT id, name, department_name — Explicit projection of identifier, student name, and related department.',
      'FROM students — Base table representing individual student records.',
      'INNER JOIN departments ON students.department_id = departments.id — Mathematical relational link joining two tables on their shared attribute key.',
      'LIMIT 3 — Bounds the result set cardinality for rapid previewing.'
    ],
    commonMistakes: [
      {
        mistake: 'Putting multiple values inside one column (e.g. phone_numbers: "123, 456, 789").',
        whyItFails: 'Violates 1st Normal Form (1NF), makes searching for an individual number impossible without slow LIKE scans, and prevents index utilization.',
        correctedSql: 'CREATE TABLE student_phones (student_id INT, phone VARCHAR(20), PRIMARY KEY(student_id, phone));'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between a Field, a Column, and an Attribute?',
        answer: 'In practice they are often used interchangeably: Attribute is the formal relational theoretical term; Column is the physical database schema definition; Field is the cell intersection of a specific row and column holding a single atomic scalar value.',
        level: 'Beginner'
      }
    ],
    practiceQueries: [
      {
        task: 'Query all customers with their city and loyalty tier.',
        starterSql: 'SELECT id, name, city, tier FROM customers;',
        solutionSql: 'SELECT id, name, city, tier FROM customers;',
        hint: 'Project the four columns from the customers table.'
      }
    ],
    quiz: [
      {
        question: 'What does a single Row (Tuple) represent in a relational table?',
        options: ['A category of data', 'A single instance of the entity', 'The table schema', 'A constraint'],
        correctIndex: 1,
        explanation: 'A row represents a single instance of the entity (e.g. one specific student or one specific customer).'
      }
    ],
    codingChallenge: {
      title: 'Customer Directory Listing',
      description: 'Fetch all customers residing in "Chennai" or "Mumbai" belonging to the "Platinum" or "Gold" tier.',
      targetDatabase: 'ecommerce',
      starterCode: 'SELECT name, city, tier FROM customers WHERE ...;',
      expectedOutputColumns: ['name', 'city', 'tier'],
      solutionSql: "SELECT name, city, tier FROM customers WHERE city IN ('Chennai', 'Mumbai') AND tier IN ('Platinum', 'Gold');"
    }
  },

  // 2.2 Primary and Foreign Keys
  'mod-2-topic-2': {
    whyDoWeNeedIt: 'Primary keys guarantee that every entity can be individually addressed, updated, and deleted without affecting duplicates. Foreign keys enforce referential integrity so child tables cannot reference deleted or non-existent parents (preventing orphaned records).',
    lineByLineExplanation: [
      'PRIMARY KEY (id) — Designates "id" as the unique identifier; disallows NULLs and builds a clustered B-tree index.',
      'FOREIGN KEY (department_id) REFERENCES departments(id) — Prevents inserting a student with an invalid department_id and blocks deleting a department that still has enrolled students.'
    ],
    commonMistakes: [
      {
        mistake: 'Allowing a Primary Key to be NULL.',
        whyItFails: 'SQL standard strictly prohibits NULL in primary keys; if an entity identifier is unknown, the record cannot be uniquely referenced.',
        correctedSql: 'CREATE TABLE items (id INT PRIMARY KEY NOT NULL, name VARCHAR(100));'
      },
      {
        mistake: 'Omitting indexes on Foreign Key columns.',
        whyItFails: 'While the parent PK is automatically indexed, the child FK column is NOT automatically indexed in several engines (e.g. MySQL InnoDB, Postgres), causing full table scans during parent DELETE cascades.',
        correctedSql: 'CREATE INDEX idx_student_dept ON students(department_id);'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can a table have multiple Primary Keys or multiple Foreign Keys?',
        answer: 'A table can have exactly ONE Primary Key constraint (which may consist of multiple columns as a composite key), but can have MULTIPLE Foreign Key constraints referencing different parent tables.',
        level: 'Intermediate'
      },
      {
        question: 'What are the different ON DELETE actions for a Foreign Key?',
        answer: '1. CASCADE: Deletes child rows when parent is deleted. 2. RESTRICT / NO ACTION: Rejects the parent deletion if child rows exist. 3. SET NULL: Sets child FK column to NULL. 4. SET DEFAULT: Sets child FK column to a default value.',
        level: 'Intermediate'
      }
    ],
    practiceQueries: [
      {
        task: 'Find all order items where quantity is greater than 1.',
        starterSql: 'SELECT * FROM order_items WHERE quantity > 1;',
        solutionSql: 'SELECT * FROM order_items WHERE quantity > 1;',
        hint: 'Filter order_items with WHERE quantity > 1.'
      }
    ],
    quiz: [
      {
        question: 'Which of the following is TRUE about a Foreign Key?',
        options: ['It can never be NULL', 'It must point to a unique/primary key in another table', 'A table can only have one foreign key', 'It cannot contain duplicate values in child rows'],
        correctIndex: 1,
        explanation: 'A Foreign Key must reference a column with a UNIQUE or PRIMARY KEY constraint in the referenced table. It CAN contain duplicates and can be NULL (unless marked NOT NULL).'
      }
    ],
    codingChallenge: {
      title: 'Inspect Order Line Items with Products',
      description: 'Write a query joining order items with products to display order_id, product_name, quantity, and unit price.',
      targetDatabase: 'ecommerce',
      starterCode: 'SELECT oi.order_id, p.name AS product_name, oi.quantity, p.price FROM order_items oi JOIN products p ON ...;',
      expectedOutputColumns: ['order_id', 'product_name', 'quantity', 'price'],
      solutionSql: 'SELECT oi.order_id, p.name AS product_name, oi.quantity, p.price FROM order_items oi JOIN products p ON oi.product_id = p.id;'
    }
  },

  // 7.1 Table Constraints
  'mod-7-topic-1': {
    whyDoWeNeedIt: 'Data integrity is cheapest to enforce at the storage engine level. If bad data slips into a database through frontend bugs or rogue scripts, downstream analytical reports, balance sheets, and machine learning pipelines are permanently poisoned. Constraints provide a mathematical guarantee that invalid data is rejected at the gate.',
    lineByLineExplanation: [
      'id INT PRIMARY KEY — Creates unique identifier, non-nullable, automatically indexed.',
      'email VARCHAR(150) UNIQUE — Enforces that no two records share identical email addresses.',
      'name VARCHAR(100) NOT NULL — Rejects any INSERT where student name is missing or omitted.',
      'age INT CHECK (age >= 18) — Enforces business rule that students must be adults at registration time.',
      'city VARCHAR(50) DEFAULT "Karur" — Automatically supplies "Karur" if the caller does not specify a city.'
    ],
    commonMistakes: [
      {
        mistake: 'Relying exclusively on client-side frontend validation instead of database constraints.',
        whyItFails: 'Direct SQL scripts, background workers, or API security bypasses can insert corrupt data unless the database schema rejects it.',
        correctedSql: 'ALTER TABLE students ADD CONSTRAINT chk_age CHECK (age >= 18);'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between a PRIMARY KEY and a UNIQUE constraint?',
        answer: '1. A table can only have ONE Primary Key constraint, but MULTIPLE Unique constraints. 2. Primary Key columns cannot accept NULL values. Unique constraint columns can accept NULL values (in standard SQL, multiple NULLs are permitted because NULL != NULL).',
        level: 'Intermediate'
      }
    ],
    practiceQueries: [
      {
        task: 'Select all students whose marks are not null and whose age is at least 20.',
        starterSql: 'SELECT * FROM students WHERE marks IS NOT NULL AND age >= 20;',
        solutionSql: 'SELECT * FROM students WHERE marks IS NOT NULL AND age >= 20;',
        hint: 'Use marks IS NOT NULL and age >= 20.'
      }
    ],
    quiz: [
      {
        question: 'Which constraint enforces that a column value must satisfy a specific boolean conditional expression?',
        options: ['NOT NULL', 'CHECK', 'FOREIGN KEY', 'DEFAULT'],
        correctIndex: 1,
        explanation: 'CHECK constraints evaluate a boolean condition (e.g. age >= 18, balance >= 0) and reject any row for which it evaluates to FALSE.'
      }
    ],
    codingChallenge: {
      title: 'Enforce Banking Account Rules',
      description: 'Select accounts that have positive balance and active status, ordered by balance descending.',
      targetDatabase: 'banking',
      starterCode: 'SELECT account_no, customer_id, balance FROM accounts WHERE ... ORDER BY ...;',
      expectedOutputColumns: ['account_no', 'customer_id', 'balance'],
      solutionSql: "SELECT account_no, customer_id, balance FROM accounts WHERE balance > 0 AND status = 'Active' ORDER BY balance DESC;"
    }
  }
};
