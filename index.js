const inquirer = require('inquirer'); 
const PORT = process.env.PORT || 3001;
const app = express(); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});
function startup() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                    
                    'View all departments',
                    'Add a department',
                    'View all roles',
                    'Add a role',
                    'Add an employee',
                    'Update employee role',
                    'View all employees',
                    
                    'EXIT'
                    ]
            }).then(function (choice) {
                switch (choice.action) {
                       
                    case 'View all departments':
                        viewDepartments();
                        
                    case 'Add a department':
                        addDepartment();
                        
                    case 'View all roles':
                        viewRoles();

                    case 'Add a role':
                        addRole();
                        
                    case 'View all employees':
                        viewEmployees();

                    case 'Add an employee':
                        addEmployee();

                    case 'Update employee role':
                        updateRole();
                        
                    case 'Delete an employee':
                        deleteEmployee();
                        
                    case 'EXIT': 
                        exitApp();
                      
                    default:
                        
                }
        })
};
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query); {
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        options();
    })
};

function updateRole() {

};


function deleteEmployee() {

};


function close() {
    connection.end();
};
function addRole() 
function viewDepartments()
function addDepartment() 
function addEmployee()
function viewRoles()
function viewEmployees()