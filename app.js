// These are the node packages we need
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk"); // this just makes everything pretty

// create the connection to sql here
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "lolwut123",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  // First, display all of the items here and welcome the customer to my store
  console.log(chalk.blue("WELCOME TO THE BAMAZON STORE!!"));
  console.log(chalk.green("This is what we have for sale..."));
  connection.query("SELECT * FROM products", function (err, results) {
    var theItems = [];
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      theItems.push(results[i].product_name);
      console.log(chalk.gray(theItems[i]));
    }
    // After that, we need to ask the user what they want to buy with a prompt
    console.log("\n\n");

    inquirer
      .prompt({
        name: "postOrBid",
        type: "list",
        message: "What item would you like to buy?",
        choices: theItems
      })
    connection.end();
  })
}