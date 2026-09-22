import { CourseLevel, SQLModule } from '../types';

export const COURSE_LEVELS: CourseLevel[] = [
  {
    id: 1,
    name: 'Level 1 — SQL Fundamentals',
    badge: 'Beginner',
    tagline: 'Database Concepts, Architecture & Storage Foundation',
    description: 'Master core database theory, RDBMS principles, relational modeling terms, popular SQL dialects, and comprehensive data types.',
    color: 'emerald',
    bgLight: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    moduleIds: [1, 2, 3, 4]
  },
  {
    id: 2,
    name: 'Level 2 — Basic SQL',
    badge: 'Core SQL',
    tagline: 'DDL, DML, Querying, Filtering & Sorting',
    description: 'Learn CREATE, INSERT, SELECT, WHERE filtering, comparison and logical operators, ORDER BY, LIMIT/OFFSET, UPDATE, and DELETE.',
    color: 'sky',
    bgLight: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    moduleIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  },
  {
    id: 3,
    name: 'Level 3 — Intermediate SQL',
    badge: 'Intermediate',
    tagline: 'Constraints, Aggregations, Multi-Table JOINs & Subqueries',
    description: 'Deep dive into Table Constraints, GROUP BY, HAVING, Scalar & String/Date functions, visual JOIN mechanics, UNION, and correlated subqueries.',
    color: 'amber',
    bgLight: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    moduleIds: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  },
  {
    id: 4,
    name: 'Level 4 — Advanced SQL',
    badge: 'Advanced',
    tagline: 'Views, Indexes, ACID Transactions, CTEs & Window Functions',
    description: 'Build enterprise SQL solutions with Materialized/Virtual Views, B-tree indexes, ACID isolation, Recursive CTEs, Window ranking/aggregates, and Stored procedures.',
    color: 'indigo',
    bgLight: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    moduleIds: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
  },
  {
    id: 5,
    name: 'Level 5 — Expert SQL',
    badge: 'Production Architect',
    tagline: 'Normalization, Query Execution, Optimization, Security & Architecture',
    description: 'Master Database Normalization 1NF to 5NF, ER Modeling, Query Execution Engines, EXPLAIN execution plans, Concurrency/Locks, Security (GRANT/REVOKE), and 7 Real-world schemas.',
    color: 'rose',
    bgLight: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    moduleIds: [35, 36, 37, 38, 39, 40, 41, 42]
  }
];

export const SQL_MODULES: SQLModule[] = [
  // ==========================================
  // LEVEL 1: SQL FUNDAMENTALS (Modules 1 - 4)
  // ==========================================
  {
    id: 1,
    levelId: 1,
    moduleNumber: 1,
    title: 'Introduction to Databases',
    category: 'Fundamentals',
    description: 'Explore what data is, how DBMS and RDBMS operate, the history of SQL, and relational vs NoSQL trade-offs.',
    topics: [
      {
        id: 'mod-1-topic-1',
        moduleId: 1,
        levelId: 1,
        topicNumber: '1.1',
        title: 'What is Data, Database, DBMS & RDBMS?',
        shortSummary: 'Understand the difference between raw facts, structured storage, and relational management software.',
        whatIsIt: 'Data is raw, unorganized facts (numbers, text, timestamps). A Database is a structured, persistent electronic repository designed for fast querying. A DBMS (Database Management System) is software enabling data storage, retrieval, and manipulation. An RDBMS (Relational DBMS) organizes data into strictly typed two-dimensional tables with mathematically proven relational links (keys).',
        visualArchitectureDiagram: `flowchart LR
    A[Client App] -->|SQL Query| B[RDBMS]
    B --> C[(Storage Disk)]
    B --> D[(Memory Buffer)]
    B -.->|Ensures| E[Relational Integrity]
    style A fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#fff
    style B fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff
    style C fill:#059669,stroke:#047857,stroke-width:2px,color:#fff
    style D fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff
    style E fill:#be185d,stroke:#9f1239,stroke-width:2px,color:#fff`,
        syntax: '-- Conceptual RDBMS Architecture:\n-- Relational Model = Tables (Relations) + Rows (Tuples) + Columns (Attributes)\n-- Relations are connected using Foreign Key references.',
        exampleQuery: 'SELECT department_name, building, head FROM departments;',
        expectedOutput: {
          columns: ['department_name', 'building', 'head'],
          rows: [
            ['Computer Science', 'Turing Block', 'Dr. Alan'],
            ['Information Technology', 'Babbage Hall', 'Dr. Ada'],
            ['Electronics & Comm', 'Maxwell Center', 'Dr. Nikola'],
            ['Mechanical Eng', 'Watt Complex', 'Dr. Henry']
          ]
        },
        howItWorks: [
          '1. The client sends a declarative SQL statement to the database server.',
          '2. The RDBMS storage engine retrieves data pages from disk or memory buffer pool.',
          '3. Relational integrity guarantees that each record satisfies declared domain and table constraints.',
          '4. Structured tabular columns allow indexing and logarithmic search lookups.'
        ],
        realWorldExample: {
          scenario: 'A university campus housing thousands of students cannot maintain records in flat Excel files due to concurrency conflicts and accidental deletions. They use an RDBMS to guarantee that every student enrolled is strictly tied to a valid department.',
          query: 'SELECT name, department_id, marks FROM students WHERE marks >= 90;',
          explanation: 'Retrieves top-performing university students from the relational students table.'
        },
        referenceMaterials: {
          books: ['Database System Concepts by Silberschatz', 'Fundamentals of Database Systems by Elmasri'],
          docs: ['PostgreSQL Official Documentation: Chapter 1', 'MySQL Reference Manual: Introduction'],
          notes: 'Pay special attention to the difference between a DBMS software and the actual physical database.'
        },
        sampleDatabase: 'college'
      },
      {
        id: 'mod-1-topic-2',
        moduleId: 1,
        levelId: 1,
        topicNumber: '1.2',
        title: 'SQL vs NoSQL & Relational Concepts',
        shortSummary: 'SQL is like a strict, contract-bound legal agreement (ACID). NoSQL is like a flexible JSON notepad.',
        whatIsIt: 'SQL databases strictly enforce schemas (tables/columns) and guarantee data consistency via ACID properties (Atomicity, Consistency, Isolation, Durability). NoSQL databases (Document, Key-Value, Graph, Column-family) offer schema flexibility, horizontal scalability, and eventual consistency (BASE), trading absolute correctness for speed and distribution.',
        visualArchitectureDiagram: `graph TD
    subgraph SQL [SQL RDBMS]
        direction LR
        S1[(Table A)] -- Foreign Key --> S2[(Table B)]
    end
    subgraph NoSQL [NoSQL Document]
        direction LR
        N1[{"name": "Alice", "hobbies": ["reading", "biking"]}]
    end
    SQL -.- NoSQL
    style SQL fill:#0f172a,stroke:#4f46e5,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
    style NoSQL fill:#0f172a,stroke:#059669,stroke-width:2px,color:#fff,stroke-dasharray: 5 5`,
        syntax: '-- SQL enforces types at the column level:\nCREATE TABLE users (id INT, email VARCHAR(255));\n\n-- NoSQL just accepts JSON blobs.',
        exampleQuery: 'SELECT name, age, marks, email FROM students LIMIT 4;',
        expectedOutput: {
          columns: ['name', 'age', 'marks', 'email'],
          rows: [
            ['Kumar Selvan', 21, 88.5, 'kumar@kkacademy.edu'],
            ['Ananya Sharma', 20, 94.0, 'ananya@kkacademy.edu'],
            ['Rahul Verma', 22, 76.5, 'rahul@kkacademy.edu'],
            ['Pooja Hegde', 21, 89.0, 'pooja@kkacademy.edu']
          ]
        },
        howItWorks: [
          '1. SQL enforces a rigid relational schema prior to record insertion.',
          '2. Data redundancy is minimized through normalization rules (1NF to BCNF).',
          '3. Multi-table queries are executed using declarative JOIN operations backed by the query optimizer.'
        ],
        realWorldExample: {
          scenario: 'Core financial ledgers in banking require SQL because missing money or corrupted balance states are impermissible. Social media comment streams may use NoSQL for rapid distributed writes.',
          query: 'SELECT account_no, account_type, balance, status FROM accounts;',
          explanation: 'Demonstrates financial ledger rows stored with fixed types and ACID guarantees.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 2,
    levelId: 1,
    moduleNumber: 2,
    title: 'Database Terminology',
    category: 'Fundamentals',
    description: 'Master Table, Row, Column, Record, Field, Schema, Primary Key, Foreign Key, and Composite Keys.',
    topics: [
      {
        id: 'mod-2-topic-1',
        moduleId: 2,
        levelId: 1,
        topicNumber: '2.1',
        title: 'Tables, Rows, Columns, Records & Fields',
        shortSummary: 'Dissect the fundamental structural components of relational tables.',
        whatIsIt: 'A Table is a structured relation holding data on a specific entity. A Column (Field / Attribute) is a vertical entity defining data type and constraints. A Row (Record / Tuple) is a single horizontal entry representing one individual instance. A Schema is the blueprint formalizing table definitions, keys, and rules.',
        syntax: '-- Schema Definition:\nCREATE TABLE table_name (\n    column_1 DATA_TYPE [CONSTRAINTS],\n    column_2 DATA_TYPE [CONSTRAINTS]\n);',
        exampleQuery: 'SELECT id, name, department_name FROM students INNER JOIN departments ON students.department_id = departments.id LIMIT 3;',
        expectedOutput: {
          columns: ['id', 'name', 'department_name'],
          rows: [
            [1, 'Kumar Selvan', 'Computer Science'],
            [2, 'Ananya Sharma', 'Computer Science'],
            [3, 'Rahul Verma', 'Information Technology']
          ]
        },
        howItWorks: [
          '1. Each column allocates a specific byte width based on its declared data type.',
          '2. Rows are indexed on disk by a row identifier (RowID / Clustered Index Key).',
          '3. SQL projects specified column values for each row satisfying query conditions.'
        ],
        realWorldExample: {
          scenario: 'An e-commerce customer registry where each row represents one distinct buyer and each column holds their city and customer tier.',
          query: 'SELECT id, name, city, tier FROM customers;',
          explanation: 'Reads customer tuples with attribute fields.'
        },
        sampleDatabase: 'ecommerce'
      },
      {
        id: 'mod-2-topic-2',
        moduleId: 2,
        levelId: 1,
        topicNumber: '2.2',
        title: 'Primary Keys, Foreign Keys & Composite Keys',
        shortSummary: 'Enforce relational integrity and prevent duplicate records with relational keys.',
        whatIsIt: 'A Primary Key (PK) is a column or set of columns that uniquely identifies each row (cannot be NULL, cannot have duplicates). A Foreign Key (FK) is a column referencing the Primary Key of another table, ensuring referential integrity. A Composite Key is a primary key composed of two or more columns combined.',
        syntax: '-- Primary and Foreign Key Definition:\nCREATE TABLE order_items (\n    order_id INT,\n    product_id INT,\n    quantity INT,\n    PRIMARY KEY (order_id, product_id), -- Composite PK\n    FOREIGN KEY (order_id) REFERENCES orders(id),\n    FOREIGN KEY (product_id) REFERENCES products(id)\n);',
        exampleQuery: 'SELECT id, order_id, product_id, quantity, price FROM order_items;',
        expectedOutput: {
          columns: ['id', 'order_id', 'product_id', 'quantity', 'price'],
          rows: [
            [1, 1001, 101, 1, 120.00],
            [2, 1001, 104, 1, 65.00],
            [3, 1001, 106, 1, 310.00]
          ]
        },
        howItWorks: [
          '1. The database creates a unique B-tree index on the Primary Key automatically.',
          '2. When an INSERT or UPDATE occurs, the engine checks whether the PK already exists to prevent duplicate insertion.',
          '3. When an FK is inserted, the engine validates that the referenced parent row exists in the parent table.'
        ],
        realWorldExample: {
          scenario: 'Preventing orphaned order items: no item can be billed for an order number that does not exist in the master orders ledger.',
          query: 'SELECT orders.id AS order_no, customers.name AS customer, orders.total_amount FROM orders JOIN customers ON orders.customer_id = customers.id;',
          explanation: 'Links orders to master customers via FK relation.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 3,
    levelId: 1,
    moduleNumber: 3,
    title: 'SQL Environment & Dialects',
    category: 'Fundamentals',
    description: 'Compare MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and understand syntax differences.',
    topics: [
      {
        id: 'mod-3-topic-1',
        moduleId: 3,
        levelId: 1,
        topicNumber: '3.1',
        title: 'SQL Dialects: MySQL vs PostgreSQL vs SQLite vs SQL Server',
        shortSummary: 'Understand ANSI standard SQL versus engine-specific extensions and performance profiles.',
        whatIsIt: 'While SQL is standardized by ANSI/ISO, each major database engine implements specialized syntax features. MySQL excels in high-speed web apps; PostgreSQL is acclaimed for strict standard compliance, advanced JSONB, and custom extensions; SQLite is an embedded zero-configuration serverless file database; SQL Server is Microsoft’s enterprise powerhouse with T-SQL.',
        syntax: '-- Dialect comparison for string concatenation:\n-- MySQL: CONCAT(col1, col2)\n-- PostgreSQL & SQLite: col1 || col2\n-- SQL Server: col1 + col2\n\n-- Dialect comparison for pagination:\n-- MySQL & PostgreSQL: LIMIT 10 OFFSET 20\n-- SQL Server: OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY',
        exampleQuery: 'SELECT name, specialty, consultation_fee FROM doctors;',
        expectedOutput: {
          columns: ['name', 'specialty', 'consultation_fee'],
          rows: [
            ['Dr. Rajesh Gupta', 'Cardiology', 120.00],
            ['Dr. Sunita Rao', 'Neurology', 150.00],
            ['Dr. Amit Trivedi', 'Orthopedics', 100.00],
            ['Dr. Priya Desai', 'Pediatrics', 90.00]
          ]
        },
        howItWorks: [
          '1. Standard ANSI SQL keywords (SELECT, FROM, WHERE, GROUP BY, HAVING) work across all engines.',
          '2. Dialect differences arise in procedural languages (PL/SQL, PL/pgSQL, T-SQL) and internal functions.',
          '3. Writing portable ANSI SQL minimizes vendor lock-in and migration overhead.'
        ],
        realWorldExample: {
          scenario: 'Writing cross-database migration scripts for cloud deployments where development runs on local SQLite and production runs on cloud MySQL / PostgreSQL.',
          query: 'SELECT * FROM doctors WHERE consultation_fee > 100;',
          explanation: 'Standard ANSI SQL syntax compatible across all engines.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },
  {
    id: 4,
    levelId: 1,
    moduleNumber: 4,
    title: 'Data Types Deep Dive',
    category: 'Fundamentals',
    description: 'Master Numeric (INT, BIGINT, DECIMAL, FLOAT), String (CHAR, VARCHAR, TEXT), Date, and Boolean types.',
    topics: [
      {
        id: 'mod-4-topic-1',
        moduleId: 4,
        levelId: 1,
        topicNumber: '4.1',
        title: 'Numeric, String, Date & Other Data Types',
        shortSummary: 'Choose the correct data types to optimize storage footprint and numeric precision.',
        whatIsIt: 'SQL data types define the nature of data stored in each column. Numeric types include INT (whole numbers) and DECIMAL(p,s) (fixed-point precision for financial accuracy without floating-point rounding errors). Strings include CHAR(n) (fixed length), VARCHAR(n) (variable length up to n), and TEXT. Temporal types include DATE, TIME, and DATETIME / TIMESTAMP.',
        syntax: 'CREATE TABLE product_catalog (\n    id INT PRIMARY KEY,\n    sku CHAR(10) NOT NULL,\n    title VARCHAR(255) NOT NULL,\n    price DECIMAL(10, 2) NOT NULL, -- 10 digits total, 2 after decimal\n    weight_kg FLOAT,\n    is_available BOOLEAN DEFAULT TRUE,\n    created_at TIMESTAMP\n);',
        exampleQuery: 'SELECT id, name, category, price, stock FROM products WHERE price > 150.00;',
        expectedOutput: {
          columns: ['id', 'name', 'category', 'price', 'stock'],
          rows: [
            [102, 'Ultra-wide 34" Monitor', 'Electronics', 480.00, 15],
            [103, 'Noise-Cancelling Headphones', 'Audio', 199.00, 30],
            [105, 'Standing Desk Converter', 'Furniture', 240.00, 20],
            [106, 'Ergonomic Mesh Chair', 'Furniture', 310.00, 12]
          ]
        },
        howItWorks: [
          '1. DECIMAL(10,2) avoids binary floating point rounding errors (e.g. 0.1 + 0.2 != 0.3) crucial for financial ledgers.',
          '2. VARCHAR saves disk storage by only consuming the bytes actually used plus 1-2 length prefix bytes.',
          '3. DATE stores year, month, and day in an efficient 3-byte binary packed format.'
        ],
        realWorldExample: {
          scenario: 'An inventory system storing product prices must never use FLOAT for currency balances because IEEE 754 floating point arithmetic introduces fractional cents errors over millions of transactions.',
          query: 'SELECT name, price, stock, (price * stock) AS inventory_value FROM products;',
          explanation: 'Computes total inventory asset value using exact DECIMAL arithmetic.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: BASIC SQL (Modules 5 - 14)
  // ==========================================
  {
    id: 5,
    levelId: 2,
    moduleNumber: 5,
    title: 'CREATE DATABASE & USE',
    category: 'Basic SQL',
    description: 'Create logical database containers and switch active database contexts.',
    topics: [
      {
        id: 'mod-5-topic-1',
        moduleId: 5,
        levelId: 2,
        topicNumber: '5.1',
        title: 'CREATE DATABASE & USE Commands',
        shortSummary: 'Provision new schema namespaces and set the current working catalog.',
        whatIsIt: 'CREATE DATABASE establishes a new isolated logical container for schemas, tables, views, and indexes. USE switches the current server connection session to target the specified database namespace.',
        syntax: 'CREATE DATABASE database_name;\nUSE database_name;\n-- Or conditional creation:\nCREATE DATABASE IF NOT EXISTS college_erp;',
        exampleQuery: 'SELECT department_name, head FROM departments;',
        expectedOutput: {
          columns: ['department_name', 'head'],
          rows: [
            ['Computer Science', 'Dr. Alan'],
            ['Information Technology', 'Dr. Ada'],
            ['Electronics & Comm', 'Dr. Nikola'],
            ['Mechanical Eng', 'Dr. Henry']
          ]
        },
        howItWorks: [
          '1. CREATE DATABASE instructs the DBMS to allocate a directory or namespace on the filesystem.',
          '2. The system catalog updates internal metadata tables (e.g. information_schema.schemata).',
          '3. Subsequent unqualified table queries execute within the active USE context.'
        ],
        realWorldExample: {
          scenario: 'Deploying a multi-tenant SaaS application where each client receives an isolated database catalog to ensure zero cross-tenant data leakage.',
          query: 'SELECT * FROM departments WHERE head LIKE "Dr. A%";',
          explanation: 'Queries records from the active college database context.'
        },
        sampleDatabase: 'college'
      }
    ]
  },
  {
    id: 6,
    levelId: 2,
    moduleNumber: 6,
    title: 'CREATE, ALTER, DROP & TRUNCATE TABLE',
    category: 'Basic SQL',
    description: 'Master Data Definition Language (DDL) to create, modify, wipe, and delete tables.',
    topics: [
      {
        id: 'mod-6-topic-1',
        moduleId: 6,
        levelId: 2,
        topicNumber: '6.1',
        title: 'DDL Operations: CREATE, ALTER, DROP & TRUNCATE',
        shortSummary: 'Understand structural lifecycle operations for tables.',
        whatIsIt: 'DDL commands define and alter the database schema structure. CREATE TABLE builds the initial structure; ALTER TABLE adds, drops, or modifies columns; DROP TABLE deletes the entire table and its schema permanently; TRUNCATE TABLE rapidly clears all rows while preserving the table schema.',
        syntax: '-- 1. Create table\nCREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    age INT,\n    marks DECIMAL(5,2)\n);\n\n-- 2. Alter table (add column)\nALTER TABLE students ADD email VARCHAR(150);\n\n-- 3. Truncate (rapid data wipe)\nTRUNCATE TABLE students;\n\n-- 4. Drop (remove structure)\nDROP TABLE students;',
        exampleQuery: 'SELECT id, name, age, marks FROM students LIMIT 3;',
        expectedOutput: {
          columns: ['id', 'name', 'age', 'marks'],
          rows: [
            [1, 'Kumar Selvan', 21, 88.5],
            [2, 'Ananya Sharma', 20, 94.0],
            [3, 'Rahul Verma', 22, 76.5]
          ]
        },
        howItWorks: [
          '1. CREATE TABLE registers columns, types, and primary key constraints in the data dictionary.',
          '2. TRUNCATE deallocates storage extents in bulk without logging each individual row deletion, making it vastly faster than DELETE.',
          '3. DROP TABLE removes both the data pages and the metadata definition from the database engine.'
        ],
        realWorldExample: {
          scenario: 'Clearing monthly staging tables before loading fresh automated ETL batches using TRUNCATE TABLE.',
          query: 'SELECT count(*) as total_students FROM students;',
          explanation: 'Checks student count before or after DDL batch changes.'
        },
        sampleDatabase: 'college'
      }
    ]
  },
  {
    id: 7,
    levelId: 2,
    moduleNumber: 7,
    title: 'INSERT Statements',
    category: 'Basic SQL',
    description: 'Insert single rows, multiple rows, selected columns, and insert from SELECT queries.',
    topics: [
      {
        id: 'mod-7-topic-1',
        moduleId: 7,
        levelId: 2,
        topicNumber: '7.1',
        title: 'INSERT INTO Single & Multiple Rows',
        shortSummary: 'Add new records into tables with single or multi-row batch syntax.',
        whatIsIt: 'The INSERT INTO statement is DML (Data Manipulation Language) used to add one or more new records to an existing table. You can specify exact target column names or populate all columns in positional schema order.',
        syntax: '-- Single-row insert:\nINSERT INTO students (id, name, age, department_id, marks, email)\nVALUES (9, "Karthik Raj", 21, 1, 92.0, "karthik@kkacademy.edu");\n\n-- Multi-row batch insert (efficient):\nINSERT INTO students (id, name, age, department_id, marks, email)\nVALUES\n(10, "Pravin Kumar", 22, 2, 85.0, "pravin@kkacademy.edu"),\n(11, "Divya Suresh", 20, 1, 90.0, "divya@kkacademy.edu");',
        exampleQuery: 'SELECT id, name, marks, email FROM students WHERE id <= 3;',
        expectedOutput: {
          columns: ['id', 'name', 'marks', 'email'],
          rows: [
            [1, 'Kumar Selvan', 88.5, 'kumar@kkacademy.edu'],
            [2, 'Ananya Sharma', 94.0, 'ananya@kkacademy.edu'],
            [3, 'Rahul Verma', 76.5, 'rahul@kkacademy.edu']
          ]
        },
        howItWorks: [
          '1. The database checks column count and ensures values conform to declared data types.',
          '2. Any constraint violations (duplicate Primary Key, Foreign Key mismatch, NOT NULL violations) will abort the insert.',
          '3. Batch multi-row inserts reduce disk syncs and network round-trips compared to multiple single-row calls.'
        ],
        realWorldExample: {
          scenario: 'When a new customer signs up on an e-commerce website, the registration backend writes their profile tuple into the master customers table.',
          query: 'SELECT * FROM customers WHERE id = 1;',
          explanation: 'Validates newly registered customer record.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 8,
    levelId: 2,
    moduleNumber: 8,
    title: 'SELECT, Columns, Aliases & DISTINCT',
    category: 'Basic SQL',
    description: 'Retrieve data, project specific columns, rename outputs with aliases, and filter unique rows.',
    topics: [
      {
        id: 'mod-8-topic-1',
        moduleId: 8,
        levelId: 2,
        topicNumber: '8.1',
        title: 'SELECT Projection, Column Aliases & DISTINCT',
        shortSummary: 'Query relational tables, rename output columns with AS, and eliminate duplicate rows.',
        whatIsIt: 'The SELECT statement retrieves data from one or more tables. SELECT * fetches all columns, while specifying column names projects only needed attributes. The AS keyword provides aliases to rename output headers. The DISTINCT keyword filters out duplicate rows, returning only unique values.',
        syntax: 'SELECT DISTINCT column_name AS alias_name\nFROM table_name;\n\nSELECT name AS student_name, marks * 10 AS percentage\nFROM students;',
        exampleQuery: 'SELECT DISTINCT city FROM customers;',
        expectedOutput: {
          columns: ['city'],
          rows: [
            ['Mumbai'],
            ['Delhi'],
            ['Bengaluru'],
            ['Chennai'],
            ['Kolkata']
          ]
        },
        howItWorks: [
          '1. The engine scans the table specified in the FROM clause.',
          '2. Projection limits memory allocation to only the requested column attributes.',
          '3. DISTINCT executes an internal sort or hash-set deduplication pass to eliminate identical tuples.'
        ],
        realWorldExample: {
          scenario: 'A marketing team wants a list of unique delivery cities where active customers reside, without seeing repeating city names.',
          query: 'SELECT DISTINCT category FROM products;',
          explanation: 'Produces a deduplicated list of retail store inventory categories.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 9,
    levelId: 2,
    moduleNumber: 9,
    title: 'WHERE Clause & Comparison Operators',
    category: 'Basic SQL',
    description: 'Filter rows based on comparison operators (=, <>, !=, >, <, >=, <=).',
    topics: [
      {
        id: 'mod-9-topic-1',
        moduleId: 9,
        levelId: 2,
        topicNumber: '9.1',
        title: 'Filtering Rows with WHERE & Comparison Operators',
        shortSummary: 'Filter records meeting exact mathematical and equality conditions.',
        whatIsIt: 'The WHERE clause restricts rows returned by a query, filtering data based on boolean truth conditions. Comparison operators include = (equal), <> or != (not equal), > (greater than), < (less than), >= (greater than or equal), and <= (less than or equal).',
        syntax: 'SELECT column1, column2\nFROM table_name\nWHERE column_name operator value;\n\n-- Example:\nSELECT * FROM students WHERE marks >= 85.0;',
        exampleQuery: 'SELECT name, age, marks FROM students WHERE marks > 85.0;',
        expectedOutput: {
          columns: ['name', 'age', 'marks'],
          rows: [
            ['Kumar Selvan', 21, 88.5],
            ['Ananya Sharma', 20, 94.0],
            ['Pooja Hegde', 21, 89.0],
            ['Sneha Patel', 20, 91.5]
          ]
        },
        howItWorks: [
          '1. The WHERE clause evaluates on a row-by-row basis before projection.',
          '2. If an index exists on the filtered column, the query planner executes an index seek/range scan instead of a full table scan.',
          '3. Rows evaluating to TRUE are passed forward; rows evaluating to FALSE or NULL are discarded.'
        ],
        realWorldExample: {
          scenario: 'Hospital triage identifying elderly patients over 50 years of age for specialized cardiac screenings.',
          query: 'SELECT name, age, blood_group FROM patients WHERE age >= 50;',
          explanation: 'Filters high-risk patient records for clinical review.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },
  {
    id: 10,
    levelId: 2,
    moduleNumber: 10,
    title: 'Logical & Pattern Operators',
    category: 'Basic SQL',
    description: 'Combine filters with AND, OR, NOT, IN, BETWEEN, LIKE, IS NULL, and IS NOT NULL.',
    topics: [
      {
        id: 'mod-10-topic-1',
        moduleId: 10,
        levelId: 2,
        topicNumber: '10.1',
        title: 'Operators: AND, OR, NOT, IN, BETWEEN, LIKE & NULLs',
        shortSummary: 'Build sophisticated compound filters with logical operators and wildcard text matches.',
        whatIsIt: 'Logical operators combine multiple conditions. AND requires all conditions to be true; OR requires at least one; NOT negates a condition. IN checks membership in a list; BETWEEN checks an inclusive range; LIKE performs wildcard text search (% matches any characters, _ matches one single character); IS NULL and IS NOT NULL handle three-valued logic for missing data.',
        syntax: '-- BETWEEN:\nSELECT * FROM products WHERE price BETWEEN 100 AND 300;\n\n-- IN:\nSELECT * FROM customers WHERE city IN ("Mumbai", "Delhi", "Chennai");\n\n-- LIKE:\nSELECT * FROM students WHERE email LIKE "%@kkacademy.edu";\n\n-- NULL check:\nSELECT * FROM borrow_records WHERE return_date IS NULL;',
        exampleQuery: 'SELECT name, price, category FROM products WHERE category = "Electronics" AND price BETWEEN 100 AND 500;',
        expectedOutput: {
          columns: ['name', 'price', 'category'],
          rows: [
            ['Ergonomic Mechanical Keyboard', 120.00, 'Electronics'],
            ['Ultra-wide 34" Monitor', 480.00, 'Electronics']
          ]
        },
        howItWorks: [
          '1. Operator precedence rules dictate that AND binds tighter than OR. Always wrap OR expressions in parentheses when combined.',
          '2. NULL is not a value—it represents unknown data. Comparing col = NULL always returns UNKNOWN (false); you must use IS NULL.',
          '3. Prefix LIKE wildcards (e.g. "%phone") cannot utilize traditional B-tree indexes, forcing full scans.'
        ],
        realWorldExample: {
          scenario: 'A university library identifying overdue books that have been borrowed but not yet returned.',
          query: 'SELECT id, book_id, member_id, borrow_date FROM borrow_records WHERE return_date IS NULL;',
          explanation: 'Finds currently active unreturned book loans using IS NULL.'
        },
        sampleDatabase: 'library'
      }
    ]
  },
  {
    id: 11,
    levelId: 2,
    moduleNumber: 11,
    title: 'ORDER BY Sorting',
    category: 'Basic SQL',
    description: 'Sort query results in ASC (ascending) or DESC (descending) sequence across multiple columns.',
    topics: [
      {
        id: 'mod-11-topic-1',
        moduleId: 11,
        levelId: 2,
        topicNumber: '11.1',
        title: 'ORDER BY Ascending & Descending Multi-Column Sorting',
        shortSummary: 'Order result sets by one or multiple fields in ascending or descending order.',
        whatIsIt: 'In relational database theory, tables are unordered sets. The ORDER BY clause guarantees deterministic sequencing of output records. ASC sorts from lowest to highest (default); DESC sorts from highest to lowest. Multiple columns can be specified to handle tie-breakers.',
        syntax: 'SELECT column1, column2\nFROM table_name\nORDER BY column1 [ASC | DESC], column2 [ASC | DESC];',
        exampleQuery: 'SELECT name, marks, age FROM students ORDER BY marks DESC;',
        expectedOutput: {
          columns: ['name', 'marks', 'age'],
          rows: [
            ['Ananya Sharma', 94.0, 20],
            ['Sneha Patel', 91.5, 20],
            ['Pooja Hegde', 89.0, 21],
            ['Kumar Selvan', 88.5, 21],
            ['Kavya Nair', 84.0, 21],
            ['Rahul Verma', 76.5, 22],
            ['Arjun Reddy', 72.0, 22],
            ['Vikram Rathore', 68.0, 23]
          ]
        },
        howItWorks: [
          '1. The database optimizer checks if an index exists with matching sort order to avoid an in-memory sort.',
          '2. If no sorted index is available, the engine buffers rows and executes an external or memory sort algorithm.',
          '3. Tied values on the primary sort column defer to subsequent columns listed in the ORDER BY clause.'
        ],
        realWorldExample: {
          scenario: 'Displaying top-earning accounts or highest balance holders in a private banking wealth management portal.',
          query: 'SELECT account_no, balance, account_type FROM accounts ORDER BY balance DESC;',
          explanation: 'Ranks bank accounts from wealthiest to lowest balance.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 12,
    levelId: 2,
    moduleNumber: 12,
    title: 'LIMIT & OFFSET Pagination',
    category: 'Basic SQL',
    description: 'Constrain the volume of returned rows and implement UI page-by-page data pagination.',
    topics: [
      {
        id: 'mod-12-topic-1',
        moduleId: 12,
        levelId: 2,
        topicNumber: '12.1',
        title: 'LIMIT & OFFSET for Result Pagination',
        shortSummary: 'Slice query output windows for efficient, high-performance web pagination.',
        whatIsIt: 'The LIMIT clause restricts the maximum number of rows returned by a query. The OFFSET clause specifies the number of rows to skip before beginning to return records. Together, they form the cornerstone of web table pagination (e.g. Page 2 with 10 items per page = LIMIT 10 OFFSET 10).',
        syntax: 'SELECT * FROM table_name\nORDER BY sort_column\nLIMIT number_of_rows OFFSET rows_to_skip;\n\n-- Page formula: OFFSET = (page_number - 1) * page_size',
        exampleQuery: 'SELECT name, marks FROM students ORDER BY marks DESC LIMIT 3 OFFSET 2;',
        expectedOutput: {
          columns: ['name', 'marks'],
          rows: [
            ['Pooja Hegde', 89.0],
            ['Kumar Selvan', 88.5],
            ['Kavya Nair', 84.0]
          ]
        },
        howItWorks: [
          '1. The engine processes the query, sorts rows if ORDER BY is present, and streams results.',
          '2. It skips the first OFFSET count of rows and returns the next LIMIT rows, terminating execution immediately.',
          '3. For very large offsets (e.g. OFFSET 1,000,000), seek pagination (keyset pagination with WHERE id > last_id) is preferred.'
        ],
        realWorldExample: {
          scenario: 'An e-commerce mobile app showing Page 1 of search results with 4 top-selling products per screen.',
          query: 'SELECT id, name, price FROM products ORDER BY price DESC LIMIT 4 OFFSET 0;',
          explanation: 'Fetches the first 4 most premium items in the retail inventory.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 13,
    levelId: 2,
    moduleNumber: 13,
    title: 'UPDATE Records',
    category: 'Basic SQL',
    description: 'Modify existing table values safely with targeted WHERE predicates.',
    topics: [
      {
        id: 'mod-13-topic-1',
        moduleId: 13,
        levelId: 2,
        topicNumber: '13.1',
        title: 'UPDATE Statement & Safe Mutations',
        shortSummary: 'Modify existing values in table columns with precise targeting.',
        whatIsIt: 'The UPDATE statement modifies values in existing table rows. You specify the target column and new value using the SET clause, and filter rows using WHERE. Omitting the WHERE clause updates EVERY row in the entire table!',
        syntax: 'UPDATE table_name\nSET column1 = new_value1, column2 = new_value2\nWHERE target_condition;\n\n-- Safe update with specific ID:\nUPDATE students SET marks = 95.0 WHERE id = 1;',
        exampleQuery: 'SELECT id, name, marks FROM students WHERE id = 1;',
        expectedOutput: {
          columns: ['id', 'name', 'marks'],
          rows: [
            [1, 'Kumar Selvan', 88.5]
          ]
        },
        howItWorks: [
          '1. The engine locks the target row or data page to ensure concurrency isolation.',
          '2. It verifies the new value satisfies all domain checks and data type constraints.',
          '3. The transaction log (WAL / Redo log) records the change before writing data pages to disk.'
        ],
        realWorldExample: {
          scenario: 'A bank customer deposits funds into their account: the system updates their current balance column by adding the deposit sum.',
          query: 'SELECT account_no, balance FROM accounts WHERE account_no = 100101;',
          explanation: 'Inspects active balance before and after atomic ledger update.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 14,
    levelId: 2,
    moduleNumber: 14,
    title: 'DELETE Records',
    category: 'Basic SQL',
    description: 'Remove records from a table with row-level transaction logging and constraints.',
    topics: [
      {
        id: 'mod-14-topic-1',
        moduleId: 14,
        levelId: 2,
        topicNumber: '14.1',
        title: 'DELETE Statement vs TRUNCATE vs DROP',
        shortSummary: 'Remove targeted rows while respecting foreign key constraints.',
        whatIsIt: 'The DELETE statement removes specific rows from a table that match the WHERE clause. Unlike TRUNCATE, DELETE logs every individual deleted row and activates database triggers. If Foreign Key constraints with RESTRICT are present, rows referenced by child tables cannot be deleted.',
        syntax: 'DELETE FROM table_name\nWHERE condition;\n\n-- Compare:\n-- DELETE: DML, row-by-row, rollbackable, WHERE supported\n-- TRUNCATE: DDL, rapid page deallocation, cannot filter\n-- DROP: DDL, destroys data and schema permanently',
        exampleQuery: 'SELECT id, name, marks FROM students WHERE id = 8;',
        expectedOutput: {
          columns: ['id', 'name', 'marks'],
          rows: [
            [8, 'Kavya Nair', 84.0]
          ]
        },
        howItWorks: [
          '1. The database checks referential integrity on child tables referencing the row.',
          '2. The engine marks row slots as deleted and writes change records to the transaction rollback undo log.',
          '3. Free space is reclaimed during database vacuum or auto-compaction.'
        ],
        realWorldExample: {
          scenario: 'Canceling a pending hospital appointment when a patient calls to reschedule.',
          query: 'SELECT * FROM appointments WHERE status = "Scheduled";',
          explanation: 'Identifies appointments eligible for cancellation or deletion.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: INTERMEDIATE SQL (Modules 15 - 24)
  // ==========================================
  {
    id: 15,
    levelId: 3,
    moduleNumber: 15,
    title: 'Table Constraints',
    category: 'Intermediate SQL',
    description: 'Enforce relational integrity: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and DEFAULT.',
    topics: [
      {
        id: 'mod-15-topic-1',
        moduleId: 15,
        levelId: 3,
        topicNumber: '15.1',
        title: 'Integrity Constraints: PRIMARY KEY, UNIQUE, NOT NULL, CHECK & DEFAULT',
        shortSummary: 'Protect database data validity at the schema level using declarative rules.',
        whatIsIt: 'Constraints are schema-level rules enforced by the RDBMS engine on table columns to prevent invalid, corrupted, or duplicate data. PRIMARY KEY guarantees uniqueness and non-nullability; UNIQUE ensures all values in a column are distinct; NOT NULL forbids empty values; CHECK validates that values satisfy a boolean predicate (e.g. age >= 18); DEFAULT supplies a fallback value when none is provided.',
        syntax: 'CREATE TABLE employees (\n    id INT PRIMARY KEY,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    age INT CHECK (age >= 18),\n    status VARCHAR(20) DEFAULT "Active",\n    department_id INT,\n    FOREIGN KEY (department_id) REFERENCES departments(id)\n);',
        exampleQuery: 'SELECT id, name, age, email FROM students WHERE age >= 20;',
        expectedOutput: {
          columns: ['id', 'name', 'age', 'email'],
          rows: [
            [1, 'Kumar Selvan', 21, 'kumar@kkacademy.edu'],
            [2, 'Ananya Sharma', 20, 'ananya@kkacademy.edu'],
            [3, 'Rahul Verma', 22, 'rahul@kkacademy.edu'],
            [4, 'Pooja Hegde', 21, 'pooja@kkacademy.edu']
          ]
        },
        howItWorks: [
          '1. The database validates all constraints before finalizing any INSERT or UPDATE transaction.',
          '2. Violating any constraint immediately rolls back the statement and returns a descriptive error.',
          '3. Storing validation rules inside the database guarantees consistency across multiple microservices.'
        ],
        realWorldExample: {
          scenario: 'In banking, an account balance must never fall below zero for a basic debit account. A CHECK (balance >= 0) constraint guarantees the account can never be overdrawn at the database level.',
          query: 'SELECT account_no, balance, status FROM accounts WHERE balance > 50000;',
          explanation: 'Audits accounts meeting minimum regulatory liquidity thresholds.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 16,
    levelId: 3,
    moduleNumber: 16,
    title: 'Aggregate Functions',
    category: 'Intermediate SQL',
    description: 'Perform statistical computations: COUNT(), SUM(), AVG(), MIN(), and MAX().',
    topics: [
      {
        id: 'mod-16-topic-1',
        moduleId: 16,
        levelId: 3,
        topicNumber: '16.1',
        title: 'COUNT(), SUM(), AVG(), MIN() & MAX()',
        shortSummary: 'Summarize large datasets into single statistical metrics.',
        whatIsIt: 'Aggregate functions compute a single summary result across a set of values in a column. COUNT(*) returns the total number of rows; COUNT(column) counts non-null entries; SUM() calculates numeric totals; AVG() computes the arithmetic mean; MIN() and MAX() find lowest and highest values.',
        syntax: 'SELECT\n    COUNT(*) AS total_students,\n    AVG(marks) AS average_score,\n    MIN(marks) AS lowest_score,\n    MAX(marks) AS highest_score,\n    SUM(marks) AS total_marks\nFROM students;',
        exampleQuery: 'SELECT COUNT(*) AS total_students, AVG(marks) AS avg_marks, MIN(marks) AS min_marks, MAX(marks) AS max_marks FROM students;',
        expectedOutput: {
          columns: ['total_students', 'avg_marks', 'min_marks', 'max_marks'],
          rows: [
            [8, 83.06, 68.0, 94.0]
          ]
        },
        howItWorks: [
          '1. The query engine scans all qualifying rows and maintains running accumulator variables.',
          '2. NULL values are automatically ignored by SUM, AVG, MIN, and MAX.',
          '3. COUNT(*) counts every qualifying row, including rows with NULL values.'
        ],
        realWorldExample: {
          scenario: 'An e-commerce financial report calculating gross order revenue, average order value (AOV), and total processed transactions.',
          query: 'SELECT COUNT(*) AS total_orders, SUM(total_amount) AS gross_revenue, AVG(total_amount) AS avg_order_value FROM orders;',
          explanation: 'Computes executive e-commerce KPIs in a single query pass.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 17,
    levelId: 3,
    moduleNumber: 17,
    title: 'GROUP BY Clause',
    category: 'Intermediate SQL',
    description: 'Group identical rows into summary buckets and aggregate per group.',
    topics: [
      {
        id: 'mod-17-topic-1',
        moduleId: 17,
        levelId: 3,
        topicNumber: '17.1',
        title: 'Grouping Data with GROUP BY',
        shortSummary: 'Partition records into category buckets to calculate per-group metrics.',
        whatIsIt: 'The GROUP BY clause collapses records with identical values in specified columns into summary rows. Any column present in the SELECT list that is not aggregated with an aggregate function (SUM, COUNT, AVG) MUST appear in the GROUP BY clause.',
        syntax: 'SELECT grouping_column, AGG_FUNCTION(metric_column)\nFROM table_name\nGROUP BY grouping_column;',
        exampleQuery: 'SELECT department_id, COUNT(*) AS student_count, AVG(marks) AS avg_marks FROM students GROUP BY department_id;',
        expectedOutput: {
          columns: ['department_id', 'student_count', 'avg_marks'],
          rows: [
            [1, 3, 91.33],
            [2, 2, 82.75],
            [3, 2, 76.0],
            [4, 1, 72.0]
          ]
        },
        howItWorks: [
          '1. The engine constructs an in-memory hash table or sorts rows by the grouping keys.',
          '2. Rows sharing the same grouping key update the corresponding aggregate accumulator buckets.',
          '3. The final result set emits one projected row per distinct group.'
        ],
        realWorldExample: {
          scenario: 'An inventory manager analyzing stock quantity and average price across product categories.',
          query: 'SELECT category, COUNT(*) AS product_count, AVG(price) AS avg_price FROM products GROUP BY category;',
          explanation: 'Groups catalog items by category with count and pricing metrics.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 18,
    levelId: 3,
    moduleNumber: 18,
    title: 'HAVING Clause',
    category: 'Intermediate SQL',
    description: 'Filter aggregated groups after GROUP BY evaluation (difference between WHERE and HAVING).',
    topics: [
      {
        id: 'mod-18-topic-1',
        moduleId: 18,
        levelId: 3,
        topicNumber: '18.1',
        title: 'HAVING Clause: Filtering Aggregated Groups',
        shortSummary: 'Filter summarized groups based on aggregate conditions.',
        whatIsIt: 'The HAVING clause filters groups produced by the GROUP BY clause based on aggregate function values. WHERE filters individual rows BEFORE grouping; HAVING filters aggregated groups AFTER grouping.',
        syntax: 'SELECT department_id, AVG(marks) AS avg_marks\nFROM students\nWHERE age >= 20               -- Row filter (before grouping)\nGROUP BY department_id\nHAVING AVG(marks) > 80.0;     -- Group filter (after grouping)',
        exampleQuery: 'SELECT department_id, COUNT(*) AS student_count, AVG(marks) AS avg_marks FROM students GROUP BY department_id HAVING AVG(marks) > 80.0;',
        expectedOutput: {
          columns: ['department_id', 'student_count', 'avg_marks'],
          rows: [
            [1, 3, 91.33],
            [2, 2, 82.75]
          ]
        },
        howItWorks: [
          '1. WHERE clause filters individual rows first.',
          '2. GROUP BY partitions the surviving rows into groups.',
          '3. Aggregates are computed for each group.',
          '4. HAVING clause evaluates the condition against each group and discards groups that fail.'
        ],
        realWorldExample: {
          scenario: 'Identifying high-volume customers who have spent over $500 across their completed orders.',
          query: 'SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id HAVING SUM(total_amount) >= 500.00;',
          explanation: 'Filters high-value VIP customers based on total purchase volume.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 19,
    levelId: 3,
    moduleNumber: 19,
    title: 'String Functions',
    category: 'Intermediate SQL',
    description: 'Manipulate text: CONCAT, UPPER, LOWER, LENGTH, TRIM, SUBSTRING, and REPLACE.',
    topics: [
      {
        id: 'mod-19-topic-1',
        moduleId: 19,
        levelId: 3,
        topicNumber: '19.1',
        title: 'SQL String Functions: Formatting & Manipulation',
        shortSummary: 'Transform and clean textual data using built-in string functions.',
        whatIsIt: 'String functions process and manipulate text values. CONCAT combines strings; UPPER and LOWER convert case; LENGTH calculates character count; TRIM strips leading/trailing spaces; SUBSTRING extracts a slice of text; REPLACE substitutes target substrings.',
        syntax: 'SELECT\n    CONCAT(first_name, " ", last_name) AS full_name,\n    UPPER(city) AS city_caps,\n    LENGTH(email) AS email_len,\n    SUBSTRING(phone, 1, 3) AS area_code,\n    REPLACE(status, "Pending", "In Review") AS display_status\nFROM users;',
        exampleQuery: 'SELECT name, UPPER(name) AS upper_name, LENGTH(name) AS char_count FROM students LIMIT 4;',
        expectedOutput: {
          columns: ['name', 'upper_name', 'char_count'],
          rows: [
            ['Kumar Selvan', 'KUMAR SELVAN', 12],
            ['Ananya Sharma', 'ANANYA SHARMA', 13],
            ['Rahul Verma', 'RAHUL VERMA', 11],
            ['Pooja Hegde', 'POOJA HEGDE', 11]
          ]
        },
        howItWorks: [
          '1. String scalar functions evaluate for each row individually during projection.',
          '2. Functions preserve data purity without mutating the underlying stored table data.',
          '3. Applying functions on indexed columns in WHERE clauses (e.g. WHERE UPPER(name) = "...") can suppress index usage unless a functional index is defined.'
        ],
        realWorldExample: {
          scenario: 'Normalizing book catalog titles and displaying uppercase author names for print library labels.',
          query: 'SELECT UPPER(title) AS catalog_title, genre FROM books WHERE published_year > 1995;',
          explanation: 'Generates uppercase titles for publication indices.'
        },
        sampleDatabase: 'library'
      }
    ]
  },
  {
    id: 20,
    levelId: 3,
    moduleNumber: 20,
    title: 'Numeric & Math Functions',
    category: 'Intermediate SQL',
    description: 'Perform mathematical operations: ROUND, CEIL, FLOOR, ABS, MOD, POWER, and SQRT.',
    topics: [
      {
        id: 'mod-20-topic-1',
        moduleId: 20,
        levelId: 3,
        topicNumber: '20.1',
        title: 'Numeric Functions: Mathematical Calculations',
        shortSummary: 'Execute rounding, modulo, power, and absolute calculations directly in SQL.',
        whatIsIt: 'Numeric functions perform arithmetic and algebraic calculations on numeric columns. ROUND(val, decimals) rounds to specified decimal places; CEIL(val) rounds up to the next integer; FLOOR(val) rounds down; ABS(val) returns positive magnitude; MOD(n, m) returns division remainder; POWER(base, exp) raises base to exponent.',
        syntax: 'SELECT\n    ROUND(price, 1) AS rounded_price,\n    CEIL(price) AS ceiling_price,\n    FLOOR(price) AS floor_price,\n    ABS(balance_diff) AS absolute_diff,\n    MOD(id, 2) AS is_even_or_odd\nFROM table_name;',
        exampleQuery: 'SELECT name, marks, ROUND(marks, 0) AS rounded_marks, FLOOR(marks) AS floor_marks FROM students LIMIT 4;',
        expectedOutput: {
          columns: ['name', 'marks', 'rounded_marks', 'floor_marks'],
          rows: [
            ['Kumar Selvan', 88.5, 89, 88],
            ['Ananya Sharma', 94.0, 94, 94],
            ['Rahul Verma', 76.5, 77, 76],
            ['Pooja Hegde', 89.0, 89, 89]
          ]
        },
        howItWorks: [
          '1. The math coprocessor computes results per row during expression evaluation.',
          '2. Rounding follows standard half-up or bankers rounding based on database configuration.',
          '3. Modulo arithmetic is commonly used for hash partitioning or alternating table row striping.'
        ],
        realWorldExample: {
          scenario: 'Calculating discounted prices and rounding billing totals for retail invoices.',
          query: 'SELECT name, price, ROUND(price * 0.90, 2) AS discounted_price_10pct FROM products;',
          explanation: 'Applies a 10% promotional discount rounded to exact currency cents.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 21,
    levelId: 3,
    moduleNumber: 21,
    title: 'Date & Time Functions',
    category: 'Intermediate SQL',
    description: 'Work with temporal data: NOW, CURDATE, YEAR, MONTH, DAY, and DATEDIFF.',
    topics: [
      {
        id: 'mod-21-topic-1',
        moduleId: 21,
        levelId: 3,
        topicNumber: '21.1',
        title: 'Date & Temporal Functions in SQL',
        shortSummary: 'Extract date parts, compute intervals, and handle calendar timelines.',
        whatIsIt: 'Date functions inspect and manipulate temporal data types (DATE, DATETIME, TIMESTAMP). Common functions include NOW() or CURRENT_TIMESTAMP for present date/time, CURDATE() for present date, YEAR(), MONTH(), and DAY() for part extraction, and DATEDIFF() to calculate days between dates.',
        syntax: 'SELECT\n    order_date,\n    YEAR(order_date) AS order_year,\n    MONTH(order_date) AS order_month,\n    DATEDIFF(delivery_date, order_date) AS transit_days\nFROM orders;',
        exampleQuery: 'SELECT id, order_date, total_amount, status FROM orders WHERE order_date >= "2026-03-05";',
        expectedOutput: {
          columns: ['id', 'order_date', 'total_amount', 'status'],
          rows: [
            [1002, '2026-03-05', 480.00, 'Delivered'],
            [1003, '2026-03-10', 120.00, 'Shipped'],
            [1004, '2026-03-12', 199.00, 'Processing'],
            [1005, '2026-03-15', 550.00, 'Delivered']
          ]
        },
        howItWorks: [
          '1. Temporal types are stored internally as epoch timestamps or packed binary integers.',
          '2. Comparing dates using ISO 8601 strings ("YYYY-MM-DD") ensures cross-database compatibility.',
          '3. Date arithmetic takes leap years and variable month lengths into account.'
        ],
        realWorldExample: {
          scenario: 'A banking compliance system tracking accounts dormant for more than 180 days.',
          query: 'SELECT tx_id, account_no, tx_type, amount, tx_date FROM transactions WHERE tx_date >= "2026-03-05";',
          explanation: 'Filters recent financial ledger transactions.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 22,
    levelId: 3,
    moduleNumber: 22,
    title: 'Visual JOINS Masterclass',
    category: 'Intermediate SQL',
    description: 'Complete visual and relational lesson: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, and SELF JOIN.',
    topics: [
      {
        id: 'mod-22-topic-1',
        moduleId: 22,
        levelId: 3,
        topicNumber: '22.1',
        title: 'INNER JOIN & Multi-Table Relationships',
        shortSummary: 'Combine rows from two tables where the matching key condition is met in both.',
        whatIsIt: 'An INNER JOIN matches records from two tables where the join condition is satisfied. Rows from either table that do not have a corresponding match in the other table are excluded from the result set.',
        visualArchitectureDiagram: `flowchart LR
    subgraph Table A [Left Table]
      A1[ID: 1]
      A2[ID: 2 - MATCH]
      A3[ID: 3]
    end
    
    subgraph Table B [Right Table]
      B1[FK: 2 - MATCH]
      B2[FK: 4]
    end

    A2 ====>|INNER JOIN ON ID = FK| Result[Result: ID 2 Data]
    B1 ====> Result
    
    style A2 fill:#059669,stroke:#047857,stroke-width:2px,color:#fff
    style B1 fill:#059669,stroke:#047857,stroke-width:2px,color:#fff
    style Result fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#fff`,
        syntax: 'SELECT\n    students.name,\n    departments.department_name,\n    departments.building\nFROM students\nINNER JOIN departments\n    ON students.department_id = departments.id;',
        exampleQuery: 'SELECT s.name AS student_name, s.marks, d.department_name, d.building FROM students s INNER JOIN departments d ON s.department_id = d.id LIMIT 4;',
        expectedOutput: {
          columns: ['student_name', 'marks', 'department_name', 'building'],
          rows: [
            ['Kumar Selvan', 88.5, 'Computer Science', 'Turing Block'],
            ['Ananya Sharma', 94.0, 'Computer Science', 'Turing Block'],
            ['Rahul Verma', 76.5, 'Information Technology', 'Babbage Hall'],
            ['Pooja Hegde', 89.0, 'Information Technology', 'Babbage Hall']
          ]
        },
        howItWorks: [
          '1. The query optimizer chooses between Nested Loop, Hash Join, or Merge Join algorithms based on table sizes and indexes.',
          '2. Only rows satisfying the ON predicate are combined into composite rows.',
          '3. Table aliases (s for students, d for departments) prevent ambiguous column name errors.'
        ],
        realWorldExample: {
          scenario: 'Linking retail orders to customer master profiles to display customer names alongside their order totals.',
          query: 'SELECT o.id AS order_no, c.name AS customer_name, c.city, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
          explanation: 'Produces a unified customer order ledger.'
        },
        sampleDatabase: 'ecommerce'
      },
      {
        id: 'mod-22-topic-2',
        moduleId: 22,
        levelId: 3,
        topicNumber: '22.2',
        title: 'LEFT, RIGHT, FULL OUTER, CROSS & SELF JOINS',
        shortSummary: 'Preserve unmatched rows with outer joins, build cartesian products, and join tables to themselves.',
        whatIsIt: 'A LEFT JOIN returns all rows from the left table, with matched data from the right table (or NULLs if no match). RIGHT JOIN returns all rows from the right table. FULL OUTER JOIN retains all rows from both tables. CROSS JOIN creates a Cartesian product (M × N). A SELF JOIN joins a table to itself (e.g. employee-to-manager hierarchies).',
        visualArchitectureDiagram: `flowchart LR
    subgraph Table A [Left Table]
      A1[ID: 1 - NO MATCH]
      A2[ID: 2 - MATCH]
    end
    
    subgraph Table B [Right Table]
      B1[FK: 2 - MATCH]
      B2[FK: 4 - NO MATCH]
    end

    A1 -.->|LEFT JOIN| Result1[Result: ID 1 + NULL]
    A2 ====>|LEFT JOIN| Result2[Result: ID 2 + B1]
    
    style A1 fill:#9f1239,stroke:#e11d48,stroke-width:2px,color:#fff
    style A2 fill:#059669,stroke:#047857,stroke-width:2px,color:#fff
    style B1 fill:#059669,stroke:#047857,stroke-width:2px,color:#fff
    style Result1 fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
    style Result2 fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#fff`,
        syntax: '-- LEFT JOIN (preserves all left rows):\nSELECT d.department_name, s.name\nFROM departments d\nLEFT JOIN students s ON d.id = s.department_id;\n\n-- SELF JOIN:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;',
        exampleQuery: 'SELECT b.title, a.name AS author_name, a.country FROM books b LEFT JOIN authors a ON b.author_id = a.id;',
        expectedOutput: {
          columns: ['title', 'author_name', 'country'],
          rows: [
            ['Harry Potter & Philosopher Stone', 'J.K. Rowling', 'UK'],
            ['A Game of Thrones', 'George R.R. Martin', 'USA'],
            ['The God of Small Things', 'Arundhati Roy', 'India'],
            ['Norwegian Wood', 'Haruki Murakami', 'Japan'],
            ['Kafka on the Shore', 'Haruki Murakami', 'Japan']
          ]
        },
        howItWorks: [
          '1. In a LEFT JOIN, every row from the left table is preserved in the output pipeline.',
          '2. If the right table has no matching row, NULL is populated for all right table columns.',
          '3. Filtering right-table columns with `WHERE right.id IS NULL` is an efficient technique to find anti-matches (e.g. customers who never placed an order).'
        ],
        realWorldExample: {
          scenario: 'Finding all hospital doctors and checking whether they have active appointments scheduled today, ensuring doctors with zero appointments are still displayed.',
          query: 'SELECT d.name AS doctor, d.specialty, a.id AS appt_id, a.status FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id;',
          explanation: 'Displays all physicians regardless of appointment booking status.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },
  {
    id: 23,
    levelId: 3,
    moduleNumber: 23,
    title: 'UNION & Set Operations',
    category: 'Intermediate SQL',
    description: 'Combine query results with UNION, UNION ALL, INTERSECT, and EXCEPT.',
    topics: [
      {
        id: 'mod-23-topic-1',
        moduleId: 23,
        levelId: 3,
        topicNumber: '23.1',
        title: 'UNION, UNION ALL, INTERSECT & EXCEPT',
        shortSummary: 'Combine results of multiple queries vertically into a unified set.',
        whatIsIt: 'Set operators combine the results of two or more SELECT queries into a single result set. Both queries must project the same number of columns with compatible data types. UNION merges sets and removes duplicate rows; UNION ALL merges sets while retaining duplicates (much faster); INTERSECT returns rows present in both sets; EXCEPT (or MINUS) returns rows in the first set but not the second.',
        syntax: 'SELECT name, "Student" AS role FROM students\nUNION ALL\nSELECT head AS name, "Department Head" AS role FROM departments;',
        exampleQuery: 'SELECT name, "Student" AS role FROM students LIMIT 3 UNION ALL SELECT head AS name, "Professor" AS role FROM departments LIMIT 2;',
        expectedOutput: {
          columns: ['name', 'role'],
          rows: [
            ['Kumar Selvan', 'Student'],
            ['Ananya Sharma', 'Student'],
            ['Rahul Verma', 'Student'],
            ['Dr. Alan', 'Professor'],
            ['Dr. Ada', 'Professor']
          ]
        },
        howItWorks: [
          '1. UNION ALL simply concatenates result buffers without checking for duplicates, consuming minimal CPU.',
          '2. Plain UNION executes an internal sort and distinct deduplication step across all columns.',
          '3. Column names in the final result set are determined by the first SELECT query.'
        ],
        realWorldExample: {
          scenario: 'Building a unified university directory of all campus email addresses by combining student, faculty, and administrative staff tables.',
          query: 'SELECT email FROM students UNION SELECT "admin@kkacademy.edu" AS email;',
          explanation: 'Consolidates distinct email addresses across multiple campus registries.'
        },
        sampleDatabase: 'college'
      }
    ]
  },
  {
    id: 24,
    levelId: 3,
    moduleNumber: 24,
    title: 'Subqueries & Nested Queries',
    category: 'Intermediate SQL',
    description: 'Master Single-row, Multi-row, Correlated, and Nested subqueries.',
    topics: [
      {
        id: 'mod-24-topic-1',
        moduleId: 24,
        levelId: 3,
        topicNumber: '24.1',
        title: 'Single-Row, Multi-Row & Correlated Subqueries',
        shortSummary: 'Embed queries inside other queries to solve complex multi-stage problems.',
        whatIsIt: 'A Subquery is a SELECT statement nested inside another SQL statement (in WHERE, FROM, or SELECT clauses). A Single-row subquery returns one scalar value; a Multi-row subquery returns multiple rows used with IN, ANY, or ALL; a Correlated subquery references columns from the outer query and re-executes for each outer row.',
        syntax: '-- Scalar subquery in WHERE:\nSELECT * FROM students\nWHERE marks > (SELECT AVG(marks) FROM students);\n\n-- Correlated subquery:\nSELECT * FROM products p1\nWHERE price > (\n    SELECT AVG(price) FROM products p2 WHERE p2.category = p1.category\n);',
        exampleQuery: 'SELECT name, marks FROM students WHERE marks > (SELECT AVG(marks) FROM students);',
        expectedOutput: {
          columns: ['name', 'marks'],
          rows: [
            ['Kumar Selvan', 88.5],
            ['Ananya Sharma', 94.0],
            ['Pooja Hegde', 89.0],
            ['Sneha Patel', 91.5],
            ['Kavya Nair', 84.0]
          ]
        },
        howItWorks: [
          '1. Uncorrelated subqueries execute once and cache the scalar result for the outer query.',
          '2. Correlated subqueries execute repeatedly for each candidate row in the outer query unless transformed into a JOIN by the optimizer.',
          '3. Subqueries in the FROM clause are known as Derived Tables or Inline Views.'
        ],
        realWorldExample: {
          scenario: 'Finding hospital patients whose age is above the average patient age across the entire clinic.',
          query: 'SELECT name, age, blood_group FROM patients WHERE age > (SELECT AVG(age) FROM patients);',
          explanation: 'Identifies senior patient cohort relative to the clinical average.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },

  // ==========================================
  // LEVEL 4: ADVANCED SQL (Modules 25 - 34)
  // ==========================================
  {
    id: 25,
    levelId: 4,
    moduleNumber: 25,
    title: 'Views & Materialized Views',
    category: 'Advanced SQL',
    description: 'Encapsulate complex logic, enforce row/column level security, and optimize with views.',
    topics: [
      {
        id: 'mod-25-topic-1',
        moduleId: 25,
        levelId: 4,
        topicNumber: '25.1',
        title: 'Creating & Managing Database Views',
        shortSummary: 'Save reusable virtual query abstractions to simplify access and enhance security.',
        whatIsIt: 'A View is a virtual table defined by a stored SQL query. It does not store physical data itself (unless it is a Materialized View). Instead, it queries the underlying base tables dynamically whenever accessed. Views simplify complex multi-table joins, provide backward compatibility, and implement column-level security by hiding sensitive attributes (like passwords or salaries).',
        syntax: '-- Create View:\nCREATE VIEW top_students_view AS\nSELECT s.name, s.marks, d.department_name\nFROM students s\nJOIN departments d ON s.department_id = d.id\nWHERE s.marks >= 85.0;\n\n-- Query View:\nSELECT * FROM top_students_view;',
        exampleQuery: 'SELECT s.name, s.marks, d.department_name FROM students s JOIN departments d ON s.department_id = d.id WHERE s.marks >= 88.0;',
        expectedOutput: {
          columns: ['name', 'marks', 'department_name'],
          rows: [
            ['Kumar Selvan', 88.5, 'Computer Science'],
            ['Ananya Sharma', 94.0, 'Computer Science'],
            ['Pooja Hegde', 89.0, 'Information Technology'],
            ['Sneha Patel', 91.5, 'Computer Science']
          ]
        },
        howItWorks: [
          '1. When a view is queried, the database rewrites the AST by inlining the view definition into the user query.',
          '2. Query optimization rules (predicate pushdown, join elimination) apply seamlessly across the view boundary.',
          '3. Materialized Views physically cache the computed result set on disk and require periodic REFRESH.'
        ],
        realWorldExample: {
          scenario: 'A banking app exposes a customer_summary_view to customer service reps that displays balances and names, while intentionally omitting encrypted tax identification numbers and private credentials.',
          query: 'SELECT account_no, account_type, status FROM accounts WHERE status = "Active";',
          explanation: 'Restricted safe view abstraction for client service agents.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 26,
    levelId: 4,
    moduleNumber: 26,
    title: 'Indexes & Query Performance',
    category: 'Advanced SQL',
    description: 'Master B-Tree indexes, Composite indexes, Unique indexes, and know when NOT to index.',
    topics: [
      {
        id: 'mod-26-topic-1',
        moduleId: 26,
        levelId: 4,
        topicNumber: '26.1',
        title: 'B-Tree Indexes, Clustered Keys & Performance Trade-offs',
        shortSummary: 'Accelerate search lookups from O(N) full table scans to O(log N) logarithmic binary tree seeks.',
        whatIsIt: 'An Index is an auxiliary on-disk data structure (typically a self-balancing B+Tree) that enables the database to locate rows rapidly without scanning every block of the table. While indexes drastically accelerate SELECT and WHERE queries, each index imposes write overhead on INSERT, UPDATE, and DELETE operations as the tree must be rebalanced.',
        syntax: '-- Single Column Index:\nCREATE INDEX idx_student_marks ON students(marks);\n\n-- Composite Index (respects Leftmost Prefix rule):\nCREATE INDEX idx_cust_city_tier ON customers(city, tier);\n\n-- Unique Index:\nCREATE UNIQUE INDEX idx_student_email ON students(email);',
        exampleQuery: 'SELECT name, marks FROM students WHERE marks = 94.0;',
        expectedOutput: {
          columns: ['name', 'marks'],
          rows: [
            ['Ananya Sharma', 94.0]
          ]
        },
        howItWorks: [
          '1. A B+Tree index stores sorted key values in tree nodes, with leaf nodes holding row pointers (or clustered row data).',
          '2. Instead of scanning 10 million rows sequentially, a B-tree of depth 3-4 finds the record in just 3-4 block reads.',
          '3. Leftmost prefix rule: An index on (A, B, C) can satisfy queries filtering on (A), (A, B), or (A, B, C), but NOT (B) or (C) alone.'
        ],
        realWorldExample: {
          scenario: 'An e-commerce order lookup system with 50 million orders. Without an index on customer_id, fetching order history requires a 40-second full disk scan. With a B-tree index, the lookup completes in under 2 milliseconds.',
          query: 'SELECT id, total_amount, status FROM orders WHERE customer_id = 1;',
          explanation: 'Instantaneous indexed customer order retrieval.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 27,
    levelId: 4,
    moduleNumber: 27,
    title: 'Transactions: COMMIT, ROLLBACK & SAVEPOINT',
    category: 'Advanced SQL',
    description: 'Ensure atomic multi-step operations using transaction boundaries.',
    topics: [
      {
        id: 'mod-27-topic-1',
        moduleId: 27,
        levelId: 4,
        topicNumber: '27.1',
        title: 'Transaction Control: START TRANSACTION, COMMIT & ROLLBACK',
        shortSummary: 'Execute multi-step database mutations as a single, all-or-nothing atomic unit.',
        whatIsIt: 'A Transaction is a logical unit of work consisting of one or more SQL statements that execute together. START TRANSACTION (or BEGIN) marks the boundary; COMMIT permanently writes all changes to disk; ROLLBACK discards all changes and reverts the database to its pre-transaction state if an error occurs; SAVEPOINT allows partial rollbacks to an intermediate checkpoint.',
        syntax: 'START TRANSACTION;\n\n-- Step 1: Deduct $1,000 from sender\nUPDATE accounts SET balance = balance - 1000 WHERE account_no = 100101;\n\n-- Step 2: Add $1,000 to recipient\nUPDATE accounts SET balance = balance + 1000 WHERE account_no = 100102;\n\n-- If all steps succeed:\nCOMMIT;\n-- If any error occurs:\n-- ROLLBACK;',
        exampleQuery: 'SELECT account_no, balance FROM accounts WHERE account_no IN (100101, 100102);',
        expectedOutput: {
          columns: ['account_no', 'balance'],
          rows: [
            [100101, 45000.00],
            [100102, 120000.00]
          ]
        },
        howItWorks: [
          '1. Uncommitted writes are held in transaction undo/redo memory buffers and exclusive row locks.',
          '2. If the server crashes or an unhandled exception occurs, the crash recovery manager rolls back uncommitted changes.',
          '3. A COMMIT flushes WAL (Write-Ahead Logging) buffers to persistent non-volatile storage.'
        ],
        realWorldExample: {
          scenario: 'Transferring funds between two bank accounts. If money is deducted from Account A but the server crashes before crediting Account B, an automated ROLLBACK ensures zero funds vanish.',
          query: 'SELECT account_no, customer_id, balance, status FROM accounts;',
          explanation: 'Demonstrates balanced accounts ledger before transaction commit.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 28,
    levelId: 4,
    moduleNumber: 28,
    title: 'ACID Properties Explained',
    category: 'Advanced SQL',
    description: 'Atomicity, Consistency, Isolation, and Durability in database engines.',
    topics: [
      {
        id: 'mod-28-topic-1',
        moduleId: 28,
        levelId: 4,
        topicNumber: '28.1',
        title: 'ACID Architecture: Atomicity, Consistency, Isolation, Durability',
        shortSummary: 'The four fundamental pillars guaranteeing enterprise data reliability.',
        whatIsIt: 'ACID is the bedrock of relational reliability: Atomicity ("All or Nothing" — either every statement commits or none do); Consistency (database transitions only from one valid state to another, upholding all constraints and foreign keys); Isolation (concurrent transactions execute independently without mutual interference); Durability (once committed, changes survive any power outage or system crash).',
        syntax: '-- ACID in action:\n-- Atomicity: Managed via Undo Logs (Rollback segments)\n-- Consistency: Enforced via Schema Constraints & Triggers\n-- Isolation: Managed via Locks (2PL) & MVCC (Multi-Version Concurrency Control)\n-- Durability: Guaranteed via Write-Ahead Logging (WAL / Redo Logs)',
        exampleQuery: 'SELECT account_no, balance, status FROM accounts WHERE status = "Active";',
        expectedOutput: {
          columns: ['account_no', 'balance', 'status'],
          rows: [
            [100101, 45000.00, 'Active'],
            [100102, 120000.00, 'Active'],
            [100103, 82500.00, 'Active'],
            [100105, 350000.00, 'Active']
          ]
        },
        howItWorks: [
          '1. Atomicity: The DBMS writes undo records so changes can be unwound in reverse order.',
          '2. Isolation: MVCC provides each transaction with a point-in-time snapshot of data, preventing readers from blocking writers.',
          '3. Durability: A transaction is only confirmed to the client after its WAL log records are synced (fsync) to disk.'
        ],
        realWorldExample: {
          scenario: 'Flight seat reservations: Two travelers click "Book Seat 14A" at the exact same millisecond. ACID isolation ensures one transaction secures the lock while the second receives a "Seat Unavailable" notification.',
          query: 'SELECT tx_id, account_no, tx_type, amount FROM transactions LIMIT 4;',
          explanation: 'Auditable immutable transaction records.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 29,
    levelId: 4,
    moduleNumber: 29,
    title: 'Common Table Expressions (CTE)',
    category: 'Advanced SQL',
    description: 'Master WITH clauses, Multi-CTEs, CTEs with JOINs, and Recursive CTEs.',
    topics: [
      {
        id: 'mod-29-topic-1',
        moduleId: 29,
        levelId: 4,
        topicNumber: '29.1',
        title: 'WITH Clause (CTE) & Recursive CTEs',
        shortSummary: 'Structure complex SQL logic into readable, modular, named temporary query blocks.',
        whatIsIt: 'A Common Table Expression (CTE) is a named temporary result set defined within the execution scope of a single SELECT, INSERT, UPDATE, or DELETE statement using the WITH keyword. Unlike subqueries, CTEs improve readability, can be referenced multiple times, and can be RECURSIVE for traversing hierarchical graphs (like org charts or bill-of-materials).',
        syntax: 'WITH department_averages AS (\n    SELECT department_id, AVG(marks) AS avg_marks\n    FROM students\n    GROUP BY department_id\n)\nSELECT s.name, s.marks, da.avg_marks\nFROM students s\nJOIN department_averages da ON s.department_id = da.department_id\nWHERE s.marks > da.avg_marks;',
        exampleQuery: 'WITH HighPerformers AS (SELECT name, marks, department_id FROM students WHERE marks >= 88.0) SELECT hp.name, hp.marks, d.department_name FROM HighPerformers hp JOIN departments d ON hp.department_id = d.id;',
        expectedOutput: {
          columns: ['name', 'marks', 'department_name'],
          rows: [
            ['Kumar Selvan', 88.5, 'Computer Science'],
            ['Ananya Sharma', 94.0, 'Computer Science'],
            ['Pooja Hegde', 89.0, 'Information Technology'],
            ['Sneha Patel', 91.5, 'Computer Science']
          ]
        },
        howItWorks: [
          '1. The CTE is defined at the top of the query block and parsed into an intermediate logical relation.',
          '2. Modern query optimizers can inline CTEs or materialize them in memory based on cost estimation.',
          '3. Recursive CTEs evaluate an anchor member first, then recursively execute a UNION ALL step until the termination condition is met.'
        ],
        realWorldExample: {
          scenario: 'Traversing an organization chart or multi-level category taxonomy in an e-commerce catalog to find all descendant subcategories.',
          query: 'WITH ProductStats AS (SELECT category, AVG(price) AS avg_cat_price FROM products GROUP BY category) SELECT p.name, p.category, p.price, ps.avg_cat_price FROM products p JOIN ProductStats ps ON p.category = ps.category;',
          explanation: 'Compares individual retail product prices to their category mean using a CTE.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 30,
    levelId: 4,
    moduleNumber: 30,
    title: 'Window Functions Masterclass',
    category: 'Advanced SQL',
    description: 'ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), FIRST_VALUE(), and LAST_VALUE().',
    topics: [
      {
        id: 'mod-30-topic-1',
        moduleId: 30,
        levelId: 4,
        topicNumber: '30.1',
        title: 'Ranking & Analytical Window Functions (OVER / PARTITION BY)',
        shortSummary: 'Perform calculations across related rows while preserving individual row identities.',
        whatIsIt: 'Window functions perform calculations across a set of table rows related to the current row (defined by the OVER clause), without collapsing the rows into a single summary like GROUP BY. ROW_NUMBER() numbers rows sequentially; RANK() assigns ranks with gaps on ties (1, 2, 2, 4); DENSE_RANK() assigns ranks without gaps (1, 2, 2, 3); LAG() reads previous rows; LEAD() reads following rows.',
        syntax: 'SELECT\n    name,\n    department_id,\n    marks,\n    ROW_NUMBER() OVER (ORDER BY marks DESC) AS overall_rank,\n    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY marks DESC) AS dept_rank,\n    LAG(marks, 1) OVER (ORDER BY marks DESC) AS prev_score\nFROM students;',
        exampleQuery: 'SELECT name, marks, ROW_NUMBER() OVER (ORDER BY marks DESC) AS rank_pos FROM students LIMIT 5;',
        expectedOutput: {
          columns: ['name', 'marks', 'rank_pos'],
          rows: [
            ['Ananya Sharma', 94.0, 1],
            ['Sneha Patel', 91.5, 2],
            ['Pooja Hegde', 89.0, 3],
            ['Kumar Selvan', 88.5, 4],
            ['Kavya Nair', 84.0, 5]
          ]
        },
        howItWorks: [
          '1. The query executes WHERE, GROUP BY, and HAVING first.',
          '2. The window engine partitions rows according to PARTITION BY and sorts within each partition according to ORDER BY.',
          '3. The analytical function iterates over the frame window, injecting the computed result directly into each individual output row.'
        ],
        realWorldExample: {
          scenario: 'Financial month-over-month growth calculations: using LAG() to retrieve the previous month’s revenue to calculate percentage growth directly in SQL.',
          query: 'SELECT id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS order_rank FROM orders;',
          explanation: 'Ranks orders by monetary value using window ranking.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 31,
    levelId: 4,
    moduleNumber: 31,
    title: 'CASE Statements & Conditional Logic',
    category: 'Advanced SQL',
    description: 'Implement IF-THEN-ELSE decision trees inside SELECT, WHERE, and UPDATE statements.',
    topics: [
      {
        id: 'mod-31-topic-1',
        moduleId: 31,
        levelId: 4,
        topicNumber: '31.1',
        title: 'CASE WHEN THEN ELSE END Conditional Expressions',
        shortSummary: 'Execute conditional branching logic directly within SQL queries.',
        whatIsIt: 'The CASE expression is SQL’s conditional branching statement, equivalent to if-else or switch in procedural languages. It evaluates conditions sequentially and returns the corresponding THEN value upon finding the first true condition. If no conditions match, it returns the optional ELSE value.',
        syntax: 'SELECT\n    name,\n    marks,\n    CASE\n        WHEN marks >= 90.0 THEN "A+ Distinction"\n        WHEN marks >= 80.0 THEN "A First Class"\n        WHEN marks >= 70.0 THEN "B Second Class"\n        ELSE "C Pass"\n    END AS academic_grade\nFROM students;',
        exampleQuery: 'SELECT name, marks, CASE WHEN marks >= 90 THEN "Grade A" WHEN marks >= 80 THEN "Grade B" ELSE "Grade C" END AS grade FROM students LIMIT 4;',
        expectedOutput: {
          columns: ['name', 'marks', 'grade'],
          rows: [
            ['Kumar Selvan', 88.5, 'Grade B'],
            ['Ananya Sharma', 94.0, 'Grade A'],
            ['Rahul Verma', 76.5, 'Grade C'],
            ['Pooja Hegde', 89.0, 'Grade B']
          ]
        },
        howItWorks: [
          '1. CASE expressions are evaluated per-row in short-circuit order from top to bottom.',
          '2. As soon as a WHEN condition evaluates to TRUE, its THEN expression is returned and subsequent branches are skipped.',
          '3. CASE can also be nested inside aggregate functions to perform conditional counting (e.g. SUM(CASE WHEN status="Delivered" THEN 1 ELSE 0 END)).'
        ],
        realWorldExample: {
          scenario: 'Segmenting bank account balances into wealth tiers (Standard, Gold, Platinum, Ultra-HNW) for customized promotional mailers.',
          query: 'SELECT account_no, balance, CASE WHEN balance >= 100000 THEN "High Net Worth" WHEN balance >= 25000 THEN "Premier" ELSE "Standard" END AS tier FROM accounts;',
          explanation: 'Segments accounts dynamically by liquidity brackets.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 32,
    levelId: 4,
    moduleNumber: 32,
    title: 'Stored Procedures',
    category: 'Advanced SQL',
    description: 'Encapsulate procedural database logic with IN, OUT, and INOUT parameters.',
    topics: [
      {
        id: 'mod-32-topic-1',
        moduleId: 32,
        levelId: 4,
        topicNumber: '32.1',
        title: 'Stored Procedures Architecture & Parameter Passing',
        shortSummary: 'Pre-compile and store complex procedural database routines on the database server.',
        whatIsIt: 'A Stored Procedure is a pre-compiled collection of SQL statements and procedural control logic (loops, if-else, exception handling) stored on the database server. They accept IN (input), OUT (output), and INOUT parameters, minimize client-server network traffic, and enforce strict execution privileges without granting direct table access.',
        syntax: 'DELIMITER //\nCREATE PROCEDURE GetDepartmentTopStudents(IN dept_id INT, IN min_score DECIMAL(5,2))\nBEGIN\n    SELECT id, name, marks\n    FROM students\n    WHERE department_id = dept_id AND marks >= min_score\n    ORDER BY marks DESC;\nEND //\nDELIMITER ;\n\n-- Call procedure:\nCALL GetDepartmentTopStudents(1, 85.0);',
        exampleQuery: 'SELECT id, name, marks FROM students WHERE department_id = 1 AND marks >= 88.0 ORDER BY marks DESC;',
        expectedOutput: {
          columns: ['id', 'name', 'marks'],
          rows: [
            [2, 'Ananya Sharma', 94.0],
            [6, 'Sneha Patel', 91.5],
            [1, 'Kumar Selvan', 88.5]
          ]
        },
        howItWorks: [
          '1. Stored procedures are compiled and cached in the server’s execution plan cache upon initial creation.',
          '2. When invoked via CALL, the server executes the pre-compiled plan directly, avoiding parsing overhead.',
          '3. Centralizing business logic in stored procedures ensures consistent business rules across diverse client platforms.'
        ],
        realWorldExample: {
          scenario: 'End-of-day banking interest accrual processing: a stored procedure executes an overnight batch loop calculating compound daily interest across 500,000 active savings accounts.',
          query: 'SELECT account_no, balance, (balance * 0.05 / 365) AS daily_interest FROM accounts WHERE status = "Active";',
          explanation: 'Demonstrates calculation logic encapsulated inside banking interest procedures.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 33,
    levelId: 4,
    moduleNumber: 33,
    title: 'User-Defined Functions (UDF)',
    category: 'Advanced SQL',
    description: 'Build scalar and table-valued custom reusable SQL functions.',
    topics: [
      {
        id: 'mod-33-topic-1',
        moduleId: 33,
        levelId: 4,
        topicNumber: '33.1',
        title: 'User-Defined Functions (UDF) & Determinism',
        shortSummary: 'Create custom modular functions that return scalar values or tables.',
        whatIsIt: 'A User-Defined Function (UDF) is a routine that accepts parameters, executes computation, and MUST return a single value (Scalar UDF) or a table result set (Table-Valued Function). Unlike Stored Procedures, UDFs can be used directly inside SELECT statements, WHERE clauses, and JOIN conditions.',
        syntax: 'DELIMITER //\nCREATE FUNCTION CalculateTax(gross_amount DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nDETERMINISTIC\nBEGIN\n    RETURN gross_amount * 0.18; -- 18% standard GST rate\nEND //\nDELIMITER ;\n\n-- Use directly inside queries:\nSELECT id, total_amount, CalculateTax(total_amount) AS tax_due FROM orders;',
        exampleQuery: 'SELECT id, total_amount, (total_amount * 0.18) AS tax_due FROM orders;',
        expectedOutput: {
          columns: ['id', 'total_amount', 'tax_due'],
          rows: [
            [1001, 545.00, 98.10],
            [1002, 480.00, 86.40],
            [1003, 120.00, 21.60],
            [1004, 199.00, 35.82],
            [1005, 550.00, 99.00]
          ]
        },
        howItWorks: [
          '1. Functions marked as DETERMINISTIC always return the exact same output for the same input values, allowing caching.',
          '2. Scalar functions execute per row during query evaluation.',
          '3. UDFs are prohibited from executing DDL statements or mutating external database state.'
        ],
        realWorldExample: {
          scenario: 'A healthcare clinic using a UDF CalculateBMI(weight_kg, height_cm) called inline across patient wellness reports.',
          query: 'SELECT name, age, consultation_fee, (consultation_fee * 1.10) AS fee_with_service_charge FROM doctors;',
          explanation: 'Demonstrates modular calculation pattern typical of custom UDFs.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },
  {
    id: 34,
    levelId: 4,
    moduleNumber: 34,
    title: 'Database Triggers',
    category: 'Advanced SQL',
    description: 'Automate auditing, integrity enforcement, and history tracking with triggers.',
    topics: [
      {
        id: 'mod-34-topic-1',
        moduleId: 34,
        levelId: 4,
        topicNumber: '34.1',
        title: 'Triggers: BEFORE & AFTER INSERT, UPDATE, DELETE',
        shortSummary: 'Execute automatic responses to data modification events.',
        whatIsIt: 'A Trigger is a specialized stored procedure that fires automatically when a specific DML event (INSERT, UPDATE, or DELETE) occurs on a target table. Triggers can fire BEFORE the event (useful for input validation or defaulting) or AFTER the event (ideal for audit trails and notification logs). Inside triggers, the pseudo-records NEW and OLD reference new and previous values.',
        syntax: 'CREATE TRIGGER trg_audit_student_marks\nAFTER UPDATE ON students\nFOR EACH ROW\nBEGIN\n    IF OLD.marks <> NEW.marks THEN\n        INSERT INTO marks_audit_log (student_id, old_marks, new_marks, changed_at)\n        VALUES (OLD.id, OLD.marks, NEW.marks, NOW());\n    END IF;\nEND;',
        exampleQuery: 'SELECT id, name, marks FROM students WHERE id = 2;',
        expectedOutput: {
          columns: ['id', 'name', 'marks'],
          rows: [
            [2, 'Ananya Sharma', 94.0]
          ]
        },
        howItWorks: [
          '1. The trigger executes inside the same transaction scope as the triggering DML statement.',
          '2. If a BEFORE trigger raises an exception, the entire operation and transaction roll back.',
          '3. Excessive triggers can create hidden side-effects, so they should be used primarily for immutable audit logging.'
        ],
        realWorldExample: {
          scenario: 'Banking security: Any balance modification to an account automatically writes an immutable log to a regulatory audit trail containing IP address, timestamp, previous balance, and new balance.',
          query: 'SELECT tx_id, account_no, tx_type, amount, tx_date FROM transactions WHERE account_no = 100101;',
          explanation: 'Transaction ledger entries generated automatically via event triggers.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },

  // ==========================================
  // LEVEL 5: EXPERT SQL (Modules 35 - 42)
  // ==========================================
  {
    id: 35,
    levelId: 5,
    moduleNumber: 35,
    title: 'Database Normalization (1NF to 5NF & BCNF)',
    category: 'Expert SQL',
    description: 'Master 1NF, 2NF, 3NF, Boyce-Codd Normal Form (BCNF), 4NF, and 5NF with practical decomposition examples.',
    topics: [
      {
        id: 'mod-35-topic-1',
        moduleId: 35,
        levelId: 5,
        topicNumber: '35.1',
        title: 'Normalization Masterclass: 1NF, 2NF, 3NF, BCNF, 4NF & 5NF',
        shortSummary: 'Eliminate update, insertion, and deletion anomalies through mathematical relational decomposition.',
        whatIsIt: 'Normalization is the systematic process of organizing table schemas to reduce data redundancy and eliminate anomalies (Insertion, Update, and Deletion anomalies). 1NF mandates atomic values and no repeating groups; 2NF eliminates partial functional dependencies (all non-key attributes depend on the entire Primary Key); 3NF eliminates transitive dependencies (non-key attributes depend only on the primary key, not on other non-key attributes); BCNF guarantees that for every dependency X -> Y, X is a superkey.',
        syntax: '-- 1NF: Atomic columns (no comma-separated lists)\n-- 2NF: No partial key dependencies in composite PK tables\n-- 3NF: Decomposition into separate entities (e.g. separate Department from Student)\n-- Un-normalized Student (Violates 3NF):\n-- [student_id, student_name, dept_id, dept_name, dept_building]\n\n-- Normalized 3NF Schema:\n-- Table 1: departments (id PK, department_name, building)\n-- Table 2: students (id PK, name, department_id FK)',
        exampleQuery: 'SELECT s.id, s.name, d.department_name, d.building FROM students s JOIN departments d ON s.department_id = d.id WHERE s.id = 1;',
        expectedOutput: {
          columns: ['id', 'name', 'department_name', 'building'],
          rows: [
            [1, 'Kumar Selvan', 'Computer Science', 'Turing Block']
          ]
        },
        howItWorks: [
          '1. Normalization decomposes wide, redundant tables into smaller, cohesive relations connected by foreign keys.',
          '2. If a department changes its building, in a 3NF schema only ONE row in the departments table requires updating.',
          '3. In an un-normalized schema, updating the building would require modifying thousands of student rows, risking data divergence.'
        ],
        realWorldExample: {
          scenario: 'An e-commerce order system decomposing customer shipping addresses into master customer profiles so that updating an address once automatically updates all future shipments.',
          query: 'SELECT c.name, c.city, o.id AS order_id, o.total_amount FROM customers c JOIN orders o ON c.id = o.customer_id;',
          explanation: 'Normalized relational query linking customers to orders without data duplication.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 36,
    levelId: 5,
    moduleNumber: 36,
    title: 'Entity-Relationship (ER) Modeling',
    category: 'Expert SQL',
    description: 'Design enterprise schemas: Entities, Attributes, Relationships, Cardinality (1:1, 1:N, M:N), and Weak Entities.',
    topics: [
      {
        id: 'mod-36-topic-1',
        moduleId: 36,
        levelId: 5,
        topicNumber: '36.1',
        title: 'ER Modeling: Cardinality, Participation & Schema Design',
        shortSummary: 'Translate complex real-world business domains into formal entity-relationship schemas.',
        whatIsIt: 'Entity-Relationship (ER) Modeling is the visual and conceptual process of designing database architectures. An Entity is a business object (Student, Doctor, Order); Attributes are properties (name, price); Relationships represent associations. Cardinality defines mapping ratios: One-to-One (1:1, e.g. Citizen to Passport), One-to-Many (1:N, e.g. Department to Students), and Many-to-Many (M:N, e.g. Students to Courses, resolved using a Junction/Bridge table).',
        syntax: '-- Resolving Many-to-Many (M:N) Relationship:\n-- Entity 1: Students (1) --- (N) Enrollments (N) --- (1) Courses Entity 2\nCREATE TABLE enrollments (\n    student_id INT,\n    course_id INT,\n    grade VARCHAR(2),\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(id),\n    FOREIGN KEY (course_id) REFERENCES courses(id)\n);',
        exampleQuery: 'SELECT s.name AS student, c.course_name, e.grade FROM enrollments e JOIN students s ON e.student_id = s.id JOIN courses c ON e.course_id = c.id LIMIT 4;',
        expectedOutput: {
          columns: ['student', 'course_name', 'grade'],
          rows: [
            ['Kumar Selvan', 'Relational Database Systems', 'A'],
            ['Kumar Selvan', 'Data Structures & Algorithms', 'A'],
            ['Ananya Sharma', 'Relational Database Systems', 'A+'],
            ['Rahul Verma', 'Web Development & APIs', 'B']
          ]
        },
        howItWorks: [
          '1. The junction table enrollments breaks the M:N relationship into two 1:N relationships.',
          '2. Composite primary key (student_id, course_id) prevents a student from enrolling in the identical course twice.',
          '3. Cascading foreign keys guarantee that deleting a student cleanly removes associated enrollment links.'
        ],
        realWorldExample: {
          scenario: 'A hospital scheduling system: Doctors have a 1:N relationship with Appointments, and Patients have a 1:N relationship with Appointments. The appointments table serves as the central junction entity.',
          query: 'SELECT d.name AS doctor, p.name AS patient, a.appt_date, a.status FROM appointments a JOIN doctors d ON a.doctor_id = d.id JOIN patients p ON a.patient_id = p.id;',
          explanation: 'Relational query across three hospital entities linked via junction keys.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },
  {
    id: 37,
    levelId: 5,
    moduleNumber: 37,
    title: 'Query Execution Engine Internals',
    category: 'Expert SQL',
    description: 'Follow the lifecycle of an SQL query: Parser → Rewriter → Optimizer → Execution Plan → Storage Engine → Result.',
    topics: [
      {
        id: 'mod-37-topic-1',
        moduleId: 37,
        levelId: 5,
        topicNumber: '37.1',
        title: 'Query Engine Pipeline: From Raw SQL to Disk Blocks',
        shortSummary: 'Understand the internal compilation and execution phases inside modern database kernels.',
        whatIsIt: 'When you submit an SQL string, the engine processes it through five distinct stages: 1. Parser (lexical and syntactic analysis, building an Abstract Syntax Tree); 2. Semantic Analyzer & Rewriter (validates table and column names, resolves views, applies security policies); 3. Cost-Based Optimizer (evaluates millions of permutations of join orders, index choices, and access paths to pick the cheapest plan); 4. Query Executor (interprets the execution plan operators); 5. Storage Engine (fetches raw binary pages from buffer pool or disk).',
        syntax: '-- Query Execution Lifecycle:\n-- SQL Text\n--   ↓ (Lexer & Parser)\n-- Abstract Syntax Tree (AST)\n--   ↓ (Semantic Resolution)\n-- Logical Query Plan\n--   ↓ (Cost-Based Optimizer + Data Catalog Stats)\n-- Physical Execution Plan\n--   ↓ (Storage Engine Executor - Volcano Iterator Model)\n-- Tabular Row Stream',
        exampleQuery: 'SELECT department_id, COUNT(*) AS cnt FROM students WHERE marks > 80 GROUP BY department_id;',
        expectedOutput: {
          columns: ['department_id', 'cnt'],
          rows: [
            [1, 3],
            [2, 2],
            [3, 1]
          ]
        },
        howItWorks: [
          '1. The Volcano Iterator model uses open(), next(), close() methods to stream rows pipeline-fashion between operators.',
          '2. The cost-based optimizer uses table statistics (histograms, row counts, index cardinatlity) to estimate I/O costs.',
          '3. Execution plans are cached in the Plan Cache to skip compilation overhead for identical prepared statements.'
        ],
        realWorldExample: {
          scenario: 'Understanding why an unexpected full-table scan occurred: outdated table statistics caused the cost-based optimizer to miscalculate row selectivity, choosing a sequential scan over an available index.',
          query: 'SELECT count(*) FROM students;',
          explanation: 'Basic catalog aggregate reading metadata directly from storage header.'
        },
        sampleDatabase: 'college'
      }
    ]
  },
  {
    id: 38,
    levelId: 5,
    moduleNumber: 38,
    title: 'Query Optimization & EXPLAIN Plans',
    category: 'Expert SQL',
    description: 'Diagnose slow queries: EXPLAIN, EXPLAIN ANALYZE, index optimization, avoiding SELECT *, and sargable predicates.',
    topics: [
      {
        id: 'mod-38-topic-1',
        moduleId: 38,
        levelId: 5,
        topicNumber: '38.1',
        title: 'Query Optimization: EXPLAIN ANALYZE & Sargable Predicates',
        shortSummary: 'Turn slow multi-second bottlenecks into sub-millisecond production queries.',
        whatIsIt: 'Query Optimization is the practice of analyzing and restructuring queries to minimize CPU, memory, and I/O overhead. The EXPLAIN command displays the execution plan chosen by the optimizer (e.g. Index Scan vs Full Table Scan, Join Type). Sargable (Search Argument Able) queries structure WHERE predicates so indexes can be used (e.g. WHERE created_at >= "2026-01-01" is sargable; WHERE YEAR(created_at) = 2026 is non-sargable because applying a function suppresses index lookup).',
        syntax: '-- Inspecting query plan:\nEXPLAIN ANALYZE\nSELECT * FROM orders\nWHERE customer_id = 1;\n\n-- Non-Sargable (Index Suppressed):\n-- WHERE UPPER(name) = "KUMAR"\n-- Sargable Alternative (Index Exploited):\n-- WHERE name = "Kumar"',
        exampleQuery: 'SELECT id, total_amount, status FROM orders WHERE customer_id = 1;',
        expectedOutput: {
          columns: ['id', 'total_amount', 'status'],
          rows: [
            [1001, 545.00, 'Delivered'],
            [1003, 120.00, 'Shipped']
          ]
        },
        howItWorks: [
          '1. EXPLAIN exposes scan types: ALL (worst, full scan), ref/range (good, index range seek), const (best, primary key single lookup).',
          '2. Avoiding SELECT * prevents reading wide unneeded LOB/TEXT columns, reducing network transport and memory pressure.',
          '3. Covering indexes contain all columns requested by a query in the index itself, completely eliminating secondary table lookups.'
        ],
        realWorldExample: {
          scenario: 'Refactoring an e-commerce order search query on a 20-million-row database from 8.4 seconds down to 4 milliseconds by replacing a non-sargable function with an index range predicate and adding a covering composite index.',
          query: 'SELECT id, order_date, total_amount FROM orders WHERE customer_id = 2 AND status = "Delivered";',
          explanation: 'Demonstrates a selective, index-friendly query pattern.'
        },
        sampleDatabase: 'ecommerce'
      }
    ]
  },
  {
    id: 39,
    levelId: 5,
    moduleNumber: 39,
    title: 'Transactions, Concurrency & Locking',
    category: 'Expert SQL',
    description: 'Shared locks, Exclusive locks, Deadlocks, and Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable).',
    topics: [
      {
        id: 'mod-39-topic-1',
        moduleId: 39,
        levelId: 5,
        topicNumber: '39.1',
        title: 'Concurrency Anomalies, Locks & Transaction Isolation Levels',
        shortSummary: 'Prevent Dirty Reads, Non-Repeatable Reads, and Phantom Reads under heavy concurrent traffic.',
        whatIsIt: 'In multi-user database environments, concurrent transactions can trigger data anomalies: 1. Dirty Read (reading uncommitted changes that may later be rolled back); 2. Non-Repeatable Read (rereading a row within the same transaction and seeing changed values); 3. Phantom Read (rereading a range of rows and finding new rows inserted by another committed transaction). ANSI SQL defines four isolation levels to manage these phenomena: READ UNCOMMITTED, READ COMMITTED (default in PostgreSQL/Oracle), REPEATABLE READ (default in MySQL InnoDB), and SERIALIZABLE.',
        syntax: '-- Set session isolation level:\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nSTART TRANSACTION;\n\n-- Row-level locking for updates:\nSELECT * FROM accounts WHERE account_no = 100101 FOR UPDATE;\n-- Performs safe mutation...\nCOMMIT;',
        exampleQuery: 'SELECT account_no, balance, status FROM accounts WHERE account_no = 100101;',
        expectedOutput: {
          columns: ['account_no', 'balance', 'status'],
          rows: [
            [100101, 45000.00, 'Active']
          ]
        },
        howItWorks: [
          '1. MVCC creates a private read view snapshot for the transaction, preventing read queries from taking shared read locks.',
          '2. SELECT ... FOR UPDATE acquires an exclusive row lock (X-Lock), forcing concurrent transactions attempting to modify the row to wait.',
          '3. Deadlocks occur when Transaction 1 holds Lock A and waits for Lock B, while Transaction 2 holds Lock B and waits for Lock A. The deadlock detector automatically aborts one transaction.'
        ],
        realWorldExample: {
          scenario: 'Preventing double-spending in a crypto or fiat wallet: Acquiring a pessimistic row lock via FOR UPDATE before checking wallet balance and authorizing a debit ensures concurrent transfer requests cannot overdraft the account.',
          query: 'SELECT account_no, balance FROM accounts WHERE balance > 0;',
          explanation: 'Audits concurrent accounts available for transactional locking.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 40,
    levelId: 5,
    moduleNumber: 40,
    title: 'Database Security & SQL Injection Prevention',
    category: 'Expert SQL',
    description: 'User management, Roles, GRANT, REVOKE, Principle of Least Privilege, and Parameterized Prepared Statements.',
    topics: [
      {
        id: 'mod-40-topic-1',
        moduleId: 40,
        levelId: 5,
        topicNumber: '40.1',
        title: 'Database Security: RBAC, GRANT/REVOKE & SQL Injection',
        shortSummary: 'Fortify database infrastructure against data exfiltration, privilege escalation, and injection attacks.',
        whatIsIt: 'Database Security encompasses Role-Based Access Control (RBAC), permission grants, data encryption at rest and in transit, and SQL Injection prevention. SQL Injection occurs when untrusted user input is directly concatenated into an SQL string, allowing attackers to alter query semantics. The primary defense is Parameterized Queries (Prepared Statements), which treat user inputs strictly as literals rather than executable SQL code.',
        syntax: '-- 1. Role-Based Access Control:\nCREATE USER "app_user"@"%" IDENTIFIED BY "StrongPassword#2026";\nGRANT SELECT, INSERT, UPDATE ON college_db.students TO "app_user"@"%";\nREVOKE DROP, ALTER ON college_db.* FROM "app_user"@"%";\n\n-- 2. Vulnerable vs Parameterized:\n-- VULNERABLE: "SELECT * FROM users WHERE email = \'" + userInput + "\'"\n-- SECURE (Prepared Statement): "SELECT * FROM users WHERE email = ?"',
        exampleQuery: 'SELECT id, name, email FROM students WHERE email = "kumar@kkacademy.edu";',
        expectedOutput: {
          columns: ['id', 'name', 'email'],
          rows: [
            [1, 'Kumar Selvan', 'kumar@kkacademy.edu']
          ]
        },
        howItWorks: [
          '1. Prepared statements pre-compile the SQL template into an AST before binding parameter values.',
          '2. Even if a user enters input like "admin\' OR \'1\'=\'1", the database engine treats the entire string as a harmless literal search term.',
          '3. The Principle of Least Privilege dictates that web backend applications should NEVER connect using the root/superuser account.'
        ],
        realWorldExample: {
          scenario: 'A banking login portal: Using parameterized prepared statements ensures malicious input in username or password fields cannot bypass authentication or dump customer records.',
          query: 'SELECT id, name, kyc_status FROM customers WHERE kyc_status = "Verified";',
          explanation: 'Restricted query returning only compliance-verified customer accounts.'
        },
        sampleDatabase: 'banking'
      }
    ]
  },
  {
    id: 41,
    levelId: 5,
    moduleNumber: 41,
    title: 'Backup, Recovery & Replication',
    category: 'Expert SQL',
    description: 'Logical vs Physical Backups, Point-in-Time Recovery (PITR), Read Replicas, and High Availability Failover.',
    topics: [
      {
        id: 'mod-41-topic-1',
        moduleId: 41,
        levelId: 5,
        topicNumber: '41.1',
        title: 'Disaster Recovery: Backups, WAL Archiving & Read Replicas',
        shortSummary: 'Design resilient database architectures that survive hardware failures and data corruption.',
        whatIsIt: 'Backup and recovery strategies ensure business continuity. Logical Backups (e.g. mysqldump, pg_dump) export SQL commands to recreate schemas and data; Physical Backups copy raw storage blocks for rapid restoration. Point-in-Time Recovery (PITR) pairs a baseline physical backup with continuous WAL binary logs, allowing the database to be restored to any exact second before an accidental DROP TABLE occurred. Replication distributes data to read-only replica servers to scale read throughput.',
        syntax: '-- MySQL Logical Backup command:\n-- mysqldump -u root -p --single-transaction --routines college_db > backup_2026.sql\n\n-- Restore command:\n-- mysql -u root -p college_db < backup_2026.sql\n\n-- PostgreSQL PITR configuration:\n-- archive_mode = on\n-- archive_command = \'cp %p /mnt/wal_archive/%f\'',
        exampleQuery: 'SELECT count(*) as total_accounts, sum(balance) as total_deposits FROM accounts;',
        expectedOutput: {
          columns: ['total_accounts', 'total_deposits'],
          rows: [
            [5, 598700.00]
          ]
        },
        howItWorks: [
          '1. Using --single-transaction allows logical dumps of InnoDB tables without locking active read or write traffic.',
          '2. Primary-Replica replication streams write-ahead log events asynchronously or semi-synchronously to replica instances.',
          '3. Failover proxies (like ProxySQL, PgBouncer, or orchestrators) automatically redirect traffic to a promoted replica if the primary fails.'
        ],
        realWorldExample: {
          scenario: 'A hospital database recovery: A DBA accidentally truncates the patient appointments table at 14:32:10. Using PITR, the team restores the morning snapshot and replays transaction logs up to 14:32:09, recovering all records without data loss.',
          query: 'SELECT count(*) as total_patients FROM patients;',
          explanation: 'Validates integrity and patient counts following disaster recovery tests.'
        },
        sampleDatabase: 'hospital'
      }
    ]
  },
  {
    id: 42,
    levelId: 5,
    moduleNumber: 42,
    title: 'Real-World Production SQL Architecture',
    category: 'Expert SQL',
    description: 'Architecting 7 complete industry databases: College, Library, E-Commerce, Hospital, Cab Booking, Banking, and Airline.',
    topics: [
      {
        id: 'mod-42-topic-1',
        moduleId: 42,
        levelId: 5,
        topicNumber: '42.1',
        title: 'Production Schema Blueprint & Multi-Domain Architectures',
        shortSummary: 'Deploy production schemas across College, E-Commerce, Hospital, Banking, and Library domains.',
        whatIsIt: 'Enterprise SQL architecture integrates schema normalization, index strategies, partitioning, and relational constraints into complete real-world systems. KK SQL Academy features 7 comprehensive industry schemas: 1. College Management; 2. Library Management; 3. E-Commerce; 4. Hospital Healthcare; 5. Cab Booking; 6. Core Banking; 7. Airline Flight Reservation.',
        syntax: '-- Core Architecture Rule:\n-- 1. Use surrogate synthetic keys (BIGINT AUTO_INCREMENT or UUIDv7)\n-- 2. Maintain strict created_at & updated_at audit timestamps on every table\n-- 3. Enforce soft deletion via deleted_at TIMESTAMP for auditable compliance\n-- 4. Create indexes on all foreign key columns to avoid full table locks on cascade',
        exampleQuery: 'SELECT "College ERP" as domain, count(*) as tables FROM departments UNION ALL SELECT "E-Commerce", count(*) FROM products UNION ALL SELECT "Hospital EHR", count(*) FROM doctors UNION ALL SELECT "Core Banking", count(*) FROM accounts UNION ALL SELECT "Library System", count(*) FROM books;',
        expectedOutput: {
          columns: ['domain', 'tables'],
          rows: [
            ['College ERP', 4],
            ['E-Commerce', 6],
            ['Hospital EHR', 4],
            ['Core Banking', 5],
            ['Library System', 5]
          ]
        },
        howItWorks: [
          '1. Domain models are decoupled into cohesive bounded contexts.',
          '2. High-volume tables (e.g. transactions, orders) employ range partitioning by month or year.',
          '3. Relational integrity constraints guarantee data consistency across enterprise reporting workflows.'
        ],
        realWorldExample: {
          scenario: 'An airline reservation engine tracking passengers, flights, aircraft, bookings, and boarding passes across global timezones with high-frequency concurrent seat locking.',
          query: 'SELECT * FROM courses;',
          explanation: 'Production college management course catalog listing.'
        },
        sampleDatabase: 'college'
      }
    ]
  }
];
