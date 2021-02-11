module.exports = (args) => {
  const base = args[0];
  const subtraction = args.slice(1).reduce((acc, cur) => acc + cur);
  return base - subtraction;
};
