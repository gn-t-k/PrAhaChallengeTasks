const isOperation = require("./is-operation");

module.exports = (args) => {
  if (!isOperation(args?.[0]))
    return "Only add/subtract/multiply/divide is available";
  return args?.[0];
};
