// These are the node packages we need
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk"); // this just makes everything pretty
var Password = require("./password");
new Password().getPassword(loginCallback);

function loginCallback(password) {
  console.log("loginCallBack");

  // create the connection to sql here
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "bamazon_db"
  });


  // variables
  var howMany = 0;
  var product = "";
  var validIDs = ["Get me out of here! I'm done shopping!"]; // this variable is used to pick what item you want based on ID. the object includes this string as an option to exit the store

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
      // for loop to push all the item names from mySQL into an array and log them
      for (var i = 0; i < results.length; i++) {
        theItems.push(results[i].product_name + chalk.blue(" | ID: " + results[i].id + chalk.red(") | Quantity: " + results[i].stock_quantity) + " | Price: $" + results[i].price));
        console.log(chalk.red(theItems[i]));
        validIDs.push(results[i].id); // this is used to make sure it's a valid number when the user inputs an ID
      }

      // After that, we need to ask the user what they want to buy with a prompt
      console.log("\n\n");
      inquirer
        .prompt([
          {
            name: "purchaseProduct",
            type: "list",
            message: "What product would you like to purchase? Please input the product's ID below:\n",
            choices: validIDs
          },
          {
            name: "howMany",
            type: "input",
            message: "How many would you like to purchase? Please input the quantity below:\n"
          }
        ]).then(answer => {
          // save the user responses
          howMany = answer.howMany;
          product = answer.purchaseProduct;
          console.log("\n----------------------------------------------------\n");
          buy();
        });
    })
  }


  function buy() {
    connection.query('Select * FROM products WHERE id = ' + product, function (err, results) {
      //error
      if (err) throw err;

      // Only update the mysql databse if the user picks a valid quantity
      if (howMany > results[0].stock_quantity) {
        // when customer orders too much
        console.log("We don't have sufficent " + results[0].product_name + " in stock.");
        console.log(chalk.magenta("A MILLION APOLOGIES! WE CAN'T FULFILL THIS ORDER RIGHT NOW :("));
        console.log(chalk.green("------------\n-----------------"));
        console.log(chalk.green("------------\n-----------------"));

        start();  
      }
      
      if ((howMany < results[0].stock_quantity)) {
        // when the order quantity is valid
        var price = results[0].price * howMany;
        console.log("Amount for your order of '" + results[0].product_name + "': " + "$" + price);
        console.log(chalk.magenta("Thanks for your purchase!! Have a great day :)"));
        console.log(chalk.magenta("Updating marketplace...\n\n"));
        connection.query("UPDATE products SET stock_quantity = stock_quantity - " + howMany + " WHERE id = " + product);
        start();  
      }
      
    }) 
  }
}

