import { TopicBrief } from '../types';

export const TOPIC_BRIEFS: Record<string, TopicBrief> = {
  'mod-1-topic-1': {
    mentalModel: 'A database is a persistent digital filing cabinet; DBMS is the software manager; RDBMS organizes everything into strictly linked 2D spreadsheets.',
    goldenRule: 'Data without relations is just raw text; an RDBMS guarantees relational integrity through mathematical keys and typed schemas.',
    whenToUse: 'Whenever data needs to be safely stored, structured, indexed, queried concurrently, and protected against system crashes.',
    commonPitfall: 'Treating a database like an in-memory JSON file or Excel sheet without enforcing types or relational keys.',
    minimalSyntax: 'SELECT column1, column2 FROM table_name;',
    bulletPoints: [
      'Data = raw unorganized facts; Database = organized persistent storage repository.',
      'DBMS = software engine that manages storage, concurrent read/writes, and backups.',
      'RDBMS = enforces 2-dimensional tables connected by Primary and Foreign Keys.'
    ]
  },
  'mod-1-topic-2': {
    mentalModel: 'SQL is like a strict, contract-bound legal agreement (ACID + fixed tables); NoSQL is like flexible, dynamic sticky notes (JSON documents).',
    goldenRule: 'Use SQL when data consistency and relationships are sacred; use NoSQL when horizontal write throughput and unstructured flexible schemas dominate.',
    whenToUse: 'Choose SQL for banking, e-commerce orders, ERPs, and inventory. Choose NoSQL for clickstreams, IoT telemetry, and social feeds.',
    commonPitfall: 'Defaulting to NoSQL for financial records where multi-table consistency and transactions are required.',
    minimalSyntax: 'CREATE TABLE orders (id INT PRIMARY KEY, amount DECIMAL(10,2));',
    bulletPoints: [
      'SQL = Schema-enforced, ACID transactions, powerful relational JOINs, vertical scaling.',
      'NoSQL = Schema-flexible, BASE eventual consistency, document/key-value, horizontal scaling.',
      'Multi-table financial ledgers almost always belong in SQL.'
    ]
  },
  'mod-2-topic-1': {
    mentalModel: 'A Table is an entity sheet; a Row is one specific person/item; a Column is an attribute; a Schema is the blueprint rulebook.',
    goldenRule: 'Every column must hold only ONE atomic piece of data (First Normal Form).',
    whenToUse: 'Defining the relational structure for any business concept (e.g. Customers, Invoices, Products).',
    commonPitfall: 'Storing multiple comma-separated values inside a single column (e.g., `tags: "tech,sale,shoes"`).',
    minimalSyntax: 'CREATE TABLE customers (id INT, name VARCHAR(100), city VARCHAR(50));',
    bulletPoints: [
      'Table (Relation) holds instances of a business domain.',
      'Row (Tuple/Record) represents a single distinct entity instance.',
      'Column (Field/Attribute) defines a strictly typed property of the entity.'
    ]
  },
  'mod-2-topic-2': {
    mentalModel: 'Primary Key is your fingerprint (unique, never empty); Foreign Key is an official parent reference ticket linking you to another table.',
    goldenRule: 'A Primary Key can NEVER be NULL and must be UNIQUE. A Foreign Key must point to an existing valid Primary Key.',
    whenToUse: 'Every single table must have a Primary Key; use Foreign Keys to model relationships (e.g., Student -> Department).',
    commonPitfall: 'Creating tables without primary keys, causing duplicate rows and inability to uniquely update records.',
    minimalSyntax: 'PRIMARY KEY (id), FOREIGN KEY (dept_id) REFERENCES departments(id)',
    bulletPoints: [
      'Primary Key (PK) uniquely identifies every row; automatically gets a clustered B-tree index.',
      'Foreign Key (FK) enforces referential integrity so child records cannot reference non-existent parents.',
      'Composite Key combines two or more columns to form a single unique identifier.'
    ]
  },
  'mod-3-topic-1': {
    mentalModel: 'SQL is like English dialects: ANSI SQL is standard English, while MySQL, PostgreSQL, SQLite, and SQL Server have their own local slang.',
    goldenRule: 'Stick to standard ANSI SQL wherever possible to keep queries portable across database engines.',
    whenToUse: 'Deciding which database engine fits your application requirements (PostgreSQL for advanced features, MySQL for web apps, SQLite for embedded).',
    commonPitfall: 'Using vendor-specific functions (like MySQL `IFNULL` instead of ANSI `COALESCE`) in cross-platform projects.',
    minimalSyntax: 'SELECT COALESCE(email, "N/A") FROM users LIMIT 10;',
    bulletPoints: [
      'MySQL: High read-heavy web performance, simple replication, popular with WordPress/PHP/Node.',
      'PostgreSQL: Strict standards, rich JSONB indexing, custom extensions, enterprise analytical power.',
      'SQLite: Zero-config single file database, embedded in mobile phones, desktop apps, and browsers.'
    ]
  },
  'mod-4-topic-1': {
    mentalModel: 'Data types are storage containers sized to fit: choose the smallest container that safely holds your data without overflow.',
    goldenRule: 'Always use DECIMAL(p,s) for money and currencies. NEVER use FLOAT or DOUBLE for financial amounts.',
    whenToUse: 'Defining table columns during schema design to ensure data validation at the storage layer.',
    commonPitfall: 'Using `FLOAT` for monetary values, causing floating-point rounding errors where `0.1 + 0.2 = 0.30000000000000004`.',
    minimalSyntax: 'price DECIMAL(10, 2), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    bulletPoints: [
      'INT (4 bytes) vs BIGINT (8 bytes) vs DECIMAL(10,2) (exact fixed-point math for cash).',
      'CHAR(10) (fixed width, pads spaces) vs VARCHAR(255) (variable width, saves disk space).',
      'TIMESTAMP tracks exact UTC epoch moments; DATE stores purely year-month-day.'
    ]
  },
  'mod-5-topic-1': {
    mentalModel: 'CREATE DATABASE builds a new office room; USE walks you into that room so you can interact with its furniture (tables).',
    goldenRule: 'Always use `IF NOT EXISTS` in automated migration scripts to prevent crashes if the database is already created.',
    whenToUse: 'Setting up a new project workspace or multi-tenant database environment.',
    commonPitfall: 'Forgetting to run `USE my_database;` before running table scripts, resulting in "no database selected" errors.',
    minimalSyntax: 'CREATE DATABASE IF NOT EXISTS app_db; USE app_db;',
    bulletPoints: [
      'CREATE DATABASE establishes a distinct namespace directory on the database host.',
      'USE sets the active session context so you can query `SELECT * FROM users` without prefixing `app_db.users`.',
      'Databases are completely isolated from each other by default.'
    ]
  },
  'mod-6-topic-1': {
    mentalModel: 'DDL commands are construction cranes: they construct, reshape, or demolish the physical blueprint of tables.',
    goldenRule: 'DROP destroys the schema permanently; TRUNCATE empties all rows instantly but preserves the table structure.',
    whenToUse: 'CREATE to define new tables, ALTER to add/modify columns, TRUNCATE to reset test tables, DROP to permanently remove tables.',
    commonPitfall: 'Running `TRUNCATE` or `DROP` without a backup; DDL statements trigger implicit commits and cannot be rolled back in most engines.',
    minimalSyntax: 'ALTER TABLE users ADD COLUMN phone VARCHAR(20); TRUNCATE TABLE logs;',
    bulletPoints: [
      'CREATE TABLE defines column names, types, and relational constraints.',
      'ALTER TABLE modifies existing tables without destroying existing row data.',
      'TRUNCATE TABLE resets the storage pages and auto-increment sequence instantly, faster than DELETE.'
    ]
  },
  'mod-7-topic-1': {
    mentalModel: 'DML commands are the clerks who file, update, and remove individual pieces of paper inside your filing cabinets.',
    goldenRule: 'ALWAYS write the `WHERE` clause FIRST when writing an `UPDATE` or `DELETE` statement.',
    whenToUse: 'Inserting new user records, updating customer balances, or deleting deactivated accounts.',
    commonPitfall: 'Executing `UPDATE users SET status = "inactive";` without a WHERE clause, corrupting every single user in the database.',
    minimalSyntax: 'INSERT INTO users (name, email) VALUES ("KK", "kk@sql.com");',
    bulletPoints: [
      'INSERT INTO adds new rows; can insert multiple rows in a single atomic statement.',
      'UPDATE modifies existing columns in rows matching the WHERE criteria.',
      'DELETE removes rows matching the WHERE criteria; always verify with SELECT first.'
    ]
  },
  'mod-8-topic-1': {
    mentalModel: 'SELECT is a flashlight choosing which columns to shine on; DISTINCT filters out identical duplicate rows.',
    goldenRule: 'Avoid `SELECT *` in production code; always name explicit columns to save network bandwidth and enable index-only scans.',
    whenToUse: 'Fetching specific attributes for user interfaces, reports, or microservice APIs.',
    commonPitfall: 'Using `SELECT *` in microservices, causing breaking API changes whenever a new column is added to the database table.',
    minimalSyntax: 'SELECT DISTINCT department_id, status FROM employees;',
    bulletPoints: [
      'SELECT projects specific column expressions; AS creates readable column or table aliases.',
      'DISTINCT collapses identical rows into a single unique row per combination of selected columns.',
      'SELECT evaluated AFTER FROM, WHERE, GROUP BY, and HAVING in the relational engine pipeline.'
    ]
  },
  'mod-9-topic-1': {
    mentalModel: 'WHERE is a security guard standing at the table door, checking row credentials before letting them enter the result set.',
    goldenRule: 'Never use `= NULL`. In SQL, three-valued logic mandates using `IS NULL` or `IS NOT NULL`.',
    whenToUse: 'Filtering rows based on exact matches, ranges, inequalities, or missing values.',
    commonPitfall: 'Writing `WHERE deleted_at = NULL` which always evaluates to UNKNOWN and returns zero rows.',
    minimalSyntax: 'SELECT * FROM students WHERE marks >= 75 AND email IS NOT NULL;',
    bulletPoints: [
      'Comparison operators: `=`, `<>`, `!=`, `<`, `<=`, `>`, `>=`.',
      'NULL represents unknown/missing data, not zero or empty string.',
      'Three-Valued Logic: True, False, and Unknown (NULL compared to anything produces Unknown).'
    ]
  },
  'mod-10-topic-1': {
    mentalModel: 'Logical operators are boolean filters: AND tightens the net; OR widens it; LIKE performs wildcard text searches.',
    goldenRule: 'Always use parentheses when mixing `AND` and `OR` because `AND` has higher precedence than `OR`.',
    whenToUse: 'Complex search forms, autocomplete search boxes (`LIKE "term%"`), and range filters (`BETWEEN 10 AND 50`).',
    commonPitfall: 'Writing leading wildcards `LIKE "%query"` on large tables, which prevents the B-tree index from being used and causes full table scans.',
    minimalSyntax: 'WHERE (dept = "CS" OR dept = "IT") AND active = 1 AND name LIKE "A%";',
    bulletPoints: [
      'AND requires all conditions true; OR requires at least one condition true.',
      'IN (1, 2, 3) replaces chained OR statements and is optimized by the query planner.',
      'LIKE wildcards: `%` matches zero or more characters; `_` matches exactly one character.'
    ]
  },
  'mod-11-topic-1': {
    mentalModel: 'ORDER BY arranges the bookshelf; LIMIT grabs only the top N books; OFFSET skips the first few for page-by-page viewing.',
    goldenRule: 'Relational tables have NO inherent order; unless you specify `ORDER BY`, the database does not guarantee row sequence.',
    whenToUse: 'Pagination (page 1, page 2) on web apps, leaderboards ("top 10 scores"), and latest activity feeds.',
    commonPitfall: 'Using large `OFFSET 100000` for pagination, forcing the database to scan and discard 100,000 rows before returning 10.',
    minimalSyntax: 'SELECT * FROM products ORDER BY price DESC LIMIT 10 OFFSET 20;',
    bulletPoints: [
      'ORDER BY column [ASC | DESC] sorts by one or more columns from left to right.',
      'LIMIT restricts total returned records; OFFSET skips the first N records.',
      'Keyset/cursor pagination (`WHERE id > last_seen_id LIMIT 10`) is far superior to high OFFSET.'
    ]
  },
  'mod-12-topic-1': {
    mentalModel: 'Bulk UPDATE is an automated stamp: it modifies targeted columns across hundreds of matching records simultaneously.',
    goldenRule: 'Run `SELECT COUNT(*) FROM table WHERE <conditions>;` to preview exactly which rows will be modified before running `UPDATE`.',
    whenToUse: 'Applying a 10% holiday discount to all electronics, or marking all expired tokens as invalidated.',
    commonPitfall: 'Omitting the `WHERE` clause or accidentally misplacing a comma in `SET col1 = val1, col2 = val2`.',
    minimalSyntax: 'UPDATE products SET price = price * 1.10 WHERE category = "Books";',
    bulletPoints: [
      'Multi-column update syntax: `UPDATE table SET col1 = val1, col2 = val2 WHERE id = 1;`.',
      'Bulk updates lock affected rows or pages, so keep transactions brief to prevent blocking.',
      'Most databases have a "Safe Update Mode" that disallows UPDATE without a Key in WHERE.'
    ]
  },
  'mod-13-topic-1': {
    mentalModel: 'DELETE uses an eraser line-by-line (logging each removal); TRUNCATE drops the entire notebook and hands you a clean blank one.',
    goldenRule: 'Use DELETE when you need to remove specific rows with WHERE; use TRUNCATE to reset an entire staging table instantly.',
    whenToUse: 'Cleaning up soft-deleted users, wiping daily log caches, or removing single cancelled orders.',
    commonPitfall: 'Using DELETE on a 10-million row table, causing transaction log explosion and high disk I/O; TRUNCATE or partitioning is preferred.',
    minimalSyntax: 'DELETE FROM cart_items WHERE session_id = "abc-123";',
    bulletPoints: [
      'DELETE is DML: can have WHERE clause, fires triggers, records individual row deletes in undo log.',
      'TRUNCATE is DDL: deallocates data pages, resets auto_increment counter, cannot filter with WHERE.',
      'Soft Deletes (`is_deleted = TRUE` or `deleted_at TIMESTAMP`) are often preferred over hard deletes.'
    ]
  },
  'mod-14-topic-1': {
    mentalModel: 'NULL is not zero and not an empty space; it is a question mark indicating unknown or missing information.',
    goldenRule: '`COALESCE(a, b, c)` returns the first non-NULL value in the argument list. It is ANSI-standard and universally supported.',
    whenToUse: 'Providing default fallback text (e.g. "No Phone Provided") and handling optional profile fields.',
    commonPitfall: 'Expecting `COUNT(column)` to include NULL values; `COUNT(col)` skips NULLs, whereas `COUNT(*)` counts all physical rows.',
    minimalSyntax: 'SELECT name, COALESCE(phone, "Not Provided") AS contact FROM users;',
    bulletPoints: [
      'NULL propagation: almost any arithmetic operation with NULL results in NULL (`10 + NULL = NULL`).',
      'Use `IS NULL` or `IS NOT NULL` to test for presence; never use `= NULL`.',
      'COALESCE is ANSI-standard; IFNULL is MySQL-only; NVL is Oracle-only.'
    ]
  },
  'mod-15-topic-1': {
    mentalModel: 'Constraints are the automated security turnstiles of your database: bad data gets rejected at the front door.',
    goldenRule: 'Enforce business rules at the database constraint level, not just in frontend application code.',
    whenToUse: 'Ensuring emails are unique, ages are non-negative, primary keys exist, and foreign relations are valid.',
    commonPitfall: 'Relying solely on frontend JavaScript validation; backend scripts or manual SQL inserts will bypass frontend checks.',
    minimalSyntax: 'age INT CHECK (age >= 18), email VARCHAR(100) UNIQUE NOT NULL',
    bulletPoints: [
      'NOT NULL guarantees column cannot store missing values.',
      'UNIQUE creates a unique index ensuring no two rows hold the same value.',
      'CHECK validates custom expressions (e.g. `salary > 0`, `status IN ("A", "I")`).',
      'DEFAULT automatically assigns a value if omitted on INSERT.'
    ]
  },
  'mod-16-topic-1': {
    mentalModel: 'Aggregate functions are mathematical crunchers: they suck in thousands of rows and output a single summary number.',
    goldenRule: 'Aggregate functions ignore NULL values (except `COUNT(*)` which counts total rows).',
    whenToUse: 'KPI dashboards, monthly revenue totals, average order value, minimum and maximum product prices.',
    commonPitfall: 'Thinking `COUNT(col)` and `COUNT(*)` are identical; `COUNT(col)` ignores rows where `col` is NULL.',
    minimalSyntax: 'SELECT COUNT(*), SUM(total), AVG(total), MIN(total), MAX(total) FROM orders;',
    bulletPoints: [
      'COUNT(*) = total number of rows matching the query.',
      'SUM(column) / AVG(column) = total addition and arithmetic mean of non-null values.',
      'MIN(column) / MAX(column) = smallest and largest values in the dataset.'
    ]
  },
  'mod-17-topic-1': {
    mentalModel: 'GROUP BY is like sorting physical mail into separate department buckets, then calculating stats for each bucket.',
    goldenRule: 'Every column in your SELECT clause MUST either be inside an aggregate function OR in the GROUP BY clause.',
    whenToUse: 'Finding total sales per category, employee count per department, or active users per country.',
    commonPitfall: 'Selecting a non-aggregated column not listed in GROUP BY (e.g. `SELECT dept, employee_name, AVG(salary) GROUP BY dept`).',
    minimalSyntax: 'SELECT department_id, COUNT(*), AVG(salary) FROM employees GROUP BY department_id;',
    bulletPoints: [
      'GROUP BY collapses rows with matching keys into single summary bucket rows.',
      'Executes AFTER WHERE filtering; only rows that passed WHERE reach GROUP BY.',
      'Can group by multiple columns (e.g. `GROUP BY country, city`).'
    ]
  },
  'mod-18-topic-1': {
    mentalModel: 'WHERE filters individual raw rows BEFORE grouping; HAVING filters aggregated bucket rows AFTER grouping.',
    goldenRule: 'If the condition uses an aggregate function like `COUNT()`, `SUM()`, or `AVG()`, it MUST go in `HAVING`, not `WHERE`.',
    whenToUse: 'Finding departments with more than 5 employees, or categories whose total sales exceed $10,000.',
    commonPitfall: 'Putting aggregate conditions in the WHERE clause (e.g. `WHERE COUNT(*) > 5`), causing a syntax execution error.',
    minimalSyntax: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) >= 5;',
    bulletPoints: [
      'WHERE filters input rows before any group calculations occur.',
      'HAVING filters calculated aggregate group statistics after grouping.',
      'Always push non-aggregate filters into WHERE to reduce the data volume entering GROUP BY.'
    ]
  },
  'mod-19-topic-1': {
    mentalModel: 'Scalar functions are row-level transformers: they format text, calculate date intervals, and round numbers on each individual row.',
    goldenRule: 'Wrapping indexed columns in scalar functions in a WHERE clause (e.g. `WHERE YEAR(created_at) = 2026`) breaks index lookups.',
    whenToUse: 'Formatting customer names (`UPPER`, `CONCAT`), calculating age from birthdate (`DATEDIFF`), and financial rounding (`ROUND`).',
    commonPitfall: 'Non-SARGable WHERE predicates caused by function wrapping, turning instant index seeks into expensive full table scans.',
    minimalSyntax: 'SELECT CONCAT(first_name, " ", last_name) AS full_name, ROUND(price, 2) FROM items;',
    bulletPoints: [
      'String: `UPPER()`, `LOWER()`, `SUBSTRING()`, `CONCAT()`, `TRIM()`, `LENGTH()`.',
      'Math: `ROUND(n, d)`, `CEIL()`, `FLOOR()`, `ABS()`, `POWER()`.',
      'Date: `NOW()`, `CURRENT_DATE`, `DATE_ADD()`, `DATEDIFF()`, `EXTRACT()`, `DATE_FORMAT()`.'
    ]
  },
  'mod-20-topic-1': {
    mentalModel: 'INNER JOIN is the overlapping middle of a Venn diagram: it keeps only the rows that have a matching partner on both sides.',
    goldenRule: 'Always specify the exact ON condition (e.g. `ON a.id = b.a_id`); omitting ON creates a catastrophic Cartesian product (N × M rows).',
    whenToUse: 'Querying orders along with their customer details, or students along with their department names.',
    commonPitfall: 'Forgetting foreign key indexes on join columns, causing the engine to perform slow nested-loop full scans.',
    minimalSyntax: 'SELECT o.id, c.name FROM orders o INNER JOIN customers c ON o.customer_id = c.id;',
    bulletPoints: [
      'INNER JOIN checks matching keys between left and right tables.',
      'Rows with no match on either side are completely excluded from the result.',
      'The word `INNER` is optional; `JOIN` defaults to `INNER JOIN` in ANSI SQL.'
    ]
  },
  'mod-21-topic-1': {
    mentalModel: 'LEFT JOIN keeps EVERY row from the left table; if the right table has no match, it fills the missing side with NULLs.',
    goldenRule: 'Use LEFT JOIN when the parent row must appear even if it has zero child records (e.g. Customers who haven\'t placed any orders yet).',
    whenToUse: 'Finding inactive users, orphan records (`WHERE child.id IS NULL`), or building complete catalogs with optional ratings.',
    commonPitfall: 'Accidentally turning a LEFT JOIN into an INNER JOIN by adding a WHERE filter on a column of the right table.',
    minimalSyntax: 'SELECT c.name, o.id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;',
    bulletPoints: [
      'LEFT JOIN: All left rows kept + matched right rows (NULLs if no match).',
      'RIGHT JOIN: All right rows kept + matched left rows (rarely used; LEFT JOIN is preferred).',
      'FULL OUTER JOIN: Keeps all rows from both sides, matching where possible and using NULLs elsewhere.'
    ]
  },
  'mod-22-topic-1': {
    mentalModel: 'A CROSS JOIN pairs every single row from table A with every row in table B (Cartesian product); a SELF JOIN joins a table to itself.',
    goldenRule: 'Use SELF JOIN with distinct table aliases (`e` for employee, `m` for manager) to traverse hierarchy within the same table.',
    whenToUse: 'CROSS JOIN for generating matrix grids (all sizes × all colors); SELF JOIN for manager-employee or parent-category trees.',
    commonPitfall: 'Unintentionally writing a CROSS JOIN on two 10,000-row tables, generating 100,000,000 rows and locking the server.',
    minimalSyntax: 'SELECT e.name AS emp, m.name AS manager FROM employees e LEFT JOIN employees m ON e.mgr_id = m.id;',
    bulletPoints: [
      'CROSS JOIN produces M × N rows without requiring any ON condition.',
      'SELF JOIN treats the same physical table as two distinct logical entities using aliases.',
      'Multi-table joins chain sequentially through the optimizer.'
    ]
  },
  'mod-22-topic-2': {
    mentalModel: 'USING is a clean shortcut for ON when both tables share the exact same column name; NATURAL JOIN automates it (use with caution).',
    goldenRule: 'Prefer explicit `ON a.id = b.user_id` or `USING (user_id)`; avoid NATURAL JOIN in production because schema changes can silently break queries.',
    whenToUse: 'Simplifying clean queries where both primary and foreign keys share identical naming conventions.',
    commonPitfall: 'NATURAL JOIN automatically joins on ALL columns with identical names (such as `created_at` or `status`), producing unintended zero-row results.',
    minimalSyntax: 'SELECT * FROM orders JOIN customers USING (customer_id);',
    bulletPoints: [
      '`JOIN ... USING (col)` eliminates duplicate joined columns in the projection list.',
      'NATURAL JOIN auto-detects all identically named columns across tables.',
      'Explicit `ON` conditions remain the safest and most transparent industry standard.'
    ]
  },
  'mod-23-topic-1': {
    mentalModel: 'JOINs glue tables horizontally (adding more columns); UNION glues tables vertically (stacking more rows on top of each other).',
    goldenRule: 'UNION removes duplicate rows (requires sorting and deduplication); UNION ALL keeps all rows and is much faster.',
    whenToUse: 'Combining historical archive tables with active transaction tables, or merging customer and vendor contact lists.',
    commonPitfall: 'Using UNION when UNION ALL would suffice, needlessly wasting memory and CPU cycles on sorting duplicates.',
    minimalSyntax: 'SELECT email FROM customers UNION ALL SELECT email FROM suppliers;',
    bulletPoints: [
      'Both SELECT queries must have the exact same number of columns in the exact same data type order.',
      'Column names in final output are taken from the FIRST SELECT query.',
      'UNION = deduplicated; UNION ALL = fast raw stack; INTERSECT = common rows; EXCEPT = difference.'
    ]
  },
  'mod-24-topic-1': {
    mentalModel: 'A subquery is a query nested inside another query: the inner query runs first and passes its answer to the outer query.',
    goldenRule: 'Prefer `EXISTS` over `IN` when testing subqueries against large tables because EXISTS stops scanning immediately on the first match.',
    whenToUse: 'Finding records above the average, checking for existence of child items, or building temporary derived tables.',
    commonPitfall: 'Writing correlated subqueries inside the SELECT clause on huge tables, forcing the inner query to run once per row (N queries).',
    minimalSyntax: 'SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    bulletPoints: [
      'Scalar subquery returns a single value (1 row, 1 column).',
      'Multi-row subquery returns a list of values used with `IN`, `ANY`, or `ALL`.',
      'Correlated subquery references columns from the outer query and re-evaluates for each outer row.',
      '`EXISTS` returns true as soon as one match is found (short-circuit optimization).'
    ]
  },
  'mod-25-topic-1': {
    mentalModel: 'A View is a saved named query bookmark: it acts like a virtual table but stores NO physical data on disk.',
    goldenRule: 'Views encapsulate complex multi-table JOINs and security permissions without duplicating physical storage.',
    whenToUse: 'Providing simplified read-only access to junior analysts, hiding sensitive salary/SSN columns, or standardizing business metrics.',
    commonPitfall: 'Nesting views inside views 5 layers deep, resulting in massive, slow, unoptimizable execution plans.',
    minimalSyntax: 'CREATE VIEW active_students AS SELECT id, name FROM students WHERE active = 1;',
    bulletPoints: [
      'Views run their underlying SELECT query dynamically each time they are queried.',
      'Improves security: GRANT permission on a View without granting access to base tables.',
      'Updatable views allow INSERT/UPDATE only if they map directly 1:1 to a single base table without aggregates.'
    ]
  },
  'mod-26-topic-1': {
    mentalModel: 'A standard View is a dynamic camera lens; a Materialized View is a printed physical photo of the query results saved to disk.',
    goldenRule: 'Use Materialized Views for heavy analytical queries that take minutes to compute; refresh them on a scheduled timer or trigger.',
    whenToUse: 'Analytics dashboards, weekly reporting summaries, and precomputed aggregations across millions of rows.',
    commonPitfall: 'Forgetting that materialized views contain stale snapshot data until refreshed via `REFRESH MATERIALIZED VIEW`.',
    minimalSyntax: 'REFRESH MATERIALIZED VIEW monthly_sales_summary;',
    bulletPoints: [
      'Materialized views persist query output physically on disk for blazing-fast read access.',
      'Supports creating indexes directly on the materialized view columns.',
      'Requires explicit refresh strategies (Complete, Fast/Incremental, or On-Demand).'
    ]
  },
  'mod-27-topic-1': {
    mentalModel: 'An index is the alphabetical index at the back of a textbook: it lets you jump straight to page 42 instead of reading all 500 pages.',
    goldenRule: 'Index columns that appear frequently in `WHERE`, `JOIN ON`, and `ORDER BY` clauses; do NOT over-index write-heavy tables.',
    whenToUse: 'Accelerating slow queries from seconds down to milliseconds on tables with more than a few thousand rows.',
    commonPitfall: 'Adding indexes on every single column; every index slows down `INSERT`, `UPDATE`, and `DELETE` because indexes must be updated.',
    minimalSyntax: 'CREATE INDEX idx_users_email ON users (email);',
    bulletPoints: [
      'Clustered Index: Sorts physical data on disk (only one per table; automatically the Primary Key).',
      'Secondary (Non-Clustered) Index: Stores the indexed column and a pointer back to the primary key.',
      'B-Tree (Balanced Tree) provides logarithmic $O(\\log N)$ lookup, range seek, and sort performance.'
    ]
  },
  'mod-28-topic-1': {
    mentalModel: 'A Composite Index on (A, B, C) is like a phonebook sorted by (Last Name, First Name): you can find "Smith" easily, but you cannot search by First Name alone.',
    goldenRule: 'Leftmost Prefix Rule: Queries can use an index on (A, B, C) for `A`, or `A + B`, or `A + B + C`, but NOT for `B` or `C` alone.',
    whenToUse: 'When queries frequently filter by multiple correlated columns simultaneously (e.g. `WHERE tenant_id = 5 AND status = "active"`).',
    commonPitfall: 'Creating an index on `(status, user_id)` when queries filter by `WHERE user_id = 123`, rendering the index unusable.',
    minimalSyntax: 'CREATE INDEX idx_tenant_status ON orders (tenant_id, status);',
    bulletPoints: [
      'The leftmost column must always be present in the query predicate for the index to be utilized.',
      'Put highest-cardinality (most selective) columns or equality-filtered columns first.',
      'A range predicate (`<`, `>`, `BETWEEN`) stops index usage for subsequent columns in the composite key.'
    ]
  },
  'mod-29-topic-1': {
    mentalModel: 'A Transaction is an all-or-nothing financial capsule: either every step completes successfully, or everything resets as if nothing happened.',
    goldenRule: 'ACID guarantees: Atomicity (all or nothing), Consistency (valid rules), Isolation (independent), Durability (persisted on disk).',
    whenToUse: 'Bank transfers: deducting money from Account A and adding money to Account B must be wrapped in a single transaction.',
    commonPitfall: 'Holding transactions open while waiting for external network API calls, locking database tables and causing thread pool starvation.',
    minimalSyntax: 'START TRANSACTION; UPDATE accounts ...; COMMIT; -- or ROLLBACK;',
    bulletPoints: [
      'START TRANSACTION / BEGIN marks the boundary of atomic execution.',
      'COMMIT permanently saves all changes to disk write-ahead log (WAL).',
      'ROLLBACK undoes all changes made since the transaction started.',
      'SAVEPOINT allows rolling back partially to a checkpoint within a transaction.'
    ]
  },
  'mod-30-topic-1': {
    mentalModel: 'Isolation levels balance data accuracy versus concurrency speed: higher isolation prevents anomalies but increases lock waiting.',
    goldenRule: 'Default to `READ COMMITTED` or `REPEATABLE READ`; use `SERIALIZABLE` only when financial calculations strictly forbid concurrent race conditions.',
    whenToUse: 'Fine-tuning database behavior under heavy concurrent traffic to avoid lock contention or prevent dirty reads.',
    commonPitfall: 'Using `READ UNCOMMITTED`, which reads uncommitted "dirty" data that might be rolled back a millisecond later.',
    minimalSyntax: 'SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;',
    bulletPoints: [
      'Dirty Read: Reading uncommitted changes made by another transaction.',
      'Non-Repeatable Read: Re-reading the same row within a transaction and getting different values.',
      'Phantom Read: Re-running a range query and discovering new rows inserted by another committed transaction.',
      'Levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable.'
    ]
  },
  'mod-31-topic-1': {
    mentalModel: 'A CTE (Common Table Expression) is a clean, named temporary scratchpad defined with `WITH`: it makes messy nested subqueries readable.',
    goldenRule: 'Use CTEs instead of deeply nested subqueries to make complex multi-step queries clean, modular, and maintainable.',
    whenToUse: 'Multi-stage data transformations, breaking 100-line analytical queries into logical digestible steps.',
    commonPitfall: 'Assuming CTEs are always materialized; in many engines, CTEs are inlined like subqueries unless explicitly forced.',
    minimalSyntax: 'WITH regional_sales AS (SELECT region, SUM(amount) AS total FROM sales GROUP BY region) SELECT * FROM regional_sales;',
    bulletPoints: [
      'Defined with the `WITH cte_name AS (SELECT ...)` syntax before the main query.',
      'Can chain multiple CTEs with commas: `WITH cte1 AS (...), cte2 AS (...) SELECT ...`.',
      'Scope is limited strictly to the single execution statement that follows it.'
    ]
  },
  'mod-32-topic-1': {
    mentalModel: 'A Recursive CTE is a loop in SQL: it starts with an anchor row (e.g. CEO) and repeatedly queries children (managers -> employees) until the tree ends.',
    goldenRule: 'Always include a base/anchor query, `UNION ALL`, a recursive query referencing the CTE, and a termination condition to prevent infinite loops.',
    whenToUse: 'Organizational charts (CEO -> VPs -> Managers -> Devs), bill of materials, category trees, and breadcrumb navigation.',
    commonPitfall: 'Creating an infinite cycle when data has circular references (e.g. Node A -> Node B -> Node A); use a `depth` counter or cycle detection.',
    minimalSyntax: 'WITH RECURSIVE org_tree AS (SELECT id, name, 1 AS lvl FROM emps WHERE mgr_id IS NULL UNION ALL SELECT e.id, e.name, o.lvl+1 FROM emps e JOIN org_tree o ON e.mgr_id = o.id) SELECT * FROM org_tree;',
    bulletPoints: [
      'Anchor Member: Executes once to fetch the seed/root rows.',
      'UNION ALL: Combines iterations without deduplication overhead.',
      'Recursive Member: References the CTE itself, executing repeatedly until it returns zero rows.'
    ]
  },
  'mod-33-topic-1': {
    mentalModel: 'Window functions calculate ranks and totals across row partitions WITHOUT collapsing the rows into a single summary row like GROUP BY does.',
    goldenRule: 'GROUP BY collapses 100 rows into 5 groups; Window functions (`OVER`) keep all 100 original rows and attach calculated columns.',
    whenToUse: 'Assigning row numbers, calculating department-specific rankings, or finding the top 3 highest-paid employees per department.',
    commonPitfall: 'Trying to filter window functions directly in the `WHERE` clause; window functions execute AFTER WHERE, so you must wrap them in a CTE or subquery.',
    minimalSyntax: 'SELECT name, dept, salary, DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk FROM emps;',
    bulletPoints: [
      '`ROW_NUMBER()`: Strict sequential 1, 2, 3 sequence without ties.',
      '`RANK()`: 1, 2, 2, 4 (skips numbers on ties).',
      '`DENSE_RANK()`: 1, 2, 2, 3 (no gaps on ties; preferred for "Top N" competitions).',
      '`PARTITION BY` divides rows into groups; `ORDER BY` defines calculation order within each window.'
    ]
  },
  'mod-34-topic-1': {
    mentalModel: 'LEAD looks ahead at tomorrow\'s row; LAG looks backward at yesterday\'s row; window aggregates calculate running totals over time.',
    goldenRule: 'Use `LAG(column, 1)` to compare the current row against the previous row without performing an expensive self-join.',
    whenToUse: 'Month-over-month revenue growth, bank running balances, session duration tracking, and rolling 7-day averages.',
    commonPitfall: 'Forgetting an explicit `ORDER BY` inside `OVER()`, resulting in non-deterministic or arbitrary row sequence lookups.',
    minimalSyntax: 'SELECT date, amount, LAG(amount, 1) OVER (ORDER BY date) AS prev_amount FROM sales;',
    bulletPoints: [
      '`LAG(col, offset, default)`: Fetches value from N rows before current row.',
      '`LEAD(col, offset, default)`: Fetches value from N rows after current row.',
      '`SUM(val) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` calculates running totals.'
    ]
  },
  'mod-35-topic-1': {
    mentalModel: 'Stored Procedures are executable backend functions living right inside the database; Triggers are automated tripwires fired by table events.',
    goldenRule: 'Keep business logic in application code whenever possible; use Stored Procedures and Triggers strictly for heavy batch routines or database-level audit logging.',
    whenToUse: 'Nightly batch billing routines, generating automated audit trail tables (`BEFORE/AFTER UPDATE`), and cross-table invariant enforcement.',
    commonPitfall: 'Creating hidden cascades of triggers (Trigger A modifies Table B, which fires Trigger B modifying Table A), leading to invisible deadlocks.',
    minimalSyntax: 'CREATE TRIGGER audit_log AFTER UPDATE ON accounts FOR EACH ROW BEGIN ... END;',
    bulletPoints: [
      'Stored Procedure: Accepts IN/OUT parameters, executes procedural logic, can manage transactions.',
      'User-Defined Function (UDF): Computes and returns a single deterministic scalar value.',
      'Trigger: Automatically executes BEFORE or AFTER an `INSERT`, `UPDATE`, or `DELETE` event.'
    ]
  },
  'mod-36-topic-1': {
    mentalModel: 'Normalization is organizing messy clutter: each fact lives in exactly ONE place to eliminate redundancy and prevent update anomalies.',
    goldenRule: '1NF = Atomic values (no lists); 2NF = Remove partial dependencies on composite keys; 3NF = Remove transitive dependencies (no column depends on non-key).',
    whenToUse: 'Designing clean transactional schemas (OLTP) to ensure updates never leave the database in an inconsistent state.',
    commonPitfall: 'Over-normalizing analytical databases (OLAP / Data Warehouses), where denormalized star schemas are intentionally preferred for fast read scans.',
    minimalSyntax: '-- 3NF: Customers table (id, name, city_id) + Cities table (id, city_name, state)',
    bulletPoints: [
      '1NF: Atomic columns, unique row identifier, no repeating column groups.',
      '2NF: 1NF + every non-key column depends on the ENTIRE primary key.',
      '3NF: 2NF + no transitive dependencies (every non-key attribute depends only on the primary key).',
      'BCNF: Stricter version of 3NF where every determinant must be a candidate key.'
    ]
  },
  'mod-37-topic-1': {
    mentalModel: 'An ERD is the architectural blueprint of your entire application: it diagrams entities (boxes) and their cardinalities (connectors).',
    goldenRule: 'For Many-to-Many ($M:N$) relationships, ALWAYS create a junction/bridge table with foreign keys to both parent tables.',
    whenToUse: 'Designing any software system before writing a single line of backend code or database DDL.',
    commonPitfall: 'Attempting to store an array of foreign keys inside a text column instead of creating a proper junction table.',
    minimalSyntax: 'CREATE TABLE student_courses (student_id INT, course_id INT, PRIMARY KEY (student_id, course_id));',
    bulletPoints: [
      '1:1 (One-to-One): User to UserProfile (share same PK or UNIQUE FK).',
      '1:N (One-to-Many): Department to Employees (FK on the "Many" side).',
      'M:N (Many-to-Many): Students to Courses (requires a junction table `enrollments`).'
    ]
  },
  'mod-38-topic-1': {
    mentalModel: 'The SQL Engine is an airline pilot: you declare your destination (SELECT), and the Cost-Based Optimizer chooses the fastest flight route.',
    goldenRule: 'SQL is declarative: you tell the engine WHAT data you want, not HOW to retrieve it. The optimizer figures out the execution plan.',
    whenToUse: 'Understanding how database internals parse SQL, check permissions, utilize the buffer pool, and access storage engines (e.g. InnoDB).',
    commonPitfall: 'Writing procedural cursor loops in SQL when a single set-based declarative statement runs 1000x faster.',
    minimalSyntax: '-- Parsing -> Binding -> Cost-Based Optimization -> Execution Engine -> Storage Engine (Buffer Pool / Disk)',
    bulletPoints: [
      'Parser validates SQL syntax and builds the Abstract Syntax Tree (AST).',
      'Catalog Resolver verifies table schemas, column names, and user permissions.',
      'Cost Optimizer evaluates index statistics and estimates I/O and CPU cost across join strategies.',
      'Storage Engine (e.g. InnoDB) manages row locks, buffer pool caches, and disk data pages.'
    ]
  },
  'mod-39-topic-1': {
    mentalModel: 'EXPLAIN is an X-ray of your query: it exposes whether the database is using a fast index seek or doing an agonizing full table scan.',
    goldenRule: 'Look for `type: ALL` in EXPLAIN plans; `ALL` means full table scan (reading every row on disk). Aim for `ref`, `eq_ref`, or `const`.',
    whenToUse: 'Debugging slow queries that freeze the database, or verifying that a newly created index is actually being picked up by the optimizer.',
    commonPitfall: 'Relying on estimated `EXPLAIN` rows without testing with realistic production data sizes and updated statistics.',
    minimalSyntax: 'EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;',
    bulletPoints: [
      'Scan Types (Best to Worst): `const` -> `eq_ref` -> `ref` -> `range` -> `index` -> `ALL`.',
      '`key`: Shows which specific index was selected by the optimizer.',
      '`rows`: Estimated number of rows the database must examine to fulfill the query.',
      '`EXPLAIN ANALYZE` actually executes the query and reports real runtime milliseconds.'
    ]
  },
  'mod-40-topic-1': {
    mentalModel: 'A SARGable query is Search-Argument-Able: the search condition allows the database engine to jump straight to the index page.',
    goldenRule: 'Keep indexed columns naked in the WHERE clause: `col >= "2026-01-01"` is SARGable; `YEAR(col) = 2026` is NOT.',
    whenToUse: 'Query optimization reviews, cutting CPU usage, and speeding up response times for API endpoints.',
    commonPitfall: 'Wrapping indexed columns in functions (e.g. `LOWER(email) = "x@y.com"` or `WHERE id + 1 = 10`), forcing a full scan of the entire table.',
    minimalSyntax: '-- SARGable: WHERE created_at >= "2026-01-01" AND created_at < "2027-01-01"',
    bulletPoints: [
      'SARGable predicates enable B-tree index seek instead of full table scan.',
      'Avoid leading wildcards: `LIKE "%search"` cannot use an index; `LIKE "search%"` can.',
      'Avoid type coercion: comparing a VARCHAR column to an unquoted integer disables index lookup.'
    ]
  },
  'mod-41-topic-1': {
    mentalModel: 'Locks are bathroom door locks: Shared (Read) locks let multiple people read together; Exclusive (Write) locks require total privacy.',
    goldenRule: 'Keep transactions short and order table updates consistently across services to avoid Deadlocks.',
    whenToUse: 'Preventing double-spending in wallets, high-concurrency ticket reservations, and resolving database deadlock alerts.',
    commonPitfall: 'Transaction 1 locks Table A then waits for Table B, while Transaction 2 locks Table B then waits for Table A (Deadlock!).',
    minimalSyntax: 'SELECT * FROM seats WHERE id = 15 FOR UPDATE;',
    bulletPoints: [
      'Shared Lock (S-Lock): Allows concurrent reads; blocks writes.',
      'Exclusive Lock (X-Lock): Required for INSERT/UPDATE/DELETE; blocks all other reads and writes.',
      'Deadlock: Two transactions waiting indefinitely for each other\'s locks; engine automatically aborts one.',
      'Optimistic Locking (version column) is often preferred over pessimistic locking for web APIs.'
    ]
  },
  'mod-42-topic-1': {
    mentalModel: 'SQL Injection is tricking the database into executing malicious commands; Parameterized Queries treat all user inputs strictly as harmless plain text.',
    goldenRule: 'NEVER concatenate raw user input into SQL strings (`"SELECT * FROM users WHERE name = " + input`). ALWAYS use Parameterized Prepared Statements.',
    whenToUse: 'Every single backend database query in your entire application, plus configuring role permissions with GRANT/REVOKE.',
    commonPitfall: 'Thinking client-side sanitization protects against SQL injection; attackers bypass the browser and send raw HTTP requests directly to APIs.',
    minimalSyntax: '-- Prepared statement placeholder: SELECT * FROM users WHERE email = ?',
    bulletPoints: [
      'Parameterized queries / Prepared statements separate query code from user data completely.',
      'Principle of Least Privilege: App web user should only have SELECT/INSERT/UPDATE; never DROP or GRANT.',
      '`GRANT SELECT, INSERT ON app_db.* TO "app_user"@"%";`',
      '`REVOKE ALL PRIVILEGES ON app_db.* FROM "bad_user"@"%";`'
    ]
  }
};
