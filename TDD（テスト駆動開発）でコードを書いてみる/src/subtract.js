module.exports = (args) => {
  if (args?.length < 2) return "2 or more arguments are required";
  const result = args.reduce((acc, cur) => acc - cur);
  return result >= 0 ? result : "negative number";
};
