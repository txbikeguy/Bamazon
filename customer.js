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
  readProducts();
});

function readProducts() {
	console.log("**********CURRENT STOCK AVAILABLE**********\n");
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      	console.log("Item ID: " + res[i].item_id + " | " + res[i].product_name + " | Dept: " + 
      	res[i].department_name + " | Price: $" + res[i].price + " | Amt in Stock: " + res[i].stock_quantity + "\n");
    }
    console.log("-----------------------------------");
    inquire();
  });
};

function inquire() {
	inquirer.prompt([
		{
    type: "input",
    name: "buy",
    message: "Insert the ID number of the product you'd like to buy, then press ENTER.",
  },{
  	type: "input",
    name: "quantity",
    message: "How many would you like to purchase?",
  }
]).then(function(input) {
	var item = input.buy;
	var amount = input.quantity;

	var queryCust = 'SELECT * FROM products WHERE ?';

	connection.query(queryCust, {item_id: item}, function(err, data) {
		if (err) throw err;
		if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
			} else {
				var productData = data[0];

				if (amount <= productData.stock_quantity) {
					console.log("\nThe product you requested is in stock, your order is now being placed.");

					var updateQueryCust = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - amount) + ' WHERE item_id = ' + item;

					connection.query(updateQueryCust, function(err, data) {
						if (err) throw err;

						console.log('\nYour oder has been placed! Your total is $' + productData.price * amount);
						console.log('\nThank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
				});
			} else {
					console.log('\nSorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('\nPlease modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					readProducts();
				}
		}
	});
});
};