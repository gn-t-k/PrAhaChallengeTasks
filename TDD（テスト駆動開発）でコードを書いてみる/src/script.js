/* eslint-disable no-console */
const program = require("commander");
const getOperation = require("./get-operation");
const getNumbers = require("./get-numbers");
const add = require("./add");
const subtract = require("./subtract");
const multiply = require("./multiply");
const divide = require("./divide");

program.parse(process.argv);

const operation = getOperation(program.args);
const numbers = getNumbers(program.args.slice(1));

switch (operation) {
  case "add":
    console.log(add(numbers));
    break;
  case "subtract":
    console.log(subtract(numbers));
    break;
  case "multiply":
    console.log(multiply(numbers));
    break;
  case "divide":
    console.log(divide(numbers));
    break;
  default:
    console.log(
      "Only add / subtract / multiply / divide can be specified in the first argument"
    );
    break;
}
