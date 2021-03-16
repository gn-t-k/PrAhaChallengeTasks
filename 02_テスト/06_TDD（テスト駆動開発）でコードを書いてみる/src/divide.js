module.exports = (args) => {
  if (args?.length < 2) return "2 or more arguments are required";
  if (args.slice(1).some((arg) => arg === 0))
    return "Division by zero has occurred";
  const result = args.reduce((acc, cur) => acc / cur);
  return Math.floor(result / 0.01) * 0.01;
};
