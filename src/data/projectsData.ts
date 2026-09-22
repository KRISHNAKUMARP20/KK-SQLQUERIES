import { RealWorldProject } from '../types';

export const REAL_WORLD_PROJECTS: RealWorldProject[] = [
  {
    id: 'project-college',
    name: 'College Management ERP Database',
    icon: 'GraduationCap',
    databaseName: 'college_erp',
    industry: 'Higher Education',
    description: 'A comprehensive university system tracking academic departments, professors, enrolled students, multi-credit courses, grades, and graduation eligibility.',
    tablesCount: 5,
    tables: [
      {
        name: 'departments',
        description: 'Academic departments, faculty leadership, and campus building allocations.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Unique department ID' },
          { name: 'department_name', type: 'VARCHAR(100)', description: 'Department title' },
          { name: 'building', type: 'VARCHAR(100)', description: 'Campus block/building name' },
          { name: 'head', type: 'VARCHAR(100)', description: 'Department chairperson / Dean' }
        ]
      },
      {
        name: 'students',
        description: 'Enrolled students, academic department link, GPA marks, and university credentials.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Student roll number' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Full legal name' },
          { name: 'age', type: 'INT', description: 'Age in years' },
          { name: 'department_id', type: 'INT', key: 'FK', description: 'Associated academic department' },
          { name: 'marks', type: 'DECIMAL(5,2)', description: 'Cumulative grade percentage' },
          { name: 'email', type: 'VARCHAR(150)', description: 'Institutional email address' }
        ]
      },
      {
        name: 'courses',
        description: 'Curriculum catalog, credit weighting, and department ownership.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Course course code' },
          { name: 'course_name', type: 'VARCHAR(150)', description: 'Course title' },
          { name: 'credits', type: 'INT', description: 'Academic credit weight' },
          { name: 'department_id', type: 'INT', key: 'FK', description: 'Department offering course' }
        ]
      },
      {
        name: 'enrollments',
        description: 'Student-to-course registration junction table with semester grades.',
        columns: [
          { name: 'enrollment_id', type: 'INT', key: 'PK', description: 'Registration entry ID' },
          { name: 'student_id', type: 'INT', key: 'FK', description: 'Enrolled student ID' },
          { name: 'course_id', type: 'INT', key: 'FK', description: 'Target course ID' },
          { name: 'grade', type: 'VARCHAR(2)', description: 'Assigned letter grade (A+, A, B, C)' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'Department Dean Honor Roll',
        objective: 'Find top students per department with over 85% score for Dean’s List honors.',
        sql: 'SELECT s.name AS student, d.department_name, s.marks FROM students s JOIN departments d ON s.department_id = d.id WHERE s.marks >= 85.0 ORDER BY d.department_name, s.marks DESC;',
        businessImpact: 'Automates end-of-semester scholarship awards and honors distribution.'
      },
      {
        title: 'Credit Load Calculation',
        objective: 'Calculate the total enrolled credit hours for each student in the current semester.',
        sql: 'SELECT s.name, COUNT(e.course_id) AS total_courses, SUM(c.credits) AS total_credits FROM students s JOIN enrollments e ON s.id = e.student_id JOIN courses c ON e.course_id = c.id GROUP BY s.id, s.name;',
        businessImpact: 'Prevents students from exceeding maximum allowable semester credit loads.'
      }
    ]
  },
  {
    id: 'project-ecommerce',
    name: 'Omnichannel E-Commerce Platform',
    icon: 'ShoppingCart',
    databaseName: 'ecommerce_store',
    industry: 'Retail & Commerce',
    description: 'High-throughput transactional retail database supporting millions of SKUs, customer tiers, real-time inventory management, and multi-item orders.',
    tablesCount: 5,
    tables: [
      {
        name: 'customers',
        description: 'Registered buyers, demographic cities, and loyalty tier classifications.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Customer ID' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Customer name' },
          { name: 'city', type: 'VARCHAR(50)', description: 'Delivery metropolitan area' },
          { name: 'tier', type: 'VARCHAR(20)', description: 'Loyalty tier (Silver, Gold, Platinum)' }
        ]
      },
      {
        name: 'products',
        description: 'Catalog items, categories, pricing, and live warehouse inventory.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Product SKU ID' },
          { name: 'name', type: 'VARCHAR(150)', description: 'Commercial product name' },
          { name: 'category', type: 'VARCHAR(50)', description: 'Merchandise category' },
          { name: 'price', type: 'DECIMAL(10,2)', description: 'Retail unit price' },
          { name: 'stock', type: 'INT', description: 'Available warehouse units' }
        ]
      },
      {
        name: 'orders',
        description: 'Master checkout orders, dates, total invoices, and shipment lifecycle status.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Order invoice ID' },
          { name: 'customer_id', type: 'INT', key: 'FK', description: 'Purchasing customer' },
          { name: 'order_date', type: 'DATE', description: 'Checkout date' },
          { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Invoice total' },
          { name: 'status', type: 'VARCHAR(30)', description: 'Processing, Shipped, Delivered' }
        ]
      },
      {
        name: 'order_items',
        description: 'Itemized line items linking products to orders with quantity and pricing snapshots.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Line item ID' },
          { name: 'order_id', type: 'INT', key: 'FK', description: 'Parent order' },
          { name: 'product_id', type: 'INT', key: 'FK', description: 'Ordered product' },
          { name: 'quantity', type: 'INT', description: 'Item quantity purchased' },
          { name: 'price', type: 'DECIMAL(10,2)', description: 'Historical locked price' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'Customer Lifetime Value (CLV)',
        objective: 'Calculate gross sales per customer and classify account tiers.',
        sql: 'SELECT c.name, c.tier, COUNT(o.id) AS orders_count, SUM(o.total_amount) AS total_spend FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name, c.tier ORDER BY total_spend DESC;',
        businessImpact: 'Guides VIP retention incentives and personalized marketing campaigns.'
      },
      {
        title: 'Best-Selling Products by Revenue',
        objective: 'Identify top grossing products across all completed order items.',
        sql: 'SELECT p.name, p.category, SUM(oi.quantity) AS units_sold, SUM(oi.quantity * oi.price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.id, p.name, p.category ORDER BY total_revenue DESC;',
        businessImpact: 'Optimizes warehouse procurement and supplier renegotiation.'
      }
    ]
  },
  {
    id: 'project-hospital',
    name: 'Hospital Information Management (EHR)',
    icon: 'Activity',
    databaseName: 'hospital_ehr',
    industry: 'Healthcare & Clinical',
    description: 'Clinical database safeguarding medical appointments, doctor specialties, patient records, blood types, and consultation scheduling.',
    tablesCount: 4,
    tables: [
      {
        name: 'doctors',
        description: 'Licensed medical physicians, specialties, and consultation pricing.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Doctor medical license ID' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Physician full name' },
          { name: 'specialty', type: 'VARCHAR(100)', description: 'Clinical medical domain' },
          { name: 'consultation_fee', type: 'DECIMAL(8,2)', description: 'Standard consultation rate' }
        ]
      },
      {
        name: 'patients',
        description: 'Medical registry, demographics, age, gender, and clinical blood typing.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Patient MRN record ID' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Patient name' },
          { name: 'age', type: 'INT', description: 'Age' },
          { name: 'gender', type: 'VARCHAR(10)', description: 'Biological gender' },
          { name: 'blood_group', type: 'VARCHAR(5)', description: 'ABO and Rh blood group' }
        ]
      },
      {
        name: 'appointments',
        description: 'Clinical consultations, scheduling dates, and visit statuses.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Appointment ticket ID' },
          { name: 'doctor_id', type: 'INT', key: 'FK', description: 'Consulting physician' },
          { name: 'patient_id', type: 'INT', key: 'FK', description: 'Consulting patient' },
          { name: 'appt_date', type: 'DATE', description: 'Scheduled clinical date' },
          { name: 'status', type: 'VARCHAR(20)', description: 'Scheduled, Completed, Cancelled' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'Physician Workload Analysis',
        objective: 'Analyze doctor clinical consultation counts and billable revenue.',
        sql: 'SELECT d.name AS doctor_name, d.specialty, COUNT(a.id) AS total_appointments, SUM(d.consultation_fee) AS estimated_revenue FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id, d.name, d.specialty;',
        businessImpact: 'Balances outpatient clinic staffing and physician duty rosters.'
      }
    ]
  },
  {
    id: 'project-banking',
    name: 'Core Banking Ledger & Transactions',
    icon: 'Building2',
    databaseName: 'core_banking',
    industry: 'Financial Services',
    description: 'Mission-critical double-entry financial ledger enforcing strict ACID guarantees, customer KYC verification, accounts, and transaction audit trails.',
    tablesCount: 4,
    tables: [
      {
        name: 'customers',
        description: 'Bank account holders, identity verification, and contact info.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Customer CIF number' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Legal name' },
          { name: 'phone', type: 'VARCHAR(15)', description: 'Registered mobile' },
          { name: 'kyc_status', type: 'VARCHAR(20)', description: 'Verified, Pending, Rejected' }
        ]
      },
      {
        name: 'accounts',
        description: 'Bank deposit accounts, account type, liquid balance, and status.',
        columns: [
          { name: 'account_no', type: 'INT', key: 'PK', description: 'Unique account number' },
          { name: 'customer_id', type: 'INT', key: 'FK', description: 'Owning customer' },
          { name: 'account_type', type: 'VARCHAR(20)', description: 'Savings, Current, Fixed' },
          { name: 'balance', type: 'DECIMAL(12,2)', description: 'Liquid cash balance' },
          { name: 'status', type: 'VARCHAR(20)', description: 'Active, Dormant, Frozen' }
        ]
      },
      {
        name: 'transactions',
        description: 'Immutable ledger of credits and debits with execution timestamps.',
        columns: [
          { name: 'tx_id', type: 'INT', key: 'PK', description: 'Ledger transaction ID' },
          { name: 'account_no', type: 'INT', key: 'FK', description: 'Target account' },
          { name: 'tx_type', type: 'VARCHAR(10)', description: 'Credit or Debit' },
          { name: 'amount', type: 'DECIMAL(10,2)', description: 'Transaction amount' },
          { name: 'tx_date', type: 'DATE', description: 'Timestamp of transaction' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'High-Value Transaction Suspicious Activity Monitor',
        objective: 'Identify transactions exceeding $20,000 for AML regulatory reporting.',
        sql: 'SELECT t.tx_id, c.name, a.account_no, t.tx_type, t.amount, t.tx_date FROM transactions t JOIN accounts a ON t.account_no = a.account_no JOIN customers c ON a.customer_id = c.id WHERE t.amount >= 20000.00 ORDER BY t.amount DESC;',
        businessImpact: 'Automates compliance with central bank Anti-Money Laundering regulations.'
      }
    ]
  },
  {
    id: 'project-library',
    name: 'Public Library Management System',
    icon: 'BookOpen',
    databaseName: 'library_system',
    industry: 'Cultural & Educational',
    description: 'Cataloging system tracking literary genres, international authors, inventory copy counts, and active borrowing records.',
    tablesCount: 4,
    tables: [
      {
        name: 'authors',
        description: 'Literary authors and country of origin.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Author ID' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Author name' },
          { name: 'country', type: 'VARCHAR(50)', description: 'Nationality' }
        ]
      },
      {
        name: 'books',
        description: 'Book titles, author links, literary genres, and total copies.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'ISBN / Book ID' },
          { name: 'title', type: 'VARCHAR(200)', description: 'Book title' },
          { name: 'author_id', type: 'INT', key: 'FK', description: 'Author link' },
          { name: 'genre', type: 'VARCHAR(50)', description: 'Literary genre' },
          { name: 'published_year', type: 'INT', description: 'Original publication year' },
          { name: 'copies', type: 'INT', description: 'Total library physical copies' }
        ]
      },
      {
        name: 'members',
        description: 'Registered library card holders and loan privileges.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Card number' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Member name' },
          { name: 'joined_date', type: 'DATE', description: 'Membership issue date' },
          { name: 'active_loans', type: 'INT', description: 'Active books checked out' }
        ]
      },
      {
        name: 'borrow_records',
        description: 'Circulation ledger recording book checkouts and return dates.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Circulation ticket ID' },
          { name: 'book_id', type: 'INT', key: 'FK', description: 'Checked out book' },
          { name: 'member_id', type: 'INT', key: 'FK', description: 'Borrowing member' },
          { name: 'borrow_date', type: 'DATE', description: 'Checkout date' },
          { name: 'return_date', type: 'DATE', description: 'Return timestamp (NULL if active)' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'Overdue / Unreturned Books Ledger',
        objective: 'List all currently active book checkouts with member details.',
        sql: 'SELECT m.name AS member_name, b.title AS book_title, br.borrow_date FROM borrow_records br JOIN books b ON br.book_id = b.id JOIN members m ON br.member_id = m.id WHERE br.return_date IS NULL;',
        businessImpact: 'Automates overdue book notifications and late fee fines.'
      }
    ]
  },
  {
    id: 'project-cab',
    name: 'Ride-Hailing & Cab Booking Dispatch',
    icon: 'Car',
    databaseName: 'cab_dispatch',
    industry: 'Transportation & Mobility',
    description: 'High-concurrency geolocation dispatch database tracking drivers, vehicles, passenger rides, surge pricing multipliers, and fare payouts.',
    tablesCount: 4,
    tables: [
      {
        name: 'drivers',
        description: 'Verified transport drivers, rating averages, and current duty status.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Driver ID' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Driver name' },
          { name: 'license_no', type: 'VARCHAR(50)', description: 'Government license' },
          { name: 'rating', type: 'DECIMAL(3,2)', description: 'Customer satisfaction rating' },
          { name: 'status', type: 'VARCHAR(20)', description: 'Online, On Trip, Offline' }
        ]
      },
      {
        name: 'rides',
        description: 'Trip itineraries, pickup/drop addresses, fare totals, and payment status.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', description: 'Trip ID' },
          { name: 'driver_id', type: 'INT', key: 'FK', description: 'Assigned driver' },
          { name: 'passenger_id', type: 'INT', key: 'FK', description: 'Requesting passenger' },
          { name: 'distance_km', type: 'DECIMAL(6,2)', description: 'Trip distance' },
          { name: 'fare_amount', type: 'DECIMAL(8,2)', description: 'Calculated fare' },
          { name: 'ride_status', type: 'VARCHAR(20)', description: 'Requested, Active, Completed' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'Top Rated Drivers with Highest Completed Trips',
        objective: 'Rank drivers by total revenue and rating for weekly bonuses.',
        sql: 'SELECT d.name, d.rating, COUNT(r.id) AS completed_trips, SUM(r.fare_amount) AS gross_fares FROM drivers d JOIN rides r ON d.id = r.driver_id WHERE r.ride_status = "Completed" GROUP BY d.id, d.name, d.rating ORDER BY gross_fares DESC;',
        businessImpact: 'Powers automated incentive calculations for top mobility partners.'
      }
    ]
  },
  {
    id: 'project-airline',
    name: 'Airline Flight Reservation Engine',
    icon: 'Plane',
    databaseName: 'airline_reservations',
    industry: 'Aviation & Travel',
    description: 'Global flight distribution database scheduling flights, aircraft seat configurations, passenger manifests, and baggage tracking.',
    tablesCount: 5,
    tables: [
      {
        name: 'flights',
        description: 'Flight schedules, route origins, destinations, and departure schedules.',
        columns: [
          { name: 'flight_no', type: 'VARCHAR(10)', key: 'PK', description: 'IATA flight code (e.g. KK204)' },
          { name: 'origin_airport', type: 'VARCHAR(5)', description: 'Departure 3-letter IATA code' },
          { name: 'destination_airport', type: 'VARCHAR(5)', description: 'Arrival 3-letter IATA code' },
          { name: 'departure_time', type: 'TIMESTAMP', description: 'Scheduled departure' },
          { name: 'aircraft_type', type: 'VARCHAR(50)', description: 'Airbus A350 / Boeing 787' }
        ]
      },
      {
        name: 'bookings',
        description: 'Passenger flight tickets, seat numbers, class, and PNR references.',
        columns: [
          { name: 'pnr_code', type: 'VARCHAR(10)', key: 'PK', description: 'Passenger Name Record code' },
          { name: 'flight_no', type: 'VARCHAR(10)', key: 'FK', description: 'Flight code' },
          { name: 'passenger_name', type: 'VARCHAR(100)', description: 'Traveler name' },
          { name: 'seat_number', type: 'VARCHAR(5)', description: 'Assigned seat (e.g. 14A)' },
          { name: 'fare_paid', type: 'DECIMAL(10,2)', description: 'Ticket fare amount' }
        ]
      }
    ],
    sampleQueries: [
      {
        title: 'Flight Load Factor & Capacity Utilization',
        objective: 'Calculate passenger count and gross ticket sales per flight route.',
        sql: 'SELECT f.flight_no, f.origin_airport, f.destination_airport, COUNT(b.pnr_code) AS booked_seats, SUM(b.fare_paid) AS route_revenue FROM flights f LEFT JOIN bookings b ON f.flight_no = b.flight_no GROUP BY f.flight_no, f.origin_airport, f.destination_airport ORDER BY route_revenue DESC;',
        businessImpact: 'Informs route profitability and dynamic airline yield management.'
      }
    ]
  }
];
