import alasql from 'alasql';

export interface QueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
  statementType?: string;
  explainPlan?: string[];
}

export type DatabaseKey = 'college' | 'ecommerce' | 'hospital' | 'banking' | 'library';

// Sample dataset initialization scripts for AlaSQL
const COLLEGE_SCHEMA = `
CREATE TABLE departments (id INT PRIMARY KEY, department_name STRING, building STRING, head STRING);
INSERT INTO departments VALUES
(1, 'Computer Science', 'Turing Block', 'Dr. Alan'),
(2, 'Information Technology', 'Babbage Hall', 'Dr. Ada'),
(3, 'Electronics & Comm', 'Maxwell Center', 'Dr. Nikola'),
(4, 'Mechanical Eng', 'Watt Complex', 'Dr. Henry');

CREATE TABLE students (id INT PRIMARY KEY, name STRING, age INT, department_id INT, marks DECIMAL(5,2), email STRING);
INSERT INTO students VALUES
(1, 'Kumar Selvan', 21, 1, 88.5, 'kumar@kkacademy.edu'),
(2, 'Ananya Sharma', 20, 1, 94.0, 'ananya@kkacademy.edu'),
(3, 'Rahul Verma', 22, 2, 76.5, 'rahul@kkacademy.edu'),
(4, 'Pooja Hegde', 21, 2, 89.0, 'pooja@kkacademy.edu'),
(5, 'Vikram Rathore', 23, 3, 68.0, 'vikram@kkacademy.edu'),
(6, 'Sneha Patel', 20, 1, 91.5, 'sneha@kkacademy.edu'),
(7, 'Arjun Reddy', 22, 4, 72.0, 'arjun@kkacademy.edu'),
(8, 'Kavya Nair', 21, 3, 84.0, 'kavya@kkacademy.edu');

CREATE TABLE courses (id INT PRIMARY KEY, course_name STRING, credits INT, department_id INT);
INSERT INTO courses VALUES
(101, 'Relational Database Systems', 4, 1),
(102, 'Data Structures & Algorithms', 4, 1),
(103, 'Web Development & APIs', 3, 2),
(104, 'Microprocessors & Signals', 4, 3),
(105, 'Thermodynamics', 3, 4);

CREATE TABLE enrollments (enrollment_id INT PRIMARY KEY, student_id INT, course_id INT, grade STRING);
INSERT INTO enrollments VALUES
(1, 1, 101, 'A'),
(2, 1, 102, 'A'),
(3, 2, 101, 'A+'),
(4, 3, 103, 'B'),
(5, 4, 101, 'A'),
(6, 4, 103, 'A'),
(7, 5, 104, 'C'),
(8, 6, 101, 'A+'),
(9, 7, 105, 'B');
`;

const ECOMMERCE_SCHEMA = `
CREATE TABLE customers (id INT PRIMARY KEY, name STRING, city STRING, tier STRING);
INSERT INTO customers VALUES
(1, 'Aarav Mehta', 'Mumbai', 'Gold'),
(2, 'Diya Kapoor', 'Delhi', 'Platinum'),
(3, 'Rohan Joshi', 'Bengaluru', 'Silver'),
(4, 'Meera Iyer', 'Chennai', 'Gold'),
(5, 'Kabir Sen', 'Kolkata', 'Silver');

CREATE TABLE products (id INT PRIMARY KEY, name STRING, category STRING, price DECIMAL(10,2), stock INT);
INSERT INTO products VALUES
(101, 'Ergonomic Mechanical Keyboard', 'Electronics', 120.00, 45),
(102, 'Ultra-wide 34" Monitor', 'Electronics', 480.00, 15),
(103, 'Noise-Cancelling Headphones', 'Audio', 199.00, 30),
(104, 'High-Precision Wireless Mouse', 'Electronics', 65.00, 80),
(105, 'Standing Desk Converter', 'Furniture', 240.00, 20),
(106, 'Ergonomic Mesh Chair', 'Furniture', 310.00, 12);

CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, order_date STRING, total_amount DECIMAL(10,2), status STRING);
INSERT INTO orders VALUES
(1001, 1, '2026-03-01', 545.00, 'Delivered'),
(1002, 2, '2026-03-05', 480.00, 'Delivered'),
(1003, 1, '2026-03-10', 120.00, 'Shipped'),
(1004, 3, '2026-03-12', 199.00, 'Processing'),
(1005, 4, '2026-03-15', 550.00, 'Delivered');

CREATE TABLE order_items (id INT PRIMARY KEY, order_id INT, product_id INT, quantity INT, price DECIMAL(10,2));
INSERT INTO order_items VALUES
(1, 1001, 101, 1, 120.00),
(2, 1001, 104, 1, 65.00),
(3, 1001, 106, 1, 310.00),
(4, 1002, 102, 1, 480.00),
(5, 1003, 101, 1, 120.00),
(6, 1004, 103, 1, 199.00),
(7, 1005, 105, 1, 240.00),
(8, 1005, 106, 1, 310.00);
`;

const HOSPITAL_SCHEMA = `
CREATE TABLE doctors (id INT PRIMARY KEY, name STRING, specialty STRING, consultation_fee DECIMAL(8,2));
INSERT INTO doctors VALUES
(1, 'Dr. Rajesh Gupta', 'Cardiology', 120.00),
(2, 'Dr. Sunita Rao', 'Neurology', 150.00),
(3, 'Dr. Amit Trivedi', 'Orthopedics', 100.00),
(4, 'Dr. Priya Desai', 'Pediatrics', 90.00);

CREATE TABLE patients (id INT PRIMARY KEY, name STRING, age INT, gender STRING, blood_group STRING);
INSERT INTO patients VALUES
(1, 'Ramesh Chandra', 54, 'Male', 'O+'),
(2, 'Lakshmi Devi', 42, 'Female', 'B+'),
(3, 'Farhan Ali', 29, 'Male', 'A+'),
(4, 'Zara Khan', 8, 'Female', 'O-'),
(5, 'Suresh Kumar', 62, 'Male', 'AB+');

CREATE TABLE appointments (id INT PRIMARY KEY, doctor_id INT, patient_id INT, appt_date STRING, status STRING);
INSERT INTO appointments VALUES
(1, 1, 1, '2026-03-02', 'Completed'),
(2, 2, 2, '2026-03-03', 'Completed'),
(3, 3, 3, '2026-03-05', 'Completed'),
(4, 4, 4, '2026-03-06', 'Completed'),
(5, 1, 5, '2026-03-08', 'Scheduled');
`;

const BANKING_SCHEMA = `
CREATE TABLE customers (id INT PRIMARY KEY, name STRING, phone STRING, kyc_status STRING);
INSERT INTO customers VALUES
(1, 'Kiran Bedi', '9876543210', 'Verified'),
(2, 'Manish Sisodia', '9876543211', 'Verified'),
(3, 'Swati Maliwal', '9876543212', 'Pending'),
(4, 'Gautam Gambhir', '9876543213', 'Verified');

CREATE TABLE accounts (account_no INT PRIMARY KEY, customer_id INT, account_type STRING, balance DECIMAL(12,2), status STRING);
INSERT INTO accounts VALUES
(100101, 1, 'Savings', 45000.00, 'Active'),
(100102, 1, 'Current', 120000.00, 'Active'),
(100103, 2, 'Savings', 82500.00, 'Active'),
(100104, 3, 'Savings', 1200.00, 'Dormant'),
(100105, 4, 'Savings', 350000.00, 'Active');

CREATE TABLE transactions (tx_id INT PRIMARY KEY, account_no INT, tx_type STRING, amount DECIMAL(10,2), tx_date STRING);
INSERT INTO transactions VALUES
(501, 100101, 'Credit', 15000.00, '2026-03-01'),
(502, 100101, 'Debit', 2500.00, '2026-03-04'),
(503, 100102, 'Credit', 50000.00, '2026-03-08'),
(504, 100103, 'Debit', 10000.00, '2026-03-10'),
(505, 100105, 'Debit', 45000.00, '2026-03-12');
`;

const LIBRARY_SCHEMA = `
CREATE TABLE authors (id INT PRIMARY KEY, name STRING, country STRING);
INSERT INTO authors VALUES
(1, 'J.K. Rowling', 'UK'),
(2, 'George R.R. Martin', 'USA'),
(3, 'Arundhati Roy', 'India'),
(4, 'Haruki Murakami', 'Japan');

CREATE TABLE books (id INT PRIMARY KEY, title STRING, author_id INT, genre STRING, published_year INT, copies INT);
INSERT INTO books VALUES
(1, 'Harry Potter & Philosopher Stone', 1, 'Fantasy', 1997, 6),
(2, 'A Game of Thrones', 2, 'Fantasy', 1996, 4),
(3, 'The God of Small Things', 3, 'Literary Fiction', 1997, 3),
(4, 'Norwegian Wood', 4, 'Contemporary', 1987, 5),
(5, 'Kafka on the Shore', 4, 'Magical Realism', 2002, 4);

CREATE TABLE members (id INT PRIMARY KEY, name STRING, joined_date STRING, active_loans INT);
INSERT INTO members VALUES
(1, 'Aditya Roy', '2025-01-10', 2),
(2, 'Bhavna Lal', '2025-04-18', 0),
(3, 'Chetan Bhagat', '2025-06-22', 1),
(4, 'Deepika Pad', '2025-09-01', 3);

CREATE TABLE borrow_records (id INT PRIMARY KEY, book_id INT, member_id INT, borrow_date STRING, return_date STRING);
INSERT INTO borrow_records VALUES
(101, 1, 1, '2026-02-15', '2026-02-28'),
(102, 3, 1, '2026-03-01', NULL),
(103, 4, 3, '2026-03-05', NULL),
(104, 2, 4, '2026-03-02', NULL);
`;

class SQLEngine {
  private initializedDbs: Set<string> = new Set();

  constructor() {
    this.resetAllDatabases();
  }

  public resetAllDatabases() {
    try {
      this.initDatabase('college', COLLEGE_SCHEMA);
      this.initDatabase('ecommerce', ECOMMERCE_SCHEMA);
      this.initDatabase('hospital', HOSPITAL_SCHEMA);
      this.initDatabase('banking', BANKING_SCHEMA);
      this.initDatabase('library', LIBRARY_SCHEMA);
    } catch (err) {
      console.warn('Init error in SQLEngine:', err);
    }
  }

  public resetDatabase(dbName: DatabaseKey) {
    if (dbName === 'college') this.initDatabase('college', COLLEGE_SCHEMA);
    if (dbName === 'ecommerce') this.initDatabase('ecommerce', ECOMMERCE_SCHEMA);
    if (dbName === 'hospital') this.initDatabase('hospital', HOSPITAL_SCHEMA);
    if (dbName === 'banking') this.initDatabase('banking', BANKING_SCHEMA);
    if (dbName === 'library') this.initDatabase('library', LIBRARY_SCHEMA);
  }

  private initDatabase(dbName: string, schemaSql: string) {
    try {
      // Create separate db context in AlaSQL
      alasql(`DROP DATABASE IF EXISTS ${dbName};`);
      alasql(`CREATE DATABASE ${dbName};`);
      alasql(`USE ${dbName};`);

      const statements = schemaSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const statement of statements) {
        alasql(statement);
      }
      this.initializedDbs.add(dbName);
    } catch (e) {
      console.error(`Error initializing DB ${dbName}:`, e);
    }
  }

  public executeQuery(sql: string, dbName: DatabaseKey = 'college'): QueryResult {
    const startTime = performance.now();
    try {
      if (!this.initializedDbs.has(dbName)) {
        this.resetDatabase(dbName);
      }

      alasql(`USE ${dbName};`);

      // Handle multiple statements if separated by semicolon
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      let lastResult: any = null;
      for (const stmt of statements) {
        lastResult = alasql(stmt);
      }

      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      // Determine statement type
      const trimmed = sql.trim().toUpperCase();
      let statementType = 'SELECT';
      if (trimmed.startsWith('INSERT')) statementType = 'INSERT';
      else if (trimmed.startsWith('UPDATE')) statementType = 'UPDATE';
      else if (trimmed.startsWith('DELETE')) statementType = 'DELETE';
      else if (trimmed.startsWith('CREATE')) statementType = 'CREATE';
      else if (trimmed.startsWith('DROP')) statementType = 'DROP';
      else if (trimmed.startsWith('ALTER')) statementType = 'ALTER';

      // AlaSQL returns array of objects for SELECT
      if (Array.isArray(lastResult)) {
        const rows = lastResult;
        const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
        return {
          success: true,
          columns,
          rows,
          rowCount: rows.length,
          executionTimeMs,
          statementType,
          explainPlan: this.generateExplainPlan(sql, rows.length)
        };
      }

      // Mutation result (e.g. number of rows affected or 1)
      const affected = typeof lastResult === 'number' ? lastResult : 1;
      return {
        success: true,
        columns: ['Status', 'Rows Affected'],
        rows: [{ Status: `${statementType} executed successfully`, 'Rows Affected': affected }],
        rowCount: affected,
        executionTimeMs,
        statementType,
        explainPlan: this.generateExplainPlan(sql, affected)
      };
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs,
        error: err.message || 'Syntax or relational execution error in SQL statement.'
      };
    }
  }

  public getTableList(dbName: DatabaseKey): string[] {
    try {
      alasql(`USE ${dbName};`);
      const tablesObj = (alasql as any).databases[dbName]?.tables || {};
      return Object.keys(tablesObj);
    } catch {
      return [];
    }
  }

  public getTableSchema(dbName: DatabaseKey, tableName: string): { name: string; type: string }[] {
    try {
      alasql(`USE ${dbName};`);
      const table = (alasql as any).databases[dbName]?.tables?.[tableName];
      if (!table) return [];
      if (table.columns && Array.isArray(table.columns)) {
        return table.columns.map((c: any) => ({
          name: c.columnid,
          type: c.dbtypeid || 'STRING'
        }));
      }
      // If no explicit column schema, infer from sample data
      const sample = alasql(`SELECT * FROM ${tableName} LIMIT 1;`);
      if (Array.isArray(sample) && sample.length > 0) {
        return Object.keys(sample[0]).map(key => ({
          name: key,
          type: typeof sample[0][key] === 'number' ? 'NUMERIC' : 'VARCHAR'
        }));
      }
      return [];
    } catch {
      return [];
    }
  }

  private generateExplainPlan(sql: string, rowsCount: number): string[] {
    const upper = sql.toUpperCase();
    const plan: string[] = [];

    plan.push(`1. SQL Query Parser: Syntactic and lexical validation passed.`);

    if (upper.includes('JOIN')) {
      plan.push(`2. Join Optimizer: Identified relational JOIN condition. Using Hash/Nested Loop Join.`);
    }

    if (upper.includes('WHERE')) {
      plan.push(`3. Predicate Pushdown: Applying WHERE filter condition directly during table scan.`);
    } else {
      plan.push(`3. Full Table Scan: No WHERE predicate specified; scanning all disk blocks.`);
    }

    if (upper.includes('GROUP BY')) {
      plan.push(`4. Aggregate Aggregation: Hash aggregate table created for GROUP BY groupings.`);
    }

    if (upper.includes('ORDER BY')) {
      plan.push(`5. Sort Operation: In-memory Quicksort / Top-N Heap sort executed.`);
    }

    if (upper.includes('LIMIT')) {
      plan.push(`6. Limit / Offset Window: Slicing result stream buffer.`);
    }

    plan.push(`7. Result Projection: Materialized ${rowsCount} row(s) in result set.`);
    return plan;
  }
}

export const sqlEngine = new SQLEngine();
