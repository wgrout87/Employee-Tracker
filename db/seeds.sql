INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Sales Manager', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 1, 1),
    ('Jack', 'London', 2, 2),
    ('Robert', 'Bruce', 3, 2),
    ('Peter', 'Greenaway', 3, 2),
    ('Derek', 'Jarman', 5, 3),
    ('Paolo', 'Pasolini', 7, 4),
    ('Heathcote', 'Williams', 3, 2),
    ('Sandy', 'Powell', 7, 4),
    ('Emil', 'Zola', 8, 1),
    ('Sissy', 'Coalpits', 4, 3),
    ('Antoinette', 'Capet', 3, 2),
    ('Samuel', 'Delany', 5, 3),
    ('Tony', 'Duvert', 1, 1),
    ('Dennis', 'Cooper', 1, 1),
    ('Monica', 'Bellucci', 5, 3),
    ('Samuel', 'Johnson', 3, 2),
    ('John', 'Dryden', 6, 4),
    ('Alexander', 'Pope', 7, 4),
    ('Lionel', 'Johnson', 3, 2),
    ('Aubrey', 'Beardsley', 5, 3);