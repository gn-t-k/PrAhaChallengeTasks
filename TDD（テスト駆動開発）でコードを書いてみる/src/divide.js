module.exports = (args) => {
  if (args?.length < 2) return "2 or more arguments are required";
  if (args.slice(1).some((arg) => arg === 0))
    return "Division by zero has occurred";
  return args.reduce((acc, cur) => acc / cur);
};
