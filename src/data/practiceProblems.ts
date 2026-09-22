import { PracticeProblem } from '../types';

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  // 🟢 EASY
  {
    id: 'easy-1',
    title: 'High-Performing Students',
    difficulty: 'easy',
    levelId: 2,
    category: 'Filtering & SELECT',
    description: 'Select the name, marks, and age of all students who scored strictly more than 85.0 marks, ordered by marks in descending order.',
    database: 'college',
    starterSql: '-- Write your query to find students with marks > 85.0\nSELECT \nFROM students\n',
    solutionSql: 'SELECT name, marks, age FROM students WHERE marks > 85.0 ORDER BY marks DESC;',
    hint: 'Use the WHERE clause with > 85.0 and ORDER BY marks DESC.',
    explanation: 'The WHERE clause restricts rows where marks > 85.0, and ORDER BY marks DESC sorts the highest scoring students at the top.'
  },
  {
    id: 'easy-2',
    title: 'Electronics Catalog Under $200',
    difficulty: 'easy',
    levelId: 2,
    category: 'Operators & Filtering',
    description: 'Find all products in the "Electronics" category with a price of less than 200.00. Output name, category, and price.',
    database: 'ecommerce',
    starterSql: '-- Write a query for Electronics products priced < 200\nSELECT \nFROM products\n',
    solutionSql: 'SELECT name, category, price FROM products WHERE category = "Electronics" AND price < 200.00;',
    hint: 'Combine category = "Electronics" with price < 200.00 using the AND operator.',
    explanation: 'The logical AND operator ensures both conditions must be true for a row to be included.'
  },
  {
    id: 'easy-3',
    title: 'Cardiology & Neurology Physicians',
    difficulty: 'easy',
    levelId: 2,
    category: 'IN Operator',
    description: 'List the names and consultation fees of doctors whose specialty is either "Cardiology" or "Neurology".',
    database: 'hospital',
    starterSql: '-- Retrieve doctors in Cardiology or Neurology\nSELECT \nFROM doctors\n',
    solutionSql: 'SELECT name, specialty, consultation_fee FROM doctors WHERE specialty IN ("Cardiology", "Neurology");',
    hint: 'Use the IN operator or OR condition: specialty IN ("Cardiology", "Neurology").',
    explanation: 'The IN operator tests if a column value matches any element within the provided list.'
  },
  {
    id: 'easy-4',
    title: 'Fantasy Books Inventory',
    difficulty: 'easy',
    levelId: 2,
    category: 'Basic Projection',
    description: 'Find all books in the "Fantasy" genre. Output title, published_year, and copies, sorted chronologically by published_year ascending.',
    database: 'library',
    starterSql: '-- Find Fantasy books\nSELECT \nFROM books\n',
    solutionSql: 'SELECT title, published_year, copies FROM books WHERE genre = "Fantasy" ORDER BY published_year ASC;',
    hint: 'Filter WHERE genre = "Fantasy" and sort by published_year ASC.',
    explanation: 'Extracts fantasy literature sorted by initial release year.'
  },

  // 🟡 MEDIUM
  {
    id: 'med-1',
    title: 'Students and Their Department Names',
    difficulty: 'medium',
    levelId: 3,
    category: 'INNER JOIN',
    description: 'Join students and departments to retrieve student name, marks, department name, and building for students belonging to Computer Science or Information Technology.',
    database: 'college',
    starterSql: '-- Join students and departments\nSELECT \nFROM students s\nJOIN departments d ON \n',
    solutionSql: 'SELECT s.name AS student_name, s.marks, d.department_name, d.building FROM students s INNER JOIN departments d ON s.department_id = d.id WHERE d.department_name IN ("Computer Science", "Information Technology");',
    hint: 'Use INNER JOIN on s.department_id = d.id and filter on d.department_name.',
    explanation: 'Combines student records with their associated department entity using foreign key matching.'
  },
  {
    id: 'med-2',
    title: 'Customer Order Expenditure Summary',
    difficulty: 'medium',
    levelId: 3,
    category: 'GROUP BY & Aggregates',
    description: 'Calculate the total amount spent and number of orders placed by each customer. Join customers and orders, displaying customer name, order count, and total spent. Only include customers who have placed at least 1 order.',
    database: 'ecommerce',
    starterSql: '-- Summarize orders per customer\nSELECT \nFROM customers c\nJOIN orders o ON \nGROUP BY \n',
    solutionSql: 'SELECT c.name, COUNT(o.id) AS total_orders, SUM(o.total_amount) AS total_spent FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name;',
    hint: 'Group by c.id, c.name and apply COUNT(o.id) and SUM(o.total_amount).',
    explanation: 'Aggregates multi-table transaction volumes to produce customer spending summaries.'
  },
  {
    id: 'med-3',
    title: 'Active Unreturned Book Loans',
    difficulty: 'medium',
    levelId: 3,
    category: 'JOINS & NULL Check',
    description: 'Find all unreturned book loans. Join borrow_records with books and members to display member name, book title, and borrow_date where return_date IS NULL.',
    database: 'library',
    starterSql: '-- Identify unreturned books\nSELECT \nFROM borrow_records br\nJOIN \n',
    solutionSql: 'SELECT m.name AS member_name, b.title AS book_title, br.borrow_date FROM borrow_records br INNER JOIN books b ON br.book_id = b.id INNER JOIN members m ON br.member_id = m.id WHERE br.return_date IS NULL;',
    hint: 'Perform a 3-table join and check WHERE br.return_date IS NULL.',
    explanation: 'Identifies active book loans that have not yet been checked back into library inventory.'
  },
  {
    id: 'med-4',
    title: 'Department Average Score Filter',
    difficulty: 'medium',
    levelId: 3,
    category: 'HAVING Clause',
    description: 'Find all departments that have an average student mark strictly greater than 80.0. Output department_id, student count, and average marks (rounded to 2 decimals).',
    database: 'college',
    starterSql: '-- Group by department and filter average with HAVING\nSELECT \nFROM students\nGROUP BY \nHAVING \n',
    solutionSql: 'SELECT department_id, COUNT(*) AS student_count, ROUND(AVG(marks), 2) AS avg_marks FROM students GROUP BY department_id HAVING AVG(marks) > 80.0;',
    hint: 'Use GROUP BY department_id and HAVING AVG(marks) > 80.0.',
    explanation: 'The HAVING clause filters aggregated department buckets after calculating the average marks.'
  },

  // 🟠 HARD
  {
    id: 'hard-1',
    title: 'Above-Average Earners in Banking',
    difficulty: 'hard',
    levelId: 3,
    category: 'Subqueries',
    description: 'Find all accounts whose balance is strictly higher than the average balance of all active accounts in the bank. Output account_no, customer_id, balance, and status.',
    database: 'banking',
    starterSql: '-- Subquery for above average accounts\nSELECT \nFROM accounts\nWHERE balance > (\n    -- Subquery here\n)',
    solutionSql: 'SELECT account_no, customer_id, balance, status FROM accounts WHERE balance > (SELECT AVG(balance) FROM accounts WHERE status = "Active") AND status = "Active";',
    hint: 'Use a scalar subquery (SELECT AVG(balance) FROM accounts WHERE status = "Active").',
    explanation: 'The inner query computes the baseline mean balance, which the outer query uses as a dynamic comparison threshold.'
  },
  {
    id: 'hard-2',
    title: 'Student Ranking with Window Functions',
    difficulty: 'hard',
    levelId: 4,
    category: 'Window Functions',
    description: 'Use a window function to rank all students by marks in descending order. Display name, marks, and their computed rank position using ROW_NUMBER().',
    database: 'college',
    starterSql: '-- Use ROW_NUMBER() OVER (ORDER BY ...)\nSELECT \nFROM students\n',
    solutionSql: 'SELECT name, marks, ROW_NUMBER() OVER (ORDER BY marks DESC) AS rank_position FROM students;',
    hint: 'Use ROW_NUMBER() OVER (ORDER BY marks DESC).',
    explanation: 'Window ranking assigns continuous ordinal ranks to each student without aggregating rows.'
  },
  {
    id: 'hard-3',
    title: 'Top Customer Order with CTE',
    difficulty: 'hard',
    levelId: 4,
    category: 'Common Table Expressions',
    description: 'Write a Common Table Expression (CTE) named CustomerSpending that aggregates total spending per customer. Then join it with customers to output name, city, and total spent for customers who spent more than $300.',
    database: 'ecommerce',
    starterSql: 'WITH CustomerSpending AS (\n    -- Define CTE here\n)\nSELECT \nFROM customers c\nJOIN CustomerSpending cs ON \n',
    solutionSql: 'WITH CustomerSpending AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT c.name, c.city, cs.total_spent FROM customers c INNER JOIN CustomerSpending cs ON c.id = cs.customer_id WHERE cs.total_spent > 300.00;',
    hint: 'Define the CTE using WITH ... AS (...), then join it with the customers table in the outer query.',
    explanation: 'CTEs modularize the aggregation logic into a readable temporary relation before joining.'
  },

  // 🔴 EXPERT
  {
    id: 'expert-1',
    title: 'Multi-Department Rank Partition',
    difficulty: 'expert',
    levelId: 4,
    category: 'Partitioned Analytical Windows',
    description: 'For each department, assign a departmental rank to students based on marks descending using DENSE_RANK() with PARTITION BY. Also fetch their department name.',
    database: 'college',
    starterSql: '-- DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)\nSELECT \nFROM students s\nJOIN departments d ON \n',
    solutionSql: 'SELECT s.name, d.department_name, s.marks, DENSE_RANK() OVER (PARTITION BY s.department_id ORDER BY s.marks DESC) AS dept_rank FROM students s INNER JOIN departments d ON s.department_id = d.id;',
    hint: 'Use DENSE_RANK() OVER (PARTITION BY s.department_id ORDER BY s.marks DESC).',
    explanation: 'PARTITION BY resets the ranking counter for each individual department group.'
  },
  {
    id: 'expert-2',
    title: 'Customer Lifetime Value & Tier Segmentation',
    difficulty: 'expert',
    levelId: 4,
    category: 'CASE & Multi-Table Analytics',
    description: 'Calculate each customer total order expenditure and assign an account segment using a CASE statement: "VIP Gold" if spending >= 500, "Silver Member" if spending >= 200, and "Standard Buyer" otherwise.',
    database: 'ecommerce',
    starterSql: '-- Multi-table aggregation with conditional CASE categorization\nSELECT \nFROM customers c\nLEFT JOIN orders o ON \nGROUP BY \n',
    solutionSql: 'SELECT c.name, c.city, COALESCE(SUM(o.total_amount), 0) AS total_spent, CASE WHEN SUM(o.total_amount) >= 500 THEN "VIP Gold" WHEN SUM(o.total_amount) >= 200 THEN "Silver Member" ELSE "Standard Buyer" END AS loyalty_tier FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name, c.city;',
    hint: 'Use LEFT JOIN, GROUP BY customer, and wrap SUM(o.total_amount) inside a CASE expression.',
    explanation: 'Combines outer joins, multi-table aggregation, and business segmentation logic in an analytical pipeline.'
  }
];
