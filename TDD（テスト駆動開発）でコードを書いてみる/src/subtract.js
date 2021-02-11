module.exports = (args) => {
  if (args?.length < 2) return "2 or more arguments are required";
  const base = args[0];
  const subtraction = args.slice(1).reduce((acc, cur) => acc + cur);
  const result = base - subtraction;
  return result >= 0 ? result : "negative number";
};
