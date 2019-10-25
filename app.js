// These are the node packages we need
var mysql = require("mysql");
//var inquirer = require("inquirer");

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
    // First, display all of the items here
    console.log("WELCOME TO THE BAMAZON STORE!!");
    console.log("This is what we have for sale...");
    connection.query("SELECT * FROM products", function(err, results) {
      var theItems = [];
      if (err) throw err; 
      for (var i = 0; i < results.length; i++) {
        theItems.push(results[i].product_name);
        console.log(theItems[i]);
      }
      connection.end();
    })
  
  }