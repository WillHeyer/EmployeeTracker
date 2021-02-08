
const inquirer = require('inquirer')
const fs = require('fs');

require("console.table");

const mysql = require('mysql');
const { errorMonitor } = require('events');
const { error } = require('console');

const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "rootroot",
    database: "employee_trackerDB"
})


// Main Menu Question and Switch
const main = () => {

    inquirer
        .prompt([
            {
                type: "list",
                name: "main",
                message: "What would you like to do?",
                choices: ["View all employees", "View employees by department", "View employees by role", "Add a new employee", "Add a new department", "Add a new role", "Update employee roles", "Exit"]
            }
        ]).then((answer) => {
            switch (answer.main) {
                case "View all employees": getEmployeeInformation()
                    break;
                case "View employees by department": getDepartmentInformation()
                    break;
                case "View employees by role": getEmployeeRolesInfo()
                    break;
                case "Add a new employee": getNewEmployeeInfo()
                    break;
                case "Add a new department": getNewDepartmentInfo()
                    break;
                case "Add a new role": getNewRoleInfo()
                    break;
                case "Update employee roles": getUpdateRoleInfo()
                    break;
                case "Exit":   connection.end();
                    break;
            }
        })

    }

    // View All Employees
    const getEmployeeInformation = () => {
        // SQL Database?

        connection.query("SELECT * FROM Employee", (err, queryResult) => {

            console.log(err)
            console.table(queryResult);

            main();
        })
    }

    //View Employees By Department
    const getDepartmentInformation = () => {

        inquirer
        .prompt([
            {
                type: "input",
                name: "departmentID",
                message: "What is the ID of the department?",
            },

        ]).then((answers) => {
            connection.query(`Select id from Role WHERE department_id = "${answers.departmentID}"`, (err, queryResult) => {
                let whereStatement = "WHERE ";
                    queryResult.forEach((row, index) => {
                        whereStatement+= `role_id = ${row.id}`

                        if(index < queryResult.length - 1)
                        {
                            whereStatement+= ' OR '
                        }
                    })

                    connection.query(`Select * from Employee ${whereStatement}`, (err, queryResult2) => {
                            console.log(err)
                            console.table(queryResult2);
    
                            main();
                    })
            })
        })
    }

    // View Employees By Roles
    const getEmployeeRolesInfo = () => {

      connection.query("SELECT * FROM Role ", (err, queryResult) => {

            console.log(err)
            console.table(queryResult);

            main();
        })
    }

    // Add New Employee
    const getNewEmployeeInfo = () => {

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "FN",
                    message: "What is the firt name of the employee?",
                },
                {
                    type: "input",
                    name: "LN",
                    message: "What is the last name of the employee?",
                },
                {
                    type: "input",
                    name: "roleID",
                    message: "What is their role ID?",
                },
                {
                    type: "input",
                    name: "managerID",
                    message: "Who is their manager's ID?",
                },
            ]).then((answers) => {
                connection.query(`INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.FN}", "${answers.LN}", "${answers.roleID}", "${answers.managerID}" )`, (err, queryResult) => {

                    console.log(err)
                    console.table(queryResult);
        
                    main();
                })
                
            })
    }

    // Add New Department
    const getNewDepartmentInfo = () => {

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "newDepartment",
                    message: "What is the name of the new department?",
                }
            ]).then((answers) => {

                connection.query(`INSERT INTO Department (name) VALUES ("${answers.newDepartment}")`, (err, queryResult) => {

                    console.log(err)
                    console.table(queryResult);
        
                    main();
                })

            })
    }

    // Add New Role
    const getNewRoleInfo = () => {

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the employees title?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the employees salary?",
                },
                {
                    type: "input",
                    name: "departmentID",
                    message: "What is the employees department ID?",
                },
            ]).then((answers) => {
                connection.query(`INSERT INTO Role (title, salary, department_id ) VALUES ("${answers.title}", "${answers.salary}", "${answers.departmentID}")`, (err, queryResult) => {

                    console.log(err)
                    console.table(queryResult);
        
                    main();
                })
            })
    }

    // Update A Role
    const getUpdateRoleInfo = () => {

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "employeeID",
                    message: "What is the ID of the employee you'd like to update?",
                },
                {
                    type: "input",
                    name: "updateID",
                    message: "What is the employee's new role ID?",
                },

            ]).then((answers) => {
                connection.query(`UPDATE Employee set role_id = "${answers.updateID}" WHERE id = "${answers.employeeID}"`, (err, queryResult) => {

                    console.log(err)
                    console.table(queryResult);
        
                    main();
                })
            })
    }

    connection.connect(() => {
        console.log('Successfully connected to database!')
        main ();
    })