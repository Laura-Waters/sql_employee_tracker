// DEPENDENCIES 
const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');

// APP/PORT 
const PORT = process.env.PORT || 3001;
const app = express(); 

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

// // Sample input data
// const inputData = {
//     tableName: 'employees',
//     columns: ['id INT', 'name VARCHAR(50)', 'role VARCHAR(50)']
//   };
  
//   // Create a table based on the input data
//   const createTableQuery = `CREATE TABLE ${inputData.tableName} (${inputData.columns.join(', ')})`;
  
//   // Execute the create table query
//   connection.query(createTableQuery, (error, results, fields) => {
//     if (error) throw error;
//     console.log('Table created successfully');
// });


// MIDDLEWARES 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ROUTES 


// START THE SERVER ------------------------------------------
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });   