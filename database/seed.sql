USE enterprise_email_system;

INSERT INTO departments (department_name, department_email)
VALUES
('IT Support', 'it@company.com'),
('Finance', 'finance@company.com'),
('HR', 'hr@company.com'),
('Security', 'security@company.com'),
('Customer Support', 'support@company.com'),
('Sales', 'sales@company.com');

INSERT INTO users (full_name,email,role,department_id)
VALUES
('Samarth','samarth@gmail.com','Customer',NULL),

('Alice Johnson','alice@company.com','SupportAgent',1),

('Bob Smith','bob@company.com','Employee',2),

('Admin User','admin@company.com','Admin',NULL);