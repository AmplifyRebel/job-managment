const inquirer = require('inquirer'); 
const PORT = process.env.PORT || 3001;
const app = express(); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
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
    connection.query(query, function(res) {
        
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        options();
    })
}
function updateRole() {
    

};


const removeEmployee = () => {
    let sql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    connection.promise().query(sql, (req,res) => {
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee would you like to delete?',
            choices: employeeNamesArray
          }
        ])
        .then((answer) => {
          let employeeId;

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          var query = `DELETE FROM employee WHERE employee.id = ?`;
          connection.query(sql, [employeeId],
          );
        });
    });
  };


function close() {
    connection.end();
};
function addRole() {
    connection.query('SELECT * FROM department', function(req,res) {

    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'add new role?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (res) {
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
}; 

function viewDepartments(){
    var query = 'SELECT * FROM department';
    connection.query(query, function(req,res) {
        
        console.table('All Departments:', res);
        options();
    })
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'addDepartment', 
                type: 'input', 
                message: 'What department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'confirm new department?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(req, res) {
              
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                options();
                })
            })
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (req,res) {
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connection.query(
                    ' add new emplouyee?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function () {
                        console.log('Your employee has been added!');
                        options();
                    })
                })
        })
};
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(req,res){
        console.table('All Roles:', res);
        options();
    })
};
