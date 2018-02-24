var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306, 

  user: "root",

  password: "mySQL",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Listening on port " + connection.threadId + "\n");
  inquire();
});

function inquire() {
  inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Please select an option:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }]).then(function(input){
          if (input.option === "View Products for Sale") {
            readProducts()
          } else if (input.option === "View Low Inventory") {
            lowProducts();
          } else if (input.option === "Add to Inventory") {
            addInventory();
          } else if (input.option === "Add New Product") {
            productAdd();
          } else if (input.option === "Exit") {
            connection.end();
          }
        });
};

function readProducts() {
  console.log("********** CURRENT STOCK AVAILABLE **********\n");
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " | " + res[i].product_name + " | Dept: " + 
        res[i].department_name + " | Price: $" + res[i].price + " | Amt in Stock: " + res[i].stock_quantity + "\n");
    }
    console.log("-----------------------------------");
    inquire();
  });
};     

function lowProducts() {
  console.log("********** CURRENT STOCK BELOW 5! **********\n");
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " | " + res[i].product_name + " | Dept: " + 
        res[i].department_name + " | Price: $" + res[i].price + " | Amt in Stock: " + res[i].stock_quantity + "\n");
    }
    console.log("-----------------------------------");
    inquire();
  });
};       

function addInventory() {
  inquirer.prompt([
    {
    type: "input",
    name: "add",
    message: "Insert the ID number of the product you'd like to add inventory to, then press ENTER.",
    filter: Number
  },{
    type: "input",
    name: "quantity",
    message: "How many would you like to add?",
    filter: Number
  }
]).then(function(input) {
  var item = input.add;
  var amount = input.quantity;

  var addInventory = 'SELECT * FROM products WHERE ?'

  connection.query(addInventory, {item_id: item}, function(err, data) {
    if (err) throw err;
    if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
      } else {
        var productData = data[0];

        console.log('\nUpdating Inventory...');
        var updateInventory = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + amount) + ' WHERE item_id = ' + item;

        connection.query(updateInventory, function(err, data) {
          if (err) throw err;

          console.log('\nStock count for Item ID ' + productData.product_name + ' has been updated to ' + (productData.stock_quantity + amount) + '.');
          console.log("\n---------------------------------------------------------------------\n");
          inquire();
        })
      }
    })
  })
};

function productAdd() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'product_name',
      message: 'Please enter the new product name.',
    },
    {
      type: 'input',
      name: 'department_name',
      message: 'Which department does the new product belong to?',
    },
    {
      type: 'input',
      name: 'price',
      message: 'What is the price per unit?',
    },
    {
      type: 'input',
      name: 'stock_quantity',
      message: 'How many items are in stock?',
    }
  ]).then(function(input) {

    console.log('\nAdding New Item: \n    product_name = ' + input.product_name + '\n' +  
                     '    department_name = ' + input.department_name + '\n' +  
                     '    price = ' + input.price + '\n' +  
                     '    stock_quantity = ' + input.stock_quantity);

    var invAdd = 'INSERT INTO products SET ?';

    connection.query(invAdd, input, function (error, results, fields) {
      if (error) throw error;

      console.log('\nNew product has been added to the inventory under Item ID ' + results.insertId + '.');
      console.log("\n---------------------------------------------------------------------\n");
      inquire();
    });
  })
}