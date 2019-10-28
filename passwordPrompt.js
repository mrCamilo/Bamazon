var inquirer = require("inquirer");

function Password () {
  //console.log("Password constructor\n");
  this.sqlPassword = "";

  this.getPassword = function (callback) {
    inquirer.prompt([
      {
        type: "password",
        name: "myPassword",
        mask: "*",
        message: "Please enter your password for MySQL database > "
      }
    ]).then(function (user) {
      callback(user.myPassword);
    });
  }
}

module.exports = Password;
