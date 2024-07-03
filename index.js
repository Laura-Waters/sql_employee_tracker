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
  .then((data) => {
    const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

    fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
      err ? console.log(err) : console.log('Success!')
    );      
  });

