/* eslint-disable no-console */
const program = require("commander");
const getOperation = require("./get-operation");
const getNumbers = require("./get-numbers");
const add = require("./add");
const subtract = require("./subtract");
const multiply = require("./multiply");
const divide = require("./divide");
const isOperation = require("./is-operation");

program.parse(process.argv);

const operation = getOperation(program.args);
if (!isOperation(operation)) {
  console.log(operation);
  return;
}

const numbers = getNumbers(program.args.slice(1));
if (!numbers.isArray) {
  console.log(numbers);
  return;
}

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
}
