INSERT INTO department (name)
VALUES 
('Information Systems and Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Lawyer', 120000, 1),
('Accountant', 65000, 2),
('Engineer', 110000, 3),
('Manager', 77000, 4),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Johnnie', 'Johnson', 1, 2), 
('Dave', 'Smith', 1, null), 
('Eli', 'Manning', 1, 2),
 ('Mark', 'Jones', 2, 2), 
 ('Ethan', 'Johnson', 4, null);