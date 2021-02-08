USE employee_trackerDB;

INSERT INTO Department (name)
VALUES ("Engineering"), ("HR"),("Sales"),("Finance"), ("Marketing");

INSERT INTO Role (title, salary, department_id)
VALUES ("Associate Manager", 40000, 1), ("Manager", 80000, 2), ("CEO", 100000, 3), ("President", 200000, 4), ("Intern", 15000, 5), ("Assistant", 35000, 6);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 4), ("Lynda", "Jones", 2, 4), ("Tina", "Brown", 3, 4), ("Liam", "Black", 4, 3), ("Molly", "White", 5, 2), ("Erica", "Nelson", 5, 2);