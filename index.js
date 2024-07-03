// DEPENDENCIES 
const inquirer = require('inquirer'); 
const fs = require('fs'); 


inquirer
  .prompt([
    {
      type: 'checkbox',
      message: ('What would you like to do?'),
      name: 'options',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
    },
    {
      type: 'input',
      message: ('What is the name of the department?'),
      name: 'departmentName',
      when: (answers) => answers.options.includes('Add Department')
    }, 
    {
      type: 'input',
      message: ('What is the role?'),
      name: 'roleName',
      when: (answers) => answers.options.includes('Add Role')
      },
  ])
  .then((answers) => {
    answers.options.forEach((option) => {
        switch (option) {
            case 'View All Departments':
                pool.query('SELECT * FROM department', (err, res) => {
                    if (err) {
                        console.error('Error viewing all departments:', err);
                    } else {
                        console.log('All departments:', res.rows);
                    }
                });
                break;
            // Add cases for other options as needed
        }
    });
  });

    // fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
    //   err ? console.log(err) : console.log('Success!')
    // );      
  

