module.exports = (args) => {
  if (args?.length < 2) return "2 or more arguments are required";
  return args.reduce((acc, cur) => acc / cur);
};
