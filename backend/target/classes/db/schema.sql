USE smartsite_db;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS subscription_plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    plan_name VARCHAR(100) NOT NULL,
    monthly_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    max_projects INT NOT NULL DEFAULT 0,
    max_workers INT NOT NULL DEFAULT 0,
    features TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_subscription_plans_plan_name (plan_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS companies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(200) NOT NULL,
    company_email VARCHAR(150),
    company_phone VARCHAR(20),
    address TEXT,
    logo VARCHAR(255),
    subscription_plan_id BIGINT,
    subscription_status ENUM('TRIAL','ACTIVE','EXPIRED','SUSPENDED') DEFAULT 'TRIAL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_companies_company_email (company_email),
    CONSTRAINT fk_companies_subscription_plan
        FOREIGN KEY (subscription_plan_id) REFERENCES subscription_plans(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT,
    full_name VARCHAR(150),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('SUPER_ADMIN','ADMIN','COMPANY_ADMIN','PROJECT_MANAGER','SITE_ENGINEER','ACCOUNTANT','CLIENT') NOT NULL,
    profile_image VARCHAR(255),
    status ENUM('ACTIVE','INACTIVE','SUSPENDED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_users_email (email),
    KEY idx_users_company_id (company_id),
    CONSTRAINT fk_users_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

    ALTER TABLE users ADD COLUMN company_id BIGINT;
    ALTER TABLE users ADD COLUMN full_name VARCHAR(150);
    ALTER TABLE users ADD COLUMN name VARCHAR(150) NULL;
    ALTER TABLE users ADD COLUMN profile_image VARCHAR(255);
    ALTER TABLE users ADD COLUMN status ENUM('ACTIVE','INACTIVE','SUSPENDED') DEFAULT 'ACTIVE';
    ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS subscriptions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    plan_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_status ENUM('PAID','PENDING','FAILED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_subscriptions_company_id (company_id),
    KEY idx_subscriptions_plan_id (plan_id),
    CONSTRAINT fk_subscriptions_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_subscriptions_plan
        FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS clients (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT,
    full_name VARCHAR(150),
    name VARCHAR(150),
    company VARCHAR(200),
    email VARCHAR(150),
    phone VARCHAR(20),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_clients_company_id (company_id),
    KEY idx_clients_email (email),
    CONSTRAINT fk_clients_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

    ALTER TABLE clients ADD COLUMN company_id BIGINT;
    ALTER TABLE clients ADD COLUMN full_name VARCHAR(150);
    ALTER TABLE clients ADD COLUMN name VARCHAR(150) NULL;
    ALTER TABLE clients ADD COLUMN company VARCHAR(200);
    ALTER TABLE clients ADD COLUMN notes TEXT;

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT,
    project_name VARCHAR(200),
    name VARCHAR(200),
    client_id BIGINT,
    project_manager_id BIGINT,
    manager_id BIGINT,
    location TEXT,
    address VARCHAR(400),
    budget DECIMAL(15,2),
    start_date DATE,
    end_date DATE,
    progress_percentage INT DEFAULT 0,
    status ENUM('PENDING','ONGOING','COMPLETED','DELAYED') DEFAULT 'PENDING',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_projects_company_id (company_id),
    KEY idx_projects_client_id (client_id),
    KEY idx_projects_manager_id (project_manager_id),
    CONSTRAINT fk_projects_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_projects_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_projects_manager
        FOREIGN KEY (project_manager_id) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

    ALTER TABLE projects ADD COLUMN company_id BIGINT;
    ALTER TABLE projects ADD COLUMN project_name VARCHAR(200);
    ALTER TABLE projects ADD COLUMN name VARCHAR(200) NULL;
    ALTER TABLE projects ADD COLUMN project_manager_id BIGINT;
    ALTER TABLE projects ADD COLUMN manager_id BIGINT;
    ALTER TABLE projects ADD COLUMN location TEXT;
    ALTER TABLE projects ADD COLUMN address VARCHAR(400);
    ALTER TABLE projects ADD COLUMN progress_percentage INT DEFAULT 0;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    assigned_engineer_id BIGINT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'MEDIUM',
    status ENUM('TODO','IN_PROGRESS','COMPLETED','DELAYED') DEFAULT 'TODO',
    start_date DATE,
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_tasks_company_id (company_id),
    KEY idx_tasks_project_id (project_id),
    KEY idx_tasks_assigned_engineer_id (assigned_engineer_id),
    CONSTRAINT fk_tasks_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_tasks_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_tasks_engineer
        FOREIGN KEY (assigned_engineer_id) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS milestones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    target_date DATE,
    status ENUM('PENDING','COMPLETED','DELAYED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_milestones_company_id (company_id),
    KEY idx_milestones_project_id (project_id),
    CONSTRAINT fk_milestones_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_milestones_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS workers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(100),
    salary DECIMAL(10,2),
    assigned_project_id BIGINT,
    qr_code VARCHAR(255),
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_workers_company_id (company_id),
    KEY idx_workers_assigned_project_id (assigned_project_id),
    CONSTRAINT fk_workers_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_workers_project
        FOREIGN KEY (assigned_project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    worker_id BIGINT NOT NULL,
    check_in_time DATETIME,
    check_out_time DATETIME,
    attendance_date DATE NOT NULL,
    status ENUM('PRESENT','ABSENT','LATE') DEFAULT 'PRESENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_attendance_company_id (company_id),
    KEY idx_attendance_worker_date (worker_id, attendance_date),
    CONSTRAINT fk_attendance_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_attendance_worker
        FOREIGN KEY (worker_id) REFERENCES workers(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    supplier_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(150),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_suppliers_company_id (company_id),
    CONSTRAINT fk_suppliers_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    material_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    supplier_id BIGINT,
    minimum_stock INT DEFAULT 0,
    cost_per_unit DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_inventory_company_id (company_id),
    KEY idx_inventory_supplier_id (supplier_id),
    CONSTRAINT fk_inventory_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_inventory_supplier
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS material_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    engineer_id BIGINT,
    material_id BIGINT,
    quantity INT NOT NULL,
    priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'MEDIUM',
    status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_material_requests_company_id (company_id),
    KEY idx_material_requests_project_id (project_id),
    KEY idx_material_requests_engineer_id (engineer_id),
    KEY idx_material_requests_material_id (material_id),
    CONSTRAINT fk_material_requests_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_material_requests_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_material_requests_engineer
        FOREIGN KEY (engineer_id) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_material_requests_material
        FOREIGN KEY (material_id) REFERENCES inventory(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT,
    category VARCHAR(100),
    title VARCHAR(200) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    expense_date DATE,
    payment_method VARCHAR(50),
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_expenses_company_id (company_id),
    KEY idx_expenses_project_id (project_id),
    KEY idx_expenses_created_by (created_by),
    CONSTRAINT fk_expenses_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_expenses_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_expenses_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    client_id BIGINT,
    project_id BIGINT,
    invoice_number VARCHAR(100) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    due_date DATE,
    status ENUM('PAID','PENDING','OVERDUE') DEFAULT 'PENDING',
    pdf_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_invoices_company_invoice_number (company_id, invoice_number),
    KEY idx_invoices_client_id (client_id),
    KEY idx_invoices_project_id (project_id),
    CONSTRAINT fk_invoices_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_invoices_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_invoices_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    invoice_id BIGINT NOT NULL,
    amount_paid DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(255),
    payment_date DATETIME,
    status ENUM('SUCCESS','FAILED','PENDING') DEFAULT 'PENDING',
    KEY idx_payments_company_id (company_id),
    KEY idx_payments_invoice_id (invoice_id),
    CONSTRAINT fk_payments_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_payments_invoice
        FOREIGN KEY (invoice_id) REFERENCES invoices(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_media (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    uploaded_by BIGINT,
    media_type ENUM('IMAGE','VIDEO') DEFAULT 'IMAGE',
    file_url VARCHAR(255) NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_project_media_company_id (company_id),
    KEY idx_project_media_project_id (project_id),
    KEY idx_project_media_uploaded_by (uploaded_by),
    CONSTRAINT fk_project_media_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_media_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_media_uploaded_by
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS daily_updates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    engineer_id BIGINT,
    update_date DATE,
    work_completed TEXT,
    issues TEXT,
    weather_condition VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_daily_updates_company_id (company_id),
    KEY idx_daily_updates_project_id (project_id),
    KEY idx_daily_updates_engineer_id (engineer_id),
    CONSTRAINT fk_daily_updates_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_daily_updates_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_daily_updates_engineer
        FOREIGN KEY (engineer_id) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    user_id BIGINT,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_notifications_company_id (company_id),
    KEY idx_notifications_user_id (user_id),
    CONSTRAINT fk_notifications_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    generated_by BIGINT,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_reports_company_id (company_id),
    KEY idx_reports_generated_by (generated_by),
    CONSTRAINT fk_reports_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reports_generated_by
        FOREIGN KEY (generated_by) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS workflow_events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT,
    work_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    actor_role VARCHAR(100),
    event_status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_workflow_events_company_id (company_id),
    KEY idx_workflow_events_project_id (project_id),
    CONSTRAINT fk_workflow_events_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_workflow_events_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS operational_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    record_type VARCHAR(100) NOT NULL,
    project_id BIGINT,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2),
    quantity INT,
    status VARCHAR(100) NOT NULL,
    notes TEXT,
    actor_role VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_operational_records_company_id (company_id),
    KEY idx_operational_records_project_id (project_id),
    CONSTRAINT fk_operational_records_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_operational_records_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS site_progress_updates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT,
    engineer_email VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    short_description VARCHAR(500) NOT NULL,
    comments TEXT,
    image_data LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_site_progress_company_id (company_id),
    KEY idx_site_progress_project_id (project_id),
    CONSTRAINT fk_site_progress_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_site_progress_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_predictions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    project_id BIGINT,
    prediction_type VARCHAR(100),
    prediction_result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_ai_predictions_company_id (company_id),
    KEY idx_ai_predictions_project_id (project_id),
    CONSTRAINT fk_ai_predictions_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ai_predictions_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;

INSERT IGNORE INTO subscription_plans (id, plan_name, monthly_price, max_projects, max_workers, features) VALUES
    (1, 'Starter', 99.00, 5, 50, 'Projects, Tasks, Attendance, Basic Reports'),
    (2, 'Growth', 249.00, 25, 250, 'Starter + Inventory + Finance + Client Portal'),
    (3, 'Enterprise', 499.00, 999, 5000, 'All features + API + Priority Support');

INSERT IGNORE INTO companies (id, company_name, company_email, company_phone, address, subscription_plan_id, subscription_status) VALUES
    (1, 'ABC Construction Pvt Ltd', 'info@abcconstruction.com', '+91-9000000001', 'Mumbai, India', 2, 'ACTIVE'),
    (2, 'XYZ Engineering Works', 'hello@xyzengineering.com', '+91-9000000002', 'Bengaluru, India', 1, 'TRIAL');

INSERT IGNORE INTO users (id, company_id, full_name, name, email, phone, password, role, status) VALUES
    (1, NULL, 'Platform Super Admin', 'Platform Super Admin', 'superadmin@smartsite.com', '+91-9000000010', '$2a$10$examplehashsuperadmin', 'SUPER_ADMIN', 'ACTIVE'),
    (2, 1, 'Arun Sharma', 'Arun Sharma', 'admin@abcconstruction.com', '+91-9000000011', '$2a$10$examplehashadmin', 'COMPANY_ADMIN', 'ACTIVE'),
    (3, 1, 'Meera Joshi', 'Meera Joshi', 'pm@abcconstruction.com', '+91-9000000012', '$2a$10$examplehashpm', 'PROJECT_MANAGER', 'ACTIVE'),
    (4, 1, 'Ravi Kumar', 'Ravi Kumar', 'engineer@abcconstruction.com', '+91-9000000013', '$2a$10$examplehashengineer', 'SITE_ENGINEER', 'ACTIVE'),
    (5, 1, 'Neha Verma', 'Neha Verma', 'accounts@abcconstruction.com', '+91-9000000014', '$2a$10$examplehashaccountant', 'ACCOUNTANT', 'ACTIVE'),
    (6, 1, 'Karan Mehta', 'Karan Mehta', 'client@abcconstruction.com', '+91-9000000015', '$2a$10$examplehashclient', 'CLIENT', 'ACTIVE'),
    (7, 2, 'Priya Menon', 'Priya Menon', 'admin@xyzengineering.com', '+91-9000000016', '$2a$10$examplehashxyzadmin', 'COMPANY_ADMIN', 'ACTIVE');

INSERT IGNORE INTO subscriptions (id, company_id, plan_id, start_date, end_date, payment_status) VALUES
    (1, 1, 2, '2026-01-01', '2026-12-31', 'PAID'),
    (2, 2, 1, '2026-05-01', '2026-07-31', 'PENDING');

INSERT IGNORE INTO clients (id, company_id, full_name, name, company, email, phone, address, notes) VALUES
    (1, 1, 'Aditi Rao', 'Aditi Rao', 'ABC Client Group', 'aditi.rao@clientmail.com', '+91-9111100001', 'Andheri East, Mumbai', 'Primary billing contact'),
    (2, 2, 'Rahul Nair', 'Rahul Nair', 'XYZ Stakeholders', 'rahul.nair@clientmail.com', '+91-9111100002', 'Whitefield, Bengaluru', 'Project sponsor');

INSERT IGNORE INTO projects (id, company_id, project_name, name, client_id, project_manager_id, manager_id, location, address, budget, start_date, end_date, progress_percentage, status, description) VALUES
    (1, 1, 'Skyline Tower A', 'Skyline Tower A', 1, 3, 3, 'Powai, Mumbai', 'Powai, Mumbai', 25000000.00, '2026-01-15', '2026-12-31', 35, 'ONGOING', 'Residential tower construction phase 2'),
    (2, 2, 'Metro Depot Annex', 'Metro Depot Annex', 2, 7, 7, 'Yelahanka, Bengaluru', 'Yelahanka, Bengaluru', 18000000.00, '2026-04-01', '2027-02-28', 10, 'ONGOING', 'Depot extension and support buildings');

INSERT IGNORE INTO tasks (id, company_id, project_id, assigned_engineer_id, title, description, priority, status, start_date, deadline) VALUES
    (1, 1, 1, 4, 'Column Reinforcement - Block A', 'Complete reinforcement for level 4 columns.', 'HIGH', 'IN_PROGRESS', '2026-05-10', '2026-05-25'),
    (2, 1, 1, 4, 'Concrete Slab Inspection', 'Pre-pour checklist and approval.', 'MEDIUM', 'TODO', '2026-05-20', '2026-05-28');

INSERT IGNORE INTO milestones (id, company_id, project_id, title, target_date, status) VALUES
    (1, 1, 1, 'Structure up to 10th Floor', '2026-08-15', 'PENDING'),
    (2, 2, 2, 'Foundation Completion', '2026-07-10', 'PENDING');

INSERT IGNORE INTO workers (id, company_id, full_name, phone, role, salary, assigned_project_id, qr_code, status) VALUES
    (1, 1, 'Sanjay Patil', '+91-9222200001', 'Mason', 28000.00, 1, 'QR-WRK-0001', 'ACTIVE'),
    (2, 1, 'Imran Sheikh', '+91-9222200002', 'Welder', 32000.00, 1, 'QR-WRK-0002', 'ACTIVE');

INSERT IGNORE INTO attendance (id, company_id, worker_id, check_in_time, check_out_time, attendance_date, status) VALUES
    (1, 1, 1, '2026-05-18 08:55:00', '2026-05-18 17:20:00', '2026-05-18', 'PRESENT'),
    (2, 1, 2, '2026-05-18 09:20:00', '2026-05-18 17:15:00', '2026-05-18', 'LATE');

INSERT IGNORE INTO suppliers (id, company_id, supplier_name, phone, email, address) VALUES
    (1, 1, 'Prime Cement Suppliers', '+91-9333300001', 'sales@primecement.com', 'Navi Mumbai'),
    (2, 1, 'SteelHub Distributors', '+91-9333300002', 'ops@steelhub.com', 'Thane');

INSERT IGNORE INTO inventory (id, company_id, material_name, quantity, unit, supplier_id, minimum_stock, cost_per_unit) VALUES
    (1, 1, 'OPC Cement', 450, 'Bags', 1, 100, 380.00),
    (2, 1, 'TMT Steel 12mm', 1200, 'Kg', 2, 300, 72.00);

INSERT IGNORE INTO material_requests (id, company_id, project_id, engineer_id, material_id, quantity, priority, status) VALUES
    (1, 1, 1, 4, 1, 150, 'HIGH', 'PENDING'),
    (2, 1, 1, 4, 2, 500, 'MEDIUM', 'APPROVED');

INSERT IGNORE INTO expenses (id, company_id, project_id, category, title, amount, expense_date, payment_method, created_by) VALUES
    (1, 1, 1, 'Labor', 'Weekly labor payout', 185000.00, '2026-05-17', 'Bank Transfer', 5),
    (2, 1, 1, 'Material', 'Cement procurement batch #12', 57000.00, '2026-05-18', 'UPI', 5);

INSERT IGNORE INTO invoices (id, company_id, client_id, project_id, invoice_number, total_amount, due_date, status, pdf_url) VALUES
    (1, 1, 1, 1, 'INV-ABC-2026-001', 1250000.00, '2026-06-05', 'PENDING', '/invoices/INV-ABC-2026-001.pdf');

INSERT IGNORE INTO payments (id, company_id, invoice_id, amount_paid, payment_method, transaction_reference, payment_date, status) VALUES
    (1, 1, 1, 500000.00, 'NEFT', 'TXN-ABC-500000-001', '2026-05-18 15:10:00', 'SUCCESS');

INSERT IGNORE INTO project_media (id, company_id, project_id, uploaded_by, media_type, file_url, description) VALUES
    (1, 1, 1, 4, 'IMAGE', '/uploads/project-1/progress-001.jpg', 'Slab shuttering completed for level 4');

INSERT IGNORE INTO daily_updates (id, company_id, project_id, engineer_id, update_date, work_completed, issues, weather_condition, notes) VALUES
    (1, 1, 1, 4, '2026-05-18', 'Completed reinforcement in Block A, initiated slab prep.', 'Delay in steel delivery by 2 hours', 'Sunny', 'Need additional scaffolding by Tuesday');

INSERT IGNORE INTO notifications (id, company_id, user_id, title, message, type, is_read) VALUES
    (1, 1, 3, 'Material Request Pending', 'A new high-priority material request requires approval.', 'MATERIAL', 0),
    (2, 1, 6, 'Invoice Generated', 'Invoice INV-ABC-2026-001 is now available in your portal.', 'BILLING', 0);

INSERT IGNORE INTO reports (id, company_id, report_type, generated_by, file_url) VALUES
    (1, 1, 'MONTHLY_FINANCIAL', 5, '/reports/abc/monthly-financial-2026-05.pdf');

INSERT IGNORE INTO workflow_events (id, company_id, project_id, work_type, title, description, actor_role, event_status) VALUES
    (1, 1, 1, 'PROJECT', 'Project Milestone Planned', 'Milestone for level 10 structure has been created.', 'PROJECT_MANAGER', 'CREATED'),
    (2, 1, 1, 'MATERIAL', 'Material Request Submitted', 'Engineer submitted a cement request for 150 bags.', 'SITE_ENGINEER', 'PENDING_APPROVAL');

INSERT IGNORE INTO operational_records (id, company_id, record_type, project_id, title, amount, quantity, status, notes, actor_role) VALUES
    (1, 1, 'EXPENSE', 1, 'Labor Payment - Week 20', 185000.00, NULL, 'RECORDED', 'Processed by accounts team', 'ACCOUNTANT'),
    (2, 1, 'INVENTORY', 1, 'Cement Intake', NULL, 150, 'RECEIVED', 'Warehouse inward entry complete', 'ADMIN');

INSERT IGNORE INTO site_progress_updates (id, company_id, project_id, engineer_email, title, short_description, comments, image_data) VALUES
    (1, 1, 1, 'engineer@abcconstruction.com', 'Block A - Reinforcement Done', 'Reinforcement completed for columns at level 4.', 'Ready for next inspection cycle.', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB');

INSERT IGNORE INTO ai_predictions (id, company_id, project_id, prediction_type, prediction_result) VALUES
    (1, 1, 1, 'DELAY_RISK', 'Medium risk of 5-day delay due to supplier volatility.');
