// DEPENDENCIES 
const inquirer = require('inquirer'); 
const fs = require('fs'); 
const { Pool } = require('pg');

// DATA/DATABASES 
const pool = new Pool(
  {
      user: 'postgres',
      password: 'laura29',
      host: 'localhost',
      database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
)

pool.connect();   

function askQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
      },
      {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName',
        when: (answers) => answers.options.includes('Add Department')
      }, 
      {
        type: 'input',
        message: 'What is the role?',
        name: 'roleName',
        when: (answers) => answers.options.includes('Add Role')
      },
      {
        type: 'input',
        message: 'What is the salary?',
        name: 'salary',
        when: (answers) => answers.roleName
      },
      {
        type: 'list',
        message: 'Which department will the role be in?',
        name: 'departmentId',
        choices: async () => {
          const departments = await pool.query('SELECT id, department_name FROM departments');
          return departments.rows.map(department => ({
            name: department.department_name,
            value: department.id
          }));
        },
        when: (answers) => answers.salary
      },
    ])
  .then((answers) => {
    switch (answers.options) {
      // VIEW ALL DEPARTMENTS 
      case 'View All Departments':
        pool.query('SELECT * FROM departments', (err, departmentsResult) => {
            if (err) {
                console.error('Error viewing all departments:', err);
            } else {
                console.log('All departments:', departmentsResult.rows);
            }
        });
        break;
      // VIEW ALL ROLES 
      case 'View All Roles':
        pool.query('SELECT * FROM roles', (err, rolesResult) => {
          if (err) {
              console.error('Error viewing all roles:', err);
          } else {
              console.log('All roles:', rolesResult.rows);
          }
      });
        break;
      // VIEW ALL EMPLOYEES 
      case 'View All Employees':
        pool.query('SELECT * FROM employees', (err, employeesResult) => {
          if (err) {
              console.error('Error viewing all employees:', err);
          } else {
              console.log('All employees:', employeesResult.rows);
          }
      });
        break;
      // ADD DEPARTMENT 
      case 'Add Department':
        if (answers.departmentName) {
        pool.query(`INSERT INTO departments (department_name) VALUES ('${answers.departmentName}')`, (err, res) => {
        if (err) {
          console.error('Error adding department:', err);
        } else {
          console.log(`Added ${answers.departmentName} department`);
        }
        });
        break; 
      }
      // ADD ROLE 
      case 'Add Role':
          if (answers.roleName && answers.salary) {
          pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.roleName}', '${answers.salary}', '${answers.departmentId}')`, (err, res) => {
          if (err) {
            console.error('Error adding role:', err);
          } else {
            console.log(`Added ${answers.roleName} role`);
          }
          });
          break;
      };
      askQuestions();   
  }})

}; 

askQuestions();


   
  

    